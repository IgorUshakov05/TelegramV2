import axios from "axios";
import { NewRoom } from "../../types/api.new_room";

export async function CreateRoom() {
  try {
    let response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/create_room`
    );
    const { room } = response.data as NewRoom;
    return { room, message: "Комната создана", success: true };
  } catch (error) {
    return { message: "Провал", success: false };
  }
}
