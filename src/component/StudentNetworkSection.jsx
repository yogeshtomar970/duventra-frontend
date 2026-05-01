import React from "react";
import "../styles/StudentNetworkSection.css";

/**
 * StudentNetworkSection
 * Reusable horizontal scroll section with search.
 * Society cards aur Student cards dono handle karta hai.
 */
export default function StudentNetworkSection({
  title,
  items,
  searchOpen,
  setSearchOpen,
  searchValue,
  setSearchValue,
  emptyMessage,
  renderCard,
}) {
  return (
    <div className="sns-section">

      {/* ── Header ── */}
      <div className="sns-header">
        <p className="sns-heading">
          {title}{" "}
          <span className="sns-count">({items.length})</span>
        </p>

        <div className="sns-search-wrap">
          {searchOpen ? (
            <div className="sns-search-box">
              {/* Search Icon */}
              <svg
                className="sns-search-icon"
                width="13" height="13" viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <input
                autoFocus
                className="sns-search-input"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />

              <button
                className="sns-clear-btn"
                onClick={() => {
                  setSearchValue("");
                  setSearchOpen(false);
                }}
              >
                <svg
                  width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              className="sns-search-btn"
              onClick={() => setSearchOpen(true)}
            >
              <svg
                width="13" height="13" viewBox="0 0 24 24"
                fill="none" stroke="#8b5e3c"
                strokeWidth="2.5" strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Horizontal Scroll ── */}
      <div className="sns-scroll">
        {items.length === 0 ? (
          <p className="sns-empty">{emptyMessage}</p>
        ) : (
          items.map((item, index) => renderCard(item, index))
        )}
      </div>
    </div>
  );
}
