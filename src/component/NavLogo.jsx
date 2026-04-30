import React from "react";
import logo from "../assets/logo.png";
import "../styles/NavLogo.css";

/**
 * NavLogo
 * Absolutely centred logo + app name.
 */
export default function NavLogo() {
  return (
    <div className="logoimg">
      <img src={logo} alt="Duventra" />
      <h2 className="logo">DU Eventra</h2>
    </div>
  );
}
