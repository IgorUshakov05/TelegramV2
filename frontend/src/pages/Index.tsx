import React from "react";
import {
  PlusIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  BoltIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/solid";
import { modalState } from "../store/modalStore";
import { observer } from "mobx-react-lite";
import { useMutation } from "@tanstack/react-query";
import { CreateRoom } from "../Components/API/Create_Room";
import { linkStore } from "../store/linkStore";

function Index() {
  const { mutate } = useMutation({
    mutationKey: ["new_room"],
    mutationFn: () => CreateRoom(),
    onSuccess: (data) => {
      if (!data.success) {
        return alert(data.message);
      }
      modalState.setOpen("Создать звонок", true, "share_and_join");
      linkStore.setLink(data.room || "");
    },
  });

  return (
    <div className="container py-2">
      {/* Hero */}
      <div className="d-flex flex-column align-items-center text-center py-5">
        <h1 className="mb-3 fw-bold display-5">
          Быстрые аудиозвонки прямо в браузере
        </h1>
        <p className="mb-4 text-muted lead">
          Без установки приложений. Поделитесь ссылкой — и начните разговор.
        </p>

        <div className="d-flex flex-column flex-sm-row gap-3 inputConnect">
          <button
            style={{ fontSize: "17px" }}
            onClick={() => mutate()}
            className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2"
          >
            <PlusIcon width={22} height={22} />
            Создать звонок
          </button>

          <button
            style={{ fontSize: "17px" }}
            className="btn btn-outline-primary btn-lg d-flex align-items-center justify-content-center gap-2"
            onClick={() =>
              modalState.setOpen("Присоединиться", true, "join_room")
            }
          >
            <ArrowRightIcon width={22} height={22} />
            Присоединиться
          </button>
        </div>
      </div>

      {/* Преимущества */}
      <div className="row text-center g-4 mt-5">
        <div className="col-md-4">
          <ShieldCheckIcon
            width={40}
            height={40}
            className="text-primary mb-3"
          />
          <h5>Безопасно</h5>
          <p className="text-muted">
            Мы не храним ваши разговоры. Всё проходит напрямую.
          </p>
        </div>
        <div className="col-md-4">
          <BoltIcon width={40} height={40} className="text-primary mb-3" />
          <h5>Мгновенно</h5>
          <p className="text-muted">
            Создайте звонок за секунду и поделитесь ссылкой.
          </p>
        </div>
        <div className="col-md-4">
          <DevicePhoneMobileIcon
            width={40}
            height={40}
            className="text-primary mb-3"
          />
          <h5>На любом устройстве</h5>
          <p className="text-muted">
            Работает в браузере на телефоне и компьютере.
          </p>
        </div>
      </div>

      {/* Как работает */}
      <div className="text-center mt-5 mb-4">
        <h3 className="fw-bold mb-3">Как это работает</h3>
        <p className="text-muted">Просто 3 шага:</p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-4 mt-3">
          <div>
            <span className="fw-bold">1.</span> Нажмите «Создать звонок»
          </div>
          <div>
            <span className="fw-bold">2.</span> Отправьте ссылку другу
          </div>
          <div>
            <span className="fw-bold">3.</span> Начните разговор 🎧
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Index);
