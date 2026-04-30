import React from "react";
import API_BASE_URL from "../config/api.js";
import "../styles/SocietyMemberCard.css";

const getImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

const DEFAULT_AVATAR = "https://randomuser.me/api/portraits/men/1.jpg";

/**
 * Reusable card for Members, Following, Suggestions sections.
 *
 * Props:
 *  item        – society or student object
 *  isStudent   – boolean, true for student cards (uses item.name / item.course)
 *  isJoined    – boolean, whether already joined/followed
 *  onJoin      – callback for join/unjoin button click
 *  onCardClick – callback for card click (navigate)
 */
export default function SocietyMemberCard({
  item,
  isStudent = false,
  isJoined = false,
  onJoin,
  onCardClick,
}) {
  const name    = isStudent ? item.name        : item.societyName;
  const line1   = isStudent ? item.collegeName : item.collegeName;
  const line2   = isStudent ? item.course      : item.societyType;
  const avatar  = isStudent ? item.profilePic  : item.profilePic;

  return (
    <div className="smc-card" onClick={onCardClick}>

      {/* Avatar */}
      <div className="smc-avatar-wrap">
        <img
          src={getImageUrl(avatar, DEFAULT_AVATAR)}
          className="smc-avatar"
          alt={name}
        />
      </div>

      {/* Name */}
      <p className="smc-name">{name}</p>

      {/* Info */}
      <div className="smc-divider" />
      <p className="smc-line">{line1}</p>
      <p className="smc-line">{line2}</p>

      {/* Join Button */}
      <button
        className={`smc-join ${isJoined ? "smc-join--joined" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onJoin(item);
        }}
      >
        {isJoined ? "Joined ✓" : "Join Us"}
      </button>
    </div>
  );
}
