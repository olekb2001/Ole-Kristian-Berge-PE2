import { Link } from "react-router-dom";
import logo from "../assets/Holidaze-logo-desktop.png";
import "./footer.css";

export default function footer() {
  const user = JSON.parse(localStorage.getItem("user"));

  const isLoggedIn = !!user;
  const role = user?.venueManager ? "manager" : "customer";
}

return(
    <footer className="footer">
        <div className="footer-left">
            <img src={logo} alt="Holidaze Logo" className="footer-logo"/>
        </div>
        <div className="footer-links">
            <Link to="/"></Link>
            <Link to="/"></Link>
            <Link to="/"></Link>
            <Link to="/"></Link>


        </div>




    </footer>
)