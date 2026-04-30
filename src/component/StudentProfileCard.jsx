import React from "react";
import "../styles/StudentProfileCard.css";

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function StudentProfileCard({
  student,
  getImageUrl,
  defaultAvatar,
  onEditClick,
}) {
  const hasImage = !!student?.profilePic;
  const imgSrc = getImageUrl(student?.profilePic, defaultAvatar);

  return (
    <div className="sp-card">

      {/* ── Left Panel ── */}
      <div className="sp-left">
        <div className="sp-avatar-frame">
          {hasImage ? (
            <img src={imgSrc} alt="avatar" className="sp-avatar-img" />
          ) : (
            <span className="sp-avatar-initials">
              {getInitials(student?.name)}
            </span>
          )}
        </div>

        <p className="sp-side-name">{student?.name || "Student Name"}</p>

        {student?.userId && (
          <span className="sp-uid-pill">{student.userId}</span>
        )}

        <button className="sp-edit-btn" onClick={onEditClick}>
          <svg
            viewBox="0 0 24 24" width="13" height="13" fill="none"
            stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit Profile
        </button>
      </div>

      {/* ── Right Panel ── */}
      <div className="sp-right">

        <div className="sp-r-header">
          <p className="sp-r-name">{student?.name || "Student Name"}</p>
          <p className="sp-r-college">
            <svg
              viewBox="0 0 24 24" width="13" height="13" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            {student?.collegeName || "College Name"}
          </p>
        </div>

        <div className="sp-divider" />

        <div className="sp-fields">
          <div className="sp-field">
            <span className="sp-label">User ID</span>
            <span className="sp-val">{student?.userId || "—"}</span>
          </div>
          <div className="sp-field">
            <span className="sp-label">Student Name</span>
            <span className="sp-val">{student?.name || "—"}</span>
          </div>
          <div className="sp-field">
            <span className="sp-label">Course</span>
            <span className="sp-val">{student?.course || "—"}</span>
          </div>
          <div className="sp-field">
            <span className="sp-label">College Name</span>
            <span className="sp-val">{student?.collegeName || "—"}</span>
          </div>
          <div className="sp-field">
            <span className="sp-label">Year</span>
            {student?.year ? (
              <span className="sp-year-badge">{student.year}</span>
            ) : (
              <span className="sp-val">—</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
