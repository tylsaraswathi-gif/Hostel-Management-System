import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [sortBy, setSortBy] = useState("studentName");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    fetchStudents();
  }, [page, search, sortBy, order]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/students", {
        params: {
          page,
          limit,
          search,
          sortBy,
          order,
        },
      });

      setStudents(res.data.students);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await api.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  return (
    <div className="students-container">

      {/* Header */}
      <div className="students-header">
        <h2>Registered Students</h2>

        <Link to="/register">
          <button className="add-student-btn">
            ➕ Add Student
          </button>
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Student..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="search-box"
      />

      {/* Sorting */}
      <div className="sort-section">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="studentName">Name</option>
          <option value="email">Email</option>
          <option value="branch">Branch</option>
          <option value="roomNo">Room No</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Loading */}
      {loading && <h3>Loading Students...</h3>}

      {/* Error */}
      {error && <h3>{error}</h3>}

      {!loading && !error && (
        <>
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
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.studentName || student.name}</td>
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
                  <td colSpan="6">No students found.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Students;