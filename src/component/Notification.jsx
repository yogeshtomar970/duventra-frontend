import React from "react";
import BottomNav from "./BottomNav";
import "../styles/Notification.css";

// Components
import NotificationHeader  from "../component/NotificationHeader";
import NotifTabs           from "../component/NotifTabs";
import NotifEmpty          from "../component/NotifEmpty";
import NotificationCard    from "../component/NotificationCard";
import NotifNotLoggedIn    from "../component/NotifNotLoggedIn";

// Hook
import useNotifications from "../hooks/useNotifications";

export default function Notification() {
  const {
    userId, loading, activeTab, setActiveTab,
    displayed, unreadCount, tabUnread,
    markAllRead, handleNotifClick, handleAvatarClick,
  } = useNotifications();

  if (!userId) return <NotifNotLoggedIn />;

  return (
    <>
      <BottomNav />
      <div className="notification-container">

        <NotificationHeader
          unreadCount={unreadCount}
          onMarkAllRead={markAllRead}
        />

        <NotifTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabUnread={tabUnread}
        />

        <div className="notification-list">
          {(loading || displayed.length === 0) && (
            <NotifEmpty loading={loading} activeTab={activeTab} />
          )}

          {!loading && displayed.map((note) => (
            <NotificationCard
              key={note._id}
              note={note}
              onClick={handleNotifClick}
              onAvatarClick={handleAvatarClick}
            />
          ))}
        </div>

      </div>
    </>
  );
}
