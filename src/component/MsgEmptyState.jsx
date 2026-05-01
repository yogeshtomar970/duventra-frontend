import React from "react";
import "../styles/MsgEmptyState.css";

export default function MsgEmptyState() {
  return (
    <div className="msg-empty-state">
      <div className="msg-empty-illustration">💬</div>
      <h3>No Chat Here..</h3>
      <p>Select someone from the left panel or start a new chat</p>
    </div>
  );
}
