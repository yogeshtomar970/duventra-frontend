import React from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import "../styles/NotificationBell.css";

/**
 * NotificationBell
 * Bell icon with red unread badge. Clicking resets count.
 */
export default function NotificationBell({ unreadCount, onClick }) {
  return (
    <Link
      to="/notification"
      className="bell-link"
      aria-label="Notifications"
      onClick={onClick}
    >
      <div className="bell-wrap">
        <FaBell className="notifyicon" />
        {unreadCount > 0 && (
          <span className="notif-badge">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </div>
    </Link>
  );
}
