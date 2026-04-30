import React from "react";
import "../styles/FeedbackForm.css";

const FEEDBACK_TYPES = [
  { value: "bug",     label: "🐛 Bug Report" },
  { value: "feature", label: "💡 Feature Request" },
  { value: "other",   label: "💬 Other" },
];

const PLACEHOLDERS = {
  bug:     "Describe the bug — what happened, what did you expect?",
  feature: "What feature would make DU Eventra better for you?",
  other:   "Share any thoughts or suggestions...",
};

/**
 * FeedbackForm
 * Bug/Feature/Other toggle, textarea, submit button, success/error states.
 */
export default function FeedbackForm({
  feedback,
  setFeedback,
  feedbackType,
  setFeedbackType,
  feedbackSent,
  feedbackLoading,
  feedbackError,
  onSubmit,
}) {
  return (
    <section className="hs-section">
      <h2 className="hs-section-title">Send Feedback</h2>
      <div className="hs-feedback-card">

        {/* Type toggle */}
        <div className="hs-feedback-types">
          {FEEDBACK_TYPES.map((t) => (
            <button
              key={t.value}
              className={`hs-type-btn ${feedbackType === t.value ? "active" : ""}`}
              onClick={() => setFeedbackType(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          className="hs-feedback-textarea"
          placeholder={PLACEHOLDERS[feedbackType]}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
        />

        {/* Error */}
        {feedbackError && (
          <div className="hs-feedback-error">{feedbackError}</div>
        )}

        {/* Success / Submit */}
        {feedbackSent ? (
          <div className="hs-feedback-success">
            ✅ Thank you! We'll review your feedback soon.
          </div>
        ) : (
          <button
            className="hs-submit-btn"
            onClick={onSubmit}
            disabled={feedbackLoading}
          >
            {feedbackLoading ? "Sending..." : "Send Feedback"}
          </button>
        )}
      </div>
    </section>
  );
}
