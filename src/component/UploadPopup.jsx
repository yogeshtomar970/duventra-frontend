import React from "react";
import "../styles/UploadPopup.css";

/**
 * UploadPopup
 * Dropdown menu with upload options based on user role.
 */
export default function UploadPopup({ show, role, user, go }) {
  if (!show) return null;

  return (
    <div className="upload-popup">
      {(role === "student" || role === "society") && (
        <button onClick={() => go("/upload-news")}>
          📰 News
        </button>
      )}
      {role === "society" && (
        <button onClick={() => go("/upload")}>
          📸 Post
        </button>
      )}
      {!user && (
        <button onClick={() => go("/login")}>
          🔑 Login first
        </button>
      )}
    </div>
  );
}
