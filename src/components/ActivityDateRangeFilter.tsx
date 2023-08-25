import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { IDateRange } from "../models/ISortOptions";
import { useAppDispatch } from "../store/store";
import { searchByDateRange } from "../store/features/activitySlice";

function ActivityDateRangeFilter() {
  const [dateRange, setDateRange] = useState<IDateRange>({
    firstDate: "",
    secondDate: "",
  });
  const [validated, setValidated] = useState(false);

  const dispatch = useAppDispatch();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const deadlineDate = new Date(value);
    setDateRange({ ...dateRange, [name]: deadlineDate.toISOString() });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(searchByDateRange(dateRange));
    } else {
      e.stopPropagation();
      alert("Por favor indique un rango de fechas.");
    }
    setValidated(true);
  };

  return (
    <>
      <Form
        className="filter-form d-flex"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Label className="form-date-range-label">
          Rango de fechas
        </Form.Label>

        <Form.Group className="m-2">
          <Form.Control
            required
            name="firstDate"
            type="date"
            placeholder="Fecha de vencimiento"
            onChange={handleDateChange}
          />
        </Form.Group>
        <Form.Group className="m-2">
          <Form.Control
            required
            name="secondDate"
            type="date"
            placeholder="Fecha de vencimiento"
            onChange={handleDateChange}
          />
        </Form.Group>
        <Button type="submit" className="btn btn-light m-2">
          Buscar
        </Button>
      </Form>
    </>
  );
}

export default ActivityDateRangeFilter;
