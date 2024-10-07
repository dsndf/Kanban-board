export type Status = "todo" | "in-progress" | "complete";

export interface Item {
  id: string;
  title: string;
  status: Status;
}