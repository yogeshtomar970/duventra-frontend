import React from "react";
import "../styles/ContactSection.css";

/**
 * ContactSection
 * Email, WhatsApp, Instagram contact cards.
 */
export default function ContactSection({ contactOptions }) {
  return (
    <section className="hs-section">
      <h2 className="hs-section-title">Contact Us</h2>
      <div className="hs-contact-list">
        {contactOptions.map((opt) => (
          <button key={opt.label} className="hs-contact-card" onClick={opt.action}>
            <span
              className="hs-contact-icon"
              style={{ background: opt.color + "22", color: opt.color }}
            >
              {opt.icon}
            </span>
            <div className="hs-contact-info">
              <span className="hs-contact-label">{opt.label}</span>
              <span className="hs-contact-value">{opt.value}</span>
            </div>
            <span className="hs-contact-arrow">→</span>
          </button>
        ))}
      </div>
    </section>
  );
}
