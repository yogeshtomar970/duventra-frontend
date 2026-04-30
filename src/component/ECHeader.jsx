import React from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { getTimeAgo } from "../hooks/getTimeAgo.js";
import "../styles/ECHeader.css";

export default function ECHeader({
  profileimg,
  societyname,
  collegename,
  type,
  time,
  showJoinBtn,
  isJoined,
  onJoin,
  onUnjoin,
  onEditPost,
  onDeletePost,
  showDotMenu,
  setShowDotMenu,
}) {
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    societyname || "S"
  )}&background=0e132f&color=fff&size=60`;

  return (
    <div className="ec-header">
      {/* Society info link */}
      <Link to="/societyprofilelink" className="ec-profile-link">
        <img
          src={profileimg || avatarFallback}
          alt={societyname}
          className="ec-avatar"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = avatarFallback;
          }}
        />
        <div className="ec-meta">
          <span className="ec-society-name">{societyname}</span>
          <span className="ec-college">{collegename}</span>
          <span className="ec-type">{type}</span>
        </div>
      </Link>

      {/* Right side — time + dot menu + join */}
      <div className="ec-header-right">
        <span className="ec-time">{getTimeAgo(time)}</span>

        {/* 3-dot menu — only when edit/delete callbacks passed */}
        {(onEditPost || onDeletePost) && (
          <div className="ec-dot-wrap">
            <button
              className="ec-dot-btn"
              onClick={() => setShowDotMenu((v) => !v)}
              title="Options"
            >
              ⋮
            </button>

            {showDotMenu && (
              <>
                {/* backdrop to close menu */}
                <div
                  className="ec-dot-backdrop"
                  onClick={() => setShowDotMenu(false)}
                />
                <div className="ec-dot-menu">
                  {onEditPost && (
                    <button
                      className="ec-dot-item"
                      onClick={() => { setShowDotMenu(false); onEditPost(); }}
                    >
                      ✏️ Edit Post
                    </button>
                  )}
                  {onEditPost && onDeletePost && (
                    <div className="ec-dot-divider" />
                  )}
                  {onDeletePost && (
                    <button
                      className="ec-dot-item ec-dot-item--danger"
                      onClick={() => { setShowDotMenu(false); onDeletePost(); }}
                    >
                      🗑️ Delete Post
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Join / Joined button */}
        {showJoinBtn && !isJoined && (
          <button className="join-btn" onClick={onJoin}>Join Us</button>
        )}
        {showJoinBtn && isJoined && (
          <button className="join-btn joined" onClick={onUnjoin}>
            <FaCheck className="tick-icon" /> Joined
          </button>
        )}
      </div>
    </div>
  );
}
