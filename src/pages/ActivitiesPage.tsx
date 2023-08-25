import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ActivityFilter from "../components/ActivityNameFilter";
import ActivityList from "../components/ActivityList";
import ActivitySorter from "../components/ActivitySorter";
import ActivityDateRangeFilter from "../components/ActivityDateRangeFilter";
import dayjs from "dayjs";
import ActivityStatusFilter from "../components/ActivityStatusFilter";

function ActivitiesPage() {
  const todayDate = new Date();
  return (
    <>
      <div className="d-flex justify-content-between  m-5">
        <h3>Cosas por hacer</h3>
        <h5>{dayjs(todayDate).format("DD/MM/YYYY")}</h5>
      </div>
      <Button className="btn-light m-2 add-activity">
        <Link className="link-create-activity" to="/create-activity">
          Agregar nueva actividad
        </Link>
      </Button>
      <div className="d-flex justify-content-evenly   m-5">
        <ActivityFilter />
        <ActivitySorter />
        <ActivityStatusFilter />
      </div>
      <div className="d-flex justify-content-evenly m-5">
        <ActivityDateRangeFilter />
      </div>
      <ActivityList />
    </>
  );
}

export default ActivitiesPage;
