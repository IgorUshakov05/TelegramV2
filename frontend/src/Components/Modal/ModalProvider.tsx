import { observer } from "mobx-react-lite";
import { modalState } from "../../store/modalStore";
import Modal from "./ModalContainer";

const ModalProvider = observer(() => {
  return modalState.isOpen && modalState.content ? <Modal /> : null;
});

export default ModalProvider;
