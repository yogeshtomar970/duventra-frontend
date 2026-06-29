import React, { useRef } from "react";
import { FiCamera, FiX, FiUser, FiBook, FiCalendar } from "react-icons/fi";
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
  const fileRef = useRef(null);
  if (!showModal) return null;

  const avatarSrc =
    previewUrl || getImageUrl(student?.profilePic, defaultAvatar);

  return (
    <div className="esp-overlay" onClick={onClose}>
      <div className="esp-sheet" onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="esp-header">
          <button className="esp-close-btn" onClick={onClose}>
            <FiX size={20} />
          </button>
          <h3 className="esp-title">Edit Profile</h3>
          <button className="esp-save-top-btn" onClick={onSave}>
            Save
          </button>
        </div>

        {/* ── Avatar Upload ── */}
        <div className="esp-avatar-section">
          <div className="esp-avatar-wrap" onClick={() => fileRef.current?.click()}>
            <img src={avatarSrc} alt="avatar" className="esp-avatar" />
            <div className="esp-camera-overlay">
              <FiCamera size={18} color="#fff" />
            </div>
          </div>
          <p className="esp-avatar-hint">Tap to change photo</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="esp-hidden-file"
            onChange={(e) => onImageChange(e.target.files[0])}
          />
        </div>

        {/* ── Info (read-only) ── */}
        <div className="esp-info-row">
          <FiUser size={15} className="esp-info-icon" />
          <span className="esp-info-text">{student?.name || "—"}</span>
        </div>

        {/* ── Form Fields ── */}
        <div className="esp-fields">

          <div className="esp-field">
            <label className="esp-label">
              <FiBook size={13} /> College
            </label>
            <input
              type="text"
              className="esp-input"
              value={editCollege}
              onChange={(e) => setEditCollege(e.target.value)}
              placeholder="College name likhein..."
            />
          </div>

          <div className="esp-field">
            <label className="esp-label">
              <FiCalendar size={13} /> Year
            </label>
            <div className="esp-year-pills">
              {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((yr) => (
                <button
                  key={yr}
                  className={`esp-year-pill ${editYear === yr ? "active" : ""}`}
                  onClick={() => setEditYear(yr)}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ── Save Button ── */}
        <button className="esp-save-btn" onClick={onSave}>
          Save Changes
        </button>

      </div>
    </div>
  );
}
