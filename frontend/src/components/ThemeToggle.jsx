import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export default function ThemeToggle(){
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <button onClick={toggleTheme} className="px-3 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all">
      {theme==='dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}
