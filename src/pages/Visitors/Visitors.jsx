import { useState } from "react";
import "./Visitors.css";


function Visitors(){


const [visitors,setVisitors] = useState(

JSON.parse(localStorage.getItem("visitors")) || []

);



const [form,setForm] = useState({

visitorName:"",
studentName:"",
phone:"",
relation:"",
entryTime:"",
exitTime:""

});



const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};





const addVisitor=(e)=>{


e.preventDefault();



const newVisitor={

id:Date.now(),

...form

};



const updated=[

...visitors,

newVisitor

];


setVisitors(updated);



localStorage.setItem(

"visitors",

JSON.stringify(updated)

);



setForm({

visitorName:"",
studentName:"",
phone:"",
relation:"",
entryTime:"",
exitTime:""

});


};





const deleteVisitor=(id)=>{


const updated=visitors.filter(

(visitor)=>visitor.id!==id

);



setVisitors(updated);



localStorage.setItem(

"visitors",

JSON.stringify(updated)

);


};





return(

<div>


<h1>
Visitor Records
</h1>




<form

className="visitor-form"

onSubmit={addVisitor}

>



<input

name="visitorName"

placeholder="Visitor Name"

value={form.visitorName}

onChange={handleChange}

/>



<input

name="studentName"

placeholder="Student Name"

value={form.studentName}

onChange={handleChange}

/>



<input

name="phone"

placeholder="Phone Number"

value={form.phone}

onChange={handleChange}

/>



<input

name="relation"

placeholder="Relation"

value={form.relation}

onChange={handleChange}

/>




<label>
Entry Time
</label>


<input

type="time"

name="entryTime"

value={form.entryTime}

onChange={handleChange}

/>



<label>
Exit Time
</label>


<input

type="time"

name="exitTime"

value={form.exitTime}

onChange={handleChange}

/>



<button>
Add Visitor
</button>



</form>






<table>


<thead>

<tr>

<th>
Visitor
</th>

<th>
Student
</th>

<th>
Phone
</th>

<th>
Relation
</th>

<th>
Entry
</th>

<th>
Exit
</th>

<th>
Action
</th>

</tr>

</thead>




<tbody>


{

visitors.map((visitor)=>(


<tr key={visitor.id}>


<td>
{visitor.visitorName}
</td>


<td>
{visitor.studentName}
</td>


<td>
{visitor.phone}
</td>


<td>
{visitor.relation}
</td>


<td>
{visitor.entryTime}
</td>


<td>
{visitor.exitTime}
</td>


<td>

<button

onClick={()=>deleteVisitor(visitor.id)}

>

Delete

</button>


</td>



</tr>


))


}


</tbody>


</table>



</div>

)


}


export default Visitors;