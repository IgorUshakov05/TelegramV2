import { observer } from "mobx-react-lite";
import { modalState } from "../../store/modalStore";
import { ReactElement } from "react";
import CreateCallModal from "./CreateCall.modal";
import { XMarkIcon } from "@heroicons/react/24/solid";

function Modal(): ReactElement {
  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered w-100">
        <div className="modal-content p-3 w-100">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h5 className="fw-bold">{modalState.title}</h5>
            <button
              className="bg-white"
              onClick={() => modalState.setOpen(null, false, null)}
            >
              <XMarkIcon height={20} width={20} />
            </button>
          </div>
          {modalState.content === "share" && <CreateCallModal />}
        </div>
      </div>
    </div>
  );
}

export default observer(Modal);
