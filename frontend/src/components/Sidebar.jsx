import React from 'react'
import { motion } from 'framer-motion'

export default function Sidebar() {
  const menu = [
    { name: 'Application List', icon: '📦' },
    { name: 'Report', icon: '📊' },
    { name: 'Settings', icon: '⚙️' },
  ]

  return (
    <div className="w-64 bg-gray-200 dark:bg-[#1F2937] p-4 transition-colors duration-500">
      <h2 className="text-xl font-bold text-center mb-6">L infra</h2>
      {menu.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="cursor-pointer flex items-center gap-3 p-3 rounded-lg mb-3 bg-gray-100 dark:bg-[#111827] hover:bg-[#2563EB] hover:text-white transition-all"
        >
          <span>{item.icon}</span>
          <span>{item.name}</span>
        </motion.div>
      ))}
    </div>
  )
}
