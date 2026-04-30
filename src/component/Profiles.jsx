import API_BASE_URL from "../config/api.js";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Profile.css";

// Layout
import Navbar from "../component/Navbar";
import BottomNav from "../component/BottomNav";

// Feature components
import StudentProfileCard from "../component/StudentProfileCard";
import EditStudentProfileModal from "../component/EditStudentProfileModal";
import StudentNetworkSection from "../component/StudentNetworkSection";
import SocietyCard from "../component/SocietyCard";
import StudentCard from "../component/StudentCard";
import StudentNewsSection from "../component/StudentNewsSection";

// Hooks
import useStudentData from "../hooks/useStudentData";
import useStudentNetwork from "../hooks/useStudentNetwork";
import useStudentSearch from "../hooks/useStudentSearch";
import useEditStudentProfile from "../hooks/useEditStudentProfile";

// Constants
const DEFAULT_AVATAR =
  "https://www.stryx.com/cdn/shop/articles/man-looking-attractive.jpg?v=1666662774";
const DEFAULT_SOCIETY =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf1fiSQO7JfDw0uv1Ae_Ye-Bo9nhGNg27dwg&s";
const FOLLOWED_STYLE = { background: "#e0e0e0", color: "#555" };

const getImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

export default function Studentprofile() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Hooks ──
  const { student, setStudent, loading, notLoggedIn, myNews, setMyNews, getUserId } =
    useStudentData();

  const {
    societyMembers, societyFollowing, societySuggestions,
    studentMembers, studentFollowing, studentSuggestions,
    handleJoinSocietyFromSuggestion, handleToggleSocietyFollowing,
    handleToggleSocietyMemberFollow, handleJoinStudentFromSuggestion,
    handleToggleStudentFollowing, handleToggleStudentMemberFollow,
  } = useStudentNetwork();

  const {
    socMemberSearch, setSocMemberSearch, socMemberSearchOpen, setSocMemberSearchOpen,
    stuMemberSearch, setStuMemberSearch, stuMemberSearchOpen, setStuMemberSearchOpen,
    socFollowSearch, setSocFollowSearch, socFollowSearchOpen, setSocFollowSearchOpen,
    stuFollowSearch, setStuFollowSearch, stuFollowSearchOpen, setStuFollowSearchOpen,
    socSuggSearch, setSocSuggSearch, socSuggSearchOpen, setSocSuggSearchOpen,
    stuSuggSearch, setStuSuggSearch, stuSuggSearchOpen, setStuSuggSearchOpen,
  } = useStudentSearch();

  const {
    showModal, previewUrl, editCollege, setEditCollege, editYear, setEditYear,
    openModal, closeModal, handleImageChange, handleSaveProfile,
  } = useEditStudentProfile({ setStudent });

  // ── Early returns ──
  if (loading)
    return <div style={{ textAlign: "center", padding: "60px 20px" }}><h3>Loading profile...</h3></div>;
  if (notLoggedIn)
    return <div style={{ textAlign: "center", padding: "60px 20px" }}><h3>Please login to view your profile</h3></div>;
  if (!student)
    return <div style={{ textAlign: "center", padding: "60px 20px" }}><h3>Student profile not found</h3></div>;

  // ── Filtered lists ──
  const filteredSocMembers = societyMembers.filter((i) =>
    i.societyName?.toLowerCase().includes(socMemberSearch.toLowerCase())
  );
  const filteredStuMembers = studentMembers.filter((i) =>
    (i.name || i.societyName || "").toLowerCase().includes(stuMemberSearch.toLowerCase())
  );
  const filteredSocFollowing = societyFollowing.filter((i) =>
    i.societyName?.toLowerCase().includes(socFollowSearch.toLowerCase())
  );
  const filteredStuFollowing = studentFollowing.filter((i) =>
    i.name?.toLowerCase().includes(stuFollowSearch.toLowerCase())
  );
  const filteredSocSugg = societySuggestions.filter((i) =>
    i.societyName?.toLowerCase().includes(socSuggSearch.toLowerCase())
  );
  const filteredStuSugg = studentSuggestions.filter((i) =>
    i.name?.toLowerCase().includes(stuSuggSearch.toLowerCase())
  );

  return (
    <>
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <BottomNav />

      <div className="student-container">

        {/* ── Profile Card ── */}
        <StudentProfileCard
          student={student}
          getImageUrl={getImageUrl}
          defaultAvatar={DEFAULT_AVATAR}
          onEditClick={() => openModal(student)}
        />

        {/* ── Social Sections ── */}
        <div className="student-social-card">

          {/* Society Members */}
          <StudentNetworkSection
            title="Society Members"
            items={filteredSocMembers}
            searchOpen={socMemberSearchOpen}
            setSearchOpen={setSocMemberSearchOpen}
            searchValue={socMemberSearch}
            setSearchValue={setSocMemberSearch}
            emptyMessage="No society members found"
            renderCard={(item, index) => (
              <SocietyCard
                key={index}
                item={item}
                isFollowing={societyFollowing.some((f) => f.societyId === item.societyId)}
                getImageUrl={getImageUrl}
                defaultSociety={DEFAULT_SOCIETY}
                onCardClick={() => navigate(`/society-profile?id=${item.societyId}`)}
                onActionClick={handleToggleSocietyMemberFollow}
                actionLabel={societyFollowing.some((f) => f.societyId === item.societyId) ? "Joined ✓" : "Join Us"}
                actionFollowedStyle={FOLLOWED_STYLE}
              />
            )}
          />

          {/* Student Members */}
          <StudentNetworkSection
            title="Student Members"
            items={filteredStuMembers}
            searchOpen={stuMemberSearchOpen}
            setSearchOpen={setStuMemberSearchOpen}
            searchValue={stuMemberSearch}
            setSearchValue={setStuMemberSearch}
            emptyMessage="No student members found"
            renderCard={(item, index) => {
              if (item.memberType === "society") {
                return (
                  <SocietyCard
                    key={index}
                    item={item}
                    isFollowing={societyFollowing.some((f) => f.societyId === item.societyId)}
                    getImageUrl={getImageUrl}
                    defaultSociety={DEFAULT_SOCIETY}
                    onCardClick={() => navigate(`/society-profile?id=${item.societyId}`)}
                    onActionClick={handleToggleSocietyMemberFollow}
                    actionLabel={societyFollowing.some((f) => f.societyId === item.societyId) ? "Joined ✓" : "Join Us"}
                    actionFollowedStyle={FOLLOWED_STYLE}
                  />
                );
              }
              return (
                <StudentCard
                  key={index}
                  item={item}
                  isFollowing={studentFollowing.some((f) => f._id === item._id)}
                  getImageUrl={getImageUrl}
                  defaultAvatar={DEFAULT_AVATAR}
                  onCardClick={() => navigate(`/student-profile?id=${item.userId}`)}
                  onActionClick={handleToggleStudentMemberFollow}
                  actionLabel={studentFollowing.some((f) => f._id === item._id) ? "Joined ✓" : "Join Us"}
                  actionFollowedStyle={FOLLOWED_STYLE}
                />
              );
            }}
          />

          {/* Society Following */}
          <StudentNetworkSection
            title="Society Following"
            items={filteredSocFollowing}
            searchOpen={socFollowSearchOpen}
            setSearchOpen={setSocFollowSearchOpen}
            searchValue={socFollowSearch}
            setSearchValue={setSocFollowSearch}
            emptyMessage="No society Joined found"
            renderCard={(item, index) => (
              <SocietyCard
                key={index}
                item={item}
                isFollowing={true}
                getImageUrl={getImageUrl}
                defaultSociety={DEFAULT_SOCIETY}
                onCardClick={() => navigate(`/society-profile?id=${item.societyId}`)}
                onActionClick={handleToggleSocietyFollowing}
                actionLabel="Joined ✓"
                actionFollowedStyle={FOLLOWED_STYLE}
              />
            )}
          />

          {/* Student Following */}
          <StudentNetworkSection
            title="Student Following"
            items={filteredStuFollowing}
            searchOpen={stuFollowSearchOpen}
            setSearchOpen={setStuFollowSearchOpen}
            searchValue={stuFollowSearch}
            setSearchValue={setStuFollowSearch}
            emptyMessage="No students found"
            renderCard={(item, index) => (
              <StudentCard
                key={index}
                item={item}
                isFollowing={true}
                getImageUrl={getImageUrl}
                defaultAvatar={DEFAULT_AVATAR}
                onCardClick={() => navigate(`/student-profile?id=${item.userId}`)}
                onActionClick={handleToggleStudentFollowing}
                actionLabel="Joined ✓"
                actionFollowedStyle={FOLLOWED_STYLE}
              />
            )}
          />

          {/* Society Suggestions */}
          <StudentNetworkSection
            title="Society Suggestions"
            items={filteredSocSugg}
            searchOpen={socSuggSearchOpen}
            setSearchOpen={setSocSuggSearchOpen}
            searchValue={socSuggSearch}
            setSearchValue={setSocSuggSearch}
            emptyMessage="No society suggestions found"
            renderCard={(item, index) => (
              <SocietyCard
                key={index}
                item={item}
                isFollowing={false}
                getImageUrl={getImageUrl}
                defaultSociety={DEFAULT_SOCIETY}
                onCardClick={() => navigate(`/society-profile?id=${item.societyId}`)}
                onActionClick={handleJoinSocietyFromSuggestion}
                actionLabel="Join Us"
                actionFollowedStyle={FOLLOWED_STYLE}
              />
            )}
          />

          {/* Student Suggestions */}
          <StudentNetworkSection
            title="Student Suggestions"
            items={filteredStuSugg}
            searchOpen={stuSuggSearchOpen}
            setSearchOpen={setStuSuggSearchOpen}
            searchValue={stuSuggSearch}
            setSearchValue={setStuSuggSearch}
            emptyMessage="No student suggestions found"
            renderCard={(item, index) => (
              <StudentCard
                key={index}
                item={item}
                isFollowing={false}
                getImageUrl={getImageUrl}
                defaultAvatar={DEFAULT_AVATAR}
                onCardClick={() => navigate(`/student-profile?id=${item.userId}`)}
                onActionClick={handleJoinStudentFromSuggestion}
                actionLabel="Join Us"
                actionFollowedStyle={FOLLOWED_STYLE}
              />
            )}
          />
        </div>

        {/* ── News ── */}
        <StudentNewsSection
          myNews={myNews}
          getUserId={getUserId}
          setMyNews={setMyNews}
        />

        {/* ── Edit Modal ── */}
        <EditStudentProfileModal
          student={student}
          showModal={showModal}
          previewUrl={previewUrl}
          editCollege={editCollege}
          setEditCollege={setEditCollege}
          editYear={editYear}
          setEditYear={setEditYear}
          getImageUrl={getImageUrl}
          defaultAvatar={DEFAULT_AVATAR}
          onImageChange={handleImageChange}
          onSave={handleSaveProfile}
          onClose={closeModal}
        />
      </div>
    </>
  );
}
