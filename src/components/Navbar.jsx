import { Link } from "react-router-dom";
import logo from "../assets/Holidaze-logo-desktop.png";
import "./Navbar.css";
import { useState } from "react";

export default function Navbar({ isLoggedIn, role }) {
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

        {!isLoggedIn && (
          <Link to="/login" className="login-button">
            Login
          </Link>
        )}

        {isLoggedIn && (
          <div className="avatar-container">
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
