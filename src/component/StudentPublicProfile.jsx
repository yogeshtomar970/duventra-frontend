import API_BASE_URL from "../config/api.js";
import React, { useEffect, useState } from "react";
import "../ProfilePage.css";
import "../Profile.css";
import BottomNav from "./BottomNav";
import Navbar from "./Navbar";
import NewsCardWithActions from "./NewsCardWithActions";
import { useSearchParams, useNavigate } from "react-router-dom";

const getImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

const DEFAULT_AVATAR = "https://randomuser.me/api/portraits/men/1.jpg";
const DEFAULT_SOCIETY =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s";

export default function StudentPublicProfile() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const studentUserId = searchParams.get("id");

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Social sections
  const [societyMembers, setSocietyMembers] = useState([]);
  const [studentMembers, setStudentMembers] = useState([]);
  const [societyFollowing, setSocietyFollowing] = useState([]);
  const [studentFollowing, setStudentFollowing] = useState([]);

  // News
  const [news, setNews] = useState([]);

  const getLoggedInUser = () => JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!studentUserId) return;

    // 1. Student public profile
    fetch(`${API_BASE_URL}/api/student/public/${studentUserId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setStudent(d.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [studentUserId]);

  // After student loads — fetch social data using student's _id / userId
  useEffect(() => {
    if (!student) return;

    const studentMongoId = student._id;
    const userId = student.userId;

    // 2. Follow status check
    const me = getLoggedInUser();
    if (me) {
      const myFollowerId = me.societyId || me.id;
      fetch(
        `${API_BASE_URL}/api/student/check-follow/${myFollowerId}/${studentMongoId}`,
      )
        .then((r) => r.json())
        .then((d) => setIsFollowing(d.followed))
        .catch(() => {});
    }

    // 3. Society Members + Student Members (from student/members API)
    fetch(`${API_BASE_URL}/api/student/members/${studentMongoId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setSocietyMembers(d.data.filter((m) => m.memberType === "society"));
          setStudentMembers(
            d.data.filter((m) => m.memberType === "student" || !m.memberType),
          );
        }
      })
      .catch(() => {});

    // 4. Society Following — societies jise student ne join kiya
    //    Join collection mein joinedBy = "student_" + mongoId
    const socId = "student_" + student._id;
    fetch(`${API_BASE_URL}/api/join/following/${socId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setSocietyFollowing(d.data);
      })
      .catch(() => {});

    // 5. Student Following — students jise student ne follow kiya
    fetch(`${API_BASE_URL}/api/student/following/${studentMongoId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setStudentFollowing(d.data);
      })
      .catch(() => {});

    // 6. News — filter by this student's _id
    fetch(`${API_BASE_URL}/api/news/all`)
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) {
          setNews(
            d.filter(
              (item) => item.userId?.toString() === studentMongoId?.toString(),
            ),
          );
        }
      })
      .catch(() => {});
  }, [student]);

  const handleToggleFollow = async () => {
    const me = getLoggedInUser();
    if (!me) return alert("Please login first");
    if (!student?._id) return;

    const isSociety = !!me.societyId;
    const myId = isSociety ? me.societyId : me.id;
    const followerType = isSociety ? "society" : "student";

    if (!isSociety && me.id === student._id?.toString()) return; // apna profile

    setFollowLoading(true);
    try {
      const endpoint = isFollowing
        ? "/api/student/unfollow"
        : "/api/student/follow";
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ myId, targetId: student._id, followerType }),
      });
      const data = await res.json();
      if (isFollowing) setIsFollowing(false);
      else if (data.followed) setIsFollowing(true);
    } catch (error) {}
    setFollowLoading(false);
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h3>Loading...</h3>
      </div>
    );
  if (!student)
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <h3>Student not found</h3>
      </div>
    );

  const me = getLoggedInUser();
  const isOwnProfile = me?.id === student._id?.toString();

  return (
    <>
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <BottomNav />
      <div className="profile-container">
        {/* ── Profile Card ── */}
        <div className="student-profile-card">
          <img
            src={getImageUrl(student.profilePic, DEFAULT_AVATAR)}
            alt="profile"
            className="student-profile-img"
          />
          <div className="student-profile-info">
            <h2>{student.name}</h2>
            <div>
              <label>User ID</label>
              <p>{student.userId}</p>
            </div>
            <div>
              <label>Course</label>
              <p>{student.course}</p>
            </div>
            <div>
              <label>College Name</label>
              <p>{student.collegeName}</p>
            </div>
            <div>
              <label>Year</label>
              <p>{student.year}</p>
            </div>
          </div>
          {!isOwnProfile && (
            <button
              className="edit-btn"
              style={{
                background: isFollowing ? "#e0e0e0" : "#111",
                color: isFollowing ? "#555" : "#fff",
                marginTop: "12px",
                opacity: followLoading ? 0.6 : 1,
                width: "100%",
              }}
              onClick={handleToggleFollow}
              disabled={followLoading}
            >
              {isFollowing ? "Following ✓" : "Follow"}
            </button>
          )}
        </div>

        {/* ── Social Card ── */}
        <div className="student-social-card">
          {/* Society Members */}
          <h2 className="section-heading">
            Society Members ({societyMembers.length})
          </h2>
          <div className="horizontal-scroll">
            {societyMembers.length === 0 ? (
              <p className="empty-text">No society members yet</p>
            ) : (
              societyMembers.map((item, index) => (
                <div
                  className="modern-member-card"
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/society-profile?id=${item.societyId}`)
                  }
                >
                  <img
                    src={getImageUrl(item.profilePic, DEFAULT_SOCIETY)}
                    className="modern-member-img"
                  />
                  <h4>{item.societyName}</h4>
                  <div className="member-info">
                    <p>{item.collegeName}</p>
                    <p>{item.societyType}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Student Members */}
          <h2 className="section-heading">
            Student Members ({studentMembers.length})
          </h2>
          <div className="horizontal-scroll">
            {studentMembers.length === 0 ? (
              <p className="empty-text">No student members yet</p>
            ) : (
              studentMembers.map((item, index) => (
                <div
                  className="modern-member-card"
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/student-profile?id=${item.userId}`)}
                >
                  <img
                    src={getImageUrl(item.profilePic, DEFAULT_AVATAR)}
                    className="modern-member-img"
                  />
                  <h4>{item.name}</h4>
                  <div className="member-info">
                    <p>{item.collegeName}</p>
                    <p>{item.course}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Society Following */}
          <h2 className="section-heading">
            Society Following ({societyFollowing.length})
          </h2>
          <div className="horizontal-scroll">
            {societyFollowing.length === 0 ? (
              <p className="empty-text">No society following yet</p>
            ) : (
              societyFollowing.map((item, index) => (
                <div
                  className="modern-member-card"
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/society-profile?id=${item.societyId}`)
                  }
                >
                  <img
                    src={getImageUrl(item.profilePic, DEFAULT_SOCIETY)}
                    className="modern-member-img"
                  />
                  <h4>{item.societyName}</h4>
                  <div className="member-info">
                    <p>{item.collegeName}</p>
                    <p>{item.societyType}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Student Following */}
          <h2 className="section-heading">
            Student Following ({studentFollowing.length})
          </h2>
          <div className="horizontal-scroll">
            {studentFollowing.length === 0 ? (
              <p className="empty-text">No students followed yet</p>
            ) : (
              studentFollowing.map((item, index) => (
                <div
                  className="modern-member-card"
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/student-profile?id=${item.userId}`)}
                >
                  <img
                    src={getImageUrl(item.profilePic, DEFAULT_AVATAR)}
                    className="modern-member-img"
                  />
                  <h4>{item.name}</h4>
                  <div className="member-info">
                    <p>{item.collegeName}</p>
                    <p>{item.course}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── News — same as Profiles.jsx ── */}
        <div className="news-wrapper">
          <span className="news-badge">News</span>
          {news.length === 0 ? (
            <p style={{ textAlign: "center" }}>No news uploaded</p>
          ) : (
            news.map((item) => (
              <NewsCardWithActions
                key={item._id}
                item={item}
                userId={me?.id}
                onUpdated={null}
                onDeleted={null}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
