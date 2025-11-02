import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import "./transitions.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok && data.status === "success") {
        setUser(username);
      } else {
        alert("Sai username hoặc mật khẩu");
      }
    } catch (err) {
      alert("Không thể kết nối tới backend");
      console.error(err);
    }
  };

  if (!user) return <LoginForm onLogin={handleLogin} />;

  return <Dashboard theme={theme} setTheme={setTheme} />;
}
