import {useParams} from "react-router-dom";

import "./StudentDetails.css";


function StudentDetails(){


const {id}=useParams();



const students=

JSON.parse(localStorage.getItem("students")) || [];



const student=students.find(

(item)=>item.id===Number(id)

);




return(

<div>


<h1>
Student Details
</h1>



{

student ?

<div className="details">


<h2>
Name : {student.name}
</h2>


<p>
Email : {student.email}
</p>


<p>
Phone : {student.phone}
</p>


<p>
Course : {student.course}
</p>


<p>
Year : {student.year}
</p>



</div>

:

<h2>
Student Not Found
</h2>


}


</div>

)

}


export default StudentDetails;