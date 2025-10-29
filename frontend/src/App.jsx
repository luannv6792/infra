import React, { useState } from 'react'
import LoginForm from './components/LoginForm'

export default function App() {
  const [status, setStatus] = useState(null)

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:32001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok && data.status === 'success') {
        setStatus({ type: 'success', message: `Chào ${data.user.full_name}!` })
      } else {
        setStatus({ type: 'error', message: data.message || 'Sai thông tin đăng nhập' })
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Không thể kết nối tới backend' })
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#111827] to-[#0F111A] text-white">
      <LoginForm onLogin={handleLogin} />
      {status && (
        <div
          className={`mt-6 px-6 py-3 rounded-2xl shadow-lg text-lg font-semibold ${
            status.type === 'success'
              ? 'bg-green-600/20 text-green-400 border border-green-400/30'
              : 'bg-red-600/20 text-red-400 border border-red-400/30'
          }`}
        >
          {status.message}
        </div>
      )}
    </div>
  )
}
