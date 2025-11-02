import React from 'react'
import { motion } from 'framer-motion'
import { Settings, FileBarChart2, Box } from 'lucide-react'

const items = [
  { key: 'apps', label: 'Applications', icon: <Box size={18}/> },
  { key: 'reports', label: 'Reports', icon: <FileBarChart2 size={18}/> },
  { key: 'settings', label: 'Settings', icon: <Settings size={18}/> }
]

export default function Sidebar({ active, onSelect }) {
  return (
    <div className="w-64 p-4 bg-gray-100 dark:bg-[#1F2937] text-gray-900 dark:text-white">
      <div className="text-center font-bold text-xl mb-6">Infras</div>
      <div className="flex flex-col gap-3">
        {items.map(it => (
          <motion.div
            key={it.key}
            onClick={()=>onSelect(it.key)}
            whileHover={{ scale: 1.03 }}
            className={`menu-card flex items-center gap-3 ${active===it.key ? 'bg-blue-600 text-white' : ''}`}
          >
            <div>{it.icon}</div>
            <div className="font-medium">{it.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
