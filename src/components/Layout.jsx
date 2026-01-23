/*
layout wraps all pages in the app 

navbar and the footer stay consistent across the routes.
outlet renders the page that matches the current url.
*/


import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout(){
    //temp stat for checking wheter navbar logic works
    const isLoggedIn = true;
    const role = "customer";

    return(
        <>
        <Navbar isLoggedIn={isLoggedIn} role={role}/>
        <main>
            <Outlet />
        </main>

        {/*footer for later*/}
        <div>Footer for later</div>
        </>
    )
}