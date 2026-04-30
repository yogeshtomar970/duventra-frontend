import { useState, useEffect } from "react";
import API_BASE_URL from "../config/api.js";

/**
 * useComments
 * Comments fetch karna aur naya comment post karna — saari API logic yahan.
 */
export default function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  // ── Current user ──────────────────────────────────────
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const userId = user
    ? user.role === "society"
      ? user.societyId
      : user.id
    : null;
  const userName = user?.name || user?.email || "User";
  const userRole = user?.role || "student";

  // ── Fetch comments ────────────────────────────────────
  const fetchComments = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/comment/${postId}`);
      const data = await res.json();
      if (data.success) setComments(data.comments);
    } catch {
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId]);

  // ── Post comment ──────────────────────────────────────
  const handleComment = async () => {
    if (!text.trim() || !userId) return;
    setPosting(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/comment/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          userId,
          userName,
          userRole,
          text: text.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setText("");
        setComments(data.comments);
      } else {
        setError(data.message || "Failed to post comment");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setPosting(false);
    }
  };

  // ── Enter key handler ────────────────────────────────
  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) handleComment();
  };

  return {
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
  };
}
