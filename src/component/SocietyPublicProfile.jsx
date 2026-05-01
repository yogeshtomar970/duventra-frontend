import API_BASE_URL from "../config/api.js";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";

import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import CommitteeCard from "./CommitteeCard";
import SocietyMemberCard from "./SocietyMemberCard";
import SearchHeader from "./SearchHeader";
import EventCard from "./EventCard";
import NewsCardWithActions from "./NewsCardWithActions";

import "../styles/ProfileCard.css";
import "../styles/CommitteeCard.css";
import "../styles/SocietyMemberCard.css";

const getImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

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

  const [posts, setPosts]                       = useState([]);
  const [news, setNews]                         = useState([]);
  const [members, setMembers]                   = useState([]);
  const [following, setFollowing]               = useState([]);
  const [studentFollowing, setStudentFollowing] = useState([]);

  const [socMemberSearch, setSocMemberSearch]         = useState("");
  const [socMemberSearchOpen, setSocMemberSearchOpen] = useState(false);
  const [stuMemberSearch, setStuMemberSearch]         = useState("");
  const [stuMemberSearchOpen, setStuMemberSearchOpen] = useState(false);
  const [followingSearch, setFollowingSearch]         = useState("");
  const [followingSearchOpen, setFollowingSearchOpen] = useState(false);
  const [stuFollowSearch, setStuFollowSearch]         = useState("");
  const [stuFollowSearchOpen, setStuFollowSearchOpen] = useState(false);

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
      .then(d => { if (d.success) setPosts(d.posts.filter(p => p.societyId === societyId)); })
      .catch(() => {});
  }, [societyId]);

  useEffect(() => {
    if (!society?._id) return;
    fetch(`${API_BASE_URL}/api/news/all`)
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d))
          setNews(d.filter(item => item.userId?.toString() === society._id?.toString()));
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
      const user = JSON.parse(localStorage.getItem("user"));
      const memberType = user?.societyId ? "society" : "student";
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ myId, targetId: societyId, memberType }),
      });
      const data = await res.json();
      if (isFollowing) setIsFollowing(false);
      else if (data.joined) setIsFollowing(true);
    } catch (e) {}
    setJoinLoading(false);
  };

  const filterBy = (list, key, q) =>
    list.filter(i => i[key]?.toLowerCase().includes(q.toLowerCase()));

  if (loading) return <div style={{ textAlign: "center", padding: "80px 20px" }}><h3>Loading...</h3></div>;
  if (!society) return <div style={{ textAlign: "center", padding: "80px 20px" }}><h3>Society not found</h3></div>;

  const myId       = getMyId();
  const isOwnProfile = myId === society.societyId;
  const user       = JSON.parse(localStorage.getItem("user"));
  const hasImage   = !!society.profilePic;
  const imgSrc     = getImageUrl(society.profilePic, null);

  const societyMembers = members.filter(m => !m.memberType || m.memberType === "society");
  const studentMembers = members.filter(m => m.memberType === "student");

  return (
    <>
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <BottomNav />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "72px 16px 100px" }}>

        {/* ── Profile Card ── */}
        <div className="pc4-card" style={{ marginBottom: 16 }}>
          <div className="pc4-left">
            <div className="pc4-avatar-frame">
              {hasImage
                ? <img src={imgSrc} alt="profile" className="pc4-avatar-img" />
                : <span className="pc4-avatar-initials">{getInitials(society.societyName)}</span>
              }
            </div>
            {!isOwnProfile && (
              <button
                className="pc4-edit-btn"
                style={{
                  background: isFollowing ? "#f0e8df" : "#b5651d",
                  color:      isFollowing ? "#8b5e3c" : "#fff",
                  border:     isFollowing ? "1px solid #d6c5b0" : "none",
                  opacity:    joinLoading ? 0.6 : 1,
                }}
                onClick={handleToggleJoin}
                disabled={joinLoading}
              >
                {isFollowing ? "Following ✓" : "Join Us"}
              </button>
            )}
          </div>

          <div className="pc4-right">
            <div className="pc4-r-header">
              <p className="pc4-r-name">{society.societyName}</p>
              <p className="pc4-r-college"><FiHome size={13} />{society.collegeName}</p>
            </div>
            <div className="pc4-divider" />
            <div className="pc4-fields">
              <div className="pc4-field">
                <span className="pc4-label">Society Type</span>
                <span className="pc4-val">{society.societyType || "—"}</span>
              </div>
              <div className="pc4-field">
                <span className="pc4-label">Coordinator</span>
                <span className="pc4-val">{society.coordinatorName || "Not specified"}</span>
              </div>
            </div>
            {society.bio && (
              <div className="pc4-bio">
                <p className="pc4-bio-heading">Bio</p>
                <p className="pc4-bio-text">{society.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Committee (read-only) ── */}
        {society.committee?.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <CommitteeCard committee={society.committee} onEditClick={null} />
          </div>
        )}

        {/* ── Social Sections ── */}
        <div className="cc-card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", padding: "1.5rem", marginBottom: 16 }}>

          {/* Society Members */}
          <SearchHeader
            title={`Society Members (${filterBy(societyMembers, "societyName", socMemberSearch).length})`}
            searchOpen={socMemberSearchOpen} onToggleSearch={setSocMemberSearchOpen}
            searchValue={socMemberSearch} onSearchChange={setSocMemberSearch} onClear={() => setSocMemberSearch("")}
          />
          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
            {filterBy(societyMembers, "societyName", socMemberSearch).length === 0
              ? <p style={{ color: "#999", fontSize: 13 }}>No society members yet</p>
              : filterBy(societyMembers, "societyName", socMemberSearch).map((item, i) => (
                <SocietyMemberCard key={i} item={item} isJoined={false} onJoin={() => {}}
                  onCardClick={() => navigate(`/society-profile?id=${item.societyId}`)} />
              ))}
          </div>

          {/* Student Members */}
          <SearchHeader
            title={`Student Members (${filterBy(studentMembers, "name", stuMemberSearch).length})`}
            searchOpen={stuMemberSearchOpen} onToggleSearch={setStuMemberSearchOpen}
            searchValue={stuMemberSearch} onSearchChange={setStuMemberSearch} onClear={() => setStuMemberSearch("")}
          />
          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
            {filterBy(studentMembers, "name", stuMemberSearch).length === 0
              ? <p style={{ color: "#999", fontSize: 13 }}>No student members yet</p>
              : filterBy(studentMembers, "name", stuMemberSearch).map((item, i) => (
                <SocietyMemberCard key={i} item={item} isStudent={true} isJoined={false} onJoin={() => {}}
                  onCardClick={() => navigate(`/student-profile?id=${item.userId}`)} />
              ))}
          </div>

          {/* Society Following */}
          <SearchHeader
            title={`Society Following (${filterBy(following, "societyName", followingSearch).length})`}
            searchOpen={followingSearchOpen} onToggleSearch={setFollowingSearchOpen}
            searchValue={followingSearch} onSearchChange={setFollowingSearch} onClear={() => setFollowingSearch("")}
          />
          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
            {filterBy(following, "societyName", followingSearch).length === 0
              ? <p style={{ color: "#999", fontSize: 13 }}>No societies followed yet</p>
              : filterBy(following, "societyName", followingSearch).map((item, i) => (
                <SocietyMemberCard key={i} item={item} isJoined={false} onJoin={() => {}}
                  onCardClick={() => navigate(`/society-profile?id=${item.societyId}`)} />
              ))}
          </div>

          {/* Student Following */}
          <SearchHeader
            title={`Student Following (${filterBy(studentFollowing, "name", stuFollowSearch).length})`}
            searchOpen={stuFollowSearchOpen} onToggleSearch={setStuFollowSearchOpen}
            searchValue={stuFollowSearch} onSearchChange={setStuFollowSearch} onClear={() => setStuFollowSearch("")}
          />
          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
            {filterBy(studentFollowing, "name", stuFollowSearch).length === 0
              ? <p style={{ color: "#999", fontSize: 13 }}>No students followed yet</p>
              : filterBy(studentFollowing, "name", stuFollowSearch).map((item, i) => (
                <SocietyMemberCard key={i} item={item} isStudent={true} isJoined={false} onJoin={() => {}}
                  onCardClick={() => navigate(`/student-profile?id=${item.userId}`)} />
              ))}
          </div>
        </div>

        {/* ── Posts & News ── */}
        <div className="cc-card" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 8, padding: "1.25rem 1.5rem 0" }}>
            {["post", "news"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: "8px 20px", borderRadius: 20, border: "none", cursor: "pointer",
                fontWeight: 600, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif",
                background: activeTab === tab ? "#b5651d" : "#f9f5f0",
                color:      activeTab === tab ? "#fff"    : "#8b5e3c",
              }}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
            {activeTab === "post" && (
              posts.length === 0
                ? <p style={{ color: "#999", fontSize: 13 }}>No posts uploaded</p>
                : <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {posts.map(post => (
                      <EventCard key={post._id}
                        profileimg={getImageUrl(society.profilePic, DEFAULT_SOCIETY)}
                        societyname={society.societyName} collegename={society.collegeName}
                        societyId={post.societyId} type={society.societyType}
                        posterimg={post.image} time={post.createdAt}
                        description={post.description} formLink={post.formLink}
                        views={post.views} postId={post._id}
                        onEditPost={null} onDeletePost={null}
                      />
                    ))}
                  </div>
            )}
            {activeTab === "news" && (
              news.length === 0
                ? <p style={{ color: "#999", fontSize: 13 }}>No news uploaded</p>
                : news.map(item => (
                    <NewsCardWithActions key={item._id} item={item}
                      userId={user?.id} onUpdated={null} onDeleted={null} />
                  ))
            )}
          </div>
        </div>

      </div>
    </>
  );
}
