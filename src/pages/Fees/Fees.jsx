import { useState } from "react";
import "./Fees.css";


function Fees(){


const [fees,setFees] = useState(

JSON.parse(localStorage.getItem("fees")) || []

);



const [form,setForm] = useState({

studentName:"",
hostelFee:"",
messFee:"",
status:"Pending"

});



const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};




const addFee=(e)=>{

e.preventDefault();


const newFee={


id:Date.now(),

studentName:form.studentName,

hostelFee:Number(form.hostelFee),

messFee:Number(form.messFee),

total:

Number(form.hostelFee)
+
Number(form.messFee),

status:form.status


};



const updated=[

...fees,

newFee

];


setFees(updated);


localStorage.setItem(

"fees",

JSON.stringify(updated)

);



setForm({

studentName:"",
hostelFee:"",
messFee:"",
status:"Pending"

});


};





const deleteFee=(id)=>{


const updated=fees.filter(

(item)=>item.id!==id

);


setFees(updated);


localStorage.setItem(

"fees",

JSON.stringify(updated)

);


};





return(

<div>


<h1>
Fee Management
</h1>



<form 
className="fee-form"
onSubmit={addFee}
>



<input

name="studentName"

placeholder="Student Name"

value={form.studentName}

onChange={handleChange}

/>



<input

name="hostelFee"

placeholder="Hostel Fee"

type="number"

value={form.hostelFee}

onChange={handleChange}

/>




<input

name="messFee"

placeholder="Mess Fee"

type="number"

value={form.messFee}

onChange={handleChange}

/>




<select

name="status"

value={form.status}

onChange={handleChange}

>


<option>
Paid
</option>


<option>
Pending
</option>


</select>




<button>
Add Fee
</button>



</form>





<table>


<thead>

<tr>

<th>
Student
</th>

<th>
Hostel Fee
</th>

<th>
Mess Fee
</th>

<th>
Total
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

fees.map((fee)=>(


<tr key={fee.id}>


<td>
{fee.studentName}
</td>



<td>
₹ {fee.hostelFee}
</td>



<td>
₹ {fee.messFee}
</td>



<td>
₹ {fee.total}
</td>



<td>

<span className={fee.status}>

{fee.status}

</span>

</td>



<td>


<button

onClick={()=>deleteFee(fee.id)}

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


export default Fees;