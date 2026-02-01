import { useState } from "react";
import { loginTheUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { getProfile } from "../api/profile";

/*
this page lets users log into their account.

the form collects email and password.
when submitted, we:
1. log the user in and get basic user data
2. fetch the full profile to get the avatar
3. merge the data into one complete user object
4. save that object in localStorage for the whole app to use
*/

export default function Login() {
  const navigate = useNavigate();

  //storing the form inputs in state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  /*
  this runs when the form is submitted.
  it prevents the page from reloading, logs the user in and stores their data.
  */
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const userData = await loginTheUser(email, password);

      // temporarily save the basic user data so we can fetch the full profile
      localStorage.setItem("user", JSON.stringify(userData));

      // fetcj full profile with the avartar
      const fullProfile = await getProfile(userData.name, userData.accessToken);

      //merge login data with profile data
      const completeUser = {
        ...userData,
        avatar: fullProfile.avatar?.url,
      };

      // save the complete user to locstorage
      localStorage.setItem("user", JSON.stringify(completeUser));

      setMessage("Login successful");

      //redirect to the home paghe
      navigate("/");
      window.location.reload();
    } catch (error) {
      setMessage(error.message);
    }
  }
  return (
    <div className="register-page">
      <div className="register-header">
        <h1 className="register-title">Login</h1>
        <p className="register-subtitle">
          Log in to manage your bookings or venues
        </p>
      </div>

      <div className="register-center">
        <div className="register-card">
          <form onSubmit={handleSubmit} className="register-form">
            <label>Email</label>
            <input
              type="email"
              placeholder="name@stud.noroff.no"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="register-button">
              Login
            </button>
            <p className="login-link">
              Don’t have an account? <Link to="/register">Register</Link>
            </p>

            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
