import React from 'react'
import Sidebar from './Sidebar'

export default function Dashboard({ onLogout }) {
  return (
    <div className="flex h-screen transition-all bg-gray-50 dark:bg-[#0F111A]">
      <Sidebar />
      <div className="flex-1 p-8 text-gray-800 dark:text-white transition-all duration-300">
        <h1 className="text-3xl font-bold mb-4">Welcome to Infras Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Chọn menu bên trái để tiếp tục.
        </p>
        <button
          onClick={onLogout}
          className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  )
}
