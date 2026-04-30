import React from "react";
import "../ProfilePage.css";
import BottomNav from "./BottomNav";

export default function SocietyProfilePageLink() {
  return (
    <>
      <BottomNav />

      <div className="profile-container">
        {/* Profile Image */}
        <div className="profile-header">
          <img
            src="https://i.pinimg.com/236x/4f/b6/92/4fb692c0a3b832367e811a896db8105b.jpg"
            alt="profile"
            className="profile-image"
          />
          <h2 className="society-name">
            Abhivyakti at (Indraprastha College of delhi university)
          </h2>
          <p className="society-category">Dramatic Society | B.Tech CSE</p>
          <p className="bio">
            Loves Music 🎵 | Always curious to learn something new!
          </p>

          {/* Edit Button */}
          <button className="join-btn">Join Us</button>
        </div>

        {/* Followers / Following / Posts */}
        <div className="stats">
          <div>
            <h3>120</h3>
            <p>Members</p>
          </div>
          <div>
            <h3>180</h3>
            <p>Following</p>
          </div>
          <div>
            <h3>45</h3>
            <p>Posts</p>
          </div>
        </div>

        {/* Committee Members Example */}
        <div className="committee">
          <h3>Society Committee Members</h3>
          <div className="members">
            <div className="member-card">
              <img
                src="https://www.stryx.com/cdn/shop/articles/man-looking-attractive.jpg?v=1666662774"
                alt="Ravi"
                className="member-img"
              />
              <p>Ravi Kumar</p>
              <span>President</span>
            </div>
            <div className="member-card">
              <img
                src="https://img.freepik.com/free-photo/young-woman-blue-sweater-autumn-park_1303-11368.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Neha"
                className="member-img"
              />
              <p>Neha Sharma</p>
              <span>Vice President</span>
            </div>
            <div className="member-card">
              <img
                src="https://static.toiimg.com/photo/93910698.cms"
                alt="Amit"
                className="member-img"
              />
              <p>Amit Singh</p>
              <span>Secretary</span>
            </div>
            <div className="member-card">
              <img
                src="https://discoverymood.com/wp-content/uploads/2020/04/Mental-Strong-Women-min.jpg"
                alt="Pooja"
                className="member-img"
              />
              <p>Pooja Verma</p>
              <span>Treasurer</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
}
