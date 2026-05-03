// src/config/api.js — FIXED
// Centralized API base URL + token helper

export const API_BASE = import.meta.env.VITE_API_URL || "https://duventra-backend.onrender.com";

/**
 * Returns headers with Authorization token if logged in.
 * Usage: fetch(url, { headers: authHeaders() })
 */
export const authHeaders = (extraHeaders = {}) => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extraHeaders,
  };
};

/**
 * For multipart/form-data requests (file uploads) — don't set Content-Type manually.
 */
export const authHeadersMultipart = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
