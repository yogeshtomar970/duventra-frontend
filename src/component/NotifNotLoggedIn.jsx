import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import BottomNav from "./BottomNav";

/**
 * NotifNotLoggedIn
 * Shown when no user is logged in.
 */
export default function NotifNotLoggedIn() {
  return (
    <>
      <BottomNav />
      <div className="notif-not-logged">
        <FontAwesomeIcon icon={faBell} size="3x" style={{ opacity: 0.3 }} />
        <p>Please login to see notifications</p>
      </div>
    </>
  );
}
