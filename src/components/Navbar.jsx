/*
navbar changes whether you are logged in, logged out and depending 
on which role you have

if you are logged out it shows a login button.
if you are logged in it shows a avatar menu with options depending on your role
*/
import { Link } from "react-router-dom";
import logo from "../assets/Holidaze-logo-desktop.png";
import "./Navbar.css";
import { useState } from "react";

export default function Navbar({ isLoggedIn, role }) {
    //this controls the dropdown visibility
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img
            src={logo}
            alt="Holidaze logo"
            className="navbar-logo"
          />
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/venues">Venues</Link>

        {/* if user is not logged in show login button */}
        {!isLoggedIn && (
          <Link to="/login" className="login-button">
            Login
          </Link>
        )}

        {/*  if the user is logged in, show the avatar menu*/}
        {isLoggedIn && (
          <div className="avatar-container">
            {/* clicking it toggles the dropdown menu*/}
            <button
              className="avatar-button"
              onClick={() =>
                setIsAvatarMenuOpen(!isAvatarMenuOpen)
              }
              aria-label="User menu"
            >
              *
            </button>

            {isAvatarMenuOpen && (
              <div className="avatar-dropdown">

                {/* menu items based on yor role*/}
                {role === "customer" && (
                    <div className="dropdown-item">
                        <Link to="/bookings">Bookings</Link>
                    </div>
                )}

                {role === "manager" && (
                    <div className="dropdown-item">
                        <Link to="/my-venues">My Venues</Link>
                    </div>
                )}  
                <div className="dropdown-item">
                    <Link to="/profile">Update Avatar</Link>
                </div>

                <div className="dropdown-item">
                <Link to="/logout">Logout</Link>
                </div>

              </div>

            )}
          </div>
        )}
      </div>
    </nav>
  );
}
