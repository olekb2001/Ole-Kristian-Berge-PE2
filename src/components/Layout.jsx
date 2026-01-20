import { Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <>
        {/*navbar for later*/}
        <div>Navbar fir later</div>

        <main>
            <Outlet />
        </main>

        {/*footer for later*/}
        <div>Footer for later</div>
        </>
    )
}