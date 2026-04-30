import React from "react";
import { FaEdit } from "react-icons/fa";
import API_BASE_URL from "../config/api.js";
import "../styles/CommitteeCard.css";

const getImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

const DEFAULT_AVATAR = "https://randomuser.me/api/portraits/men/1.jpg";

export default function CommitteeCard({ committee, onEditClick }) {
  return (
    <div className="cc-card">

      {/* ── Left Panel ── */}
      <div className="cc-left">
        <div className="cc-left-inner">
          <p className="cc-side-label">Committee</p>
          <p className="cc-side-count">{committee?.length || 0}</p>
          <p className="cc-side-sub">Members</p>
        </div>

        <button className="cc-edit-btn" onClick={onEditClick}>
          <FaEdit size={13} />
          Edit
        </button>
      </div>

      {/* ── Right Panel ── */}
      <div className="cc-right">
        <div className="cc-r-header">
          <p className="cc-r-title">Society Committee</p>
        </div>

        <div className="cc-divider" />

        {committee?.length === 0 || !committee ? (
          <div className="cc-empty">
            <span>No committee members added yet</span>
          </div>
        ) : (
          <div className="cc-grid">
            {committee.map((member, index) => (
              <div className="cc-member" key={index}>
                <div className="cc-avatar-wrap">
                  <img
                    src={getImageUrl(member.studentId?.profilePic, DEFAULT_AVATAR)}
                    alt={member.studentId?.name}
                    className="cc-avatar"
                  />
                </div>
                <p className="cc-name">{member.studentId?.name}</p>
                <span className="cc-post">{member.post}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
