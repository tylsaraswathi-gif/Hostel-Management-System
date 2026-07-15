import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [editedStudent, setEditedStudent] = useState({
    studentName: "",
    email: "",
    phone: "",
    branch: "",
  });

  useEffect(() => {
    const storedStudents =
      JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
  }, []);

  const saveToLocalStorage = (updatedStudents) => {
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      const updated = students.filter((student) => student.id !== id);
      saveToLocalStorage(updated);
    }
  };

  const editStudent = (student) => {
    setEditingId(student.id);

    setEditedStudent({
      studentName: student.studentName || "",
      email: student.email || "",
      phone: student.phone || "",
      branch: student.branch || "",
    });
  };

  const saveStudent = () => {
    const updated = students.map((student) =>
      student.id === editingId
        ? { ...student, ...editedStudent }
        : student
    );

    saveToLocalStorage(updated);
    setEditingId(null);
  };

  const filteredStudents = students.filter((student) =>
    `${student.studentName} ${student.email} ${student.phone} ${student.branch}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="students-container">
      {/* Header */}
      <div className="top-bar">
        <div>
          <h2>Student Details</h2>
          <p>Manage all registered students</p>
        </div>

        <Link to="/register">
          <button className="add-student-btn">
            + Add Student
          </button>
        </Link>
      </div>

      {/* Search Box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search"
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
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
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>

                <td>
                  {editingId === student.id ? (
                    <input
                      value={editedStudent.studentName}
                      onChange={(e) =>
                        setEditedStudent({
                          ...editedStudent,
                          studentName: e.target.value,
                        })
                      }
                    />
                  ) : (
                    student.studentName
                  )}
                </td>

                <td>
                  {editingId === student.id ? (
                    <input
                      value={editedStudent.email}
                      onChange={(e) =>
                        setEditedStudent({
                          ...editedStudent,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    student.email
                  )}
                </td>

                <td>
                  {editingId === student.id ? (
                    <input
                      value={editedStudent.phone}
                      onChange={(e) =>
                        setEditedStudent({
                          ...editedStudent,
                          phone: e.target.value,
                        })
                      }
                    />
                  ) : (
                    student.phone
                  )}
                </td>

                <td>
                  {editingId === student.id ? (
                    <input
                      value={editedStudent.branch}
                      onChange={(e) =>
                        setEditedStudent({
                          ...editedStudent,
                          branch: e.target.value,
                        })
                      }
                    />
                  ) : (
                    student.branch
                  )}
                </td>

                <td>
                  {editingId === student.id ? (
                    <>
                      <button
                        className="save-btn"
                        onClick={saveStudent}
                      >
                        Save
                      </button>

                      <button
                        className="cancel-btn"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="view-btn"
                        onClick={() =>
                          alert(
                            `Name: ${student.studentName}
                             Email: ${student.email}
                             Phone: ${student.phone}
                             Branch: ${student.branch}`
                          )
                        }
                      >
                        View
                      </button>

                      <button
                        className="edit-btn"
                        onClick={() => editStudent(student)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteStudent(student.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{ textAlign: "center", padding: "20px" }}
              >
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Students;