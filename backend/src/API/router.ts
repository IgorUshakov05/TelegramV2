import { Router, Request, Response } from "express";
import { UAParser } from "ua-parser-js";
import { CreateUserAndRoom } from "../DataBase/Request/User";
import { ParticipantInfo } from "../types/DeviceInfo";
import requestIp from "request-ip";

const router = Router();

router.post("/create_room", async (req: Request, res: Response) => {
  const ua = new UAParser(req.headers["user-agent"]);
  const ip = requestIp.getClientIp(req);

  const participant: ParticipantInfo = {
    device: ua.getDevice(),
    os: ua.getOS(),
    browser: ua.getBrowser(),
    ip: ip || undefined,
  };

  const user = await CreateUserAndRoom(participant);

  res.json({ message: "Participant info saved", room: user.room.id });
});

export default router;
