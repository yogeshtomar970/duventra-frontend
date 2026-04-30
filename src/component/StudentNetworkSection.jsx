import React from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
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
    <>
      <div className="section-search-header">
        <h2 className="section-heading">
          {title} ({items.length})
        </h2>
        <div className="section-search-wrap">
          {searchOpen ? (
            <div className="section-search-box">
              <FaSearch className="section-search-icon" />
              <input
                autoFocus
                className="section-search-input"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                className="section-search-clear"
                onClick={() => {
                  setSearchValue("");
                  setSearchOpen(false);
                }}
              >
                <FaTimes />
              </button>
            </div>
          ) : (
            <button
              className="section-search-btn"
              onClick={() => setSearchOpen(true)}
            >
              <FaSearch />
            </button>
          )}
        </div>
      </div>

      <div className="horizontal-scrolls">
        {items.length === 0 ? (
          <p className="empty-text">{emptyMessage}</p>
        ) : (
          items.map((item, index) => renderCard(item, index))
        )}
      </div>
    </>
  );
}
