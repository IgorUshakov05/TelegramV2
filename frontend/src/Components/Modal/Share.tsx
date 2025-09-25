import { ShareIcon, ClipboardIcon } from "@heroicons/react/24/solid";
import { observer } from "mobx-react-lite";
import { useState } from "react";

function AddUserInCall() {
  const [copied, setCopied] = useState(false);

  const onShare = () => {
    const shareData = {
      title: "HuntMeet",
      text: "Присоединяйся к моему звонку в HuntMeet!",
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="text-start">
      <p className="text-muted mb-3">
        Поделитесь ссылкой, чтобы пригласить других участников
      </p>

      <div className="input-group shadow-sm rounded overflow-hidden">
        <input
          type="text"
          className="form-control border-0 bg-light"
          value={window.location.href}
          readOnly
        />
        <button
          className="btn btn-primary d-flex align-items-center px-3"
          onClick={onShare}
        >
          {copied ? (
            <>
              <ClipboardIcon className="h-5 w-5 me-1" />
              Скопировано
            </>
          ) : (
            <>
              <ShareIcon className="h-5 w-5 me-1" />
              Поделиться
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default observer(AddUserInCall);
