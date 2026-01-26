/*
layout wraps all pages in the app 

navbar and the footer stay consistent across the routes.
outlet renders the page that matches the current url.
*/

import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  //here we get the user obj that was saved during the login,
  //if there are not any user in localstorage this will be null
  const storedUser = JSON.parse(localStorage.getItem("user"));

  /*
    if storedUser exist, the user is logged in.
    if its null the user is logged out.
    */
  const isLoggedIn = !!storedUser;

  /*
    the api only includes "venueManager" if the user is a 
    manager. if it exists you are a manager, if not you are a customer
   */
  const role = storedUser?.venueManager ? "manager" : "customer";

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} role={role} />
      <main>
        <Outlet />
      </main>

      {/*footer for later*/}
      <div>Footer for later</div>
    </>
  );
}
