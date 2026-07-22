import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import "./EditStudent.css";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [cgpa, setCGPA] = useState("");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await api.get(`/students/${id}`);

      const student = response.data.student;

      // Supports both name and studentName
      setStudentName(student.name || student.studentName || "");
      setEmail(student.email || "");
      setPhone(student.phone || "");
      setBranch(student.branch || "");
      setCGPA(student.cgpa || "");
    } catch (error) {
      console.error(error);
      alert("Student not found");
      navigate("/students");
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (e) => {
    e.preventDefault();

    setUpdating(true);
    setSuccess(false);

    try {
      await api.put(`/students/${id}`, {
        name: studentName,
        email,
        phone,
        branch,
        cgpa,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/students");
      }, 1500);
    } catch (error) {
      console.error(error);
      alert("Failed to update student");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="edit-container">
      <h2>Edit Student</h2>

      {success && (
        <div className="success-message">
          ✅ Student Updated Successfully
        </div>
      )}

      <form onSubmit={updateStudent}>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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

       
        <button type="submit" disabled={updating}>
          {updating ? "Updating..." : "Update Student"}
        </button>
      </form>
    </div>
  );
}

export default EditStudent;