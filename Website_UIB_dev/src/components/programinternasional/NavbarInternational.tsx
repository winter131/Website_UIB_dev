'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaChevronDown, FaBars, FaEnvelope } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function NavbarInternational() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/international' && pathname !== '/international') return false
    return pathname.startsWith(path)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeInOut" } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } }
  }

  return (
    <header className="fixed top-0 w-full z-[1000] shadow-sm bg-white font-poppins transition-colors duration-300">
      {/* Top Bright Yellow Bar */}
      <motion.div
        initial={false}
        animate={{
          height: isScrolled ? 0 : 'auto',
          opacity: isScrolled ? 0 : 1,
          borderBottomWidth: isScrolled ? 0 : 1
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="bg-[#FFCC00] px-4 md:px-24 hidden md:flex justify-between items-center text-[13px] text-blue-900 font-bold border-yellow-500 origin-top overflow-hidden"
      >
        <div className="flex items-center gap-6 py-2">
          <Link href="https://uib.ac.id" className="flex items-center gap-2 hover:text-orange-600 transition-colors no-underline">
            <span className="tracking-wide">uib.ac.id</span>
          </Link>
        </div>
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-1">
            {[
              { code: 'ID', src: 'https://flagcdn.com/w40/id.png' },
              { code: 'EN', src: 'https://flagcdn.com/w40/gb.png' },
            ].map((lang) => (
              <button key={lang.code} className="group flex items-center hover:scale-110 transition-transform px-1">
                <div className="relative h-3 w-5 overflow-hidden border border-gray-300">
                  <Image src={lang.src} alt={lang.code} fill className="object-cover" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <nav className="navbar px-4 md:px-24 min-h-[80px] bg-white border-b border-gray-100 flex items-center justify-between">
        <div className="navbar-start w-auto">
          <Link href="/international" className="flex items-center">
            <Image src="/logo/logo-uib.png" alt="Logo UIB" width={150} height={45} className="h-10 w-auto object-contain" priority />
          </Link>
        </div>

        <div className="navbar-end flex-grow justify-end">
          <div className="hidden lg:flex h-full items-center">
            <ul className="menu menu-horizontal p-0 font-bold text-blue-900 text-[14px] items-center gap-2 flex-nowrap">
              
              <li className="list-none relative group">
                <Link href="/international" className={`px-4 py-4 transition-all duration-300 no-underline ${isActive('/international') ? 'text-orange-500' : 'hover:text-orange-500'}`}>
                  Home
                  {isActive('/international') && (
                    <motion.div layoutId="activeNavInt" className="absolute bottom-2 left-4 right-4 h-0.5 bg-orange-500" />
                  )}
                </Link>
              </li>

              <li className="relative list-none group" onMouseEnter={() => setHoveredMenu('programs')} onMouseLeave={() => setHoveredMenu(null)}>
                <div className="flex items-center gap-1 px-4 py-4 cursor-pointer no-underline hover:text-orange-500 transition-colors">
                  <span>Programs</span>
                  <motion.div animate={{ rotate: hoveredMenu === 'programs' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FaChevronDown size={10} />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {hoveredMenu === 'programs' && (
                    <motion.ul initial="hidden" animate="visible" exit="hidden" variants={dropdownVariants} className="absolute top-full left-0 z-[1001] bg-white shadow-2xl w-56 p-2 border-t-4 border-orange-500 list-none rounded-b-xl text-blue-900 font-medium">
                      <li><Link href="#" className="block py-3 px-4 hover:bg-orange-50 hover:text-orange-500 transition-colors rounded-md no-underline">3+2 Programs</Link></li>
                      <li><Link href="#" className="block py-3 px-4 hover:bg-orange-50 hover:text-orange-500 transition-colors rounded-md no-underline">2+2 Programs</Link></li>
                      <li><Link href="#" className="block py-3 px-4 hover:bg-orange-50 hover:text-orange-500 transition-colors rounded-md no-underline">1+1 Programs</Link></li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              <li className="list-none relative">
                <Link href="#" className="px-4 py-4 hover:text-orange-500 transition-colors no-underline">
                  Living in Indonesia
                </Link>
              </li>

              <li className="list-none relative">
                <Link href="#" className="px-4 py-4 hover:text-orange-500 transition-colors no-underline">
                  Partnership
                </Link>
              </li>

            </ul>
          </div>

          <div className="lg:hidden flex items-center">
             <button className="btn btn-ghost btn-circle">
                <FaBars size={22} className="text-blue-900" />
             </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
