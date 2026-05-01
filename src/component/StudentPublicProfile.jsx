import API_BASE_URL from "../config/api.js";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import SocietyMemberCard from "./SocietyMemberCard";
import SearchHeader from "./SearchHeader";
import NewsCardWithActions from "./NewsCardWithActions";

import "../styles/StudentProfileCard.css";
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

const DEFAULT_AVATAR  = "https://randomuser.me/api/portraits/men/1.jpg";
const DEFAULT_SOCIETY = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s";

export default function StudentPublicProfile() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const studentUserId = searchParams.get("id");

  const [student, setStudent]         = useState(null);
  const [loading, setLoading]         = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [societyMembers, setSocietyMembers]   = useState([]);
  const [studentMembers, setStudentMembers]   = useState([]);
  const [societyFollowing, setSocietyFollowing] = useState([]);
  const [studentFollowing, setStudentFollowing] = useState([]);
  const [news, setNews]                       = useState([]);

  // search states
  const [socMemberSearch, setSocMemberSearch]         = useState("");
  const [socMemberSearchOpen, setSocMemberSearchOpen] = useState(false);
  const [stuMemberSearch, setStuMemberSearch]         = useState("");
  const [stuMemberSearchOpen, setStuMemberSearchOpen] = useState(false);
  const [socFollowSearch, setSocFollowSearch]         = useState("");
  const [socFollowSearchOpen, setSocFollowSearchOpen] = useState(false);
  const [stuFollowSearch, setStuFollowSearch]         = useState("");
  const [stuFollowSearchOpen, setStuFollowSearchOpen] = useState(false);

  const getLoggedInUser = () => JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!studentUserId) return;
    fetch(`${API_BASE_URL}/api/student/public/${studentUserId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setStudent(d.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [studentUserId]);

  useEffect(() => {
    if (!student) return;

    const studentMongoId = student._id;

    // Follow status
    const me = getLoggedInUser();
    if (me) {
      const myFollowerId = me.societyId || me.id;
      fetch(`${API_BASE_URL}/api/student/check-follow/${myFollowerId}/${studentMongoId}`)
        .then(r => r.json())
        .then(d => setIsFollowing(d.followed))
        .catch(() => {});
    }

    // Society Members + Student Members
    fetch(`${API_BASE_URL}/api/student/members/${studentMongoId}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setSocietyMembers(d.data.filter(m => m.memberType === "society"));
          setStudentMembers(d.data.filter(m => m.memberType === "student" || !m.memberType));
        }
      })
      .catch(() => {});

    // Society Following
    const socId = "student_" + student._id;
    fetch(`${API_BASE_URL}/api/join/following/${socId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setSocietyFollowing(d.data); })
      .catch(() => {});

    // Student Following
    fetch(`${API_BASE_URL}/api/student/following/${studentMongoId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setStudentFollowing(d.data); })
      .catch(() => {});

    // News
    fetch(`${API_BASE_URL}/api/news/all`)
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d))
          setNews(d.filter(item => item.userId?.toString() === studentMongoId?.toString()));
      })
      .catch(() => {});
  }, [student]);

  const handleToggleFollow = async () => {
    const me = getLoggedInUser();
    if (!me) return alert("Please login first");
    if (!student?._id) return;

    const isSociety  = !!me.societyId;
    const myId       = isSociety ? me.societyId : me.id;
    const followerType = isSociety ? "society" : "student";

    if (!isSociety && me.id === student._id?.toString()) return;

    setFollowLoading(true);
    try {
      const endpoint = isFollowing ? "/api/student/unfollow" : "/api/student/follow";
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ myId, targetId: student._id, followerType }),
      });
      const data = await res.json();
      if (isFollowing) setIsFollowing(false);
      else if (data.followed) setIsFollowing(true);
    } catch (e) {}
    setFollowLoading(false);
  };

  const filterBy = (list, key, q) =>
    list.filter(i => i[key]?.toLowerCase().includes(q.toLowerCase()));

  if (loading) return <div style={{ textAlign: "center", padding: "80px 20px" }}><h3>Loading...</h3></div>;
  if (!student) return <div style={{ textAlign: "center", padding: "80px 20px" }}><h3>Student not found</h3></div>;

  const me = getLoggedInUser();
  const isOwnProfile = me?.id === student._id?.toString();
  const hasImage = !!student.profilePic;
  const imgSrc   = getImageUrl(student.profilePic, null);

  return (
    <>
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <BottomNav />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "72px 16px 100px" }}>

        {/* ── Profile Card (new UI) ── */}
        <div className="sp-card" style={{ marginBottom: 16 }}>

          {/* Left */}
          <div className="sp-left">
            <div className="sp-avatar-frame">
              {hasImage
                ? <img src={imgSrc} alt="avatar" className="sp-avatar-img" />
                : <span className="sp-avatar-initials">{getInitials(student.name)}</span>
              }
            </div>

            {!isOwnProfile && (
              <button
                className="sp-edit-btn"
                style={{
                  background: isFollowing ? "#f0e8df" : "#b5651d",
                  color:      isFollowing ? "#8b5e3c" : "#fff",
                  border:     isFollowing ? "1px solid #d6c5b0" : "none",
                  opacity:    followLoading ? 0.6 : 1,
                }}
                onClick={handleToggleFollow}
                disabled={followLoading}
              >
                {isFollowing ? "Following ✓" : "Follow"}
              </button>
            )}
          </div>

          {/* Right */}
          <div className="sp-right">
            <div className="sp-r-header">
              <p className="sp-r-name">{student.name}</p>
              <p className="sp-r-college">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                {student.collegeName}
              </p>
            </div>

            <div className="sp-divider" />

            <div className="sp-fields">
              <div className="sp-field">
                <span className="sp-label">User ID</span>
                <span className="sp-val">{student.userId || "—"}</span>
              </div>
              <div className="sp-field">
                <span className="sp-label">Course</span>
                <span className="sp-val">{student.course || "—"}</span>
              </div>
              <div className="sp-field">
                <span className="sp-label">College</span>
                <span className="sp-val">{student.collegeName || "—"}</span>
              </div>
              <div className="sp-field">
                <span className="sp-label">Year</span>
                {student.year
                  ? <span className="sp-year-badge">{student.year}</span>
                  : <span className="sp-val">—</span>
                }
              </div>
            </div>
          </div>
        </div>

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
            title={`Society Following (${filterBy(societyFollowing, "societyName", socFollowSearch).length})`}
            searchOpen={socFollowSearchOpen} onToggleSearch={setSocFollowSearchOpen}
            searchValue={socFollowSearch} onSearchChange={setSocFollowSearch} onClear={() => setSocFollowSearch("")}
          />
          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
            {filterBy(societyFollowing, "societyName", socFollowSearch).length === 0
              ? <p style={{ color: "#999", fontSize: 13 }}>No society following yet</p>
              : filterBy(societyFollowing, "societyName", socFollowSearch).map((item, i) => (
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

        {/* ── News ── */}
        {news.length > 0 && (
          <div className="cc-card" style={{ display: "flex", flexDirection: "column", padding: "1.5rem", gap: "1rem" }}>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 700, color: "#b5651d", margin: 0 }}>
              News
            </p>
            <div className="pc4-divider" />
            {news.map(item => (
              <NewsCardWithActions key={item._id} item={item}
                userId={me?.id} onUpdated={null} onDeleted={null} />
            ))}
          </div>
        )}

      </div>
    </>
  );
}
