import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditStudent.css";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("students")) || [];

    const student = students.find((stu) => stu.id.toString() === id);

    if (student) {
      setName(student.name);
      setEmail(student.email);
      setPhone(student.phone);
      setCourse(student.course);
      setYear(student.year);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const students = JSON.parse(localStorage.getItem("students")) || [];

    const updatedStudents = students.map((stu) =>
      stu.id.toString() === id
        ? {
            ...stu,
            name,
            email,
            phone,
            course,
            year,
          }
        : stu
    );

    localStorage.setItem("students", JSON.stringify(updatedStudents));

    alert("Student updated successfully!");

    navigate("/students");
  };

  return (
    <div className="edit-container">
      <h2>Edit Student</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />

        <button type="submit">Update Student</button>
      </form>
    </div>
  );
}

export default EditStudent;