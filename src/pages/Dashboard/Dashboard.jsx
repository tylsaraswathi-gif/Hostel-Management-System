import "./Dashboard.css";
import Clock from "../../components/Clock/Clock";

function Dashboard() {
  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      {/* Live Clock */}
      <Clock />

      <div className="cards">

        <div className="card">
          <h2>250</h2>
          <p>Total Students</p>
        </div>

        <div className="card">
          <h2>100</h2>
          <p>Total Rooms</p>
        </div>

        <div className="card">
          <h2>75</h2>
          <p>Occupied Rooms</p>
        </div>

        <div className="card">
          <h2>25</h2>
          <p>Available Rooms</p>
        </div>

        <div className="card">
          <h2>15</h2>
          <p>Pending Complaints</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;