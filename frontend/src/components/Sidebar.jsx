import React from 'react'
import { motion } from 'framer-motion'
import { AppWindow, FileBarChart2, Settings } from 'lucide-react'

const menuItems = [
  { name: 'Applications', icon: <AppWindow size={20} /> },
  { name: 'Reports', icon: <FileBarChart2 size={20} /> },
  { name: 'Settings', icon: <Settings size={20} /> }
]

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 dark:bg-[#1F2937] text-gray-900 dark:text-white p-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Infras</h2>
      <ul>
        {menuItems.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-2 hover:bg-blue-500 hover:text-white transition-all"
            whileHover={{ scale: 1.05 }}
          >
            {item.icon}
            <span>{item.name}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
