import { observer } from "mobx-react-lite";
import { socketState } from "../../store/socket";
// import ConnectStatus from "./ConnectStatus";
import AddUserInCall from "./AddUserInCall";

function Emoji() {
  return (
    <div
      className="emoji-grid w-100"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr", // три колонки
        gap: "10px",
        alignItems: "center",
      }}
    >
      <div className="cal"></div>

      <div
        className="emoji cal m-auto"
        style={{ opacity: socketState.isClose ? "0.5" : "1" }}
      >
        {socketState.emoji.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>

      {/* если нужно вернуть индикатор качества */}
      {/* {socketState.members.length === 2 && (
        <ConnectStatus status={socketState.getConnectionQuality()} />
      )} */}
      {socketState.members.length <= 1 && <AddUserInCall />}
    </div>
  );
}

export default observer(Emoji);
