import { useState } from "react";
import "./Complaints.css";


function Complaints(){


const [complaints,setComplaints] = useState(

JSON.parse(localStorage.getItem("complaints")) || []

);



const [form,setForm] = useState({

studentName:"",
category:"",
description:"",
status:"Pending"

});



const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};





const addComplaint=(e)=>{

e.preventDefault();



const newComplaint={

id:Date.now(),

...form

};



const updated=[

...complaints,

newComplaint

];


setComplaints(updated);



localStorage.setItem(

"complaints",

JSON.stringify(updated)

);



setForm({

studentName:"",
category:"",
description:"",
status:"Pending"

});


};





const updateStatus=(id)=>{


const updated=complaints.map((item)=>{


if(item.id===id){


let nextStatus="";


if(item.status==="Pending")

nextStatus="In Progress";


else if(item.status==="In Progress")

nextStatus="Resolved";


else

nextStatus="Resolved";



return{

...item,

status:nextStatus

};


}


return item;


});



setComplaints(updated);



localStorage.setItem(

"complaints",

JSON.stringify(updated)

);


};






const deleteComplaint=(id)=>{


const updated=complaints.filter(

(item)=>item.id!==id

);



setComplaints(updated);



localStorage.setItem(

"complaints",

JSON.stringify(updated)

);


};






return(

<div>


<h1>
Complaint Management
</h1>




<form

className="complaint-form"

onSubmit={addComplaint}

>



<input

name="studentName"

placeholder="Student Name"

value={form.studentName}

onChange={handleChange}

/>





<select

name="category"

value={form.category}

onChange={handleChange}

>


<option>
Select Category
</option>


<option>
Electricity
</option>


<option>
Water
</option>


<option>
Food
</option>


<option>
Room Maintenance
</option>


<option>
Other
</option>


</select>





<textarea

name="description"

placeholder="Complaint Description"

value={form.description}

onChange={handleChange}

/>





<button>
Submit Complaint
</button>



</form>







<table>


<thead>

<tr>

<th>
Student
</th>


<th>
Category
</th>


<th>
Description
</th>


<th>
Status
</th>


<th>
Action
</th>

</tr>

</thead>





<tbody>


{

complaints.map((item)=>(


<tr key={item.id}>


<td>
{item.studentName}
</td>



<td>
{item.category}
</td>



<td>
{item.description}
</td>



<td>

<span className={item.status}>

{item.status}

</span>

</td>



<td>


<button

onClick={()=>updateStatus(item.id)}

>

Update

</button>




<button

className="delete"

onClick={()=>deleteComplaint(item.id)}

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


export default Complaints;