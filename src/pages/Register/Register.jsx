import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [roomNo, setRoomNo] = useState("");


  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
       const response = await api.post("/students", {
            name: studentName,
            email,
            phone,
            branch,
            roomNo,
});

      alert(response.data.message);

      setStudentName("");
      setEmail("");
      setPhone("");
      setBranch("");
      setRoomNo("");
    

      navigate("/students");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Student Registration</h2>

        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          pattern="[0-9]{10}"
          required
        />

        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
        >
          <option value="">Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="CSM">CSM</option>
          <option value="CSE-AI">CSE-AI</option>
          <option value="CIVIL">CIVIL</option>
          <option value="DS">DS</option>
        </select>

        <input
          type="text"
          placeholder="Room Number"
          value={roomNo}
          onChange={(e) => setRoomNo(e.target.value)}
          required
        />

        

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register Student"}
        </button>

        <p className="login-link">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;