import { ActivityStatus } from "./IActivity";

export enum SortOptionsEnum {
  CreationDate,
  Deadline,
  Status,
}

export interface IDateRange {
  firstDate: string;
  secondDate: string;
}

export interface SortOptions {
  sortBy?: SortOptionsEnum;
}

export interface filterStatusPayload {
  status: ActivityStatus;
  checked: boolean;
}
