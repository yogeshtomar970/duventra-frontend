import { useState, useEffect } from "react";
import API_BASE_URL from "../config/api.js";

/**
 * useEventFeed
 * Posts fetch karna, filter apply karna, aur scroll-to-post logic —
 * saari API aur side-effect logic yahan hai.
 */
export default function useEventFeed({ filters, scrollToPostId }) {
  const [posts, setPosts]             = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [highlightId, setHighlightId] = useState(null);

  // ── Fetch all posts once ───────────────────────────────
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/post/all`)
      .then((res) => res.json())
      .then((data) => {
        const list = data.posts || [];
        setPosts(list);
        setFilteredPosts(list);
      })
      .catch(() => setError("Failed to load posts"))
      .finally(() => setLoading(false));
  }, []);

  // ── Re-filter whenever filters prop changes ────────────
  useEffect(() => {
    if (!filters) { setFilteredPosts(posts); return; }

    let updated = [...posts];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      updated = updated.filter(
        (p) =>
          p.description?.toLowerCase().includes(q) ||
          p.societyName?.toLowerCase().includes(q)
      );
    }

    if (filters.eventTypes?.length > 0) {
      updated = updated.filter((p) =>
        p.eventTypes?.some((t) => filters.eventTypes.includes(t))
      );
    }

    if (filters.college) {
      updated = updated.filter(
        (p) =>
          p.collegeName?.toLowerCase().trim() ===
          filters.college?.toLowerCase().trim()
      );
    }

    setFilteredPosts(updated);
  }, [filters, posts]);

  // ── Scroll to post from notification ──────────────────
  useEffect(() => {
    if (!scrollToPostId) return;
    setHighlightId(String(scrollToPostId));

    const doScroll = () => {
      const el = document.getElementById(`post-${scrollToPostId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => setHighlightId(null), 3000);
      } else {
        setTimeout(doScroll, 200);
      }
    };

    const timer = setTimeout(doScroll, 400);
    return () => clearTimeout(timer);
  }, [scrollToPostId]);

  // ── Build image URL ────────────────────────────────────
  const getProfileImg = (post) => {
    if (post.profilePic) {
      return post.profilePic.startsWith("http")
        ? post.profilePic
        : `${API_BASE_URL}${post.profilePic}`;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      post.societyName || "S"
    )}&background=0e132f&color=fff`;
  };

  const getPosterImg = (post) => {
    if (!post.image) return null;
    return post.image.startsWith("http")
      ? post.image
      : `${API_BASE_URL}${post.image}`;
  };

  return {
    filteredPosts,
    loading,
    error,
    highlightId,
    getProfileImg,
    getPosterImg,
  };
}
