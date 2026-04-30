import React from "react";
import "../styles/EditStudentProfileModal.css";

export default function EditStudentProfileModal({
  student,
  showModal,
  previewUrl,
  editCollege,
  setEditCollege,
  editYear,
  setEditYear,
  getImageUrl,
  defaultAvatar,
  onImageChange,
  onSave,
  onClose,
}) {
  if (!showModal) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Profile</h3>

        <label className="esp-label">Profile Image</label>
        {(previewUrl || student.profilePic) && (
          <img
            src={previewUrl || getImageUrl(student.profilePic, defaultAvatar)}
            alt="preview"
            className="esp-preview-img"
          />
        )}
        <input
          type="file"
          accept="image/*"
          className="esp-file-input"
          onChange={(e) => onImageChange(e.target.files[0])}
        />

        <label className="esp-label">College Name</label>
        <input
          type="text"
          className="esp-text-input"
          value={editCollege}
          onChange={(e) => setEditCollege(e.target.value)}
          placeholder="College name likhein..."
        />

        <label className="esp-label">Year</label>
        <select
          className="esp-select"
          value={editYear}
          onChange={(e) => setEditYear(e.target.value)}
        >
          <option value="">Select Year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>

        <button className="edit-btn esp-save-btn" onClick={onSave}>
          Save Changes
        </button>
        <button className="share-btn esp-cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
