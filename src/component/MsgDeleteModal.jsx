import React from "react";
import "../styles/MsgDeleteModal.css";

export default function MsgDeleteModal({ selectedChat, onCancel, onConfirm }) {
  return (
    <div className="msg-modal-overlay" onClick={onCancel}>
      <div className="msg-modal" onClick={(e) => e.stopPropagation()}>
        
        <h3>Chat Delete ?</h3>
        <p>
          All messages will be deleted forever with <strong>{selectedChat?.user.name}</strong>
        </p>
        <div className="msg-modal-actions">
          <button className="msg-modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="msg-modal-confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
