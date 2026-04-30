import React from "react";
import "../styles/StudentProfileCard.css";

export default function StudentProfileCard({ student, getImageUrl, defaultAvatar, onEditClick }) {
  return (
    <div className="student-profile-card">
      <div className="profile-top">
        <img
          src={getImageUrl(student.profilePic, defaultAvatar)}
          alt="avatar"
          className="student-avatar"
        />
        <div className="profile-buttons">
          <button className="edit-btn" onClick={onEditClick}>
            Edit
          </button>
        </div>
      </div>

      <div className="student-info">
        <div>
          <label>User_Id</label>
          <p>{student.userId}</p>
        </div>
        <div>
          <label>Student Name</label>
          <p>{student.name}</p>
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
    </div>
  );
}
