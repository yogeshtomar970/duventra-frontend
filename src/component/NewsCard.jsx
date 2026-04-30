import React from "react";
import { FaTrash } from "react-icons/fa";
import { resolveImg, fmt } from "../newsHelpers.js";
import CommentPanel    from "./CommentPanel";
import ShareSheet      from "./ShareSheet";
import ImageViewer     from "./ImageViewer";
import NewsCardActions from "./NewsCardActions";
import useNewsCard     from "../hooks/useNewsCard";

/**
 * NewsCard
 * Simpler card for the public News feed — no edit, just delete for owner.
 */
export default function NewsCard({ data, highlighted, onDelete }) {
  const {
    userId, liked, likes, commentCount, likeLoading,
    showComments, setShowComments,
    showShare, setShowShare,
    showImage, setShowImage,
    handleLike, handleDelete, canModify,
  } = useNewsCard({ item: data, onDeleted: onDelete });

  const imgSrc    = resolveImg(data.image);
  const authorImg = resolveImg(data.userImage);

  return (
    <>
      <article
        id={`news-${data._id}`}
        className={`nc-card${highlighted ? " nc-card--highlight" : ""}`}
      >
        {/* Header */}
        <div className="nc-card-header">
          <div className="nc-author-row">
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
        <p className="nc-card-desc">{data.description}</p>

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
}
