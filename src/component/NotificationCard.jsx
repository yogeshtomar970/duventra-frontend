import React from "react";
import NotifIcon from "./NotifIcon";
import { timeAgo, resolveAvatar, resolveThumb } from "../notificationHelpers.js";

export default function NotificationCard({
  note, onClick, onAvatarClick,
  selectMode, isSelected,
}) {
  return (
    <div
      className={`notification-card ${!note.isRead ? "unread" : ""} ${isSelected ? "notif-selected" : ""}`}
      onClick={() => onClick(note)}
    >
      {/* Checkbox — sirf select mode mein */}
      {selectMode && (
        <div className="notif-checkbox">
          <div className={`notif-check-circle ${isSelected ? "checked" : ""}`}>
            {isSelected && <span>✓</span>}
          </div>
        </div>
      )}

      {/* Avatar + type icon */}
      <div
        className="notif-avatar-wrap"
        onClick={(e) => onAvatarClick(e, note)}
        style={{ cursor: note.actorId ? "pointer" : "default" }}
      >
        <img
          src={resolveAvatar(note)}
          alt={note.actorName}
          className="notification-img"
        />
        <NotifIcon type={note.type} />
      </div>

      {/* Message + time */}
      <div className="notification-content">
        <p className="notif-msg">{note.message}</p>
        <span className="notification-time">{timeAgo(note.createdAt)}</span>
      </div>

      {/* Post thumbnail */}
      {(note.postImage || note.postId) && (
        <div className="notif-thumb-wrap">
          <img
            src={resolveThumb(note)}
            alt="post"
            className="notif-post-thumb"
          />
          {note.sourceType === "news" && (
            <span className="notif-source-badge">NEWS</span>
          )}
        </div>
      )}

      {/* Unread dot — select mode mein nahi dikhega */}
      {!note.isRead && !selectMode && <span className="unread-dot" />}
    </div>
  );
}
