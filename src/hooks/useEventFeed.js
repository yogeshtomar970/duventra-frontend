import { useState, useEffect, useRef, useCallback } from "react";
import API_BASE_URL from "../config/api.js";

export default function useEventFeed({ filters, scrollToPostId }) {
  const [posts, setPosts]                 = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading]             = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError]                 = useState(null);
  const [highlightId, setHighlightId]     = useState(null);
  const [hasMore, setHasMore]             = useState(true);

  const observerRef = useRef(null);
  const pageRef     = useRef(1);
  const loadingRef  = useRef(false);
  const hasMoreRef  = useRef(true);
  const upcomingRef = useRef(!!filters?.upcoming);
  const LIMIT = 10;

  // ── Core fetch — sab refs se, stale closure nahi hoga ──
  const fetchPosts = useCallback(async (pageNum, upcoming) => {
    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const upcomingParam = upcoming ? "&upcoming=true" : "";
      const res  = await fetch(
        `${API_BASE_URL}/api/post/all?page=${pageNum}&limit=${LIMIT}${upcomingParam}`
      );
      const data = await res.json();
      const newPosts = data.posts || [];
      setPosts(prev => (pageNum === 1 ? newPosts : [...prev, ...newPosts]));
      hasMoreRef.current = !!data.hasMore;
      setHasMore(!!data.hasMore);
    } catch {
      setError("Failed to load posts");
    } finally {
      loadingRef.current = false;
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  // ── upcoming toggle hone pe fresh fetch ──
  useEffect(() => {
    const upcoming = !!filters?.upcoming;
    upcomingRef.current  = upcoming;
    pageRef.current      = 1;
    hasMoreRef.current   = true;
    setHasMore(true);
    setPosts([]);
    setInitialLoading(true);
    fetchPosts(1, upcoming);
  }, [filters?.upcoming]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Local filters: search, eventTypes, college ──
  useEffect(() => {
    if (!filters) { setFilteredPosts(posts); return; }
    let updated = [...posts];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      updated = updated.filter(p =>
        p.description?.toLowerCase().includes(q) ||
        p.societyName?.toLowerCase().includes(q)
      );
    }
    if (filters.eventTypes?.length > 0) {
      updated = updated.filter(p =>
        p.eventTypes?.some(t => filters.eventTypes.includes(t))
      );
    }
    if (filters.college) {
      updated = updated.filter(p =>
        p.collegeName?.toLowerCase().trim() ===
        filters.college?.toLowerCase().trim()
      );
    }
    setFilteredPosts(updated);
  }, [filters, posts]);

  // ── Infinite scroll ──
  const lastPostRef = useCallback((node) => {
    if (loadingRef.current) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (
        entries[0].isIntersecting &&
        hasMoreRef.current &&
        !loadingRef.current
      ) {
        pageRef.current += 1;
        fetchPosts(pageRef.current, upcomingRef.current);
      }
    });
    if (node) observerRef.current.observe(node);
  }, [fetchPosts]);

  // ── Scroll to specific post ──
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

  const getProfileImg = (post) => {
    if (post.profilePic) {
      const url = post.profilePic.startsWith("http")
        ? post.profilePic
        : `${API_BASE_URL}${post.profilePic}`;
      if (url.includes("res.cloudinary.com")) {
        return url.replace("/upload/", "/upload/f_auto,q_auto,w_100,h_100,c_fill/");
      }
      return url;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      post.societyName || "S"
    )}&background=0e132f&color=fff`;
  };

  const getPosterImg = (post) => {
    if (!post.image) return null;
    if (!post.image.startsWith("http")) return `${API_BASE_URL}${post.image}`;
    if (post.image.includes("res.cloudinary.com")) {
      return post.image.replace("/upload/", "/upload/f_auto,q_auto,w_800/");
    }
    return post.image;
  };

  const isUpcoming = (post) => {
    if (!post.lastDate) return false;
    return new Date(post.lastDate) >= new Date();
  };

  return {
    filteredPosts,
    loading,
    initialLoading,
    error,
    highlightId,
    getProfileImg,
    getPosterImg,
    isUpcoming,
    lastPostRef,
    hasMore,
  };
}
