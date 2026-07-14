import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {

  return (
    <div className="sidebar">

      <h2>Hostel Management</h2>

      <Link to="/">
        Dashboard
      </Link>

      <Link to="/students">
        Students
      </Link>

      <Link to="/register">
        Register
      </Link>

      <Link to="/rooms">
        Rooms
      </Link>

      <Link to="/fees">
        Fees
      </Link>

      <Link to="/visitors">
        Visitors
      </Link>

      <Link to="/complaints">
        Complaints
      </Link>

      <Link to="/login">
        Login
      </Link>

    </div>
  );
}

export default Sidebar;