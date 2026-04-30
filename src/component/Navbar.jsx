import React from "react";
import { FaBars } from "react-icons/fa";

// CSS
import "../styles/Navbar.css";

// Components
import NavLogo from "../component/NavLogo";
import NotificationBell from "../component/NotificationBell";
import UploadPopup from "../component/UploadPopup";

// Hook
import useNavbar from "../hooks/useNavbar";

export default function Navbar({ toggleSidebar }) {
  const {
    showPopup,
    unreadCount,
    popupRef,
    user,
    role,
    go,
    handleUploadClick,
    handleBellClick,
  } = useNavbar();

  return (
    <header className="navbar">

      {/* Hamburger */}
      <button
        className="nav-hamburger"
        onClick={toggleSidebar}
        aria-label="Menu"
      >
        <FaBars />
      </button>

      {/* Centre logo */}
      <NavLogo />

      {/* Right: bell + upload */}
      <div className="right-icons" ref={popupRef}>
        <NotificationBell
          unreadCount={unreadCount}
          onClick={handleBellClick}
        />

        <button className="uploadbtn" onClick={handleUploadClick}>
          Upload
        </button>

        <UploadPopup
          show={showPopup}
          role={role}
          user={user}
          go={go}
        />
      </div>
    </header>
  );
}
