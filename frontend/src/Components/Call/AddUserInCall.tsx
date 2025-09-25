import { UserPlusIcon } from "@heroicons/react/24/solid";
import { modalState } from "../../store/modalStore";

export default function AddUserInCall() {
  return (
    <button
      onClick={() => modalState.setOpen("Пригласить в звонок", true, "share")}
      style={{
        marginLeft: "auto",
        background: "none",
      }}
    >
      <UserPlusIcon width={30} height={30} color="white" />
    </button>
  );
}
