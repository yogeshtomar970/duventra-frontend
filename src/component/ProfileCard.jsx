import React from "react";
import { FaEdit } from "react-icons/fa";
import { FiMessageSquare, FiHome } from "react-icons/fi";
import "../styles/ProfileCard.css";

const getImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;
  return `${import.meta.env.VITE_API_BASE_URL}${url}`;
};

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ProfileCard({ society, onEditClick }) {
  const hasImage = !!society?.profilePic;
  const imgSrc = getImageUrl(society?.profilePic, null);

  return (
    <div className="pc4-card">

      {/* ── Left Panel ── */}
      <div className="pc4-left">
        <div className="pc4-avatar-frame">
          {hasImage ? (
            <img src={imgSrc} alt="profile" className="pc4-avatar-img" />
          ) : (
            <span className="pc4-avatar-initials">
              {getInitials(society?.societyName)}
            </span>
          )}
        </div>

        {/* <p className="pc4-side-name">{society?.societyName || "Society Name"}</p> */}

        {/* {society?.societyType && (
          <span className="pc4-type-pill">{society.societyType}</span>
        )} */}

        <button className="pc4-edit-btn" onClick={onEditClick}>
          <FaEdit size={13} />
          Edit profile
        </button>
      </div>

      {/* ── Right Panel ── */}
      <div className="pc4-right">

        <div className="pc4-r-header">
          <p className="pc4-r-name">{society?.societyName || "Society Name"}</p>
          <p className="pc4-r-college">
            <FiHome size={13} />
            {society?.collegeName || "College Name"}
          </p>
        </div>

        <div className="pc4-divider" />

        <div className="pc4-fields">
       
          <div className="pc4-field">
            <span className="pc4-label">Society Type</span>
            <span className="pc4-val">{society?.societyType || "—"}</span>
          </div>
          
          <div className="pc4-field">
            <span className="pc4-label">Coordinator Name</span>
            <span className="pc4-val">
              {society?.coordinatorName || "Not specified"}
            </span>
          </div>
        </div>

        {society?.bio && (
          <div className="pc4-bio">
            <p className="pc4-bio-heading">Bio</p>
            <p className="pc4-bio-text">{society.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}
