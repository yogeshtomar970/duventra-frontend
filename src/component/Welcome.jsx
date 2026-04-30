import { Link } from "react-router-dom";
import "../Welcome.css";
import logo from "../assets/logo.png"


export default function Signup() {
  return (
    <div className="welcome-page">
      <img src={logo} alt="" />
      <div className="welcome-card">
        <h2>SIGNUP / LOGIN </h2>

      

        <Link to="/studentsignup">
          <button className="welcome-btn">Student Signup</button>
        </Link>

        <Link to="/societysignup">
          <button className="welcome-btn">Society Signup</button>
        </Link>

        <Link to="/login">
          <button className="welcome-btn outline">Login</button>
        </Link>
      </div>
    </div>
  );
}
