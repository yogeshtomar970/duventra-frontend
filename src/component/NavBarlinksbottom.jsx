import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaEnvelope } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";

/**
 * NavBar
 * Bottom navigation bar with icons + centre FAB.
 * Message and Profile require login — redirect to /login if not logged in.
 */
export default function NavBarlinksbottom({ profilePath, menuOpen, onFabClick }) {
  const navClass = ({ isActive }) => (isActive ? "icon active" : "icon");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || null;

  // Guard: agar login nahi toh /login par bhejo
  const guardedNavigate = (e, path) => {
    if (!user) {
      e.preventDefault();
      navigate("/login");
    }
    // agar login hai toh NavLink apna kaam kare
  };

  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className={navClass}>
        <FaHome />
      </NavLink>

      <NavLink to="/news" className={navClass}>
        <FontAwesomeIcon icon={faNewspaper} />
      </NavLink>

      {/* Message — login required */}
      <NavLink
        to="/meesage"
        className={navClass}
        onClick={(e) => guardedNavigate(e, "/meesage")}
      >
        <FaEnvelope />
      </NavLink>

      {/* Profile — login required */}
      <NavLink
        to={profilePath}
        className={navClass}
        onClick={(e) => guardedNavigate(e, profilePath)}
      >
        <FaUser />
      </NavLink>
    </nav>
  );
}
