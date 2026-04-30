import React from "react";

// ── Hook ──────────────────────────────────────
import useComments from "../hooks/useComments.js";

// ── Sub-components ────────────────────────────
import CommentItem from "./CommentItem.jsx";
import CommentInput from "./CommentInput.jsx";

// ── Styles ────────────────────────────────────
import "../styles/CommentsCard.css";

export default function CommentsCard({ postId }) {
  const {
    user,
    userName,
    comments,
    text,
    setText,
    loading,
    posting,
    error,
    handleComment,
    handleKey,
  } = useComments(postId);

  return (
    <div className="comments-card" onClick={(e) => e.stopPropagation()}>

      {/* Drag handle */}
      <div className="comments-handle" />

      {/* Header */}
      <div className="comments-header">
        <h3>
          Comments{" "}
          <span className="comments-count">{comments.length}</span>
        </h3>
      </div>

      {/* List */}
      <div className="comments-list">
        {loading && (
          <p className="comments-state">Loading…</p>
        )}
        {!loading && comments.length === 0 && (
          <p className="comments-state">No comments yet. Be the first!</p>
        )}
        {comments.map((item) => (
          <CommentItem key={item._id} item={item} />
        ))}
      </div>

      {/* Error */}
      {error && <p className="comments-error">{error}</p>}

      {/* Input */}
      <CommentInput
        user={user}
        userName={userName}
        text={text}
        setText={setText}
        posting={posting}
        onSubmit={handleComment}
        onKeyDown={handleKey}
      />

    </div>
  );
}
