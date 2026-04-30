import React from "react";
import NotifIcon from "./NotifIcon";
import { timeAgo, resolveAvatar, resolveThumb } from "../notificationHelpers.js";

/**
 * NotificationCard
 * Single notification row — avatar, message, time, thumbnail, unread dot.
 */
export default function NotificationCard({ note, onClick, onAvatarClick }) {
  return (
    <div
      className={`notification-card ${!note.isRead ? "unread" : ""}`}
      onClick={() => onClick(note)}
    >
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

      {/* Unread dot */}
      {!note.isRead && <span className="unread-dot" />}
    </div>
  );
}
