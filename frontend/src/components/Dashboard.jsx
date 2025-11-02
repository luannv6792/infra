import React, { useState } from 'react'
import Sidebar from './Sidebar'
import ThemeToggle from './ThemeToggle'

export default function Dashboard({ username }) {
  const [activeMenu, setActiveMenu] = useState('apps')

  return (
    <div className="flex h-screen dark:bg-gray-950 bg-gray-100 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Sidebar activeMenu={activeMenu} onSelectMenu={setActiveMenu} />

      <div className="flex-1 p-8 fade-in">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome, {username}</h1>
          <ThemeToggle />
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg transition-all">
          {activeMenu === 'apps' && <p>📦 Application List will appear here</p>}
          {activeMenu === 'reports' && <p>📊 Reports and metrics</p>}
          {activeMenu === 'settings' && <p>⚙️ Settings configuration</p>}
        </div>
      </div>
    </div>
  )
}
