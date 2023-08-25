import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ActivityForm from "./components/ActivityForm";
import ActivitiesPage from "./pages/ActivitiesPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ActivitiesPage />} />
          <Route path="/create-activity" element={<ActivityForm />} />
          <Route path="/edit-activity/:id" element={<ActivityForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
