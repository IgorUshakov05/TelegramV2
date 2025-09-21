import { ParticipantInfo } from "./DeviceInfo";
import { Document } from "mongoose";

export interface IUser extends ParticipantInfo, Document {
  ip: string;
}
