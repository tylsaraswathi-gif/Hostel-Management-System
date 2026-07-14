import {
useState,
useEffect
} from "react";


import {
useParams,
useNavigate
} from "react-router-dom";


import "./EditStudent.css";



function EditStudent(){


const {id}=useParams();

const navigate=useNavigate();



const [name,setName]=useState("");

const [email,setEmail]=useState("");

const [phone,setPhone]=useState("");

const [branch,setBranch]=useState("");





useEffect(()=>{


const students = JSON.parse(

localStorage.getItem("students")

) || [];



const student = students.find(

(s)=>

s.id.toString() === id

);



if(student){


setName(student.name);

setEmail(student.email);

setPhone(student.phone);

setBranch(student.branch);


}


},[id]);







const updateStudent=(e)=>{


e.preventDefault();



let students = JSON.parse(

localStorage.getItem("students")

) || [];




const updatedStudents = students.map(

(student)=>{


if(student.id.toString()===id){


return {


...student,

name,

email,

phone,

branch


};


}


return student;


}

);




localStorage.setItem(

"students",

JSON.stringify(updatedStudents)

);



alert("Student Updated Successfully");


navigate("/students");


};





return (

<div className="edit-container">


<h2>
Edit Student
</h2>


<form onSubmit={updateStudent}>


<input

value={name}

placeholder="Name"

onChange={(e)=>setName(e.target.value)}

/>



<input

value={email}

placeholder="Email"

onChange={(e)=>setEmail(e.target.value)}

/>



<input

value={phone}

placeholder="Phone"

onChange={(e)=>setPhone(e.target.value)}

/>



<input

value={branch}

placeholder="Branch"

onChange={(e)=>setBranch(e.target.value)}

/>



<button type="submit">

Update Student

</button>



</form>


</div>

);


}


export default EditStudent;