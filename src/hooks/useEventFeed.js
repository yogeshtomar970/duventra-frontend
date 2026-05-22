import { useState, useEffect, useRef, useCallback } from "react";
import API_BASE_URL from "../config/api.js";

export default function useEventFeed({ filters, scrollToPostId }) {
  const [posts, setPosts]               = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading]           = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // pehli baar ka loader
  const [error, setError]               = useState(null);
  const [highlightId, setHighlightId]   = useState(null);
  const [page, setPage]                 = useState(1);
  const [hasMore, setHasMore]           = useState(true);
  const observerRef = useRef(null);     // last post element ko observe karega
  const LIMIT = 10;

  // ── Fetch posts (page-wise) ───────────────────────────
  const fetchPosts = useCallback(async (pageNum) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE_URL}/api/post/all?page=${pageNum}&limit=${LIMIT}`);
      const data = await res.json();
      const newPosts = data.posts || [];

      setPosts(prev => pageNum === 1 ? newPosts : [...prev, ...newPosts]);
      setHasMore(data.hasMore);
    } catch {
      setError("Failed to load posts");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [loading, hasMore]);

  // ── Pehli baar load ───────────────────────────────────
  useEffect(() => {
    fetchPosts(1);
  }, []);

  // ── Filter apply karo ─────────────────────────────────
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
        p.collegeName?.toLowerCase().trim() === filters.college?.toLowerCase().trim()
      );
    }
    setFilteredPosts(updated);
  }, [filters, posts]);

  // ── Infinite Scroll: last post observe karo ───────────
  const lastPostRef = useCallback((node) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(nextPage);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading, hasMore, page, fetchPosts]);

  // ── Scroll to post ────────────────────────────────────
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
      return post.profilePic.startsWith("http")
        ? post.profilePic
        : `${API_BASE_URL}${post.profilePic}`;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(post.societyName || "S")}&background=0e132f&color=fff`;
  };

  const getPosterImg = (post) => {
    if (!post.image) return null;
    return post.image.startsWith("http") ? post.image : `${API_BASE_URL}${post.image}`;
  };

  return {
    filteredPosts,
    loading,
    initialLoading, // ← ye bhi return karo
    error,
    highlightId,
    getProfileImg,
    getPosterImg,
    lastPostRef,    // ← ye bhi return karo
    hasMore,
  };
}