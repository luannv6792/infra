import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import { ThemeProvider } from './context/ThemeContext'
import './transitions.css'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <AnimatePresence mode="wait">
          {isLoggedIn ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Dashboard onLogout={() => setIsLoggedIn(false)} />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#111827] to-[#0F111A]">
                <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}
