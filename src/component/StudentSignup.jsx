import API_BASE_URL from "../config/api.js";
import { useState } from "react";
import "../studentsignup.css";
import { useNavigate } from "react-router-dom";

export default function StudentSignup() {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    course: "",
    collegeName: "",
    email: "",
    year: "",
    password: "",
    repassword: "",
  });
const navigate = useNavigate();

  const [idCard, setIdCard] = useState(null);

  // input change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("rollNo", formData.rollNo);
    data.append("course", formData.course);
    data.append("collegeName", formData.collegeName);
    data.append("email", formData.email);
    data.append("year", formData.year);
    data.append("password", formData.password);
    data.append("repassword", formData.repassword);
    data.append("idCard", idCard);

    try {
      const res = await fetch(`${API_BASE_URL}/api/student/signup`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
      alert(result.message || "Signup successful");
      navigate("/login"); // ✅ redirect here
    } else {
      alert(result.message || "Signup failed");
    }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="societycontainer">
      <div className="studentsignup">
        <h2>Student Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name as per Id card"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            name="rollNo"
            placeholder="Roll No as per Id card"
            value={formData.rollNo}
            onChange={handleChange}
          />

          <input
            name="course"
            placeholder="Course as per Id card"
            value={formData.course}
            onChange={handleChange}
          />

          <input
            name="collegeName"
            placeholder="College Name as per Id card"
            value={formData.collegeName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="year"
            placeholder="Year"
            value={formData.year}
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

          <label>Upload ID Card</label>
          <input
            type="file"
            onChange={(e) => setIdCard(e.target.files[0])}
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
