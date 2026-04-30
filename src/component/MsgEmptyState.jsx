import React from "react";
import "../styles/MsgEmptyState.css";

export default function MsgEmptyState() {
  return (
    <div className="msg-empty-state">
      <div className="msg-empty-illustration">💬</div>
      <h3>Koi chat select nahi hua</h3>
      <p>Left panel se kisi ko select karein ya naya chat shuru karein</p>
    </div>
  );
}
