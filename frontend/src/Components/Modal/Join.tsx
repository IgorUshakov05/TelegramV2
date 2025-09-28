import { observer } from "mobx-react-lite";
import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

function JoinCallModal() {
  const [valueLink, setValueLink] = useState<string>("");

  const joinCallNow = () => {
    if (!valueLink.trim()) return alert("Введите ссылку на звонок");
    window.open(valueLink.trim(), "_blank");
  };

  return (
    <div className="text-start">
      <p className="text-muted mb-4">
        Чтобы начать разговор, есть два варианта:
      </p>

      <ol className="mb-4 ps-3">
        <li className="mb-2">
          <strong>Создайте звонок</strong> на главной странице и отправьте
          ссылку друзьям.
        </li>
        <li>
          <strong>Присоединитесь</strong>, если у вас уже есть ссылка на звонок.
        </li>
      </ol>

      <div className="input-group mb-3">
        <input
          value={valueLink}
          onChange={(e) => setValueLink(e.target.value)}
          placeholder="Вставьте ссылку на звонок"
          className="form-control"
        />
        {valueLink
          .trim()
          .startsWith(process.env.REACT_APP_CLIENT_URL || "") && (
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2"
            onClick={joinCallNow}
          >
            <ArrowRightIcon width={18} height={18} />
            Войти
          </button>
        )}
      </div>

      <small className="text-muted d-block text-center">
        Ссылка действительна до окончания звонка
      </small>
    </div>
  );
}

export default observer(JoinCallModal);
