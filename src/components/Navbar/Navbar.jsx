import { useNavigate } from "react-router-dom"
import "./Navbar.css";


function Navbar() {


const navigate = useNavigate();



const logout = () => {


localStorage.removeItem("loggedUser");

localStorage.removeItem("loggedInStudent");


alert("Logged out successfully");


navigate("/login");


};



const user = JSON.parse(
localStorage.getItem("loggedUser")
);



return (


<nav className="navbar">


<div className="navbar-left">

<h2>
Hostel Management System
</h2>

</div>



<div className="navbar-right">


{
user &&

<span className="welcome">

Welcome, {user.name}

</span>

}
<button 
className="logout-btn"
onClick={logout}
>

Logout

</button>



</div>


</nav>


);


}


export default Navbar;