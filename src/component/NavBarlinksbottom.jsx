import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaEnvelope } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";


/**
 * NavBar
 * Bottom navigation bar with icons + centre FAB.
 */
export default function NavBarlinksbottom({ profilePath, menuOpen, onFabClick }) {
  const navClass = ({ isActive }) => (isActive ? "icon active" : "icon");

  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className={navClass}>
        <FaHome />
      </NavLink>

      <NavLink to="/news" className={navClass}>
        <FontAwesomeIcon icon={faNewspaper} />
      </NavLink>

    

      <NavLink to="/meesage" className={navClass}>
        <FaEnvelope />
      </NavLink>

      <NavLink to={profilePath} className={navClass}>
        <FaUser />
      </NavLink>
    </nav>
  );
}
