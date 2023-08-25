import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { filterStatus } from "../store/features/activitySlice";
import { ActivityStatus } from "../models/IActivity";
import { filterStatusPayload } from "../models/ISortOptions";

function ActivityStatusFilter() {
  const [checkedDone, setCheckedDone] = useState(true);
  const [checkedToDo, setCheckedToDo] = useState(true);
  const [checkedOnBrink, setCheckedOnBrink] = useState(true);
  const [checkedOverdue, setCheckedOverdue] = useState(true);

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    switch (name) {
      case "doneCheck": {
        setCheckedDone(!checkedDone);
        const payload: filterStatusPayload = {
          status: ActivityStatus.Done,
          checked: checkedDone,
        };
        dispatch(filterStatus(payload));

        break;
      }
      case "toDoCheck": {
        setCheckedToDo(!checkedToDo);
        const payload: filterStatusPayload = {
          status: ActivityStatus.ToBeDone,
          checked: checkedToDo,
        };
        dispatch(filterStatus(payload));
        break;
      }
      case "onBrinkCheck": {
        setCheckedOnBrink(!checkedOnBrink);
        const payload: filterStatusPayload = {
          status: ActivityStatus.OnTheBrink,
          checked: checkedOnBrink,
        };
        dispatch(filterStatus(payload));
        break;
      }
      case "overdueCheck": {
        setCheckedOverdue(!checkedOverdue);
        const payload: filterStatusPayload = {
          status: ActivityStatus.Overdue,
          checked: checkedOverdue,
        };
        dispatch(filterStatus(payload));
        break;
      }
      default: {
        setCheckedDone(!checkedDone);
        break;
      }
    }
  };

  return (
    <div className="d-flex">
      <div>
        <input
          className="me-2 checkbox-filter"
          type="checkbox"
          id="doneCheck"
          name="doneCheck"
          checked={checkedDone}
          onChange={handleChange}
        />
        <label className="me-2" htmlFor="doneCheck">
          Hechas
        </label>
      </div>
      <div>
        <input
          className="me-2 checkbox-filter"
          type="checkbox"
          id="toDoCheck"
          name="toDoCheck"
          checked={checkedToDo}
          onChange={handleChange}
        />
        <label className="me-2" htmlFor="toDoCheck">
          Por hacer
        </label>
      </div>
      <div>
        <input
          className="me-2 checkbox-filter"
          type="checkbox"
          id="onBrinkCheck"
          name="onBrinkCheck"
          checked={checkedOnBrink}
          onChange={handleChange}
        />
        <label className="me-2" htmlFor="onBrinkCheck">
          A punto de vencer
        </label>
      </div>
      <div>
        <input
          className="me-2 checkbox-filter"
          type="checkbox"
          id="overdueCheck"
          name="overdueCheck"
          checked={checkedOverdue}
          onChange={handleChange}
        />
        <label className="me-2" htmlFor="overdueCheck">
          Vencidas
        </label>
      </div>
    </div>
  );
}

export default ActivityStatusFilter;
