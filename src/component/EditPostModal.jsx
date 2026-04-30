import React from "react";
import "../styles/EditPostModal.css";

export default function EditPostModal({
  editDescription,
  setEditDescription,
  editFormLink,
  setEditFormLink,
  onSave,
  onClose,
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <div className="modal-header-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b5651d" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </div>
          <div>
            <p className="modal-header-title">Edit Post</p>
            <p className="modal-header-sub">Update post details</p>
          </div>
        </div>

        <div className="modal-body">
          <label className="modal-field-label">Description</label>
          <textarea
            className="bio-input"
            placeholder="Description likhein..."
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={4}
          />

          <label className="modal-field-label epm-label--top">Form Link</label>
          <input
            type="url"
            className="epm-url-input"
            placeholder="https://forms.google.com/..."
            value={editFormLink}
            onChange={(e) => setEditFormLink(e.target.value)}
          />

          <button className="modal-btn" onClick={onSave}>Save Changes</button>
          <button className="close-btn" onClick={onClose}>Cancel</button>
        </div>

      </div>
    </div>
  );
}
