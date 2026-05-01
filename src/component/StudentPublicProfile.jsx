import API_BASE_URL from "../config/api.js";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import StudentProfileCard from "./StudentProfileCard";
import SocietyMemberCard from "./SocietyMemberCard";
import SearchHeader from "./SearchHeader";
import NewsCardWithActions from "./NewsCardWithActions";

// Exact same CSS imports as Profiles.jsx
import "../styles/Profile.css";
import "../styles/StudentProfileCard.css";
import "../styles/SocietyMemberCard.css";
import "../ProfilePage.css"; // for .horizontal-scroll

const getImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

const DEFAULT_AVATAR = "https://randomuser.me/api/portraits/men/1.jpg";

export default function StudentPublicProfile() {
  const [searchParams] = useSearchParams();
  const navigate       = useNavigate();
  const studentUserId  = searchParams.get("id");

  const [student,          setStudent]          = useState(null);
  const [loading,          setLoading]          = useState(true);
  const [isFollowing,      setIsFollowing]      = useState(false);
  const [followLoading,    setFollowLoading]    = useState(false);
  const [sidebarOpen,      setSidebarOpen]      = useState(false);

  const [societyMembers,   setSocietyMembers]   = useState([]);
  const [studentMembers,   setStudentMembers]   = useState([]);
  const [societyFollowing, setSocietyFollowing] = useState([]);
  const [studentFollowing, setStudentFollowing] = useState([]);
  const [news,             setNews]             = useState([]);

  const [socMemberSearch,     setSocMemberSearch]     = useState("");
  const [socMemberSearchOpen, setSocMemberSearchOpen] = useState(false);
  const [stuMemberSearch,     setStuMemberSearch]     = useState("");
  const [stuMemberSearchOpen, setStuMemberSearchOpen] = useState(false);
  const [socFollowSearch,     setSocFollowSearch]     = useState("");
  const [socFollowSearchOpen, setSocFollowSearchOpen] = useState(false);
  const [stuFollowSearch,     setStuFollowSearch]     = useState("");
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

    const isSociety    = !!me.societyId;
    const myId         = isSociety ? me.societyId : me.id;
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

  if (loading) return <div className="pp-loading"><h3>Loading...</h3></div>;
  if (!student) return <div className="pp-loading"><h3>Student not found</h3></div>;

  const me           = getLoggedInUser();
  const isOwnProfile = me?.id === student._id?.toString();

  return (
    <>
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <BottomNav />

      <div className="student-container">

        {/* ── Profile Card — same StudentProfileCard as Profiles.jsx ── */}
        <div style={{ position: "relative" }}>
          {/* onEditClick=null hides the edit button */}
          <StudentProfileCard
            student={student}
            getImageUrl={getImageUrl}
            defaultAvatar={DEFAULT_AVATAR}
            onEditClick={null}
          />

          {/* Follow / Unfollow button — only for other users */}
          {!isOwnProfile && (
            <button
              onClick={handleToggleFollow}
              disabled={followLoading}
              className="sp-edit-btn"
              style={{
                position: "absolute",
                bottom: "1.5rem",
                right: "2rem",
                width: "auto",
                padding: "10px 22px",
                background: isFollowing ? "#f0e8df" : "#b5651d",
                color:      isFollowing ? "#8b5e3c" : "#fff",
                border:     isFollowing ? "1px solid #d6c5b0" : "none",
                opacity:    followLoading ? 0.6 : 1,
              }}
            >
              {isFollowing ? "Following ✓" : "Follow"}
            </button>
          )}
        </div>

        {/* ── Social Sections — same card style as Profiles.jsx ── */}
        <div className="sp-card" style={{
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem",
          gap: "1rem",
          gridTemplateColumns: "unset",
          marginTop: 8,
          marginBottom: 4,
        }}>

          {/* Society Members */}
          <SearchHeader
            title={`Society Members (${filterBy(societyMembers, "societyName", socMemberSearch).length})`}
            searchOpen={socMemberSearchOpen} onToggleSearch={setSocMemberSearchOpen}
            searchValue={socMemberSearch} onSearchChange={setSocMemberSearch}
            onClear={() => setSocMemberSearch("")}
          />
          <div className="horizontal-scroll">
            {filterBy(societyMembers, "societyName", socMemberSearch).length === 0
              ? <p style={{ color: "#999", fontSize: 13, margin: 0 }}>No society members yet</p>
              : filterBy(societyMembers, "societyName", socMemberSearch).map((item, i) => (
                <SocietyMemberCard key={i} item={item}
                  isJoined={false} onJoin={() => {}}
                  onCardClick={() => navigate(`/society-profile?id=${item.societyId}`)}
                />
              ))
            }
          </div>

          {/* Student Members */}
          <SearchHeader
            title={`Student Members (${filterBy(studentMembers, "name", stuMemberSearch).length})`}
            searchOpen={stuMemberSearchOpen} onToggleSearch={setStuMemberSearchOpen}
            searchValue={stuMemberSearch} onSearchChange={setStuMemberSearch}
            onClear={() => setStuMemberSearch("")}
          />
          <div className="horizontal-scroll">
            {filterBy(studentMembers, "name", stuMemberSearch).length === 0
              ? <p style={{ color: "#999", fontSize: 13, margin: 0 }}>No student members yet</p>
              : filterBy(studentMembers, "name", stuMemberSearch).map((item, i) => (
                <SocietyMemberCard key={i} item={item} isStudent={true}
                  isJoined={false} onJoin={() => {}}
                  onCardClick={() => navigate(`/student-profile?id=${item.userId}`)}
                />
              ))
            }
          </div>

          {/* Society Following */}
          <SearchHeader
            title={`Society Following (${filterBy(societyFollowing, "societyName", socFollowSearch).length})`}
            searchOpen={socFollowSearchOpen} onToggleSearch={setSocFollowSearchOpen}
            searchValue={socFollowSearch} onSearchChange={setSocFollowSearch}
            onClear={() => setSocFollowSearch("")}
          />
          <div className="horizontal-scroll">
            {filterBy(societyFollowing, "societyName", socFollowSearch).length === 0
              ? <p style={{ color: "#999", fontSize: 13, margin: 0 }}>No society following yet</p>
              : filterBy(societyFollowing, "societyName", socFollowSearch).map((item, i) => (
                <SocietyMemberCard key={i} item={item}
                  isJoined={false} onJoin={() => {}}
                  onCardClick={() => navigate(`/society-profile?id=${item.societyId}`)}
                />
              ))
            }
          </div>

          {/* Student Following */}
          <SearchHeader
            title={`Student Following (${filterBy(studentFollowing, "name", stuFollowSearch).length})`}
            searchOpen={stuFollowSearchOpen} onToggleSearch={setStuFollowSearchOpen}
            searchValue={stuFollowSearch} onSearchChange={setStuFollowSearch}
            onClear={() => setStuFollowSearch("")}
          />
          <div className="horizontal-scroll">
            {filterBy(studentFollowing, "name", stuFollowSearch).length === 0
              ? <p style={{ color: "#999", fontSize: 13, margin: 0 }}>No students followed yet</p>
              : filterBy(studentFollowing, "name", stuFollowSearch).map((item, i) => (
                <SocietyMemberCard key={i} item={item} isStudent={true}
                  isJoined={false} onJoin={() => {}}
                  onCardClick={() => navigate(`/student-profile?id=${item.userId}`)}
                />
              ))
            }
          </div>
        </div>

        {/* ── News — same style as Profiles.jsx ── */}
        {news.length > 0 && (
          <div className="sp-card" style={{
            display: "flex", flexDirection: "column",
            padding: "1.5rem", gap: "1rem",
            gridTemplateColumns: "unset", marginTop: 8,
          }}>
            <p style={{
              fontFamily: "'Fraunces', serif", fontSize: 18,
              fontWeight: 700, color: "#b5651d", margin: 0,
            }}>News</p>
            <div style={{ height: 1, background: "rgba(0,0,0,0.07)" }} />
            {news.map(item => (
              <NewsCardWithActions key={item._id} item={item}
                userId={me?.id} onUpdated={null} onDeleted={null}
              />
            ))}
          </div>
        )}

      </div>
    </>
  );
}
