import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "./BottomNav";
import "../PrivacyPolicy.css";

const sections = [
  {
    id: "information",
    icon: "📋",
    title: "Information We Collect",
    content: [
      {
        subtitle: "Account Information",
        text: "When you register on DU Eventra, we collect your name, college email address, role (student or society), and profile details you choose to provide such as your department, year, and profile photo.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you interact with the app — pages visited, events viewed, posts liked or commented on, and time spent on the platform.",
      },
      {
        subtitle: "Device Information",
        text: "We may collect device identifiers, browser type, operating system, and IP address for security purposes and to improve your experience.",
      },
    ],
  },
  {
    id: "how-we-use",
    icon: "⚙️",
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Platform Operation",
        text: "Your information is used to create and manage your account, display your profile, enable you to follow societies, join events, and interact with posts and news.",
      },
      {
        subtitle: "Notifications",
        text: "We use your contact information to send you relevant notifications about events, updates from societies you follow, and activity on your posts or comments.",
      },
      {
        subtitle: "Safety & Security",
        text: "We use data to detect and prevent fraudulent activity, abuse, and violations of our community guidelines to keep the platform safe for all users.",
      },
    ],
  },
  {
    id: "sharing",
    icon: "🔗",
    title: "Sharing Your Information",
    content: [
      {
        subtitle: "What We Do Not Do",
        text: "We do not sell, rent, or trade your personal information to third parties for marketing purposes. Your data is yours.",
      },
      {
        subtitle: "Public Profile Information",
        text: "Your profile name, role, and public posts are visible to other logged-in users on the platform. You control what additional information appears on your profile.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose your information if required by law, court order, or to protect the rights and safety of our users and the platform.",
      },
    ],
  },
  {
    id: "data-retention",
    icon: "🗄️",
    title: "Data Retention",
    content: [
      {
        subtitle: "Account Data",
        text: "We retain your account information for as long as your account is active. When you delete your account, your personal data is removed from our systems within 30 days.",
      },
      {
        subtitle: "Content You Post",
        text: "Posts, news, and comments you create remain on the platform until you delete them. Deleting your account will also permanently remove all content you've uploaded.",
      },
    ],
  },
  {
    id: "security",
    icon: "🔒",
    title: "Security",
    content: [
      {
        subtitle: "Our Measures",
        text: "We use industry-standard security measures including encrypted data transmission (HTTPS), secure password hashing, and token-based authentication to protect your account.",
      },
      {
        subtitle: "Your Responsibility",
        text: "Keep your login credentials confidential and log out from shared devices. Report suspicious activity on your account to our support team immediately.",
      },
    ],
  },
  {
    id: "your-rights",
    icon: "✅",
    title: "Your Rights",
    content: [
      {
        subtitle: "Access & Correction",
        text: "You can view and update your profile information at any time through the My Profile section in the app.",
      },
      {
        subtitle: "Account Deletion",
        text: "You have the right to request deletion of your account and all associated data. Contact our support team and we will process your request within 7 business days.",
      },
      {
        subtitle: "Data Portability",
        text: "You may request a copy of your data at any time by reaching out to us through the Help & Support section.",
      },
    ],
  },
  {
    id: "cookies",
    icon: "🍪",
    title: "Cookies & Local Storage",
    content: [
      {
        subtitle: "What We Store Locally",
        text: "DU Eventra uses browser local storage to keep you logged in and remember your session. This data stays on your device and is not transmitted to third parties.",
      },
      {
        subtitle: "Clearing Data",
        text: "You can clear this data at any time through your browser or device settings. Doing so will log you out of the app.",
      },
    ],
  },
  {
    id: "contact",
    icon: "📬",
    title: "Contact Us",
    content: [
      {
        subtitle: "Questions or Concerns",
        text: "If you have any questions about this Privacy Policy or how your data is handled, please reach out to us through the Help & Support page in the app or email us at privacy@dueventra.in",
      },
      {
        subtitle: "Updates to This Policy",
        text: "We may update this Privacy Policy from time to time. We will notify you of significant changes through the app. Your continued use of DU Eventra after changes take effect constitutes your acceptance of the revised policy.",
      },
    ],
  },
];

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <div className="pp-page">
      {/* Header */}
      <div className="pp-header">
        <button className="pp-back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <div className="pp-header-text">
          <h1>Privacy Policy</h1>
          <p>Last updated: April 2026</p>
        </div>
        <span className="pp-header-icon">🔐</span>
      </div>

      {/* Hero banner */}
      <div className="pp-hero">
        <div className="pp-hero-icon">🛡️</div>
        <p className="pp-hero-title">Your Privacy Matters</p>
        <p className="pp-hero-sub">
          DU Eventra is built for the Delhi University community. We are
          committed to being transparent about how your data is used and to
          keeping it safe.
        </p>
      </div>

      {/* Accordion sections */}
      <div className="pp-content">
        <p className="pp-section-label">POLICY DETAILS</p>

        <div className="pp-accordion">
          {sections.map((sec) => (
            <div
              key={sec.id}
              className={`pp-card ${expanded === sec.id ? "pp-card--open" : ""}`}
            >
              <button
                className="pp-card-header"
                onClick={() => toggle(sec.id)}
              >
                <span className="pp-card-icon">{sec.icon}</span>
                <span className="pp-card-title">{sec.title}</span>
                <span className="pp-card-chevron">
                  {expanded === sec.id ? "▲" : "▼"}
                </span>
              </button>

              {expanded === sec.id && (
                <div className="pp-card-body">
                  {sec.content.map((item, i) => (
                    <div key={i} className="pp-item">
                      <p className="pp-item-subtitle">{item.subtitle}</p>
                      <p className="pp-item-text">{item.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pp-footer-note">
          <span>📌</span>
          <p>
            By using DU Eventra, you agree to the collection and use of
            information as described in this policy.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
