import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import API_BASE_URL from "../config/api.js";

/**
 * useNewsFeed
 * News list fetch, filter, delete, aur notification scroll-highlight.
 */
export default function useNewsFeed() {
  const [newsList,    setNewsList]    = useState([]);
  const [filter,      setFilter]      = useState("all");
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);
  const [highlightId, setHighlightId] = useState(null);

  const location = useLocation();

  const load = () => {
    setLoading(true);
    setError(null);
    fetch(`${API_BASE_URL}/api/news/all`)
      .then((r) => r.json())
      .then((data) => setNewsList(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load news. Check your connection."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  // Scroll to news from notification
  useEffect(() => {
    const targetId = location.state?.scrollToNewsId;
    if (!targetId) return;
    setHighlightId(String(targetId));
    const doScroll = () => {
      const el = document.getElementById(`news-${targetId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => setHighlightId(null), 3000);
      } else {
        setTimeout(doScroll, 200);
      }
    };
    const timer = setTimeout(doScroll, 400);
    return () => clearTimeout(timer);
  }, [location.state?.scrollToNewsId]);

  const filtered = newsList.filter((item) => {
    if (filter === "all") return true;
    const d = new Date(item.createdAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (filter === "today")     return d.toDateString() === today.toDateString();
    if (filter === "yesterday") return d.toDateString() === yesterday.toDateString();
    return true;
  });

  const handleDelete = (id) =>
    setNewsList((prev) => prev.filter((n) => n._id !== id));

  return {
    newsList, filtered, filter, setFilter,
    loading, error, load,
    highlightId, handleDelete,
  };
}
