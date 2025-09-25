import {
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
} from "@heroicons/react/24/solid";
import { linkStore } from "../../store/linkStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";

function JoinCallModal() {
  const [valueLink, setValueLink] = useState<string>("");
  const joinCallNow = () => {
    window.open(linkStore.link, "_blank");
  };

  return (
    <div className="text-start">
      <p className="text-muted mb-3">
        Отправьте ссылку друзьям, чтобы они могли присоединиться к звонку
      </p>

      <div>
        <input
          value={valueLink}
          onChange={(e) => {
            setValueLink(e.target.value);
          }}
          placeholder="Вставьте ссылку"
        />
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

export default observer(JoinCallModal);
