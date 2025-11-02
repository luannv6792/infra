// frontend/src/components/LoginForm.jsx
import React, { useState } from 'react'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('http://localhost:32001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json().catch(()=>null)
      if (!res.ok) {
        // if backend returned json with message, show it
        setMessage(data?.message || 'Server error: ' + res.status)
      } else {
        if (data.status === 'success') {
          setMessage(`✅ Chào ${data.user.full_name || username}!`)
        } else {
          setMessage(data.message || 'Sai thông tin đăng nhập')
        }
      }
    } catch (err) {
      console.error(err)
      setMessage('⚠️ Lỗi kết nối server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#1F2937] p-8 rounded-2xl shadow-2xl w-96 text-center">
      <h2 className="text-3xl font-bold mb-6 text-[#60A5FA]">L infra</h2>
      <input type="text" placeholder="Username" value={username}
             onChange={(e)=>setUsername(e.target.value)}
             className="w-full mb-4 p-3 rounded-lg bg-[#111827] border border-gray-600 text-white"/>
      <input type="password" placeholder="Password" value={password}
             onChange={(e)=>setPassword(e.target.value)}
             className="w-full mb-6 p-3 rounded-lg bg-[#111827] border border-gray-600 text-white"/>
      <button type="submit" disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all shadow-lg ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#2563EB] hover:bg-[#1D4ED8]'}`}>
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
      {message && <p className="mt-4 text-gray-200 font-medium">{message}</p>}
    </form>
  )
}
