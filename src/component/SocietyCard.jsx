import React from "react";
import API_BASE_URL from "../config/api.js";
import "../styles/NetworkCard.css";

const getImgUrl = (url, fallback) => {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function SocietyCard({
  item,
  isFollowing,
  getImageUrl,
  defaultSociety,
  onCardClick,
  onActionClick,
  actionLabel,
  actionFollowedStyle,
}) {
  const imgFn = getImageUrl || getImgUrl;
  const hasImg = !!item?.profilePic;

  return (
    <div className="nc-card" onClick={onCardClick}>

      {/* Avatar */}
      <div className="nc-av">
        {hasImg ? (
          <img src={imgFn(item.profilePic, defaultSociety)} alt={item.societyName} />
        ) : (
          getInitials(item.societyName)
        )}
      </div>

      {/* Name */}
      <p className="nc-name">{item.societyName}</p>

      {/* Divider */}
      <div className="nc-divider" />

      {/* Info */}
      <p className="nc-line">{item.collegeName}</p>
      <p className="nc-line">{item.societyType}</p>

      {/* Join Button */}
      <button
        className={`nc-btn${isFollowing ? " nc-btn--joined" : ""}`}
        onClick={(e) => { e.stopPropagation(); onActionClick(item); }}
      >
        {actionLabel}
      </button>
    </div>
  );
}
