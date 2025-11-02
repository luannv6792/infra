import React from 'react'
import Sidebar from './Sidebar'
import ThemeToggle from './ThemeToggle'

export default function Dashboard({ onLogout }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 transition-colors duration-500 text-gray-900 dark:text-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-4">
            <ThemeToggle />
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="card">Application List</div>
          <div className="card">Report</div>
          <div className="card">Settings</div>
        </div>
      </div>
    </div>
  )
}
