import { makeAutoObservable } from "mobx";
import { io, Socket } from "socket.io-client";

type RoomMember = {
  userId: string;
  microphone: boolean;
  emoji: string[];
};

class SocketStore {
  socket: Socket | null = null;
  URL_ID: string | null = null;
  members: RoomMember[] = [];
  emoji: string[] = [];
  startCall: null | Date = null;
  isClose: boolean = false;
  my_id: string | null = null;
  volume = { speaker: true, microphone: false };

  localAudio: HTMLAudioElement | null = null;
  remoteAudio: HTMLAudioElement | null = null;
  peerConnection: RTCPeerConnection | null = null;

  connectionStats: {
    rtt: number; // задержка
    packetLoss: number; // % потерь
    bitrate: number; // kbps
  } = { rtt: 0, packetLoss: 0, bitrate: 0 };

  constructor() {
    makeAutoObservable(this, { socket: false });
    this.startStatsMonitor();
  }
  startStatsMonitor() {
    setInterval(async () => {
      if (!this.peerConnection) return;

      const stats = await this.peerConnection.getStats();
      let rttSum = 0;
      let rttCount = 0;
      let packetsLost = 0;
      let packetsSent = 0;
      let bitrate = 0;

      stats.forEach((report) => {
        if (report.type === "outbound-rtp" && report.kind === "audio") {
          packetsLost += report.packetsLost || 0;
          packetsSent += report.packetsSent || 0;
          bitrate += ((report.bytesSent || 0) * 8) / 1000; // kbps
        }
        if (report.type === "remote-inbound-rtp" && report.roundTripTime) {
          rttSum += report.roundTripTime;
          rttCount++;
        }
      });

      this.connectionStats = {
        rtt: rttCount ? rttSum / rttCount : 0,
        packetLoss: packetsSent ? (packetsLost / packetsSent) * 100 : 0,
        bitrate,
      };
    }, 2000);
  }

  getConnectionQuality(): "slow" | "normal" | "good" {
    const { rtt, packetLoss, bitrate } = this.connectionStats;

    if (rtt > 300 || packetLoss > 10 || bitrate < 20) return "slow";
    if (rtt > 150 || packetLoss > 3 || bitrate < 50) return "normal";
    return "good";
  }

  setClose() {
    if (this.socket) {
      this.isClose = true;
      this.socket.emit("call_end_client", {
        roomId: this.URL_ID,
      });
      this.disconnect();

      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  }

  setID(id: string | null) {
    this.URL_ID = id;
  }

  setLocalAudio(el: HTMLAudioElement | null) {
    this.localAudio = el;
  }

  setRemoteAudio(el: HTMLAudioElement | null) {
    this.remoteAudio = el;
  }

  connect() {
    if (this.socket && this.socket.connected) return;
    this.socket = io(process.env.REACT_APP_SERVER_URL, {
      auth: { userId: this.URL_ID, microphone: this.volume.microphone },
    });

    this.socket.on("connect", () => {
      this.my_id = this.socket?.id || null;
      console.log("Подключился, мой id:", this.my_id);

      this.socket?.emit("join", {
        roomId: this.URL_ID,
        microphone: this.volume.microphone,
      });
    });

    this.socket.on("userJoined", ({ userId, startCall }) => {
      console.log("Новый участник:", userId);
      this.startCall = startCall;
    });

    this.socket.on("userLeft", ({ userId }: { userId: string }) => {
      console.log("Пользователь вышел:", userId);
    });

    this.socket.on(
      "volume",
      ({ members }: { roomId: string; members: RoomMember[] }) => {
        this.members = [...members];
      }
    );
    this.socket.on("call_end_server", (data: { isClose: boolean }) => {
      if (data.isClose) {
        this.isClose = true;
        this.disconnect();
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    });
    this.socket.on(
      "roomInfo",
      ({
        members,
        startCall,
        emoji,
      }: {
        emoji: string[];
        startCall: Date;
        members: RoomMember[];
      }) => {
        console.log({
          members,
          startCall,
          emoji,
        });
        this.members = members;
        this.emoji = emoji;
        this.startCall = startCall;
      }
    );

    // Получаем offer от другого клиента
    this.socket.on("offer", async ({ offer, from }) => {
      if (!this.peerConnection) {
        await this.createPeerConnection();
      }
      await this.peerConnection?.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await this.peerConnection?.createAnswer();
      await this.peerConnection?.setLocalDescription(answer!);
      this.socket?.emit("answer", { answer, to: from });
    });

    // Получаем answer
    this.socket.on("answer", async ({ answer }) => {
      if (!this.peerConnection) return;
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    });

    // Получаем ICE-кандидаты
    this.socket.on("candidate", async ({ candidate }) => {
      if (!this.peerConnection) return;
      try {
        await this.peerConnection.addIceCandidate(candidate);
      } catch (err) {
        console.error("Ошибка при добавлении кандидата:", err);
      }
    });

    this.socket.on("error", () => {
      console.log("Error");
      this.disconnect();
      window.location.href = "/call/404";
    });

    this.socket.on("disconnect", (data) => {
      console.log(data, "при отключении");
      this.disconnect();
    });
  }

  handleChangeVolume = ({ type }: { type: "speaker" | "microphone" }) => {
    this.volume = { ...this.volume, [type]: !this.volume[type] };
    const audio = new Audio("/click.ogg");
    audio.play().catch(console.error);
    if (type === "microphone") {
      const stream = this.localAudio?.srcObject as MediaStream | null;
      if (stream) {
        stream.getAudioTracks().forEach((track) => {
          track.enabled = this.volume.microphone;
        });
      }

      if (this.socket && this.URL_ID) {
        this.socket.emit("volume", {
          roomId: this.URL_ID,
          userId: this.my_id,
          microphone: this.volume.microphone,
        });
      }
    }

    if (type === "speaker") {
      if (this.remoteAudio) {
        this.remoteAudio.muted = !this.volume.speaker;
      }
    }
  };

  async createPeerConnection() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:144.31.194.177:3478" },
        {
          urls: "turn:144.31.194.177:3478?transport=udp",
          username: "webrtc",
          credential: "webrtcpass",
        },
        {
          urls: "turn:144.31.194.177:3478?transport=tcp",
          username: "webrtc",
          credential: "webrtcpass",
        },
      ],
    });

    this.peerConnection.onicecandidate = (event: any) => {
      if (event.candidate) {
        this.socket?.emit("candidate", {
          candidate: event.candidate,
          roomId: this.URL_ID,
        });
      }
    };

    this.peerConnection.ontrack = (event: any) => {
      console.log("Пришёл удалённый поток:", event.streams[0]);
      if (this.remoteAudio) {
        this.remoteAudio.srcObject = event.streams[0];
        this.remoteAudio.play().catch(console.error);
      }
    };
  }

  async start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (this.localAudio) {
        this.localAudio.srcObject = stream;
        this.localAudio.muted = true;
        this.localAudio.play().catch(console.error);
      }
      this.handleChangeVolume({ type: "microphone" });
      await this.createPeerConnection();

      stream.getTracks().forEach((track) => {
        this.peerConnection?.addTrack(track, stream);
      });

      const offer = await this.peerConnection?.createOffer();
      await this.peerConnection?.setLocalDescription(offer!);

      this.socket?.emit("offer", {
        offer,
        roomId: this.URL_ID,
      });

      console.log("Отправлен offer:", offer);
    } catch (error) {
      console.error("Ошибка доступа к микрофону:", error);
    }
  }

  disconnect() {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketState = new SocketStore();
