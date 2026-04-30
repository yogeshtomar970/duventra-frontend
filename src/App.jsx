import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./component/Homepage";
import Notification from "./component/Notification";
import NewsPage from "./component/News";
import MessagePage from "./component/MessageCard";
import ProfilePage from "./component/ProfilePage";
import SocietyProfilePageLink from "./component/societyprofilelink";
import Login from "./component/Login";
import Signup from "./component/Welcome";
import StudentSignup from "./component/StudentSignup";
import SocietySignup from "./component/SocietySignup";
import Studentprofile from "./component/Profiles";

import UploadPost from "./component/UploadPost";
import CommentsCard from "./component/Comments";
import SocietyPublicProfile from "./component/SocietyPublicProfile";
import StudentPublicProfile from "./component/StudentPublicProfile";
import UploadNews from "./component/UploadNews";
import DescriptionCard from "./component/DescriptionCard";
import HelpSupport from "./component/HelpSupport";
import PrivacyPolicy from "./component/PrivacyPolicy";

function App() {
  // ✅ FIX Bug 2: Wait for auth state to be read from localStorage before rendering
  // This prevents the flicker where navbar/bottomnav briefly shows "logged out" state
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    // localStorage is synchronous — just a tick to let all components
    // initialise from the same read before painting
    setAuthReady(true);
  }, []);

  if (!authReady) return null; // Prevent flicker on first paint

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/meesage" element={<MessagePage />} />
        <Route path="/societyprofile" element={<ProfilePage />} />
        <Route
          path="/societyprofilelink"
          element={<SocietyProfilePageLink />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/studentsignup" element={<StudentSignup />} />
        <Route path="/societysignup" element={<SocietySignup />} />
        <Route path="/studentprofile" element={<Studentprofile />} />
       
        <Route path="/upload" element={<UploadPost />} />
        <Route path="/commentlink" element={<CommentsCard />} />
        <Route path="/description" element={<DescriptionCard />} />
        <Route path="/upload-news" element={<UploadNews />} />
        <Route path="/society-profile" element={<SocietyPublicProfile />} />
        <Route path="/student-profile" element={<StudentPublicProfile />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
