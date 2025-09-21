import { observer } from "mobx-react-lite";
import { socketState } from "../../store/socket";
function Emoji() {
  return (
    <div className="emoji">
      {socketState.emoji.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </div>
  );
}
export default observer(Emoji);
