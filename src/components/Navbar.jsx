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
                  <Link to="/bookings">Bookings</Link>
                )}

                {role === "manager" && (
                  <Link to="/my-venues">My Venues</Link>
                )}

                <Link to="/profile">Update Avatar</Link>
                <Link to="/logout">Logout</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
