import React from "react";
import { Link } from "react-router-dom";
import "../styles/LoginForm.css";

/**
 * LoginForm
 * Email + password inputs, login button, signup link.
 */
export default function LoginForm({
  email, setEmail,
  password, setPassword,
  onLogin,
}) {
  return (
    <div className="login">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onLogin()}
      />

      <button className="btn" onClick={onLogin}>
        Login
      </button>

      <span>Don't have an account? </span>
      <Link to="/signup">
        <span className="signup">Signup here..</span>
      </Link>
    </div>
  );
}
