import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import { ThemeProvider } from './context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-[#0F111A] transition-colors duration-500">
        <AnimatePresence mode="wait">
          {loggedIn ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Dashboard onLogout={() => setLoggedIn(false)} />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#111827] to-[#0F111A]"
            >
              <LoginForm onLoginSuccess={() => setLoggedIn(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  )
}
