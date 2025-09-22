import { useEffect, useState } from "react";
import { socketState } from "../../store/socket";
export default function Underline({ otherMembers }: { otherMembers: any }) {
  const [duration, setDuration] = useState("00:00");

  useEffect(() => {
    if (!socketState.startCall) return;

    // const interval = setInterval(() => {
    //   if (socketState.startCall) {
    //     const startTimestamp = socketState.startCall.getTime();

    //     const diff = Date.now() - startTimestamp;
    //     const minutes = Math.floor(diff / 60000);
    //     const seconds = Math.floor((diff % 60000) / 1000);
    //     setDuration(
    //       `${minutes.toString().padStart(2, "0")}:${seconds
    //         .toString()
    //         .padStart(2, "0")}`
    //     );
    //   }
    // }, 1000);

    // return () => clearInterval(interval);
  }, [socketState.startCall]);

  return (
    <span className="textr">
      {!otherMembers[0]?.userId || !socketState.startCall
        ? "Ожидание собеседника"
        : duration}
    </span>
  );
}
