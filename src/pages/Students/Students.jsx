import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");

      console.log("API Response:", res.data);

      // If API returns an array
      if (Array.isArray(res.data)) {
        setStudents(res.data);
      }
      // If API returns { students: [...] }
      else if (Array.isArray(res.data.students)) {
        setStudents(res.data.students);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error(error);
      setStudents([]);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredStudents = students.filter((student) => {
    const name = student.name || "";
    const email = student.email || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="students-container">
      <h2>Registered Students</h2>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Branch</th>
            <th>Room No</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.branch}</td>
                <td>{student.roomNo}</td>
              

                <td>
                  <Link
                    to={`/students/${student._id}`}
                    className="view-btn"
                  >
                    View
                  </Link>

                  {" "}

                  <Link to={`/students/edit/${student._id}`}>
                    <button>Edit</button>
                  </Link>

                  {" "}

                  <button
                    className="delete-btn"
                    onClick={() => deleteStudent(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Students;