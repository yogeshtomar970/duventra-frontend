import React from "react";
import "../styles/FeedState.css";

export default function FeedState({ message, isError = false }) {
  return (
    <div className="event-feed-state">
      <p className={isError ? "feed-state--error" : "feed-state--empty"}>
        {message}
      </p>
    </div>
  );
}
