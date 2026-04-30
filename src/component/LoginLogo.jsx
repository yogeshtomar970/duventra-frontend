import React from "react";
import logo from "../assets/logo.png";
import "../styles/LoginLogo.css";

/**
 * LoginLogo
 * App logo at top of login page.
 */
export default function LoginLogo() {
  return <img src={logo} alt="logo" className="login-logo" />;
}
