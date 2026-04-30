import React from "react";
import "../styles/AppInfo.css";

/**
 * AppInfo
 * App name, version, Privacy Policy & Terms of Use links.
 */
export default function AppInfo() {
  return (
    <div className="hs-app-info">
      <div className="hs-app-logo">DU Eventra</div>
      <p>Version 1.0.0 · Made with ❤️ for Delhi University</p>
      <div className="hs-app-links">
        <span>Privacy Policy</span>
        <span>·</span>
        <span>Terms of Use</span>
      </div>
    </div>
  );
}
