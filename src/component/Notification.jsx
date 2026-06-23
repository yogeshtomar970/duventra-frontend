import React from "react";
import BottomNav from "./BottomNav";
import "../styles/Notification.css";

import NotificationHeader from "../component/NotificationHeader";
import NotifTabs from "../component/NotifTabs";
import NotifEmpty from "../component/NotifEmpty";
import NotificationCard from "../component/NotificationCard";
import NotifNotLoggedIn from "../component/NotifNotLoggedIn";

import useNotifications from "../hooks/useNotifications";

export default function Notification() {
  const {
    userId, loading, activeTab, setActiveTab,
    displayed, unreadCount, tabUnread,
    markAllRead, handleNotifClick, handleAvatarClick,
    selectMode, selectedIds, allSelected,
    toggleSelectMode, selectAll, deselectAll,
    deleteSelected, deleteAll,
  } = useNotifications();

  if (!userId) return <NotifNotLoggedIn />;

  return (
    <>
      <BottomNav />
      <div className="notification-container">
        <NotificationHeader
          unreadCount={unreadCount}
          onMarkAllRead={markAllRead}
          selectMode={selectMode}
          selectedCount={selectedIds.size}
          totalCount={displayed.length}
          allSelected={allSelected}
          onToggleSelectMode={toggleSelectMode}
          onSelectAll={selectAll}
          onDeselectAll={deselectAll}
          onDeleteSelected={deleteSelected}
          onDeleteAll={deleteAll}
        />

        {!selectMode && (
          <NotifTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabUnread={tabUnread}
          />
        )}

        <div className={`notification-list ${selectMode ? "select-mode-active" : ""}`}>
          {(loading || displayed.length === 0) && (
            <NotifEmpty loading={loading} activeTab={activeTab} />
          )}

          {!loading &&
            displayed.map((note) => (
              <NotificationCard
                key={note._id}
                note={note}
                onClick={handleNotifClick}
                onAvatarClick={handleAvatarClick}
                selectMode={selectMode}
                isSelected={selectedIds.has(note._id)}
              />
            ))}
        </div>
      </div>
    </>
  );
}
