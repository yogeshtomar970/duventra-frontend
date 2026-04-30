import API_BASE_URL from "../config/api.js";
import React, { useEffect, useState } from "react";
import "../ProfilePage.css";
import "../Profile.css";
import BottomNav from "./BottomNav";
import Navbar from "./Navbar";
import EventCard from "./EventCard";
import NewsCardWithActions from "./NewsCardWithActions";
import { useSearchParams, useNavigate } from "react-router-dom";

const getImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

const DEFAULT_PROFILE = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s";
const DEFAULT_AVATAR  = "https://randomuser.me/api/portraits/men/1.jpg";
const DEFAULT_SOCIETY = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s";

export default function SocietyPublicProfile() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const societyId = searchParams.get("id");

  const [society, setSociety]         = useState(null);
  const [loading, setLoading]         = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab]     = useState("post");

  const [posts, setPosts] = useState([]);
  const [news, setNews]   = useState([]);

  const [members, setMembers]                   = useState([]);
  const [following, setFollowing]               = useState([]);
  const [studentFollowing, setStudentFollowing] = useState([]);

  const getMyId = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.societyId || (user?.id ? "student_" + user.id : null);
  };

  useEffect(() => {
    if (!societyId) return;

    fetch(`${API_BASE_URL}/api/society/public/${societyId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setSociety(d.data); setLoading(false); })
      .catch(() => setLoading(false));

    const myId = getMyId();
    if (myId) {
      fetch(`${API_BASE_URL}/api/join/check/${myId}/${societyId}`)
        .then(r => r.json())
        .then(d => setIsFollowing(d.joined))
        .catch(() => {});
    }

    fetch(`${API_BASE_URL}/api/join/members/${societyId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setMembers(d.data); })
      .catch(() => {});

    fetch(`${API_BASE_URL}/api/join/following/${societyId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setFollowing(d.data); })
      .catch(() => {});

    fetch(`${API_BASE_URL}/api/student/following/${societyId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setStudentFollowing(d.data); })
      .catch(() => {});

    fetch(`${API_BASE_URL}/api/post/all`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setPosts(d.posts.filter(p => p.societyId === societyId));
      })
      .catch(() => {});

  }, [societyId]);

  useEffect(() => {
    if (!society?._id) return;
    fetch(`${API_BASE_URL}/api/news/all`)
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d)) {
          setNews(d.filter(item => item.userId?.toString() === society._id?.toString()));
        }
      })
      .catch(() => {});
  }, [society]);

  const handleToggleJoin = async () => {
    const myId = getMyId();
    if (!myId) return alert("Please login first");
    if (myId === societyId) return;
    setJoinLoading(true);
    try {
      const endpoint = isFollowing ? "/api/join/unjoin" : "/api/join/join";
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ myId, targetId: societyId }),
      });
      const data = await res.json();
      if (isFollowing) setIsFollowing(false);
      else if (data.joined) setIsFollowing(true);
    } catch (error) {}
    setJoinLoading(false);
  };

  if (loading) return <div style={{ textAlign: "center", padding: "80px 20px" }}><h3>Loading...</h3></div>;
  if (!society) return <div style={{ textAlign: "center", padding: "80px 20px" }}><h3>Society not found</h3></div>;

  const myId = getMyId();
  const isOwnProfile = myId === society.societyId;
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <BottomNav />
      <div className="profile-container">

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-left">
            <img
              src={getImageUrl(society.profilePic, DEFAULT_PROFILE)}
              alt="profile"
              className="profile-card-image"
            />
            {!isOwnProfile && (
              <button
                className="edit-pic-btn"
                style={{
                  background: isFollowing ? "#e0e0e0" : "#111",
                  color: isFollowing ? "#555" : "#fff",
                  marginTop: "10px",
                  opacity: joinLoading ? 0.6 : 1,
                }}
                onClick={handleToggleJoin}
                disabled={joinLoading}
              >
                {isFollowing ? "Following ✓" : "Join Us"}
              </button>
            )}
          </div>

          <div className="profile-right">
            <div className="info-block">
              <label>Society Name</label>
              <h2>{society.societyName}</h2>
            </div>
            <div className="info-block">
              <label>Society Type</label>
              <h3>{society.societyType}</h3>
            </div>
            <div className="info-block">
              <label>College Name</label>
              <h3>{society.collegeName}</h3>
            </div>
            {society.coordinatorName && (
              <div className="info-block">
                <label>Coordinator Name</label>
                <h3>{society.coordinatorName}</h3>
              </div>
            )}
            {society.bio && (
              <div className="info-block">
                <label>Bio</label>
                <h3>{society.bio}</h3>
              </div>
            )}
          </div>
        </div>

        {/* Committee Card */}
        {society.committee?.length > 0 && (
          <div className="gradient-card">
            <h3>Society Committee</h3>
            <div className="member-grid">
              {society.committee.map((member, index) => (
                <div className="member-box" key={index}>
                  <img src={getImageUrl(member.studentId?.profilePic, DEFAULT_AVATAR)} />
                  <p>{member.studentId?.name}</p>
                  <span>{member.post}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Card */}
        <div className="student-social-card">

          <h2 className="section-heading">Society Members ({members.length})</h2>
          <div className="horizontal-scroll">
            {members.length === 0 ? (
              <p className="empty-text">No society members yet</p>
            ) : (
              members.filter(m => !m.memberType || m.memberType === "society").map((item, index) => (
                <div className="modern-member-card" key={index} style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/society-profile?id=${item.societyId}`)}
                >
                  <img src={getImageUrl(item.profilePic, DEFAULT_SOCIETY)} className="modern-member-img" />
                  <h4>{item.societyName}</h4>
                  <div className="member-info"><p>{item.collegeName}</p><p>{item.societyType}</p></div>
                </div>
              ))
            )}
          </div>

          <h2 className="section-heading">Society Following ({following.length})</h2>
          <div className="horizontal-scroll">
            {following.length === 0 ? (
              <p className="empty-text">No societies followed yet</p>
            ) : (
              following.map((item, index) => (
                <div className="modern-member-card" key={index} style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/society-profile?id=${item.societyId}`)}
                >
                  <img src={getImageUrl(item.profilePic, DEFAULT_SOCIETY)} className="modern-member-img" />
                  <h4>{item.societyName}</h4>
                  <div className="member-info"><p>{item.collegeName}</p><p>{item.societyType}</p></div>
                </div>
              ))
            )}
          </div>

          <h2 className="section-heading">Student Following ({studentFollowing.length})</h2>
          <div className="horizontal-scroll">
            {studentFollowing.length === 0 ? (
              <p className="empty-text">No students followed yet</p>
            ) : (
              studentFollowing.map((item, index) => (
                <div className="modern-member-card" key={index} style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/student-profile?id=${item.userId}`)}
                >
                  <img src={getImageUrl(item.profilePic, DEFAULT_AVATAR)} className="modern-member-img" />
                  <h4>{item.name}</h4>
                  <div className="member-info"><p>{item.collegeName}</p><p>{item.course}</p></div>
                </div>
              ))
            )}
          </div>

        </div>

        {/* Posts & News — same as ProfilePage */}
        <div className="gradient-card">
          <div className="post-toggle">
            <button
              className={activeTab === "post" ? "active-btn" : ""}
              onClick={() => setActiveTab("post")}
            >
              Post
            </button>
            <button
              className={activeTab === "news" ? "active-btn" : ""}
              onClick={() => setActiveTab("news")}
            >
              News
            </button>
          </div>

          {activeTab === "post" && (
            <div className="post-grid">
              {posts.length === 0 ? (
                <p>No posts uploaded</p>
              ) : (
                posts.map((post) => (
                  <EventCard
                    key={post._id}
                    profileimg={getImageUrl(society.profilePic, DEFAULT_PROFILE)}
                    societyname={society.societyName}
                    collegename={society.collegeName}
                    societyId={post.societyId}
                    type={society.societyType}
                    posterimg={post.image}
                    time={post.createdAt}
                    description={post.description}
                    formLink={post.formLink}
                    views={post.views}
                    postId={post._id}
                    onEditPost={null}
                    onDeletePost={null}
                  />
                ))
              )}
            </div>
          )}

          {activeTab === "news" && (
            <div className="news-section">
              {news.length === 0 ? (
                <p>No news uploaded</p>
              ) : (
                news.map((item) => (
                  <NewsCardWithActions
                    key={item._id}
                    item={item}
                    userId={user?.id}
                    onUpdated={null}
                    onDeleted={null}
                  />
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </>
  );
}
