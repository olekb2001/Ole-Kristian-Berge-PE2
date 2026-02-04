import { Link } from "react-router-dom";
import logo from "../assets/Holidaze-logo-desktop.png";
import "./Footer.css";

export default function Footer() {
  const user = JSON.parse(localStorage.getItem("user"));

  const isLoggedIn = !!user;
  const role = user?.venueManager ? "manager" : "customer";

  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={logo} alt="Holidaze Logo" className="footer-logo" />
      </div>
      <div className="footer-right">
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/venues">Venues</Link>

          {isLoggedIn && role === "customer" && (
            <Link to="/bookings">Bookings</Link>
          )}

          {isLoggedIn && role === "manager" && (
            <Link to="/my-venues">My Venues</Link>
          )}
        </div>
        <div className="footer-copy">
          © 2026 Holidaze – Created by Ole Kristian Berge
        </div>
      </div>
    </footer>
  );
}
