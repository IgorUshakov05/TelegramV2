import { Schema, model } from "mongoose";
import { Room } from "../../types/Room";

const RoomSchema = new Schema<Room>({
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now() },
  room: { type: String, default: null },
  emoji: { type: String, default: null },
});

const RoomModel = model<Room>("Room", RoomSchema);

export default RoomModel;
