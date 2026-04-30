import API_BASE_URL from "../config/api.js";
import { useState } from "react";
import "../societysignup.css";
import { useNavigate } from "react-router-dom";

export default function SocietySignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    societyName: "",
    societyType: "",
    collegeName: "",
    coordinatorName: "",
    email: "",
    password: "",
    repassword: "",
  });
  // input change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/society/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message || "Society signup successful");
        navigate("/login"); // ✅ redirect to login
      } else {
        alert(result.message || "Signup failed");
      }
    } catch (error) {
      alert("Server error");
    }
  };

  return (
    <div className="societycontainer">
      <div className="societysignup">
        <h2>Society Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="societyName"
            placeholder="Society Name"
            value={formData.societyName}
            onChange={handleChange}
          />

          <select
            name="societyType"
            value={formData.societyType}
            onChange={handleChange}
            required
          >
            <option value="">Select Society Type</option>
            <option value="Academic & Literary">Academic & Literary</option>
            <option value="Cultural & Arts">Cultural & Arts</option>
            <option value="Social & Service">Social & Service</option>
            <option value="Specialized Cells">Specialized Cells</option>
            <option value="Technical & Hobby">Technical & Hobby</option>
          </select>

          <input
            type="text"
            name="collegeName"
            placeholder="College Name"
            value={formData.collegeName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="coordinatorName"
            placeholder="Coordinator Name"
            value={formData.coordinatorName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Society Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="repassword"
            placeholder="Re-enter Password"
            value={formData.repassword}
            onChange={handleChange}
            required
          />

          <button className="btn" type="submit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
