import React from "react";
import { FaInfoCircle, FaEye } from "react-icons/fa";
import "../styles/ECMorePopup.css";

export default function ECMorePopup({ views, onDescriptionClick, onClose }) {
  return (
    <div className="ec-overlay" onClick={onClose}>
      <div className="ec-popup-box" onClick={(e) => e.stopPropagation()}>
        <div
          className="ec-popup-item"
          onClick={() => { onClose(); onDescriptionClick(); }}
        >
          <FaInfoCircle />
          <span>Description & Registration</span>
        </div>
        <div className="ec-popup-item ec-popup-item--muted">
          <FaEye />
          <span>{views || 0} views</span>
        </div>
      </div>
    </div>
  );
}
