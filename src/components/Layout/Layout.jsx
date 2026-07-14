import { Outlet } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Layout.css";


function Layout(){

    return(

        <>

            <Navbar />

            <div className="layout">

                <Sidebar />

                <main className="content">

                    <Outlet />

                </main>

            </div>

        </>

    );

}


export default Layout;