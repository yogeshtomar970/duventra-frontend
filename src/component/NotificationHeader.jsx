import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCheckDouble } from "@fortawesome/free-solid-svg-icons";

/**
 * NotificationHeader
 * Top bar — bell icon, title, unread count, mark-all-read button.
 */
export default function NotificationHeader({ unreadCount, onMarkAllRead }) {
  return (
    <div className="notification-header">
      <FontAwesomeIcon icon={faBell} />
      <span>Notifications</span>

      {unreadCount > 0 && (
        <span className="notif-badge">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}

      {unreadCount > 0 && (
        <button
          className="mark-read-btn"
          onClick={onMarkAllRead}
          title="Mark all as read"
        >
          <FontAwesomeIcon icon={faCheckDouble} />
          <span>Mark all read</span>
        </button>
      )}
    </div>
  );
}
