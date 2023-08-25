import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { IActivity, ActivityStatus } from "../models/IActivity";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editActivity, saveActivity } from "../store/features/activitySlice";
import dayjs from "dayjs";

function ActivityForm() {
  const [activity, setActivity] = useState<IActivity>({
    id: "",
    name: "",
    description: "",
    status: ActivityStatus.ToBeDone,
    creationDate: "",
    deadline: "",
  });

  const activities = useAppSelector((state) => state.activity.activities);

  const deadlineFormatted = dayjs(activity.deadline).format("YYYY-MM-DD");

  const [validated, setValidated] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const deadlineDate = new Date(value);
    setActivity({ ...activity, [name]: deadlineDate.toISOString() });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true && activity) {
      if (params.id) {
        dispatch(editActivity(activity));
      } else {
        dispatch(saveActivity(activity));
      }
    } else {
      e.stopPropagation();
      alert(
        "Por favor complete todos los campos para poder agregar una nueva tarea."
      );
    }
    setValidated(true);
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      const foundActivity = activities.find(
        (activity) => activity.id === params.id
      );
      if (foundActivity) {
        setActivity(foundActivity);
      }
    }
  }, [params, activities]);

  return (
    <div className="m-5">
      <h2>{params.id ? "Editar Actividad" : "Agregar nueva actividad"}</h2>

      <div className="d-grid justify-content-center m-5">
        <Form
          className="activiy-form"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group className="m-2">
            <Form.Label>Nombre de la actividad</Form.Label>
            <Form.Control
              required
              name="name"
              defaultValue={activity.name}
              type="text"
              placeholder="Ingrese el nombre de la actividad"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingrese un nombre para la actividad.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="m-2">
            <Form.Label>Descripción de la actividad</Form.Label>
            <Form.Control
              required
              name="description"
              as="textarea"
              defaultValue={activity.description}
              rows={3}
              placeholder="Ingrese una descripción para la actividad"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingrese una descripción para la actividad.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="m-2">
            <Form.Label>Fecha de vencimiento</Form.Label>
            <Form.Control
              required
              name="deadline"
              // defaultValue={deadlineFormatted}
              value={deadlineFormatted}
              type="date"
              placeholder="Fecha de vencimiento"
              onChange={handleDateChange}
            />
            <Form.Control.Feedback type="invalid">
              Por favor ingrese una fecha de vencimiento.
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="btn btn-light m-2">
            {params.id ? "Editar actividad" : "Agregar actividad"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ActivityForm;
