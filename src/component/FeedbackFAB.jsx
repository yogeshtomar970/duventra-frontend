import React from "react";
import "../styles/FeedbackFAB.css";

export default function FeedbackFAB({ onClick }) {
  return (
    <button
      className="feedback-fab"
      onClick={onClick}
      title="Give Feedback"
      aria-label="Feedback"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feedback-fab-icon"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <span className="feedback-fab-label">Feedback</span>
    </button>
  );
}
