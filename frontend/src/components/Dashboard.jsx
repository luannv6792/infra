import React from "react";
import { motion } from "framer-motion";

export default function Dashboard({ theme, setTheme }) {
  const menus = ["Applications", "Reports", "Settings"];

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-[#0F111A] text-white" : "bg-gray-100 text-gray-800"} transition-all`}>
      {/* Sidebar */}
      <aside className="w-64 p-6 border-r border-gray-700">
        <h2 className="text-2xl font-bold mb-8">Infras Dashboard</h2>

        {menus.map((menu, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer mb-4 p-3 rounded-lg hover:bg-[#2563EB] hover:text-white transition-all"
          >
            {menu}
          </motion.div>
        ))}

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="mt-6 w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-lg"
        >
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-semibold"
        >
          Welcome to Infras
        </motion.h1>
      </main>
    </div>
  );
}
