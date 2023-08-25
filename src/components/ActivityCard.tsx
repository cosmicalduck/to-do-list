import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IActivity, ActivityStatus } from "../models/IActivity";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDoneOutline, MdCancel } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";

import { useAppDispatch } from "../store/store";
import { deleteActivity, editActivity } from "../store/features/activitySlice";
import { assignCardClassName } from "../helpers/activityHelpers";
import dayjs from "dayjs";

function ActivityCard({
  id,
  name,
  description,
  status,
  creationDate,
  deadline,
}: IActivity) {
  const deadlineAsDate = new Date(deadline);
  const formattedDeadlineDate = dayjs(deadlineAsDate).format("DD/MM/YYYY");

  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedActivity: IActivity = {
      id: id,
      name: name,
      description: description,
      status: ActivityStatus.Done,
      creationDate: creationDate,
      deadline: deadline,
    };
    dispatch(editActivity(changedActivity));
    setChecked(true);
    e.currentTarget.disabled = true;
  };

  return (
    <Card className={assignCardClassName(status)}>
      <Card.Body>
        <div className="card-title-div">
          <Card.Title className="card-title">{name}</Card.Title>
          <Card.Subtitle>{formattedDeadlineDate}</Card.Subtitle>
        </div>
        <Container>
          <br />
          <Row>
            <Col>
              {status !== ActivityStatus.Done ? (
                <input
                  className="card-checkbox"
                  type="checkbox"
                  checked={checked}
                  onChange={handleCheckBoxChange}
                />
              ) : (
                <input
                  className="card-checkbox"
                  type="checkbox"
                  disabled={true}
                  checked={true}
                />
              )}
            </Col>
            <Col xs={9}>
              <Card.Text className="card-description">{description}</Card.Text>
            </Col>
            <Col>
              {status === ActivityStatus.Done ? (
                <MdDoneOutline size={35} />
              ) : status === ActivityStatus.Overdue ? (
                <MdCancel size={35} />
              ) : (
                <BiTimeFive size={35} />
              )}
            </Col>
          </Row>
          <br />
          <div className="card-links">
            <Button
              variant="danger"
              onClick={() => {
                dispatch(deleteActivity(id));
              }}
            >
              <AiFillDelete color="white" size={18} />
              Eliminar
            </Button>
            <Button variant="success">
              <Link className="link-edit" to={`/edit-activity/${id}`}>
                <AiFillEdit color="white" size={18} />
                Editar
              </Link>
            </Button>
          </div>
        </Container>
      </Card.Body>
    </Card>
  );
}

export default ActivityCard;
