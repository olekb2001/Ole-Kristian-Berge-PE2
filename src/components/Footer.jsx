import { Link } from "react-router-dom";
import logo from "../assets/Holidaze-logo-desktop.png";
import "./footer.css";

export default function footer() {
  const user = JSON.parse(localStorage.getItem("user"));

  const isLoggedIn = !!user;
  const role = user?.venueManager ? "manager" : "customer";
}
