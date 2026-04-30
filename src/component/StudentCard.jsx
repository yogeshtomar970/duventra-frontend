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
  actionFollowedStyle,
}) {
  return (
    <div
      className="modern-member-card"
      onClick={onCardClick}
    >
      <img
        src={getImageUrl(item.profilePic, defaultAvatar)}
        className="modern-member-img"
        alt={item.name}
      />
      <h4>{item.name}</h4>
      <div className="member-info">
        <p>{item.collegeName}</p>
        <p>{item.course}</p>
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
