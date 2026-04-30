import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/**
 * useBottomNav
 * FAB menu open/close, outside click close, user/role, navigation.
 */
export default function useBottomNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef  = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const role = user?.role; // "student" | "society" | undefined

  // Dynamic profile path based on role
  const profilePath = role === "student" ? "/studentprofile" : "/societyprofile";

  // Close menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const go = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleFabClick = () => {
    if (!user) { navigate("/login"); return; }
    setMenuOpen((prev) => !prev);
  };

  return {
    menuOpen,
    setMenuOpen,
    menuRef,
    user,
    role,
    profilePath,
    go,
    handleFabClick,
  };
}
