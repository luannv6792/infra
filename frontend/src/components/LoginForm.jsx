import React, { useState } from 'react'

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await onLogin(username, password)
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1F2937] p-8 rounded-2xl shadow-2xl w-96 transition-all fade-in"
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
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold text-white transition-all shadow-lg ${
          loading
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-[#2563EB] hover:bg-[#1D4ED8]'
        }`}
      >
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
    </form>
  )
}
