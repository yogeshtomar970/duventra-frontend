import React from "react";
import "../styles/ECPosterImage.css";

export default function ECPosterImage({ posterimg }) {
  if (!posterimg) return null;

  return (
    <div className="ec-image">
      <img
        src={posterimg}
        alt="event poster"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    </div>
  );
}
