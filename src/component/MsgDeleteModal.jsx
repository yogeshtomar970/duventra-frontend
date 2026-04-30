import React from "react";
import "../styles/MsgDeleteModal.css";

export default function MsgDeleteModal({ selectedChat, onCancel, onConfirm }) {
  return (
    <div className="msg-modal-overlay" onClick={onCancel}>
      <div className="msg-modal" onClick={(e) => e.stopPropagation()}>
        <div className="msg-modal-icon">🗑️</div>
        <h3>Chat Delete Karen?</h3>
        <p>
          <strong>{selectedChat?.user.name}</strong> ke saath saari messages
          hamesha ke liye delete ho jaayengi.
        </p>
        <div className="msg-modal-actions">
          <button className="msg-modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="msg-modal-confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
