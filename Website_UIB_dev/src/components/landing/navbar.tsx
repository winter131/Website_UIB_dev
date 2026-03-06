'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaMapMarkerAlt, FaPhoneAlt, FaSearch, FaChevronDown, FaBars } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

export default function NavbarLanding() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Konfigurasi Animasi Dropdown agar sangat smooth
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: "easeInOut" } as any
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" } as any
    }
  }

  return (
    <header className="fixed top-0 w-full z-[1000] shadow-sm bg-white font-poppins transition-all duration-300">

      {/* 1. TOP BAR */}
      <div className={`bg-[#f4eee0] px-4 md:px-20 hidden md:flex justify-between items-center text-[10px] text-[#434040] font-medium border-b border-[#e5decb] transition-all duration-500 ease-in-out origin-top overflow-hidden ${isScrolled ? 'max-h-0 opacity-0 py-0' : 'max-h-10 opacity-100 py-4'
        }`}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt size={10} className="text-[#a47e3c]" />
            <span>Gedung UIB, Jl. Gajah Mada, Baloi Permai, Batam, Kepulauan Riau</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <FaPhoneAlt size={10} />
            <span>Call Center: +62 778 462577</span>
          </div>
          <div className="flex gap-3 uppercase tracking-[0.2em] font-bold items-center">
            <span className="cursor-pointer border-b-2 border-[#434040]">ID</span>
            <span className="text-gray-300 font-light">|</span>
            <span className="text-gray-400 cursor-pointer hover:text-[#e67e22] transition-colors">EN</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <nav className="navbar px-4 md:px-20 min-h-[80px] bg-white border-b border-gray-100 flex items-center justify-between">

        <div className="navbar-start w-auto">
          <Link href="/landing" className="flex items-center">
            <Image src="/logo/uib.png" alt="Logo UIB" width={110} height={45} className="h-10 w-auto object-contain" priority />
          </Link>
        </div>

        <div className="navbar-end flex-grow">
          {/* DESKTOP MENU */}
          <div className="hidden lg:flex h-full w-full justify-end">
            <ul className="menu menu-horizontal p-0 font-medium text-[#434040] text-[14px] items-center gap-8">

              <li className="list-none">
                <Link href="/landing" className="hover:text-[#e67e22] px-0 transition-colors duration-300 no-underline py-4 px-4">Beranda</Link>
              </li>

              {/* TENTANG */}
              <li
                className="relative list-none"
                onMouseEnter={() => setHoveredMenu('tentang')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link href="/landing/tentang" className="flex items-center gap-1 py-4 cursor-pointer no-underline group">
                  <span className={`font-medium transition-colors ${hoveredMenu === 'tentang' ? 'text-[#e67e22]' : 'text-[#434040]'}`}>Tentang</span>
                  <motion.div animate={{ rotate: hoveredMenu === 'tentang' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FaChevronDown size={10} className={`${hoveredMenu === 'tentang' ? 'text-[#e67e22]' : 'text-gray-400'}`} />
                  </motion.div>
                </Link>
                <AnimatePresence>
                  {hoveredMenu === 'tentang' && (
                    <motion.ul initial="hidden" animate="visible" exit="hidden" variants={dropdownVariants} className="absolute top-full left-0 z-[1001] bg-white shadow-2xl w-56 p-2 border-t-4 border-[#e67e22] list-none">
                      <li><Link href="/landing/tentang/sejarah" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Sejarah</Link></li>
                      <li><Link href="/landing/tentang/akreditasi-tes" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Akreditasi</Link></li>
                      <li><Link href="/landing/tentang/ymti" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Ymti-batam</Link></li>
                      <li><Link href="/landing/tentang/pimpinan" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Pimpinan</Link></li>
                      <li><Link href="/landing/tentang/alumni" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Alumni</Link></li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* KULIAH DI UIB */}
              <li
                className="relative list-none"
                onMouseEnter={() => setHoveredMenu('kuliah')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link href="/landing/kuliahdiuib" className="flex items-center gap-1 py-4 cursor-pointer no-underline group">
                  <span className={`font-medium transition-colors ${hoveredMenu === 'kuliah' ? 'text-[#e67e22]' : 'text-[#434040]'}`}>Kuliah di UIB</span>
                  <motion.div animate={{ rotate: hoveredMenu === 'kuliah' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FaChevronDown size={10} className={`${hoveredMenu === 'kuliah' ? 'text-[#e67e22]' : 'text-gray-400'}`} />
                  </motion.div>
                </Link>
                <AnimatePresence>
                  {hoveredMenu === 'kuliah' && (
                    <motion.ul initial="hidden" animate="visible" exit="hidden" variants={dropdownVariants} className="absolute top-full left-0 z-[1001] bg-white shadow-2xl w-56 p-2 border-t-4 border-[#e67e22] list-none">
                      <li><Link href="/landing/kuliahdiuib/programsarjana" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Program Sarjana</Link></li>
                      <li><Link href="/landing/kuliahdiuib/programmagister" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Program Magister</Link></li>
                      <li><Link href="/landing/kuliahdiuib/biayapendidikan" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Biaya Pendidikan</Link></li>
                      <li><Link href="/landing/kuliahdiuib/kehidupankampus" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Kehidupan Kampus</Link></li>

                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* PENELITIAN & PENGABDIAN */}
              <li
                className="relative list-none"
                onMouseEnter={() => setHoveredMenu('penelitian')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link href="/landing/penelitianpengabdian" className="flex items-center gap-1 py-4 cursor-pointer whitespace-nowrap no-underline group">
                  <span className={`font-medium transition-colors ${hoveredMenu === 'penelitian' ? 'text-[#e67e22]' : 'text-[#434040]'}`}>Penelitian & Pengabdian</span>
                  <motion.div animate={{ rotate: hoveredMenu === 'penelitian' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FaChevronDown size={10} className={`${hoveredMenu === 'penelitian' ? 'text-[#e67e22]' : 'text-gray-400'}`} />
                  </motion.div>
                </Link>
                <AnimatePresence>
                  {hoveredMenu === 'penelitian' && (
                    <motion.ul initial="hidden" animate="visible" exit="hidden" variants={dropdownVariants} className="absolute top-full left-0 z-[1001] bg-white shadow-2xl w-60 p-2 border-t-4 border-[#e67e22] list-none">
                      <li><Link href="/landing/penelitianpengabdian/penelitian" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Penelitian</Link></li>
                      <li><Link href="/landing/penelitianpengabdian/pengabdian" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Pengabdian</Link></li>
                      <li><Link href="/landing/penelitianpengabdian/seminar" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Seminar</Link></li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              <li className="list-none">
                <Link href="/landing/international" className="hover:text-[#e67e22] px-0 transition-colors duration-300 no-underline py-4">Program Internasional</Link>
              </li>

              <li className="ml-2 list-none">
                <FaSearch className="text-[#434040] hover:text-[#e67e22] cursor-pointer transition-colors" size={16} />
              </li>
            </ul>
          </div>

          {/* MOBILE MENU - Dilengkapi Kembali */}
          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost hover:bg-transparent transition-all duration-300">
              <FaBars size={24} />
            </label>
            <ul tabIndex={0} className="dropdown-content mt-3 z-[1001] bg-white shadow-2xl w-[92vw] max-w-[380px] border-t-4 border-[#e67e22] p-0 list-none overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">

              <li className="border-b border-gray-100">
                <Link href="/landing" className="block py-4 px-6 font-medium hover:bg-gray-50 no-underline text-[#434040]">Beranda</Link>
              </li>

              <li className="border-b border-gray-100">
                <details className="group w-full">
                  <summary className="flex items-center justify-between py-4 px-6 font-medium cursor-pointer hover:bg-gray-50 list-none">
                    <Link href="/landing/tentang" className="no-underline flex-grow text-[#434040]">Tentang</Link>
                    <FaChevronDown size={10} className="text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="bg-gray-50 list-none p-0">
                    <li><Link href="/landing/tentang/sejarah" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Sejarah</Link></li>
                    <li><Link href="/landing/tentang/akreditasi-tes" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Akreditasi</Link></li>
                    <li><Link href="/landing/tentang/ymti" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Ymti-batam</Link></li>
                    <li><Link href="/landing/tentang/pimpinan" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Pimpinan</Link></li>
                    <li><Link href="/landing/tentang/alumni" className="block py-3 px-10 text-sm hover:text-[#e67e22] no-underline">Alumni</Link></li>
                  </ul>
                </details>
              </li>

              <li className="border-b border-gray-100">
                <details className="group w-full">
                  <summary className="flex items-center justify-between py-4 px-6 font-medium cursor-pointer hover:bg-gray-50 list-none">
                    <Link href="/landing/kuliahdiuib" className="no-underline flex-grow text-[#434040]">Kuliah di UIB</Link>
                    <FaChevronDown size={10} className="text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="bg-gray-50 list-none p-0">
                    <li><Link href="/landing/kuliahdiuib/programsarjana" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Program Sarjana</Link></li>
                    <li><Link href="/landing/kuliahdiuib/programmagister" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Program Magister</Link></li>
                    <li><Link href="/landing/kuliahdiuib/biayapendidikan" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Biaya Pendidikan</Link></li>
                    <li><Link href="/landing/kuliahdiuib/kehidupankampus" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Kehidupan Kampus</Link></li>

                  </ul>
                </details>
              </li>

              <li className="border-b border-gray-100">
                <details className="group w-full">
                  <summary className="flex items-center justify-between py-4 px-6 font-medium cursor-pointer hover:bg-gray-50 list-none">
                    <Link href="/landing/penelitianpengabdian" className="no-underline flex-grow text-[#434040]">Penelitian & Pengabdian</Link>
                    <FaChevronDown size={10} className="text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="bg-gray-50 list-none p-0">
                    <li><Link href="/landing/penelitianpengabdian/penelitian" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Penelitian</Link></li>
                    <li><Link href="/landing/penelitianpengabdian/pengabdian" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Pengabdian</Link></li>
                    <li><Link href="/landing/penelitianpengabdian/seminar" className="block py-3 px-10 text-sm hover:text-[#e67e22] no-underline">Seminar</Link></li>
                  </ul>
                </details>
              </li>

              <li>
                <Link href="/landing/international" className="block py-4 px-6 font-medium hover:bg-gray-50 no-underline text-[#434040]">Program Internasional</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}