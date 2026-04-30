import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TYPE_CONFIG } from "../notificationHelpers.js";

/**
 * NotifEmpty
 * Shows loading spinner or empty state depending on props.
 */
export default function NotifEmpty({ loading, activeTab }) {
  if (loading) {
    return (
      <div className="notif-empty">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" style={{ opacity: 0.4 }} />
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="notif-empty">
      <FontAwesomeIcon icon={faBell} size="3x" style={{ opacity: 0.15 }} />
      <p>No {activeTab !== "all" ? activeTab : ""} notifications yet</p>
      <span className="notif-empty-sub">
        {activeTab === "all"
          ? "Jab koi aapki post like ya comment karega, yahan dikhega"
          : `No ${TYPE_CONFIG[activeTab]?.label?.toLowerCase()} notifications`}
      </span>
    </div>
  );
}
