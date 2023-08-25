import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/store";
import { searchByDescription } from "../store/features/activitySlice";

function ActivityFilter() {
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  useEffect(() => {
    dispatch(searchByDescription(searchTerm));
  }, [searchTerm, dispatch]);

  return (
    <input
      className="form-control w-25 mr-2"
      name="filter"
      type="text"
      placeholder="Filtrar por nombre"
      onChange={handleFilterChange}
    />
  );
}

export default ActivityFilter;
