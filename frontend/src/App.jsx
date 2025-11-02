import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
  const [user, setUser] = useState(null)

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
            className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#111827] to-[#0F111A]"
          >
            <LoginForm onLoginSuccess={(username) => setUser({ username })} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.45 }}
          >
            <Dashboard username={user.username} onLogout={() => setUser(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}
