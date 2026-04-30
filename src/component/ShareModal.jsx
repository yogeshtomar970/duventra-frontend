import React from "react";
import "../ShareModal.css";
import {
  FaWhatsapp,
  FaInstagram,
  FaTelegramPlane,
  FaFacebookF,
  FaLink,
  FaBluetoothB,
  FaTimes,
} from "react-icons/fa";

const ShareModal = ({ onClose }) => {
  return (
    <div className="share-overlay">
      <div className="share-modal">
        <div className="share-header">
          <h3>Share Post</h3>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        <div className="share-grid">
          <div className="share-item">
            <FaWhatsapp className="icon whatsapp" />
            <span>WhatsApp</span>
          </div>

          <div className="share-item">
            <FaInstagram className="icon instagram" />
            <span>Instagram</span>
          </div>

          <div className="share-item">
            <FaTelegramPlane className="icon telegram" />
            <span>Telegram</span>
          </div>

          <div className="share-item">
            <FaFacebookF className="icon facebook" />
            <span>Facebook</span>
          </div>

          <div className="share-item">
            <FaLink className="icon link" />
            <span>Copy Link</span>
          </div>

          <div className="share-item">
            <FaBluetoothB className="icon bluetooth" />
            <span>Nearby Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
