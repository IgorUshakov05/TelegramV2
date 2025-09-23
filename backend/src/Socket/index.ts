import { Server, Socket } from "socket.io";
import { SetIdRoomOrGet } from "../DataBase/Request/Room";
function RandomEmoji() {
  const emojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😜",
    "🤪",
    "😝",
    "🤑",
    "🤗",
    "🤭",
    "🤫",
    "🤔",
    "🤐",
    "🤨",
    "😐",
    "😑",
    "😶",
    "😏",
    "😒",
    "🙄",
    "😬",
    "🤥",
    "😌",
    "😔",
    "😪",
    "🤤",
    "😴",
    "😷",
    "🤒",
    "🤕",
    "🤢",
    "🤮",
    "🤧",
    "🥵",
    "🥶",
    "🥴",
    "😵",
    "🤯",
    "🤠",
    "🥳",
    "😎",
    "🤓",
    "🧐",
    "😕",
    "😟",
    "🙁",
    "☹️",
    "😮",
    "😯",
    "😲",
    "😳",
    "🥺",
    "😦",
    "😧",
    "😨",
    "😰",
    "😥",
    "😢",
    "😭",
    "😱",
    "😖",
    "😣",
    "😞",
    "😓",
    "😩",
    "😫",
    "🥱",
    "😤",
    "😡",
    "😠",
    "🤬",
    "😈",
    "👿",
    "💀",
    "☠️",
    "💩",
    "🤡",
    "👹",
    "👺",
    "👻",
    "👽",
    "👾",
    "🤖",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐽",
    "🐸",
    "🐵",
    "🙈",
    "🙉",
    "🙊",
    "🐒",
    "🦍",
    "🦧",
    "🐔",
    "🐧",
    "🐦",
    "🐤",
    "🐣",
    "🐥",
    "🦆",
    "🦅",
    "🦉",
    "🦇",
    "🐺",
    "🐗",
    "🐴",
    "🦄",
    "🐝",
    "🐛",
    "🦋",
    "🐌",
    "🐞",
    "🐜",
    "🪲",
    "🕷️",
    "🕸️",
    "🦂",
    "🐢",
    "🐍",
    "🦎",
    "🐙",
    "🦑",
    "🦐",
    "🦀",
    "🐡",
    "🐠",
    "🐟",
    "🐬",
    "🐳",
    "🐋",
    "🦈",
    "🐊",
    "🐅",
    "🐆",
    "🦓",
    "🦍",
    "🦧",
    "🐘",
    "🦛",
    "🦏",
    "🐪",
    "🐫",
    "🦙",
    "🦒",
    "🐃",
    "🐂",
    "🐄",
    "🐎",
    "🐖",
    "🐏",
    "🐑",
    "🦌",
    "🐐",
    "🐓",
    "🦃",
    "🕊️",
    "🐇",
    "🐁",
    "🐀",
    "🐿️",
    "🦔",
    "🍏",
    "🍎",
    "🍐",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🫐",
    "🍈",
    "🍒",
    "🍑",
    "🥭",
    "🍍",
    "🥥",
    "🥝",
    "🍅",
    "🍆",
    "🥑",
    "🥦",
    "🥬",
    "🥒",
    "🌶️",
    "🫑",
    "🌽",
    "🥕",
    "🫒",
    "🧄",
    "🧅",
    "🥔",
    "🍠",
    "🥐",
    "🥯",
    "🍞",
    "🥖",
    "🥨",
    "🥞",
    "🧇",
    "🧀",
    "🍖",
    "🍗",
    "🥩",
    "🥓",
    "🍔",
    "🍟",
    "🍕",
    "🌭",
    "🥪",
    "🌮",
    "🌯",
    "🫔",
    "🥗",
    "🥘",
    "🥫",
    "🍝",
    "🍜",
    "🍲",
    "🍛",
    "🍣",
    "🍱",
    "🥟",
    "🦪",
    "🍤",
    "🍙",
    "🍚",
    "🍘",
    "🥠",
    "🥮",
    "🍢",
    "🍡",
    "🍧",
    "🍨",
    "🍦",
    "🥧",
    "🍰",
    "🎂",
    "🍮",
    "🍭",
    "🍬",
    "🍫",
    "🍿",
    "🧋",
    "🧃",
    "🥤",
    "☕",
    "🍵",
    "🍶",
    "🍺",
    "🍻",
    "🥂",
    "🍷",
    "🥃",
    "🍸",
    "🍹",
    "🧉",
    "🍾",
    "🫖",
    "🪔",
    "🕯️",
    "💡",
    "🔦",
    "🏮",
    "🪞",
    "🛋️",
    "🪑",
    "🛏️",
    "🛌",
    "🪟",
    "🚪",
    "🪤",
    "🪑",
    "🛒",
    "🛍️",
    "🎁",
    "🎈",
    "🎏",
    "🎀",
    "🎊",
    "🎉",
  ];

  return Array.from(
    { length: 4 },
    () => emojis[Math.floor(Math.random() * emojis.length)]
  );
}

type RoomMember = {
  userId: string;
  microphone: boolean;
};

const rooms = new Map<
  string,
  { members: Map<string, RoomMember>; emoji: string[]; startCall: Date | null }
>();

const sockethandle = (io: Server, socket: Socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on(
    "join",
    async ({ roomId, microphone }: { roomId: string; microphone: boolean }) => {
      const getInBase = await SetIdRoomOrGet({ ID: roomId, room: roomId });

      if (!rooms.has(roomId)) {
        rooms.set(roomId, {
          members: new Map(),
          emoji: RandomEmoji(),
          startCall: null,
        });
      }

      const room = rooms.get(roomId)!;
      room.members.set(socket.id, { userId: socket.id, microphone });
      socket.join(roomId);

      // Устанавливаем startCall только если он ещё не был установлен
      if (!room.startCall && room.members.size === 2) {
        room.startCall = new Date();
      }

      socket.join(roomId);
      console.log(getInBase, " из бд");
      if (!getInBase.success) {
        return io.in(roomId).emit("error", { roomId });
      }
      console.log(`👤 ${socket.id} присоединился к комнате ${roomId}`);

      io.in(roomId).emit("roomInfo", {
        roomId,
        startCall: room.startCall,
        members: Array.from(room.members.values()),
        emoji: room.emoji,
      });

      socket.to(roomId).emit("userJoined", {
        userId: socket.id,
        startCall: room.startCall,
        roomId,
      });
    }
  );

  socket.on("call_end_client", ({ roomId }) => {
    socket.to(roomId).emit("call_end_server", {
      isClose: true,
    });
    rooms.delete(roomId);
  });

  // 📡 WebRTC сигналинг
  socket.on("offer", ({ offer, roomId }) => {
    console.log(`📨 Offer от ${socket.id} в комнату ${roomId}`);
    socket.to(roomId).emit("offer", { offer, from: socket.id });
  });

  socket.on("answer", ({ answer, to }) => {
    console.log(`📨 Answer от ${socket.id} для ${to}`);
    io.to(to).emit("answer", { answer, from: socket.id });
  });

  socket.on("candidate", ({ candidate, roomId }) => {
    console.log(`📨 Candidate от ${socket.id} в комнату ${roomId}`);
    socket.to(roomId).emit("candidate", { candidate, from: socket.id });
  });

  socket.on(
    "volume",
    ({
      roomId,
      userId,
      microphone,
    }: {
      roomId: string;
      userId: string;
      microphone: boolean;
    }) => {
      const room = rooms.get(roomId);
      if (!room) return;

      const member = room.members.get(userId);
      if (member) {
        member.microphone = microphone;
        room.members.set(userId, member);
      }

      io.in(roomId).emit("volume", {
        roomId,
        members: Array.from(room.members.values()),
      });
    }
  );

  socket.on("disconnect", () => {
    rooms.forEach((room, roomId) => {
      if (room.members.has(socket.id)) {
        room.members.delete(socket.id);
        console.log(`❌ ${socket.id} вышел из комнаты ${roomId}`);

        io.in(roomId).emit("roomInfo", {
          roomId,
          members: Array.from(room.members.values()),
          emoji: room.emoji,
        });

        socket.to(roomId).emit("userLeft", {
          userId: socket.id,
          roomId,
        });
      }

      if (room.members.size === 0) {
        rooms.delete(roomId);
        console.log(`🗑 Комната ${roomId} удалена`);
      }
    });
  });
};

export default sockethandle;
