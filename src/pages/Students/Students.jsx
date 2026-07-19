import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import "./Students.css";

function Students() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [editedStudent, setEditedStudent] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
  });


  useEffect(() => {
    fetchStudents();
  }, []);


  // Get Students
  const fetchStudents = async () => {
    try {

      const response = await api.get("/students");

      console.log(response.data);

      // Backend returns {success:true, students:[]}
      setStudents(response.data.students || []);

    } catch (error) {

      console.error(error);
      alert("Failed to fetch students");

    }
  };



  // Delete Student
  const deleteStudent = async (id) => {

    if(window.confirm("Are you sure you want to delete this student?")){

      try{

        await api.delete(`/students/${id}`);

        fetchStudents();

      }catch(error){

        console.error(error);
        alert("Failed to delete student");

      }

    }

  };



  // Edit Student
  const editStudent = (student)=>{

    setEditingId(student._id);

    setEditedStudent({
      name: student.name || "",
      email: student.email || "",
      phone: student.phone || "",
      branch: student.branch || "",
    });

  };



  // Save Updated Student
  const saveStudent = async()=>{

    try{

      await api.put(
        `/students/${editingId}`,
        editedStudent
      );


      setEditingId(null);

      fetchStudents();


    }catch(error){

      console.error(error);
      alert("Failed to update student");

    }

  };



  // Search
  const filteredStudents = students.filter((student)=>

    `${student.name || ""} 
     ${student.email || ""} 
     ${student.phone || ""} 
     ${student.branch || ""}`
     
     .toLowerCase()
     .includes(search.toLowerCase())

  );



  return (

    <div className="students-container">


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



      <div className="search-container">

        <input

          type="text"

          placeholder="🔍 Search"

          className="search-box"

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

        />

      </div>



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


        {
          filteredStudents.length > 0 ?

          filteredStudents.map((student,index)=>(

            <tr key={student._id}>


              <td>{index+1}</td>


              <td>{student.name}</td>


              <td>{student.email}</td>


              <td>{student.phone}</td>


              <td>{student.branch}</td>


              <td>


                <button
                className="view-btn"
                onClick={()=>
                  alert(
`Name: ${student.name}
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
                onClick={()=>editStudent(student)}
                >
                  Edit
                </button>



                <button
                className="delete-btn"
                onClick={()=>deleteStudent(student._id)}
                >
                  Delete
                </button>


              </td>


            </tr>


          ))

          :

          <tr>

            <td colSpan="6" style={{textAlign:"center"}}>

              No students found.

            </td>

          </tr>

        }


        </tbody>


      </table>


    </div>

  );

}


export default Students;