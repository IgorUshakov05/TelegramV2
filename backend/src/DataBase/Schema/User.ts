import { Schema, model, Document } from "mongoose";
import { IUser } from "../../types/UserSchema";

const UserSchema = new Schema<IUser & Document>({
  ip: { type: String, default: null },
  device: {
    type: { type: String, default: null },
    model: { type: String, default: null },
    vendor: { type: String, default: null },
  },
  os: {
    name: { type: String, default: null },
    version: { type: String, default: null },
  },
  browser: {
    name: { type: String, default: null },
    version: { type: String, default: null },
    major: { type: String, default: null },
    type: { type: String, default: null },
  },
});

const UserModel = model<IUser & Document>("User", UserSchema);

export default UserModel;
