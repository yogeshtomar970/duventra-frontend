import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TYPE_CONFIG } from "../notificationHelpers.js";

/**
 * NotifIcon
 * Small colored icon badge shown on top of avatar (like/comment/post/join).
 */
export default function NotifIcon({ type }) {
  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.new_post;
  return (
    <span className="notif-type-icon" style={{ background: cfg.color }}>
      <FontAwesomeIcon icon={cfg.icon} />
    </span>
  );
}
