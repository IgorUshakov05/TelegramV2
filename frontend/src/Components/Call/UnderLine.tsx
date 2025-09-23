import { useEffect, useState } from "react";
import { socketState } from "../../store/socket";
import { observer } from "mobx-react-lite";

function Underline({ otherMembers }: { otherMembers: any }) {
  const [duration, setDuration] = useState("Секунду...");

  useEffect(() => {
    if (!socketState.startCall) return;

    const startTimestamp =
      socketState.startCall instanceof Date
        ? socketState.startCall.getTime()
        : new Date(socketState.startCall).getTime();

    const interval = setInterval(() => {
      const diff = Date.now() - startTimestamp;
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setDuration(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [socketState.startCall]); // <-- ключевая зависимость

  return (
    <span className="textr">
      {socketState.isClose
        ? "Вызов завершен"
        : !otherMembers[0]?.userId || !socketState.startCall
        ? "Ожидание собеседника"
        : duration}
    </span>
  );
}

export default observer(Underline);
