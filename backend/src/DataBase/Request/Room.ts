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
      return { success: true, room: findRoom.room };
    }

    findRoom.room = room;
    await findRoom.save();

    return { success: true, room: findRoom.room };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Ошибка сервера" };
  }
}
