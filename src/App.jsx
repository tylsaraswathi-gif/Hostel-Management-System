import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Students from "./pages/Students/Students";
import StudentDetails from "./pages/StudentDetails/StudentDetails";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="student/:id" element={<StudentDetails />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;