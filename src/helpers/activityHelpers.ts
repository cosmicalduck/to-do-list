import { IActivity, ActivityStatus } from "../models/IActivity";
import { SortOptionsEnum } from "../models/ISortOptions";

export function sortByCreationDate(activityArray: IActivity[]) {
  const auxArray = [...activityArray];
  const sortedArray = auxArray.sort((a1, a2) =>
    a1.creationDate > a2.creationDate
      ? -1
      : a1.creationDate < a2.creationDate
      ? 1
      : 0
  );
  return sortedArray;
}

export function sortByDeadline(activityArray: IActivity[]) {
  const auxArray = [...activityArray];
  const sortedArray = auxArray.sort((a1, a2) =>
    a1.deadline < a2.deadline ? -1 : a1.deadline < a2.deadline ? 1 : 0
  );
  return sortedArray;
}

export function determineStatus(activity: IActivity) {
  const auxDate = new Date();
  const todayDate = auxDate.getTime();
  const deadline = new Date(activity.deadline).getTime();

  const diff = todayDate - deadline;
  if (diff === -86400000) {
    activity.status = ActivityStatus.OnTheBrink;
  } else if (diff >= 0) {
    //la tarea ya vencio
    activity.status = ActivityStatus.Overdue;
  } else {
    //la tarea aun puede ser hecha
    activity.status = ActivityStatus.ToBeDone;
  }
}

export function sortByStatus(activityArray: IActivity[]) {
  const auxArray = [...activityArray];
  const statusOrder = Object.values(ActivityStatus);

  const sorterdArray = auxArray.sort(
    (a1, a2) => statusOrder.indexOf(a2.status) - statusOrder.indexOf(a1.status)
  );

  return sorterdArray;
}

export function assignCardClassName(aStatus: ActivityStatus) {
  switch (aStatus) {
    case ActivityStatus.Done: {
      return "activity-card m-2 done";
    }
    case ActivityStatus.OnTheBrink: {
      return "activity-card m-2 close-to-deadline";
    }
    case ActivityStatus.Overdue: {
      return "activity-card m-2 past-deadline";
    }
    default: {
      return "activity-card m-2";
    }
  }
}

export function getSortedActivities(
  sortBy: SortOptionsEnum,
  originalActivities: IActivity[]
) {
  switch (sortBy) {
    case SortOptionsEnum.CreationDate: {
      return sortByCreationDate(originalActivities);
    }
    case SortOptionsEnum.Deadline: {
      return sortByDeadline(originalActivities);
    }
    case SortOptionsEnum.Status: {
      return sortByStatus(originalActivities);
    }
    default: {
      return sortByCreationDate(originalActivities);
    }
  }
}
