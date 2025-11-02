import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'

export default function App() {
  const [user, setUser] = useState(null)

  const handleLogin = async (username, password) => {
    try {
      const res = await fetch('http://localhost:32001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        alert('Đăng nhập thất bại. Vui lòng kiểm tra lại.')
        return
      }

      const data = await res.json()
      if (data.success) {
        // Lưu trạng thái user
        setUser({ username })
      } else {
        alert('Sai username hoặc password.')
      }
    } catch (err) {
      console.error('Lỗi kết nối backend:', err)
      alert('Không thể kết nối đến backend.')
    }
  }

  return (
    <div className="min-h-screen transition-all duration-500 bg-gradient-to-b from-[#111827] to-[#0F111A] dark:from-gray-900 dark:to-gray-950">
      {!user ? (
        <div className="flex items-center justify-center min-h-screen">
          <LoginForm onLogin={handleLogin} />
        </div>
      ) : (
        <Dashboard username={user.username} />
      )}
    </div>
  )
}
