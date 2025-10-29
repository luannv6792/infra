import React, { useState } from 'react'
import logo from '../assets/logo.svg'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('http://localhost:32001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      alert(data.message || 'Đăng nhập thành công!')
    } catch (err) {
      alert('Lỗi kết nối backend!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-[#1C1E29] rounded-2xl shadow-2xl border border-gray-700">
      <div className="flex justify-center mb-6">
        <img src={logo} alt="L Infra" className="w-16 h-16 drop-shadow-lg" />
      </div>
      <h1 className="text-2xl font-semibold text-center mb-6">L Infra Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 bg-[#2A2D3E] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 bg-[#2A2D3E] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-2 rounded-lg shadow-lg"
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  )
}
