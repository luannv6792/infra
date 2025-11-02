import React, { useState } from 'react'
import Sidebar from './Sidebar'
import ThemeToggle from './ThemeToggle'

export default function Dashboard({ username, onLogout }) {
  const [active, setActive] = useState('apps')
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0F111A] text-gray-900 dark:text-white transition-colors">
      <Sidebar active={active} onSelect={setActive}/>
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome, {username}</h1>
          <div className="flex gap-3 items-center">
            <ThemeToggle/>
            <button onClick={onLogout} className="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white">Logout</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="menu-card">Main content area for {active}</div>
          <div className="menu-card">Widgets / stats</div>
          <div className="menu-card">More content</div>
        </div>
      </div>
    </div>
  )
}
