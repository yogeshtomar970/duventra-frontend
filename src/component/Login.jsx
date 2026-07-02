import React from "react";

// Styles
import "../styles/Login.css";

// Components
import LoginLogo from "../component/LoginLogo";
import LoginForm from "../component/LoginForm";

// Hook
import useLogin from "../hooks/useLogin";

export default function Login() {
  const { email, setEmail, password, setPassword, handleLogin } = useLogin();

  return (
    <div className="logincontainer">
      <LoginLogo />
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onLogin={handleLogin}
      />
    </div>
  );
}
