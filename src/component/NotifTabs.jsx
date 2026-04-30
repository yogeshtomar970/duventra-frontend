import React from "react";
import { TABS, TYPE_CONFIG } from "../notificationHelpers.js";

/**
 * NotifTabs
 * Horizontally scrollable filter tabs with per-tab unread counts.
 */
export default function NotifTabs({ activeTab, setActiveTab, tabUnread }) {
  return (
    <div className="notif-tabs">
      {TABS.map((tab) => {
        const cnt = tabUnread(tab);
        return (
          <button
            key={tab}
            className={`notif-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "all" ? "All" : TYPE_CONFIG[tab]?.label}
            {cnt > 0 && (
              <span className="notif-tab-badge">{cnt}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
