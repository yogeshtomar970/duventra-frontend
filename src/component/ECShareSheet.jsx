import React from "react";
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaFacebook,
  FaLink,
} from "react-icons/fa";
import "../styles/ECShareSheet.css";

export default function ECShareSheet({ shareUrl, shareText, copied, onCopy, onClose }) {
  return (
    <div className="ec-overlay" onClick={onClose}>
      <div className="ec-popup-box ec-share-box" onClick={(e) => e.stopPropagation()}>
        <button className="ec-close-btn" onClick={onClose} aria-label="Close">✕</button>
        <h3 className="ec-share-title">Share Post</h3>

        <div className="ec-share-grid">
          <a
            className="ec-share-item"
            href={`https://wa.me/?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="ec-share-icon ec-wa" />
            <span>WhatsApp</span>
          </a>

          <a
            className="ec-share-item"
            href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegramPlane className="ec-share-icon ec-tg" />
            <span>Telegram</span>
          </a>

          <a
            className="ec-share-item"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="ec-share-icon ec-fb" />
            <span>Facebook</span>
          </a>

          <button className="ec-share-item" onClick={onCopy}>
            <FaLink className="ec-share-icon ec-link" />
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>

        <div className="ec-share-url">
          <span>{shareUrl}</span>
        </div>
      </div>
    </div>
  );
}
