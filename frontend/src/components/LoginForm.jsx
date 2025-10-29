// components/LoginForm.jsx
import React, { useState } from 'react'

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(username, password)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1F2937] p-8 rounded-2xl shadow-2xl w-96"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-[#60A5FA] drop-shadow-md">
        L infra
      </h2>

      <input
        type="text"
        placeholder="Username"
        className="w-full mb-4 p-3 rounded-lg bg-[#111827] border border-gray-600 text-white"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-6 p-3 rounded-lg bg-[#111827] border border-gray-600 text-white"
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
  )
}
