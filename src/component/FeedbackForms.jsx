import React from "react";
import "../styles/FeedbackForms.css";

export default function FeedbackForm({
  rating,
  setRating,
  hoverRating,
  setHoverRating,
  message,
  setMessage,
  loading,
  error,
  onSubmit,
}) {
  return (
    <div className="feedback-body">

      {/* ── Star Rating ── */}
      <div className="feedback-rating-section">
        <label className="feedback-label">Rate your experience</label>
        <div className="feedback-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`feedback-star ${star <= (hoverRating || rating) ? "active" : ""}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`${star} star`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* ── Textarea ── */}
      <div className="feedback-field">
        <label className="feedback-label">Your feedback *</label>
        <textarea
          className="feedback-textarea"
          placeholder="Tell us what you think, what's missing, or what can be better..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          maxLength={500}
        />
        <span className="feedback-char-count">{message.length}/500</span>
      </div>

      {/* ── Error ── */}
      {error && <p className="feedback-error">{error}</p>}

      {/* ── Submit ── */}
      <button
        className="feedback-submit"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? <span className="feedback-spinner" /> : "Submit Feedback"}
      </button>

    </div>
  );
}
