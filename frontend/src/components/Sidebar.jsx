import React from 'react'

export default function Sidebar({ activeMenu, onSelectMenu }) {
  const menus = [
    { name: 'Applications', key: 'apps' },
    { name: 'Reports', key: 'reports' },
    { name: 'Settings', key: 'settings' },
  ]

  return (
    <div className="w-56 h-full bg-gray-800 dark:bg-gray-900 text-gray-300 p-4 flex flex-col gap-2 transition-all duration-300">
      {menus.map((menu) => (
        <div
          key={menu.key}
          onClick={() => onSelectMenu(menu.key)}
          className={`p-3 rounded-xl cursor-pointer transition-colors text-center font-semibold
            ${
              activeMenu === menu.key
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-700 hover:text-white'
            }`}
        >
          {menu.name}
        </div>
      ))}
    </div>
  )
}
