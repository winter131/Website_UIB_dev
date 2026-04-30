'use client'
import React from 'react'
import { FaRegNewspaper, FaRegComments, FaRegBell } from 'react-icons/fa'

export default function ActionButtons() {
  const buttons = [
    { label: 'News', icon: <FaRegNewspaper size={24} />, color: 'bg-[#1A365D]' },
    { label: 'Testimoni', icon: <FaRegComments size={24} />, color: 'bg-[#FFCC00] text-blue-900' },
    { label: 'Announcement', icon: <FaRegBell size={24} />, color: 'bg-[#1A365D]' },
  ]

  return (
    <div className="container mx-auto px-4 md:px-24 -mt-8 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {buttons.map((btn, i) => (
          <button 
            key={i}
            className={`${btn.color} p-4 rounded-lg shadow-lg flex items-center justify-center gap-4 text-white font-bold text-xl hover:scale-105 transition-transform`}
          >
            {btn.icon}
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}
