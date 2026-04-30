import React from "react";

/**
 * NewsFeedState
 * Loading dots, error message with retry, empty message.
 */
export default function NewsFeedState({ loading, error, empty, onRetry }) {
  if (loading) return (
    <div className="news-state-center">
      <div className="news-loader">
        <div /><div /><div />
      </div>
      <p>Loading news…</p>
    </div>
  );

  if (error) return (
    <div className="news-state-center">
      <p className="news-error">{error}</p>
      <button className="news-retry-btn" onClick={onRetry}>Try again</button>
    </div>
  );

  if (empty) return (
    <div className="news-state-center">
      <p className="news-empty">No news for this filter yet.</p>
    </div>
  );

  return null;
}
