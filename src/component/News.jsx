import React from "react";
import { FaNewspaper } from "react-icons/fa";
import BottomNav from "../component/BottomNav";
import "../styles/NewsPage.css";

// Components
import NewsFilterBar  from "../component/NewsFilterBar";
import NewsFeedState  from "../component/NewsFeedState";
import NewsCard       from "../component/NewsCard";

// Hook
import useNewsFeed from "../hooks/useNewsFeed";

export default function NewsPage() {
  const {
    filtered, filter, setFilter,
    loading, error, load,
    highlightId, handleDelete,
  } = useNewsFeed();

  return (
    <div className="news-page">

      {/* Top Bar */}
      <div className="news-top-bar">
        <FaNewspaper className="news-top-icon" />
        <span className="news-top-title">Campus News</span>
      </div>

      {/* Filters */}
      <NewsFilterBar filter={filter} setFilter={setFilter} />

      {/* Feed */}
      <div className="news-feed">
        <NewsFeedState
          loading={loading}
          error={error}
          empty={!loading && !error && filtered.length === 0}
          onRetry={load}
        />
        {!loading && !error && filtered.map((item) => (
          <NewsCard
            key={item._id}
            data={item}
            onDelete={handleDelete}
            highlighted={highlightId === String(item._id)}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
