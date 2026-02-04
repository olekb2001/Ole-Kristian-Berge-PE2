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
import { Menu } from "lucide-react";

export default function Navbar({ isLoggedIn, role }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [avatarError, setAvatarError] = useState(false);

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

  //mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <button
          className="hamburger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Open Menu"
        >
          <Menu size={28} />
        </button>
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
              {user?.avatar && !avatarError ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="navbar-avatar-img"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <span className="navbar-avatar-placeholder">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              )}
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
      {isMobileMenuOpen && (
        <div className="avatar-dropdown mobile-dropdown">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/venues" onClick={() => setIsMobileMenuOpen(false)}>
            Venues
          </Link>

          {!isLoggedIn && (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              Login
            </Link>
          )}

          {isLoggedIn && role === "customer" && (
            <Link to="/bookings" onClick={() => setIsMobileMenuOpen(false)}>
              Bookings
            </Link>
          )}

          {isLoggedIn && role === "manager" && (
            <Link to="/my-venues" onClick={() => setIsMobileMenuOpen(false)}>
              My Venues
            </Link>
          )}

          {isLoggedIn && (
            <>
              <Link
                to="/profile"
                className="mobile-avatar-row"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Update Avatar</span>

                {user?.avatar && !avatarError ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="mobile-avatar-img"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <span className="mobile-avatar-placeholder">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </Link>

              <button className="mobile-logout" onClick={handleTheLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
