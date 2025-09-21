import { ParticipantInfo } from "../../types/DeviceInfo";
import UserModel from "../Schema/User";
import RoomModel from "../Schema/Room";

export async function CreateUserAndRoom(user: ParticipantInfo, emoji?: string) {
  try {
    let existingUser = await UserModel.findOne({ ip: user.ip });
    if (!existingUser) {
      const newUser = new UserModel(user);
      await newUser.save();
      console.log("New user created:", newUser.id);
      existingUser = newUser;
    } else {
      console.log("User already exists:", existingUser.id);
    }

    const newRoom = new RoomModel({
      creator: existingUser._id,
      emoji: emoji || null,
    });
    await newRoom.save();
    console.log("New room created:", newRoom._id);

    return { user: existingUser, room: newRoom };
  } catch (error) {
    console.error("Error in CreateUserAndRoom:", error);
    throw error;
  }
}
