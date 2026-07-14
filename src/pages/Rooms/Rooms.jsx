import { useState } from "react";
import "./Rooms.css";


function Rooms(){


const [rooms,setRooms] = useState(

JSON.parse(localStorage.getItem("rooms")) || []

);



const [form,setForm] = useState({

roomNo:"",
block:"",
capacity:""

});




const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};





const addRoom=(e)=>{

e.preventDefault();


const newRoom={

id:Date.now(),

roomNo:form.roomNo,

block:form.block,

capacity:Number(form.capacity),

occupied:0

};



const updated=[

...rooms,

newRoom

];


setRooms(updated);


localStorage.setItem(
"rooms",
JSON.stringify(updated)
);



setForm({

roomNo:"",
block:"",
capacity:""

});


};





const allocateRoom=(id)=>{


const updated=rooms.map((room)=>{


if(room.id===id && room.occupied < room.capacity)

{

return{

...room,

occupied:room.occupied+1

}

}


return room;


});



setRooms(updated);


localStorage.setItem(
"rooms",
JSON.stringify(updated)
);


};





const deleteRoom=(id)=>{


const updated=rooms.filter(

(room)=>room.id!==id

);



setRooms(updated);


localStorage.setItem(
"rooms",
JSON.stringify(updated)
);


};





return(

<div>


<h1>
Room Allocation
</h1>




<form 
className="room-form"
onSubmit={addRoom}
>


<input

name="roomNo"

placeholder="Room Number"

value={form.roomNo}

onChange={handleChange}

/>




<input

name="block"

placeholder="Block Name"

value={form.block}

onChange={handleChange}

/>




<input

name="capacity"

placeholder="Capacity"

type="number"

value={form.capacity}

onChange={handleChange}

/>



<button>
Add Room
</button>



</form>





<table>


<thead>

<tr>

<th>
Room No
</th>


<th>
Block
</th>


<th>
Capacity
</th>


<th>
Occupied
</th>


<th>
Available Beds
</th>


<th>
Action
</th>


</tr>

</thead>




<tbody>


{

rooms.map((room)=>(


<tr key={room.id}>


<td>
{room.roomNo}
</td>


<td>
{room.block}
</td>



<td>
{room.capacity}
</td>



<td>
{room.occupied}
</td>




<td>

{
room.capacity - room.occupied
}

</td>




<td>


<button

onClick={()=>allocateRoom(room.id)}

>

Allocate

</button>



<button

onClick={()=>deleteRoom(room.id)}

className="delete"

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


export default Rooms;