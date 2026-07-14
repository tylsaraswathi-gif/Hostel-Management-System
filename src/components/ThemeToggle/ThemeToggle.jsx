import {
useContext
} from "react";


import {
ThemeContext
} from "../../context/ThemeContext";



function ThemeToggle(){


const {
theme,
setTheme
}=useContext(ThemeContext);



const changeTheme=()=>{


setTheme(

theme==="light"
?
"dark"
:
"light"

);


};



return(

<button

onClick={changeTheme}

>

{
theme==="light"
?
"🌙 Dark"
:
"☀ Light"
}


</button>


);


}


export default ThemeToggle;