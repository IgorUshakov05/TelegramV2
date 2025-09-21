import {
  MicrophoneIcon,
  PhoneXMarkIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";
import { socketState } from "../../store/socket";
import { observer } from "mobx-react-lite";
function CallSetting() {
  const handleDisconnect = () => {
    socketState.disconnect();
  };
  return (
    <div className="callPanel">
      <div className="d-flex align-items-center flex-column justify-content-between gap-1">
        <button
          onClick={() => socketState.handleChangeVolume({ type: "speaker" })}
          className={`buttonChange ${
            !socketState.volume.speaker && "bg-white"
          }`}
        >
          {socketState.volume.speaker ? (
            <SpeakerWaveIcon
              width={30}
              height={30}
              color={!socketState.volume.speaker ? "#D9D9D9" : "#FFFFFF"}
            />
          ) : (
            <SpeakerXMarkIcon
              width={30}
              height={30}
              color={!socketState.volume.speaker ? "#D9D9D9" : "#FFFFFF"}
            />
          )}
        </button>
        <span className="text-white small">Динамик</span>
      </div>
      <div className="d-flex align-items-center flex-column justify-content-between gap-1">
        <button
          onClick={() => socketState.handleChangeVolume({ type: "microphone" })}
          className={`buttonChange ${!socketState.volume.microphone && "bg-white"}`}
        >
          <MicrophoneIcon
            width={30}
            height={30}
            color={!socketState.volume.microphone ? "#D9D9D9" : "#FFFFFF"}
          />
        </button>
        <span className="text-white small">Микрофон</span>
      </div>
      <div className="d-flex align-items-center flex-column justify-content-between gap-1 ">
        <button className="buttonChange bg-danger bg-gradient">
          <PhoneXMarkIcon width={30} height={30} color="white" />
        </button>
        <span className="text-white small" onClick={handleDisconnect}>
          Завершить
        </span>
      </div>
    </div>
  );
}

export default observer(CallSetting);
