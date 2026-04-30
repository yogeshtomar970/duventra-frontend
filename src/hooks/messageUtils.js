const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * getAvatar
 * User object se profile pic URL banao, fallback ui-avatars.
 */
export const getAvatar = (user) => {
  if (user?.profilePic && user.profilePic !== "") {
    return user.profilePic.startsWith("http")
      ? user.profilePic
      : `${BASE_URL}${user.profilePic}`;
  }
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || "U"
  )}&background=5a0fc8&color=fff&size=128&bold=true`;
};

/**
 * formatTime
 * ISO string ko "10:30 AM", "Yesterday", "Mon", "12 Jun" format mein convert karo.
 */
export const formatTime = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const diffDays = Math.floor((Date.now() - d) / 86400000);
  if (diffDays === 0)
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return d.toLocaleDateString([], { weekday: "short" });
  return d.toLocaleDateString([], { day: "numeric", month: "short" });
};
