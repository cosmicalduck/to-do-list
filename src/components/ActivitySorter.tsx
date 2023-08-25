import Dropdown from "react-bootstrap/Dropdown";
import { useAppDispatch } from "../store/store";
import { SortOptionsEnum } from "../models/ISortOptions";
import { sortByChanged } from "../store/features/sortSlice";
import { assingSortEnum } from "../helpers/sortHelpers";

function ActivitySorter() {
  const dispatch = useAppDispatch();

  const handleChange = (eventKey: string) => {
    const sortBy = assingSortEnum(eventKey);
    dispatch(sortByChanged(sortBy));
  };
  return (
    <div>
      <Dropdown onSelect={(eventKey: string) => handleChange(eventKey)}>
        <Dropdown.Toggle className="dropdown">
          Ordenar actividades
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey={SortOptionsEnum.CreationDate}>
            Según fecha de creación
          </Dropdown.Item>
          <Dropdown.Item eventKey={SortOptionsEnum.Deadline}>
            Según fecha de vencimiento
          </Dropdown.Item>
          <Dropdown.Item eventKey={SortOptionsEnum.Status}>
            Según estado de la actividad
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default ActivitySorter;
