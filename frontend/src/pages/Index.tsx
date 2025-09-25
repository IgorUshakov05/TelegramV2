import React from "react";
import { PlusIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
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
      console.log("Комната создана:", data);
      linkStore.setLink(data.room || "");
    },
  });
  return (
    <div className="container h-100 d-flex flex-column justify-content-center align-items-center text-center px-3">
      <h1 className="mb-4 fw-light">Добро пожаловать в АудиоЧат</h1>
      <p className="mb-5 text-muted fw-light">
        Создайте новый звонок или присоединитесь к существующему
      </p>

      <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center inputConnect">
        <button
          style={{ fontSize: "17px" }}
          onClick={() => mutate()}
          className="btn btn-primary btn-lg w-100 w-sm-auto d-flex align-items-center justify-content-center gap-2"
        >
          <PlusIcon width={20} height={20} className="d-none d-sm-inline" />
          Создать
        </button>

        <button
          style={{ fontSize: "17px" }}
          className="btn btn-outline-primary btn-lg w-100 w-sm-auto d-flex align-items-center justify-content-center gap-2"
        >
          <ArrowRightIcon
            width={20}
            height={20}
            className="d-none d-sm-inline"
          />
          Присоединиться
        </button>
      </div>
    </div>
  );
}

export default observer(Index);
