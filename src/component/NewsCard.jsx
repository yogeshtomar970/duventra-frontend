import React, { forwardRef, useState } from "react"; // ← forwardRef add
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { resolveImg, fmt } from "../newsHelpers.js";
import CommentPanel    from "./CommentPanel";
import ShareSheet      from "./ShareSheet";
import ImageViewer     from "./ImageViewer";
import NewsCardActions from "./NewsCardActions";
import useNewsCard     from "../hooks/useNewsCard";

const NewsCard = forwardRef(function NewsCard({ data, highlighted, onDelete }, ref) { // ← forwardRef + ref
  const navigate = useNavigate();
  const {
    userId, liked, likes, commentCount, likeLoading,
    showComments, setShowComments,
    showShare, setShowShare,
    showImage, setShowImage,
    handleLike, handleDelete, canModify,
  } = useNewsCard({ item: data, onDeleted: onDelete });

  const [expanded, setExpanded] = useState(false);

  if (!data) return null;

  const imgSrc    = resolveImg(data.image);
  const authorImg = resolveImg(data.userImage);

  const CHAR_LIMIT = 200;
  const isLong = data.description && data.description.length > CHAR_LIMIT;
  const displayText = isLong && !expanded
    ? data.description.slice(0, CHAR_LIMIT) + "…"
    : data.description;

  const handleAuthorClick = () => {
    if (!data.recipientId) return;
    if (data.uploadedBy === "society") {
      navigate(`/society-profile?id=${data.recipientId}`);
    } else {
      navigate(`/student-profile?id=${data.recipientId}`);
    }
  };

  return (
    <>
      <article
        ref={ref}  // ← sirf ye add kiya
        id={`news-${data._id}`}
        className={`nc-cards${highlighted ? " nc-card--highlight" : ""}`}
      >
        {/* Header */}
        <div className="nc-card-header">
          <div className="nc-author-row"
            onClick={handleAuthorClick}
            style={{ cursor: data.recipientId ? "pointer" : "default" }}
          >
            {authorImg
              ? <img src={authorImg} alt={data.userName} className="nc-author-avatar" />
              : <div className="nc-author-avatar nc-avatar-fallback">
                  {(data.userName || "U")[0].toUpperCase()}
                </div>
            }
            <div className="nc-author-info">
              <span className="nc-author-name">{data.userName || data.uploadedBy}</span>
              <span className="nc-author-role">{data.uploadedBy}</span>
            </div>
          </div>
          <div className="nc-header-right">
            <span className="nc-card-date">{fmt(data.createdAt)}</span>
            {canModify && (
              <button className="nc-delete-btn" onClick={handleDelete} title="Delete">
                <FaTrash />
              </button>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="nc-card-desc">{displayText}</p>
        {isLong && (
          <button
            className="nc-read-more-btn"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Read less ▲" : "Read more ▼"}
          </button>
        )}

        {/* Actions */}
        <NewsCardActions
          liked={liked}
          likes={likes}
          commentCount={commentCount}
          userId={userId}
          imgSrc={imgSrc}
          likeLoading={likeLoading}
          onLike={handleLike}
          onComment={() => setShowComments(true)}
          onShare={() => setShowShare(true)}
          onImage={() => setShowImage(true)}
        />
      </article>

      {showComments && <CommentPanel newsId={data._id} onClose={() => setShowComments(false)} />}
      {showShare    && <ShareSheet   item={data}       onClose={() => setShowShare(false)} />}
      {showImage && imgSrc && <ImageViewer src={imgSrc} onClose={() => setShowImage(false)} />}
    </>
  );
});

export default NewsCard; // ← bahar nikala