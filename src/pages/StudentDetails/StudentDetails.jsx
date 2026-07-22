import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import "./StudentDetails.css";

function StudentDetails() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudent();
  }, []);

  const getStudent = async () => {
    try {
      const response = await api.get(`/students/${id}`);

      // Handles both { student: {} } and direct object response
      setStudent(response.data.student || response.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (!student) {
    return <h2 className="error">Student Not Found</h2>;
  }

  return (
    <div className="student-details-container">
      <h2>Student Details</h2>

      <div className="student-card">

        <img
          src={
            student.image
              ? `http://localhost:5000/uploads/${student.image}`
              : "https://via.placeholder.com/150"
          }
          alt={student.studentName}
          className="student-image"
        />

        <p>
          <strong>Name:</strong> {student.studentName}
        </p>

        <p>
          <strong>Email:</strong> {student.email}
        </p>

        <p>
          <strong>Phone:</strong> {student.phone}
        </p>

        <p>
          <strong>Branch:</strong> {student.branch}
        </p>

        <p>
          <strong>CGPA:</strong> {student.cgpa}
        </p>

      </div>

      <div className="student-actions">
        <Link to="/students" className="back-btn">
          Back
        </Link>

        <Link
          to={`/students/edit/${student._id}`}
          className="edit-btn"
        >
          Edit
        </Link>
      </div>
    </div>
  );
}

export default StudentDetails;