import React from "react";

// ── Hook ──────────────────────────────────────
import useFeedback from "../hooks/useFeedbacks.js";

// ── Sub-components ────────────────────────────
import FeedbackFAB from "./FeedbackFAB.jsx";
import FeedbackHeader from "./FeedbackHeader.jsx";
import FeedbackForm from "./FeedbackForms.jsx";
import FeedbackSuccess from "./FeedbackSuccess.jsx";

// ── Styles ────────────────────────────────────
import "../styles/FeedbackModal.css";

export default function FeedbackButton() {
  const {
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
  } = useFeedback();

  return (
    <>
      {/* ── Floating button ── */}
      <FeedbackFAB onClick={() => setOpen(true)} />

      {/* ── Modal ── */}
      {open && (
        <div className="feedback-overlay" onClick={handleClose}>
          <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>

            <FeedbackHeader onClose={handleClose} />

            {submitted ? (
              <FeedbackSuccess />
            ) : (
              <FeedbackForm
                rating={rating}
                setRating={setRating}
                hoverRating={hoverRating}
                setHoverRating={setHoverRating}
                message={message}
                setMessage={setMessage}
                loading={loading}
                error={error}
                onSubmit={handleSubmit}
              />
            )}

          </div>
        </div>
      )}
    </>
  );
}
