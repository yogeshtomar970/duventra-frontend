import { useState } from "react";
import API_BASE_URL from "../config/api.js";

/**
 * useFeedback
 * Feedback form ka saara state aur submit handler.
 */
export default function useFeedback() {
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("bug");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) return;
    setFeedbackLoading(true);
    setFeedbackError("");
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const res = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.societyId || user?.id || null,
          name: user?.name || user?.email || "Anonymous",
          email: user?.email || "",
          role: user?.role || "guest",
          message: feedback.trim(),
          page: "help-support",
          type: feedbackType,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");
      setFeedbackSent(true);
      setFeedback("");
      setTimeout(() => setFeedbackSent(false), 4000);
    } catch {
      setFeedbackError("Something went wrong. Please try again.");
    } finally {
      setFeedbackLoading(false);
    }
  };

  return {
    feedback,
    setFeedback,
    feedbackType,
    setFeedbackType,
    feedbackSent,
    feedbackLoading,
    feedbackError,
    handleFeedbackSubmit,
  };
}
