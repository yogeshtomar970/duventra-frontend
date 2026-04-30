import React from "react";
import "../styles/NetworkCard.css";

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
  return (
    <div
      className="modern-member-card"
      onClick={onCardClick}
    >
      <img
        src={getImageUrl(item.profilePic, defaultSociety)}
        className="modern-member-img"
        alt={item.societyName}
      />
      <h4>{item.societyName}</h4>
      <div className="member-info">
        <p>{item.collegeName}</p>
        <p>{item.societyType}</p>
      </div>
      <button
        className="s-join-btn"
        style={isFollowing ? actionFollowedStyle : {}}
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
