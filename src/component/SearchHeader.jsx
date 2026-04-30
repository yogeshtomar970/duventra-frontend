import React from "react";
import "../styles/SearchHeader.css";

export default function SearchHeader({
  title,
  searchOpen,
  onToggleSearch,
  searchValue,
  onSearchChange,
  onClear,
}) {
  return (
    <div className="sh-header">
      <h2 className="sh-title">{title}</h2>
      <div className="sh-right">
        {searchOpen ? (
          <div className="sh-box">
            <svg className="sh-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b5651d" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              autoFocus
              className="sh-input"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button
              className="sh-clear"
              onClick={() => { onClear(); onToggleSearch(false); }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        ) : (
          <button className="sh-btn" onClick={() => onToggleSearch(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b5651d" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
