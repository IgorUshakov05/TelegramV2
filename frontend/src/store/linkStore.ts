import { makeAutoObservable } from "mobx";

export class LinkStore {
  link: string = `${process.env.REACT_APP_CLIENT_URL}`;
  isCopy: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  copyLink() {
    navigator.clipboard.writeText(this.link);
    this.isCopy = true;
  }
  setLink(newLink: string) {
    this.link = `${process.env.REACT_APP_CLIENT_URL}/call/${newLink}`;
  }
  setCopy(state: boolean) {
    this.isCopy = state;
  }
}

export const linkStore = new LinkStore();
