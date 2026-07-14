import { useState } from "react";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "yamini",
      email: "tylsaraswathi@gmail.com",
      phone: "7989019971",
      branch: "CSE-DS",
    },
  ]);

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="students-container">
      <h2>Student Details</h2>

      <input
        type="text"
        placeholder="Search Student"
        className="search-box"
      />

      <table className="student-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Branch</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.branch}</td>
              <td>
  <button
    className="view-btn"
    onClick={() => alert(`
Name: ${student.name}
Email: ${student.email}
Phone: ${student.phone}
Branch: ${student.branch}
`)}
  >
    View
  </button>

  <button className="edit-btn">
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => deleteStudent(student.id)}
  >
    Delete
  </button>
</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;