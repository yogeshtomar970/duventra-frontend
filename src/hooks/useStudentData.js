import { useState, useEffect } from "react";
import API_BASE_URL from "../config/api.js";

const getUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.id || user?._id || null;
};

/**
 * useStudentData
 * Student profile aur myNews fetch karta hai.
 */
export default function useStudentData() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [myNews, setMyNews] = useState([]);

  useEffect(() => {
    const userId = getUserId();
    if (!userId) {
      setNotLoggedIn(true);
      setLoading(false);
      return;
    }

    // Profile fetch
    fetch(`${API_BASE_URL}/api/student/profile/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStudent(data.student);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    // News fetch
    fetch(`${API_BASE_URL}/api/news/all`)
      .then((res) => res.json())
      .then((data) => {
        setMyNews(data.filter((item) => item.userId === userId));
      })
      .catch(() => {});
  }, []);

  return {
    student,
    setStudent,
    loading,
    notLoggedIn,
    myNews,
    setMyNews,
    getUserId,
  };
}
