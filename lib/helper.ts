import { Item, Status } from "@/types/types";

export const storeData = (status: Status, list: Item[]) => {
  localStorage.setItem(status, JSON.stringify(list));
};

export const getData = (status: Status) => {
  return JSON.parse(localStorage.getItem(status) || "[]");
};
