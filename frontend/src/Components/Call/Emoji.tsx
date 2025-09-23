import { observer } from "mobx-react-lite";
import { socketState } from "../../store/socket";
import ConnectStatus from "./ConnectStatus";
function Emoji() {
  return (
    <div>
      <div
        className="emoji"
        style={{ opacity: socketState.isClose ? "0.5" : "1" }}
      >
        {socketState.emoji.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
      {/* {socketState.members.length === 2 && (
        <ConnectStatus status={socketState.getConnectionQuality()} />
      )} */}
    </div>
  );
}
export default observer(Emoji);
