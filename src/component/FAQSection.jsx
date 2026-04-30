import React from "react";
import FAQItem from "./FAQItem";
import "../styles/FAQSection.css";

/**
 * FAQSection
 * Active category ke hisaab se filtered FAQs dikhata hai.
 */
export default function FAQSection({ faqs, activeCategory }) {
  const filtered = activeCategory
    ? faqs.filter((f) => f.category === activeCategory)
    : faqs;

  const activeIcon = faqs.find((f) => f.category === activeCategory)?.icon;
  const title = activeCategory
    ? `${activeIcon} ${activeCategory}`
    : "Frequently Asked Questions";

  return (
    <section className="hs-section">
      <h2 className="hs-section-title">{title}</h2>
      <div className="hs-faq-list">
        {filtered.map((cat) =>
          cat.items.map((item, i) => (
            <FAQItem key={cat.category + i} q={item.q} a={item.a} />
          ))
        )}
      </div>
    </section>
  );
}
