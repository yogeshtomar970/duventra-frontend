import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config/api.js";
import "../UploadNews.css";
import { useNavigate } from "react-router-dom";

export default function UploadNews() {
  const navigate = useNavigate();
  const [image,       setImage]       = useState(null);
  const [preview,     setPreview]     = useState(null);
  const [description, setDescription] = useState("");
  const [loading,     setLoading]     = useState(false);
  const [message,     setMessage]     = useState({ text: "", ok: true });

  const user = JSON.parse(localStorage.getItem("user")) || null;

  // Guard: must be logged in (student OR society)
  useEffect(() => {
    if (!user) { navigate("/login"); }
  }, []);

  const handleImageChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setImage(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) { setMessage({ text: "Description is required", ok: false }); return; }

    setLoading(true);
    setMessage({ text: "", ok: true });

    const formData = new FormData();
    formData.append("description", description);
    // uploadedBy: "student" or "society"
    formData.append("uploadedBy", user.role);
    formData.append("userId",     user.id);
    if (image) formData.append("image", image);

    try {
      const res  = await fetch(`${API_BASE_URL}/api/news/upload`, { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setMessage({ text: "✅ News published successfully!", ok: true });
        setTimeout(() => navigate("/news"), 1500);
      } else {
        setMessage({ text: data.message || "Upload failed", ok: false });
      }
    } catch {
      setMessage({ text: "Network error — check server", ok: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-news-container">
      <div className="upload-news-card">
        <h2>📰 Upload News</h2>
        <p className="upload-subtitle">
          {user?.role === "student" ? "Share news as a student" : "Share news as a society"}
        </p>

        <form onSubmit={handleSubmit}>
          <label className="file-label">
            Cover Image <span className="optional">(optional)</span>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          {preview && (
            <div className="upload-preview">
              <img src={preview} alt="preview" />
              <button type="button" className="remove-preview-btn"
                onClick={() => { setImage(null); setPreview(null); }}>✕</button>
            </div>
          )}

          <label className="file-label" style={{ marginTop: 14 }}>
            Description <span className="req">*</span>
          </label>
          <textarea
            placeholder="Write your news story here…"
            value={description}
            onChange={e => setDescription(e.target.value)}
            maxLength={800}
          />
          <span className="char-count">{description.length}/800</span>

          {message.text && (
            <p className={message.ok ? "upload-ok" : "upload-err"}>{message.text}</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Publishing…" : "Publish News"}
          </button>
        </form>
      </div>
    </div>
  );
}
