import React, { useState } from "react";
import "../styles/FAQSection.css";

/**
 * FAQItem
 * Ek single accordion FAQ — click se open/close.
 */
export default function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`hs-faq-item ${open ? "open" : ""}`}
      onClick={() => setOpen(!open)}
    >
      <div className="hs-faq-q">
        <span>{q}</span>
        <span className="hs-faq-arrow">{open ? "−" : "+"}</span>
      </div>
      {open && <div className="hs-faq-a">{a}</div>}
    </div>
  );
}
