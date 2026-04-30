import React from "react";

/**
 * UploadMenuItem
 * Ek single menu item — icon circle + title + subtitle.
 */
export default function UploadMenuItem({
  onClick,
  animationDelay = "0s",
  iconClass,       // "post-icon" | "news-icon"
  itemClass,       // "upload-menu-post" | "upload-menu-news"
  icon,            // SVG JSX
  title,
  subtitle,
}) {
  return (
    <button
      className={`upload-menu-item ${itemClass}`}
      onClick={onClick}
      style={{ animationDelay }}
    >
      <span className={`upload-menu-icon ${iconClass}`}>
        {icon}
      </span>
      <span className="upload-menu-text">
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </span>
    </button>
  );
}
