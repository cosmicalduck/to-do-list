import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { useAppDispatch, useAppSelector } from "../store/store";
import ActivityCard from "./ActivityCard";
import { fetchActivity } from "../store/features/activitySlice";
import { getSortedActivities } from "../helpers/activityHelpers";

function ActivityList() {
  const dispatch = useAppDispatch();
  const selectedActivities = useAppSelector((state) => state.activity);
  const sortBy = useAppSelector((state) => state.sort.sortBy);

  const activities = getSortedActivities(
    sortBy,
    selectedActivities.filteredActivities
  );

  useEffect(() => {
    dispatch(fetchActivity());
  }, [dispatch]);

  if (selectedActivities.loading)
    return (
      <center>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando..</span>
        </Spinner>
      </center>
    );
  else if (selectedActivities.error)
    return <center>Error: {selectedActivities.error}</center>;

  return (
    <Container className="activities-container">
      {activities.map((activity) => {
        return (
          <ActivityCard
            key={activity.id}
            id={activity.id}
            name={activity.name}
            description={activity.description}
            status={activity.status}
            creationDate={activity.creationDate}
            deadline={activity.deadline}
          />
        );
      })}
    </Container>
  );
}

export default ActivityList;
