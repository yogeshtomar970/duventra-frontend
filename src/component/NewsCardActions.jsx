import React from "react";
import { FaHeart, FaRegHeart, FaComment, FaShare, FaImage } from "react-icons/fa";

/**
 * NewsCardActions
 * Like, Comment, Share, Image action buttons at bottom of card.
 */
export default function NewsCardActions({
  liked, likes, commentCount, userId, imgSrc,
  likeLoading, onLike, onComment, onShare, onImage,
}) {
  return (
    <div className="nc-card-actions">
      <button
        className={`nc-action-btn nc-like-btn${liked ? " nc-liked" : ""}`}
        onClick={onLike}
        disabled={!userId || likeLoading}
      >
        {liked ? <FaHeart /> : <FaRegHeart />}
        <span>{likes > 0 ? likes : ""} Like</span>
      </button>

      <button className="nc-action-btn nc-comment-btn" onClick={onComment}>
        <FaComment />
        <span>{commentCount > 0 ? commentCount : ""} Comment</span>
      </button>

      <button className="nc-action-btn nc-share-btn" onClick={onShare}>
        <FaShare />
        <span>Share</span>
      </button>

      {imgSrc && (
        <button className="nc-action-btn nc-image-btn" onClick={onImage}>
          <FaImage />
          <span>Image</span>
        </button>
      )}
    </div>
  );
}
