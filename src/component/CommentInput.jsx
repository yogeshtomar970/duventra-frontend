import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import "../styles/CommentInput.css";

export default function CommentInput({
  user,
  userName,
  text,
  setText,
  posting,
  onSubmit,
  onKeyDown,
}) {
  return (
    <div className="add-comment">
      <input
        type="text"
        placeholder={user ? `Comment as ${userName}…` : "Log in to comment"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={!user || posting}
        maxLength={300}
      />
      <button
        onClick={onSubmit}
        disabled={!text.trim() || posting || !user}
        aria-label="Send comment"
      >
        {posting ? "…" : <FaPaperPlane />}
      </button>
    </div>
  );
}
