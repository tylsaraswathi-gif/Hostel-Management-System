import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Students.css";

function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students")) || []
  );

  const deleteStudent = (id) => {
    const updatedStudents = students.filter(
      (student) => student.id !== id
    );

    setStudents(updatedStudents);

    localStorage.setItem(
      "students",
      JSON.stringify(updatedStudents)
    );

    alert("Student deleted successfully");
  };

  const editStudent = (id) => {
    navigate(`/register/${id}`);
  };

  return (
    <div>
      <h1>Student Management</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.course}</td>
                <td>{student.year}</td>

                <td>
                  <button
                    onClick={() => navigate(`/student/${student.id}`)}
                  >
                    View
                  </button>

                  <button
                    onClick={() => editStudent(student.id)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No Students Registered</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Students;