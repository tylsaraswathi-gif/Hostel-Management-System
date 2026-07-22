import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Students from "./pages/Students/Students";
import StudentDetails from "./pages/StudentDetails/StudentDetails";
import EditStudent from "./pages/EditStudent/EditStudent";
import Complaints from "./pages/Complaints/Complaints";
import Rooms from "./pages/Rooms/Rooms";
import Fees from "./pages/Fees/Fees";
import Visitors from "./pages/Visitors/Visitors";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Main Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="students" element={<Students />} />
        <Route path="students/:id" element={<StudentDetails />} />
        <Route path="students/edit/:id" element={<EditStudent />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="fees" element={<Fees />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="visitors" element={<Visitors />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;