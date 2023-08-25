export enum ActivityStatus {
  Done,
  ToBeDone,
  OnTheBrink,
  Overdue,
}

export interface IActivity {
  id: string;
  name: string;
  description: string;
  status: ActivityStatus;
  creationDate: string;
  deadline: string;
}
