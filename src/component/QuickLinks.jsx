import React from "react";
import "../styles/QuickLinks.css";

/**
 * QuickLinks
 * Category filter buttons — click se active category toggle hoti hai.
 */
export default function QuickLinks({ faqs, activeCategory, setActiveCategory }) {
  return (
    <section className="hs-section">
      <h2 className="hs-section-title">Quick Help</h2>
      <div className="hs-quick-grid">
        {faqs.map((cat) => (
          <button
            key={cat.category}
            className={`hs-quick-card ${activeCategory === cat.category ? "active" : ""}`}
            onClick={() =>
              setActiveCategory(activeCategory === cat.category ? null : cat.category)
            }
          >
            <span className="hs-quick-icon">{cat.icon}</span>
            <span className="hs-quick-label">{cat.category}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
