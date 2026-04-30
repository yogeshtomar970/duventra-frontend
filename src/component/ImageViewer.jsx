import React from "react";
import { FaTimes } from "react-icons/fa";

/**
 * ImageViewer
 * Fullscreen image overlay with close button.
 */
export default function ImageViewer({ src, onClose }) {
  return (
    <div className="nc-img-viewer-overlay" onClick={onClose}>
      <button className="nc-img-viewer-close" onClick={onClose}><FaTimes /></button>
      <img
        src={src}
        alt="news"
        className="nc-img-viewer-img"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
