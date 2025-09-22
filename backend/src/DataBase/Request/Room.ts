import RoomModel from "../Schema/Room";

export async function SetIdRoomOrGet({
  ID,
  room,
}: {
  ID: string;
  room: string;
}) {
  try {
    const findRoom = await RoomModel.findById(ID);

    if (!findRoom) {
      return { success: false, message: "Комната не существует" };
    }

    if (findRoom.room) {
      return {
        success: true,
        room: findRoom,
      };
    }

    findRoom.room = room;
    await findRoom.save();

    return {
      success: true,
      room: findRoom,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Ошибка сервера" };
  }
}

export async function StartCall({ ID }: { ID: String }) {
  try {
    let room = await RoomModel.findById(ID);
    if (!room) {
      return { success: false, message: "Комната не найдена" };
    }
    if (room.startCall) {
      return { success: true, message: "Время уже есть" };
    }
    room.startCall = new Date();
    await room.save();

    return { success: true, startCall: room.startCall };
  } catch (error) {
    console.error("Ошибка при старте звонка:", error);
    return { success: false, error: error };
  }
}
