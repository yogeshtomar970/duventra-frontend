import React from "react";
import { FaSearch } from "react-icons/fa";
import { getAvatar, formatTime } from "../hooks/messageUtils.js";
import "../styles/MsgSidebar.css";

export default function MsgSidebar({
  inbox, selectedChat, onlineUsers,
  loadingInbox, loadingSearch,
  showSearch, search, searchResults,
  myId,
  onNewChat, onSearchChange, onSearchClear,
  onOpenChat,
}) {
  return (
    <aside className="msg-sidebar">

      {/* ── Header ── */}
      <div className="msg-sidebar-header">
        <div className="msg-sidebar-title">
          <span className="msg-sidebar-icon">💬</span>
          <h2>Messages</h2>
        </div>
        <button className="msg-new-btn" onClick={onNewChat} title="New chat">
          {showSearch ? "✕" : <FaSearch />}
        </button>
      </div>

      {/* ── Search panel ── */}
      {showSearch && (
        <div className="msg-search-panel">
          <div className="msg-search-wrap">
            <span className="msg-search-icon">🔍</span>
            <input
              className="msg-search-input"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
            />
            {search && (
              <button className="msg-search-clear" onClick={onSearchClear}>✕</button>
            )}
          </div>

          {loadingSearch && (
            <div className="msg-search-state">
              <div className="msg-spinner" /><span>Searching...</span>
            </div>
          )}

          {!loadingSearch && search.trim() && searchResults.length === 0 && (
            <div className="msg-search-state">
              <span style={{ fontSize: "1.5rem" }}>🔎</span>
              <p>No user found for "<strong>{search}</strong>"</p>
            </div>
          )}

          {searchResults.map((u) => (
            <div
              key={u.userId}
              className="msg-user-row"
              onClick={() => onOpenChat({ user: u, lastMessage: null, unread: 0 })}
            >
              <div className="msg-avatar-wrap">
                <img src={getAvatar(u)} alt={u.name} className="msg-avatar" />
              </div>
              <div className="msg-user-info">
                <span className="msg-user-name">{u.name}</span>
                <span className="msg-user-email">{u.email}</span>
              </div>
              <span className="msg-arrow">→</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Inbox ── */}
      {!showSearch && (
        <div className="msg-inbox">
          {loadingInbox ? (
            <div className="msg-inbox-state">
              <div className="msg-spinner" /><span>Loading chats...</span>
            </div>
          ) : inbox.length === 0 ? (
            <div className="msg-inbox-state msg-inbox-empty">
              <span style={{ fontSize: "2.5rem" }}>💬</span>
              <p>No messages yet</p>
              <span className="msg-empty-hint">Tap ✏️ to start a new conversation</span>
            </div>
          ) : (
            inbox.map((item) => (
              <div
                key={item.user.userId}
                className={`msg-inbox-row ${selectedChat?.user.userId === item.user.userId ? "active" : ""}`}
                onClick={() => onOpenChat(item)}
              >
                <div className="msg-avatar-wrap">
                  <img src={getAvatar(item.user)} alt={item.user.name} className="msg-avatar" />
                  {onlineUsers.has(item.user.userId) && <span className="msg-online-dot" />}
                </div>
                <div className="msg-inbox-info">
                  <div className="msg-inbox-top">
                    <span className="msg-inbox-name">{item.user.name}</span>
                    <span className="msg-inbox-time">{formatTime(item.lastMessage?.createdAt)}</span>
                  </div>
                  <div className="msg-inbox-bottom">
                    <span className="msg-inbox-preview">
                      {item.lastMessage?.senderId === myId && <em>You: </em>}
                      {(item.lastMessage?.text || "").slice(0, 36)}
                      {(item.lastMessage?.text?.length || 0) > 36 ? "…" : ""}
                    </span>
                    {item.unread > 0 && (
                      <span className="msg-unread-badge">
                        {item.unread > 99 ? "99+" : item.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </aside>
  );
}
