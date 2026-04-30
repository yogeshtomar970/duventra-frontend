import { useState, useEffect } from "react";
import API_BASE_URL from "../config/api.js";

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.id || user?._id || null;
};

const getMyId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = getUserId();
  return user?.societyId || "student_" + userId;
};

const getFollowerType = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.societyId ? "society" : "student";
};

/**
 * useStudentNetwork
 * Society + Student network ka saara state, fetch aur handlers.
 */
export default function useStudentNetwork() {
  const [societyMembers, setSocietyMembers] = useState([]);
  const [societyFollowing, setSocietyFollowing] = useState([]);
  const [societySuggestions, setSocietySuggestions] = useState([]);
  const [studentMembers, setStudentMembers] = useState([]);
  const [studentFollowing, setStudentFollowing] = useState([]);
  const [studentSuggestions, setStudentSuggestions] = useState([]);

  // ── Fetch on mount ──
  useEffect(() => {
    const userId = getUserId();
    if (!userId) return;
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const socId = user.societyId || "student_" + userId;

    // Society APIs
    fetch(`${API_BASE_URL}/api/join/suggestions/${socId}`)
      .then((r) => r.json())
      .then((d) => d.success && setSocietySuggestions(d.data))
      .catch(() => {});

    fetch(`${API_BASE_URL}/api/join/following/${socId}`)
      .then((r) => r.json())
      .then((d) => d.success && setSocietyFollowing(d.data))
      .catch(() => {});

    // Student APIs
    fetch(`${API_BASE_URL}/api/student/suggestions/${userId}`)
      .then((r) => r.json())
      .then((d) => d.success && setStudentSuggestions(d.data))
      .catch(() => {});

    fetch(`${API_BASE_URL}/api/student/following/${userId}`)
      .then((r) => r.json())
      .then((d) => d.success && setStudentFollowing(d.data))
      .catch(() => {});

    // Members — memberType se society aur student alag karo
    fetch(`${API_BASE_URL}/api/student/members/${userId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setSocietyMembers(d.data.filter((m) => m.memberType === "society"));
          setStudentMembers(
            d.data.filter((m) => m.memberType === "student" || !m.memberType)
          );
        }
      })
      .catch(() => {});
  }, []);

  // ── Society handlers ──────────────────────────────────────────────────────

  const handleJoinSocietyFromSuggestion = async (item) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/join/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ myId: getMyId(), targetId: item.societyId }),
      });
      const data = await res.json();
      if (data.joined) {
        setSocietySuggestions((prev) =>
          prev.filter((s) => s.societyId !== item.societyId)
        );
        setSocietyFollowing((prev) => [...prev, item]);
      }
    } catch {}
  };

  const handleToggleSocietyFollowing = async (item) => {
    const isF = societyFollowing.some((f) => f.societyId === item.societyId);
    try {
      const endpoint = isF ? "unjoin" : "join";
      const res = await fetch(`${API_BASE_URL}/api/join/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ myId: getMyId(), targetId: item.societyId }),
      });
      const data = await res.json();
      if (isF && !data.joined) {
        setSocietyFollowing((prev) =>
          prev.filter((f) => f.societyId !== item.societyId)
        );
        setSocietySuggestions((prev) => [...prev, item]);
      } else if (!isF && data.joined) {
        setSocietySuggestions((prev) =>
          prev.filter((s) => s.societyId !== item.societyId)
        );
        setSocietyFollowing((prev) => [...prev, item]);
      }
    } catch {}
  };

  const handleToggleSocietyMemberFollow = async (item) => {
    const isF = societyFollowing.some((f) => f.societyId === item.societyId);
    try {
      const endpoint = isF ? "unjoin" : "join";
      const res = await fetch(`${API_BASE_URL}/api/join/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ myId: getMyId(), targetId: item.societyId }),
      });
      const data = await res.json();
      if (isF && !data.joined)
        setSocietyFollowing((prev) =>
          prev.filter((f) => f.societyId !== item.societyId)
        );
      else if (!isF && data.joined)
        setSocietyFollowing((prev) => [...prev, item]);
    } catch {}
  };

  // ── Student handlers ──────────────────────────────────────────────────────

  const handleJoinStudentFromSuggestion = async (item) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/student/follow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          myId: getMyId(),
          targetId: item._id,
          followerType: getFollowerType(),
        }),
      });
      const data = await res.json();
      if (data.followed) {
        setStudentSuggestions((prev) => prev.filter((s) => s._id !== item._id));
        setStudentFollowing((prev) => [...prev, item]);
      }
    } catch {}
  };

  const handleToggleStudentFollowing = async (item) => {
    const isF = studentFollowing.some((f) => f._id === item._id);
    try {
      if (isF) {
        const res = await fetch(`${API_BASE_URL}/api/student/unfollow`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ myId: getMyId(), targetId: item._id }),
        });
        const data = await res.json();
        if (!data.followed) {
          setStudentFollowing((prev) => prev.filter((f) => f._id !== item._id));
          setStudentSuggestions((prev) => [...prev, item]);
        }
      } else {
        const res = await fetch(`${API_BASE_URL}/api/student/follow`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            myId: getMyId(),
            targetId: item._id,
            followerType: getFollowerType(),
          }),
        });
        const data = await res.json();
        if (data.followed) {
          setStudentSuggestions((prev) =>
            prev.filter((s) => s._id !== item._id)
          );
          setStudentFollowing((prev) => [...prev, item]);
        }
      }
    } catch {}
  };

  const handleToggleStudentMemberFollow = async (item) => {
    const isF = studentFollowing.some((f) => f._id === item._id);
    try {
      if (isF) {
        const res = await fetch(`${API_BASE_URL}/api/student/unfollow`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ myId: getMyId(), targetId: item._id }),
        });
        const data = await res.json();
        if (!data.followed)
          setStudentFollowing((prev) => prev.filter((f) => f._id !== item._id));
      } else {
        const res = await fetch(`${API_BASE_URL}/api/student/follow`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            myId: getMyId(),
            targetId: item._id,
            followerType: getFollowerType(),
          }),
        });
        const data = await res.json();
        if (data.followed) setStudentFollowing((prev) => [...prev, item]);
      }
    } catch {}
  };

  return {
    societyMembers,
    societyFollowing,
    societySuggestions,
    studentMembers,
    studentFollowing,
    studentSuggestions,
    handleJoinSocietyFromSuggestion,
    handleToggleSocietyFollowing,
    handleToggleSocietyMemberFollow,
    handleJoinStudentFromSuggestion,
    handleToggleStudentFollowing,
    handleToggleStudentMemberFollow,
  };
}
