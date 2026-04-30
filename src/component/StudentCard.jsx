import React from "react";
import "../styles/NetworkCard.css";

export default function StudentCard({
  item,
  isFollowing,
  getImageUrl,
  defaultAvatar,
  onCardClick,
  onActionClick,
  actionLabel,
}) {
  return (
    <div className="nc-card" onClick={onCardClick}>

      <div className="nc-avatar-wrap">
        <img
          src={getImageUrl(item.profilePic, defaultAvatar)}
          className="nc-avatar"
          alt={item.name}
        />
      </div>

      <p className="nc-name">{item.name}</p>

      <div className="nc-divider" />
      <p className="nc-line">{item.collegeName}</p>
      <p className="nc-line">{item.course}</p>

      <button
        className={`nc-btn ${isFollowing ? "nc-btn--followed" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onActionClick(item);
        }}
      >
        {actionLabel}
      </button>
    </div>
  );
}
