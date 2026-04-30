import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HsHeader.css";

/**
 * HsHeader
 * Back button, title "Help & Support", subtitle, icon.
 */
export default function HsHeader() {
  const navigate = useNavigate();
  return (
    <div className="hs-header">
      <button className="hs-back-btn" onClick={() => navigate(-1)}>←</button>
      <div className="hs-header-text">
        <h1>Help & Support</h1>
        <p>We're here to help you</p>
      </div>
      <div className="hs-header-icon">❓</div>
    </div>
  );
}
