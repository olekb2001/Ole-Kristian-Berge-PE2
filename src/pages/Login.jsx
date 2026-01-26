import { useState } from "react";
import { loginTheUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

/*
this page lets users log into their account.

the form collects email and password.
when its submitted, it sends the data to the api.
if its successfull, user data is then saved in localStorahge.
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

      //here i save the returned data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      setMessage("Login successful");

      //redirect to the home paghe
      navigate("/");
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
            <button type="submit" className="register-buttom">
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
