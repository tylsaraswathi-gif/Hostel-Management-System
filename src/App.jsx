import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Students from "./pages/Students/Students";
import Register from "./pages/Register/Register";
import Rooms from "./pages/Rooms/Rooms";
import Fees from "./pages/Fees/Fees";
import Visitors from "./pages/Visitors/Visitors";
import Complaints from "./pages/Complaints/Complaints";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="register" element={<Register />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="fees" element={<Fees />} />
          <Route path="visitors" element={<Visitors />} />
          <Route path="complaints" element={<Complaints />} />
        </Route>
      </Routes>
  
  );
}

export default App;