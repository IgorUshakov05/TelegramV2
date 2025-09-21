import { observer } from "mobx-react-lite";
import { socketState } from "../../store/socket";
import { MicrophoneIcon } from "@heroicons/react/24/solid";
import MiniSpinerLoader from "../Loader/miniloader";
import { useEffect } from "react";
import "./UserInfo.css"; // стили для keyframes

interface MicrophoneStatusProps {
  isOn: boolean;
  size?: number;
  colorOff?: string;
}

const MicrophoneStatus = ({
  isOn,
  size = 24,
  colorOff = "red",
}: MicrophoneStatusProps) => {
  if (isOn) return null;
  return <MicrophoneIcon width={size} height={size} color={colorOff} />;
};

interface MemberProps {
  memberId: string;
  microphone: boolean;
  isSelf?: boolean;
}

const Member = ({ memberId, microphone, isSelf }: MemberProps) => {
  if (isSelf) return null;

  return (
    <div key={memberId} className="member">
      <MicrophoneStatus isOn={microphone} />
    </div>
  );
};

const UserInfo = () => {
  useEffect(() => {
    socketState.connect(process.env.REACT_APP_SERVER_URL || "");
  }, []);

  const otherMembers = socketState.members.filter(
    (m) => m.userId !== socketState.my_id
  );

  const hasMicOff = otherMembers.some((m) => !m.microphone);

  return (
    <div className="userInfo">
      <div className={`user_icon ${hasMicOff ? "bubble-scale" : ""}`}>
        {otherMembers.length === 0 ? (
          <MiniSpinerLoader />
        ) : (
          otherMembers.map((member) => (
            <Member
              key={member.userId}
              memberId={member.userId}
              microphone={member.microphone}
              isSelf={member.userId === socketState.my_id}
            />
          ))
        )}
      </div>
      <span className="textr">Ваш собеседник</span>
    </div>
  );
};

export default observer(UserInfo);
