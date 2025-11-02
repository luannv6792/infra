import React, { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#111827] to-[#0F111A] transition-all">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1F2937] dark:bg-[#111827] p-8 rounded-2xl shadow-2xl w-96 transition-all duration-500"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-[#60A5FA] drop-shadow-md">
          Infras
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-3 rounded-lg bg-[#0F172A] border border-gray-600 text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg bg-[#0F172A] border border-gray-600 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-3 bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg font-semibold text-white transition-all shadow-lg"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
