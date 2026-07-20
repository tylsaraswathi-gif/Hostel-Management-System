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

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await api.get(`/students/${id}`);

      const student = response.data.student;

      setStudentName(student.studentName);
      setEmail(student.email);
      setPhone(student.phone);
      setBranch(student.branch);
      setCGPA(student.cgpa);
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

    try {
      await api.put(`/students/${id}`, {
        studentName,
        email,
        phone,
        branch,
        cgpa,
      });

      alert("Student Updated Successfully");
      navigate("/students");
    } catch (error) {
      console.error(error);
      alert("Failed to update student");
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="edit-container">

      <h2>Edit Student</h2>

      <form onSubmit={updateStudent}>

        <input
          type="text"
          value={studentName}
          placeholder="Student Name"
          onChange={(e) => setStudentName(e.target.value)}
          required
        />

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          value={phone}
          placeholder="Phone"
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

        <input
          type="number"
          value={cgpa}
          placeholder="CGPA"
          step="0.01"
          min="0"
          max="10"
          onChange={(e) => setCGPA(e.target.value)}
          required
        />

        <button type="submit">
          Update Student
        </button>

      </form>

    </div>
  );
}

export default EditStudent;