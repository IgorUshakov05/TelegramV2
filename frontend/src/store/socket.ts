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
  my_id: string | null = null;
  volume = { speaker: true, microphone: true };

  constructor() {
    makeAutoObservable(this, { socket: false });
  }

  setID(id: string | null) {
    this.URL_ID = id;
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
      ({ roomId, members }: { roomId: string; members: RoomMember[] }) => {
        console.log("Отключили микрофон:", { roomId, members });
        this.members = [...members];
      }
    );

    this.socket.on(
      "roomInfo",
      ({
        roomId,
        members,
        emoji,
      }: {
        roomId: string;
        emoji: string[];
        members: RoomMember[];
      }) => {
        this.members = members;
        this.emoji = emoji;
      }
    );

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
    if (type === "microphone" && this.socket && this.URL_ID) {
      this.socket.emit("volume", {
        roomId: this.URL_ID,
        userId: this.my_id,
        microphone: this.volume.microphone,
      });
    }
  };

  toggleMicrophone() {
    this.volume.microphone = !this.volume.microphone;

    if (this.socket && this.URL_ID) {
      this.socket.emit("volume", {
        roomId: this.URL_ID,
        userId: this.my_id,
        microphone: this.volume.microphone,
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketState = new SocketStore();
