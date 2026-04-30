import { useState, useEffect } from "react";
import API_BASE_URL from "../config/api.js";
import { getUser } from "../newsHelpers.js";

/**
 * useNewsCard
 * Like toggle, delete, aur panel (comments/share/image/edit) open state.
 * News.jsx aur NewsCardWithActions.jsx dono mein reuse hota hai.
 */
export default function useNewsCard({ item, onDeleted }) {
  const user   = getUser();
  const userId = user?.societyId || user?.id;

  const [liked,        setLiked]        = useState(false);
  const [likes,        setLikes]        = useState(item.likeCount || 0);
  const [commentCount, setCommentCount] = useState(item.commentCount || 0);
  const [likeLoading,  setLikeLoading]  = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showShare,    setShowShare]    = useState(false);
  const [showEdit,     setShowEdit]     = useState(false);
  const [showDotMenu,  setShowDotMenu]  = useState(false);
  const [showImage,    setShowImage]    = useState(false);

  // Fetch initial like state
  useEffect(() => {
    if (!userId) return;
    fetch(`${API_BASE_URL}/api/news/like/${item._id}/${userId}`)
      .then((r) => r.json())
      .then((d) => { setLiked(d.liked); setLikes(d.count); })
      .catch(() => {});
  }, [item._id, userId]);

  const handleLike = async () => {
    if (!userId || likeLoading) return;
    setLikeLoading(true);
    setLiked((p) => !p);
    setLikes((p) => (liked ? p - 1 : p + 1));
    try {
      const res = await fetch(`${API_BASE_URL}/api/news/like/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newsId: item._id, userId }),
      });
      const d = await res.json();
      setLiked(d.liked);
      setLikes(d.count);
    } catch {
      setLiked((p) => !p);
      setLikes((p) => (liked ? p + 1 : p - 1));
    } finally {
      setLikeLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this news post?")) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/news/${item._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.success) onDeleted?.(item._id);
      else alert(data.message || "Delete failed");
    } catch {
      alert("Server error");
    }
  };

  const canModify = userId && (
    userId === String(item.userId) ||
    userId === String(item.uploadedBy) ||
    userId === String(item.societyId)
  );

  return {
    userId, liked, likes, commentCount,
    likeLoading, showComments, setShowComments,
    showShare, setShowShare, showEdit, setShowEdit,
    showDotMenu, setShowDotMenu, showImage, setShowImage,
    handleLike, handleDelete, canModify,
  };
}
