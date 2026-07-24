import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";

// Authentication
import Login from "./pages/Login/Login";
import AuthRegister from "./pages/AuthRegister/AuthRegister";

// Student Module
import Register from "./pages/Register/Register";
import Students from "./pages/Students/Students";
import StudentDetails from "./pages/StudentDetails/StudentDetails";
import EditStudent from "./pages/EditStudent/EditStudent";

// Other Modules
import Complaints from "./pages/Complaints/Complaints";
import Rooms from "./pages/Rooms/Rooms";
import Fees from "./pages/Fees/Fees";
import Visitors from "./pages/Visitors/Visitors";

import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/auth-login" element={<Login />} />
      <Route path="/auth-register" element={<AuthRegister />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="students" element={<Students />} />
        <Route path="students/:id" element={<StudentDetails />} />
        <Route path="students/edit/:id" element={<EditStudent />} />

        <Route path="complaints" element={<Complaints />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="fees" element={<Fees />} />
        <Route path="visitors" element={<Visitors />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;