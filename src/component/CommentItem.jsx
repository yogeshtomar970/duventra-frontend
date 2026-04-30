import React from "react";
import { formatDate } from "../hooks/formatDate.js";
import "../styles/CommentItem.css";

export default function CommentItem({ item }) {
  return (
    <div className="comment-item">
      <div className="comment-avatar">
        {(item.userName || item.userId || "U")[0].toUpperCase()}
      </div>

      <div className="comment-body">
        <div className="comment-meta">
          <strong>{item.userName || item.userId}</strong>
          {item.userRole && (
            <span className={`comment-role ${item.userRole}`}>
              {item.userRole}
            </span>
          )}
          <span className="comment-time">{formatDate(item.createdAt)}</span>
        </div>
        <p>{item.text}</p>
      </div>
    </div>
  );
}
