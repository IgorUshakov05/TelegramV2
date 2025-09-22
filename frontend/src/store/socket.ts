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

  constructor() {
    makeAutoObservable(this, { socket: false });
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

  connect(url: string) {
    if (this.socket && this.socket.connected) return;

    this.socket = io(url, {
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

    this.socket.on("userJoined", ({ userId }) => {
      console.log("Новый участник:", userId);
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

    this.socket.on(
      "roomInfo",
      ({
        roomId,
        members,
        startCall,
        emoji,
      }: {
        roomId: string;
        emoji: string[];
        startCall: Date;
        members: RoomMember[];
      }) => {
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
    this.peerConnection = new RTCPeerConnection();

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
