import React, { useState } from "react";
import {
  FaTimes, FaWhatsapp, FaTelegramPlane,
  FaFacebookF, FaTwitter, FaLink,
} from "react-icons/fa";

/**
 * ShareSheet
 * Social share panel — WhatsApp, Telegram, Twitter, Facebook + copy link.
 * Shared by News.jsx aur NewsCardWithActions.jsx.
 */
export default function ShareSheet({ item, onClose }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/news/${item._id}`;
  const text     = encodeURIComponent((item.description || "").slice(0, 100));
  const url      = encodeURIComponent(shareUrl);

  const copy = async () => {
    try { await navigator.clipboard.writeText(shareUrl); }
    catch {
      const t = document.createElement("textarea");
      t.value = shareUrl;
      document.body.appendChild(t); t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = [
    { name: "WhatsApp", icon: <FaWhatsapp />,      color: "#25d366", href: `https://wa.me/?text=${text}%20${url}` },
    { name: "Telegram", icon: <FaTelegramPlane />, color: "#229ed9", href: `https://t.me/share/url?url=${url}&text=${text}` },
    { name: "Twitter",  icon: <FaTwitter />,       color: "#000",    href: `https://twitter.com/intent/tweet?text=${text}&url=${url}` },
    { name: "Facebook", icon: <FaFacebookF />,     color: "#1877f2", href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
  ];

  return (
    <div className="nc-overlay" onClick={onClose}>
      <div className="nc-panel" onClick={(e) => e.stopPropagation()}>
        <div className="nc-panel-handle" />
        <div className="nc-panel-header">
          <span className="nc-panel-title">Share</span>
          <button className="nc-panel-close" onClick={onClose}><FaTimes /></button>
        </div>
        <div className="nc-share-platforms">
          {platforms.map((p) => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="nc-share-item">
              <div className="nc-share-icon" style={{ background: p.color }}>{p.icon}</div>
              <span>{p.name}</span>
            </a>
          ))}
        </div>
        <div className="nc-share-copy-row">
          <div className="nc-share-link-box">
            <span className="nc-share-link-text">{shareUrl}</span>
          </div>
          <button className="nc-share-copy-btn" onClick={copy}>
            {copied ? "✓ Copied" : <><FaLink /> Copy</>}
          </button>
        </div>
      </div>
    </div>
  );
}
