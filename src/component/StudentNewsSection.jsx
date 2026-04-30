import React from "react";
import NewsCardWithActions from "./NewsCardWithActions";
import "../styles/StudentNewsSection.css";

export default function StudentNewsSection({ myNews, getUserId, setMyNews }) {
  return (
    <div className="news-wrapper">
      <span className="news-badge">News</span>
      {myNews.length === 0 ? (
        <p className="news-empty">No news uploaded</p>
      ) : (
        myNews.map((item) => (
          <NewsCardWithActions
            key={item._id}
            item={item}
            userId={getUserId()}
            onUpdated={(updated) =>
              setMyNews((prev) =>
                prev.map((n) => (n._id === updated._id ? updated : n))
              )
            }
            onDeleted={(id) =>
              setMyNews((prev) => prev.filter((n) => n._id !== id))
            }
          />
        ))
      )}
    </div>
  );
}
