import { Server, Socket } from "socket.io";
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

  return [
    emojis[Math.floor(Math.random() * emojis.length)],
    emojis[Math.floor(Math.random() * emojis.length)],
    emojis[Math.floor(Math.random() * emojis.length)],
    emojis[Math.floor(Math.random() * emojis.length)],
  ];
}

type RoomMember = {
  userId: string;
  microphone: boolean;
};

const rooms = new Map<string, { members: Set<RoomMember>; emoji: string[] }>();

const sockethandle = (io: Server, socket: Socket) => {
  console.log("User connected:", socket.id);
  console.log("Auth data:", socket.handshake.auth);

  socket.on(
    "join",
    ({ roomId, microphone }: { roomId: string; microphone: boolean }) => {
      // Если комнаты нет — создаём с эмодзи
      if (!rooms.has(roomId)) {
        rooms.set(roomId, { members: new Set(), emoji: RandomEmoji() });
      }

      const room = rooms.get(roomId)!;
      room.members.add({ userId: socket.id, microphone });

      socket.join(roomId);

      console.log(`✅ ${socket.id} присоединился к комнате ${roomId}`);
      console.log("Текущие участники:", [...room.members]);

      // Отправляем ВСЕМ актуальные данные комнаты
      io.in(roomId).emit("roomInfo", {
        roomId,
        members: [...room.members],
        emoji: room.emoji, // эмодзи комнаты
      });

      socket.to(roomId).emit("userJoined", {
        userId: socket.id,
        roomId,
      });
    }
  );

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

      const member = [...room.members].find((m) => m.userId === userId);
      if (member) member.microphone = microphone;

      io.in(roomId).emit("volume", {
        roomId,
        members: [...room.members],
      });
    }
  );

  socket.on("disconnect", () => {
    rooms.forEach((room, roomId) => {
      const member = [...room.members].find((m) => m.userId === socket.id);
      if (member) {
        room.members.delete(member);
        console.log(`❌ ${socket.id} вышел из комнаты ${roomId}`);

        io.in(roomId).emit("roomInfo", {
          roomId,
          members: [...room.members],
          emoji: room.emoji,
        });
        socket.to(roomId).emit("userLeft", {
          userId: socket.id,
          roomId,
        });
      }

      if (room.members.size === 0) {
        rooms.delete(roomId);
        console.log(`Комната ${roomId} пуста, удаляем её`);
      }
    });
  });
};

export default sockethandle;
