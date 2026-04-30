import React from "react";

const FILTERS = [
  ["all",       "All"],
  ["today",     "Today"],
  ["yesterday", "Yesterday"],
];

/**
 * NewsFilterBar
 * Sticky filter row below top bar.
 */
export default function NewsFilterBar({ filter, setFilter }) {
  return (
    <div className="news-filter">
      {FILTERS.map(([val, label]) => (
        <button
          key={val}
          className={`filter-btn${filter === val ? " active" : ""}`}
          onClick={() => setFilter(val)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
