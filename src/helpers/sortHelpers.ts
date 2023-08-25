import { SortOptionsEnum } from "../models/ISortOptions";

export function assingSortEnum(sorter: string): SortOptionsEnum {
  const enumNum = parseInt(sorter);
  switch (enumNum) {
    case 0: {
      return SortOptionsEnum.CreationDate;
    }
    case 1: {
      return SortOptionsEnum.Deadline;
    }
    case 2: {
      return SortOptionsEnum.Status;
    }
    default: {
      return SortOptionsEnum.CreationDate;
    }
  }
}
