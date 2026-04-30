import { useState } from "react";
import API_BASE_URL from "../config/api.js";

/**
 * useFeedback
 * Feedback form ki saari state aur API call yahan —
 * submit, close, rating, message.
 */
export default function useFeedback() {
  const [open, setOpen]           = useState(false);
  const [message, setMessage]     = useState("");
  const [rating, setRating]       = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || null;

  // ── Submit ─────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!message.trim()) {
      setError("Please write your feedback.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          rating: rating || null,
          page: "homepage",
          userId: user?.userId || null,
          name: user?.name || "Anonymous",
          email: user?.email || "",
          role: user?.role || "guest",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      setMessage("");
      setRating(0);
      setTimeout(() => {
        setSubmitted(false);
        setOpen(false);
      }, 2200);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Close ──────────────────────────────────────────────
  const handleClose = () => {
    setOpen(false);
    setMessage("");
    setRating(0);
    setError("");
    setSubmitted(false);
  };

  return {
    open,
    setOpen,
    message,
    setMessage,
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    loading,
    submitted,
    error,
    handleSubmit,
    handleClose,
  };
}
