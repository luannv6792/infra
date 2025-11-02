import React, { useState } from 'react'

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data && data.success) {
        onLoginSuccess(username)
      } else {
        setMsg(data?.message || 'Sai username hoặc mật khẩu')
      }
    } catch (err) {
      setMsg('Không thể kết nối tới server')
      console.error(err)
    } finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="bg-[#1F2937] p-8 rounded-2xl shadow-2xl w-96 fade-in">
      <div className="flex flex-col items-center">
        <h2 className="title-infras">Infras</h2>
      </div>

      <input value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" className="w-full mb-4 p-3 rounded-lg bg-[#111827] border border-gray-600 text-white focus:outline-none"/>
      <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full mb-6 p-3 rounded-lg bg-[#111827] border border-gray-600 text-white focus:outline-none"/>
      <button disabled={loading} className={`w-full py-3 rounded-lg font-semibold text-white ${loading ? 'bg-gray-500' : 'bg-[#2563EB] hover:bg-[#1D4ED8]'}`}>
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
      {msg && <p className="mt-4 text-sm text-red-300 text-center">{msg}</p>}
    </form>
  )
}
