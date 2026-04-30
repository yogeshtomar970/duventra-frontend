import {
  faBell, faHeart, faComment, faImage,
} from "@fortawesome/free-solid-svg-icons";

export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const TABS = ["all", "like", "comment", "new_post", "join"];

export const TYPE_CONFIG = {
  like:     { icon: faHeart,   color: "#ef4444", label: "❤️ Likes" },
  comment:  { icon: faComment, color: "#3b82f6", label: "💬 Comments" },
  new_post: { icon: faImage,   color: "#8b5cf6", label: "📸 Posts" },
  join:     { icon: faBell,    color: "#10b981", label: "🤝 Joins" },
};

export const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString([], { day: "numeric", month: "short" });
};

export const resolveAvatar = (note) => {
  if (!note.actorProfilePic) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(note.actorName || "?")}&background=7c3aed&color=fff&bold=true`;
  }
  return note.actorProfilePic.startsWith("http")
    ? note.actorProfilePic
    : `${BASE_URL}${note.actorProfilePic}`;
};

export const resolveThumb = (note) => {
  if (!note.postImage) {
    return `https://ui-avatars.com/api/?name=📰&background=6366f1&color=fff&size=48&bold=true`;
  }
  return note.postImage.startsWith("http")
    ? note.postImage
    : `${BASE_URL}${note.postImage}`;
};
