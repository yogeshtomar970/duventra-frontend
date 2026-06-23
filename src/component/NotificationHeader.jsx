import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell, faCheckDouble, faTrash,
  faSquareCheck, faSquare, faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function NotificationHeader({
  unreadCount,
  onMarkAllRead,
  // Select mode props
  selectMode,
  selectedCount,
  totalCount,
  allSelected,
  onToggleSelectMode,
  onSelectAll,
  onDeselectAll,
  onDeleteSelected,
  onDeleteAll,
}) {
  if (selectMode) {
    return (
      <div className="notification-header notif-select-header">
        {/* Cancel */}
        <button className="notif-hdr-btn" onClick={onToggleSelectMode} title="Cancel">
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <span className="notif-select-count">
          {selectedCount} selected
        </span>

        <div className="notif-hdr-actions">
          {/* Select all / deselect all */}
          <button
            className="notif-hdr-btn"
            onClick={allSelected ? onDeselectAll : onSelectAll}
            title={allSelected ? "Deselect all" : "Select all"}
          >
            <FontAwesomeIcon icon={allSelected ? faSquareCheck : faSquare} />
            <span>{allSelected ? "Deselect all" : "Select all"}</span>
          </button>

          {/* Delete selected */}
          {selectedCount > 0 && (
            <button
              className="notif-hdr-btn notif-hdr-btn--delete"
              onClick={onDeleteSelected}
              title="Delete selected"
            >
              <FontAwesomeIcon icon={faTrash} />
              <span>Delete ({selectedCount})</span>
            </button>
          )}

          {/* Delete all */}
          {totalCount > 0 && (
            <button
              className="notif-hdr-btn notif-hdr-btn--delete"
              onClick={onDeleteAll}
              title="Delete all"
            >
              <FontAwesomeIcon icon={faTrash} />
              <span>Delete all</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="notification-header">
      <FontAwesomeIcon icon={faBell} />
      <span>Notifications</span>

      <div className="notif-hdr-actions">
        {unreadCount > 0 && (
          <button
            className="mark-read-btn"
            onClick={onMarkAllRead}
            title="Mark all as read"
          >
            <FontAwesomeIcon icon={faCheckDouble} />
            <span>Mark all read</span>
          </button>
        )}
        <button
          className="mark-read-btn"
          onClick={onToggleSelectMode}
          title="Select notifications"
        >
          <FontAwesomeIcon icon={faSquareCheck} />
          <span>Select</span>
        </button>
      </div>
    </div>
  );
}
