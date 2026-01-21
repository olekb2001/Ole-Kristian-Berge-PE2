import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout(){
    //temp stat foir checking wheter navbar logic works
    const isLoggedIn = false;
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