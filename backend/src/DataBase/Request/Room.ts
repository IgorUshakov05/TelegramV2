import RoomModel from "../Schema/Room";

export async function SetIdRoomOrGet({
  ID,
  room,
}: {
  ID: string;
  room: string;
}) {
  try {
    console.log(ID);
    const findRoom = await RoomModel.findById(ID);

    console.log(findRoom);

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

export async function RemoveRoom({ roomId }: { roomId: string }) {
  try {
    const removeRoom = await RoomModel.findOneAndDelete({ _id: roomId });

    if (!removeRoom) {
      console.log(`Комната с id=${roomId} не найдена`);
      return null;
    }

    console.log("Комната удалена:", removeRoom);
    return removeRoom;
  } catch (error) {
    console.error("Ошибка при удалении комнаты:", error);
    throw error;
  }
}
