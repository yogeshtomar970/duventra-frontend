import React from "react";
import UploadMenuItem from "./UploadMenuItem";
import { PostSvg, NewsSvg, LoginSvg } from "./UploadIcons";

/**
 * UploadMenu
 * Slide-up panel with upload options based on user role.
 */
export default function UploadMenu({ menuOpen, menuRef, role, user, go }) {
  return (
    <div
      className={`upload-menu ${menuOpen ? "open" : ""}`}
      ref={menuRef}
    >
      {/* Upload Post — society only */}
      {role === "society" && (
        <UploadMenuItem
          onClick={() => go("/upload")}
          animationDelay="0.08s"
          iconClass="post-icon"
          itemClass="upload-menu-post"
          icon={PostSvg}
          title="Upload Post"
          subtitle="Photo, event, announcement"
        />
      )}

      {/* Upload News — student & society */}
      {(role === "student" || role === "society") && (
        <UploadMenuItem
          onClick={() => go("/upload-news")}
          animationDelay={role === "society" ? "0.04s" : "0.08s"}
          iconClass="news-icon"
          itemClass="upload-menu-news"
          icon={NewsSvg}
          title="Upload News"
          subtitle="Article, campus news"
        />
      )}

      {/* Not logged in */}
      {!user && (
        <UploadMenuItem
          onClick={() => go("/login")}
          animationDelay="0.04s"
          iconClass="news-icon"
          itemClass="upload-menu-news"
          icon={LoginSvg}
          title="Login to Upload"
          subtitle="Sign in to post content"
        />
      )}
    </div>
  );
}
