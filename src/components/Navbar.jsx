import { Link } from "react-router-dom";
import logo from "../assets/Holidaze-logo-desktop.png"
import "./Navbar.css";


export default function Navbar({isLoggedIn, role}){
    return(
        <nav className ="navbar">
            <div className="navbar-left">
                <Link to = "/">
                    <img src = {logo} alt="Holidaze logo" className="navbar-logo"/>
                </Link>
            </div>
            <div className="navbar-right">
                <Link to="/">Home</Link>
                <Link to="/venues">Venues</Link>

                {!isLoggedIn && <Link to="/login" className="login-button">Login</Link>}

                {isLoggedIn && (
                    <button className ="avatar-button">
                        * {/* placeholder for future improvement*/}
                    </button>
                )}
            </div>
        </nav>
    );
}