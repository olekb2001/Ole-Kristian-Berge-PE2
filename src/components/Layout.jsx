/*
layout wraps all pages in the app 
navbar and the footer stay consistent across the routes.
outlet renders the page that matches the current url.
*/
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Footer from "./Footer";

export default function Layout() {
  // state that holds the user from localStorage
  const [storedUser, setStoredUser] = useState(null);

  /* 
  when layout loads, we read the user from localStorage and save it 
  into a state. this allows react to re-render when login og a logout happens
  */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setStoredUser(user);
  }, []);

  //if storedUser exist you are logged in
  const isLoggedIn = !!storedUser;

  // if venuemanager exists you are a manager, else customer
  const role = storedUser?.venueManager ? "manager" : "customer";

  return (
    <div className="layout-wrapper">
      <Navbar isLoggedIn={isLoggedIn} role={role} />
      <main className="layout-main">
        <Outlet />
      </main>

      {/*footer*/}
      <Footer />
    </div>
  );
}
