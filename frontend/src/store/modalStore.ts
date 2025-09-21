import { makeAutoObservable } from "mobx";

class ModalStore {
  isOpen = false;
  content: string | null = null;
  title: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setOpen(
    title: string | null,
    state: boolean,
    children: string | null = null
  ) {
    this.title = title;
    this.isOpen = state;
    this.content = children;
  }
}

export const modalState = new ModalStore();
