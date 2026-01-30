/*
navbar changes whether you are logged in, logged out and depending 
on which role you have

if you are logged out it shows a login button.
if you are logged in it shows a avatar menu with options depending on your role
*/
import { Link } from "react-router-dom";
import logo from "../assets/Holidaze-logo-desktop.png";
import "./Navbar.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn, role }) {
  const navigate = useNavigate();
  function handleTheLogout() {
    // remove login
    localStorage.removeItem("user");
    //go to homepage
    navigate("/");
    // and force the navbar to update
    window.location.reload();
  }
  //this controls the dropdown visibility
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  // reference to the avatar container
  const avatarContainer = useRef(null);

  /*
  this listens for clicks on the page, and if the click is outside the avatar meny, 
  then the dropdown closes.
  */

  useEffect(() => {
    function fixClickOutside(event) {
      if (
        avatarContainer.current &&
        !avatarContainer.current.contains(event.target)
      ) {
        setIsAvatarMenuOpen(false);
      }
    }
    // listen for clicks on the whole document
    document.addEventListener("mousedown", fixClickOutside);
    // remove listener whn navbar unmounts
    return () => {
      document.removeEventListener("mousedown", fixClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="Holidaze logo" className="navbar-logo" />
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
          <div className="avatar-container" ref={avatarContainer}>
            {/* clicking it toggles the dropdown menu*/}
            <button
              className="avatar-button"
              onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
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
                  <button onClick={handleTheLogout} className="logout-button">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
