import { useState, useEffect } from "react";
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
    const updated = students.filter((student) => student.id !== id);
    saveToLocalStorage(updated);
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
    (student.studentName || "")
      .toLowerCase()
      .includes((search || "").toLowerCase())
  );

  return (
    <div className="students-container">
      <h2>Student Details</h2>

      <input
        type="text"
        placeholder="Search Student"
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
                    <button className="view-btn" onClick={saveStudent}>
                      Save
                    </button>
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
              <td colSpan="6">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Students;