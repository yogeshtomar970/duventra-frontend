import API_BASE_URL from "./config/api.js";

/**
 * newsHelpers.js
 * Dono News.jsx aur NewsCardWithActions.jsx mein use hone wale shared helpers.
 */

export const getUser = () => {
  try { return JSON.parse(localStorage.getItem("user")) || null; }
  catch { return null; }
};

export const fmt = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });

export const resolveImg = (url) => {
  if (!url) return null;
  return url.startsWith("http") ? url : `${API_BASE_URL}/${url.replace(/^\//, "")}`;
};
