import {
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
} from "@heroicons/react/24/solid";
import { linkStore } from "../../store/linkStore";
import { observer } from "mobx-react-lite";

function CreateCallModal() {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkStore.link);
    linkStore.setCopy(true);
  };

  const joinCallNow = () => {
    window.open(linkStore.link, "_blank");
  };

  return (
    <div className="text-start">
      <p className="text-muted mb-3">
        Отправьте ссылку друзьям, чтобы они могли присоединиться к звонку
      </p>

      <div className="input-group mb-3">
        <div className="form-control text-start">{linkStore.link}</div>
        <button
          className={`btn btn-primary rounded-end ${
            linkStore.isCopy ? "bg-success" : ""
          }`}
          onClick={copyToClipboard}
        >
          {linkStore.isCopy ? (
            <ClipboardDocumentCheckIcon width={20} height={20} />
          ) : (
            <ClipboardIcon width={20} height={20} />
          )}
        </button>
      </div>

      <button
        className="btn btn-outline-primary btn-lg w-100 w-sm-auto fs-6 mb-3"
        onClick={joinCallNow}
      >
        Присоединиться сейчас
      </button>

      <small className="text-muted d-block text-center">
        Ссылка действительна до окончания звонка
      </small>
    </div>
  );
}

export default observer(CreateCallModal);
