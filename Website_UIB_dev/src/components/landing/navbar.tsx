'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaMapMarkerAlt, FaPhoneAlt, FaSearch, FaChevronDown, FaBars, FaEnvelope } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function NavbarLanding() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false
    return pathname.startsWith(path)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: "easeInOut" }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  }

  return (
    <header className="fixed top-0 w-full z-[1000] shadow-sm bg-white font-poppins transition-colors duration-300">
      <motion.div 
        initial={false}
        animate={{ 
          height: isScrolled ? 0 : 'auto',
          opacity: isScrolled ? 0 : 1,
          borderBottomWidth: isScrolled ? 0 : 1
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="bg-[#f4eee0] px-4 md:px-24 hidden md:flex justify-between items-center text-[15px] text-[#434040] font-medium border-[#e5decb] origin-top overflow-hidden"
      >
        <div className="flex items-center gap-6 py-3">
          <Link href="/contact" className="flex items-center gap-2 hover:text-[#e67e22] transition-colors no-underline text-[#434040]">
            <FaEnvelope size={14} className="text-[#a47e3c]" />
            <span className="tracking-wide text-[13px]">Kontak</span>
          </Link>
        </div>

        <div className="flex items-center gap-6 text-[13px]">
          <Link href="#" className="hover:text-[#e67e22] transition-colors no-underline text-[#434040] tracking-wide">Admission</Link>
          <Link href="#" className="hover:text-[#e67e22] transition-colors no-underline text-[#434040] tracking-wide">UIB Access</Link>
          <Link href="#" className="hover:text-[#e67e22] transition-colors no-underline text-[#434040] tracking-wide">Graduation</Link>
          <Link href="#" className="hover:text-[#e67e22] transition-colors no-underline text-[#434040] tracking-wide">Alumni and Careers</Link>


          <div className="flex items-center gap-1 ml-1 border-l border-gray-300 pl-6">
            {[
              { code: 'ID', src: 'https://flagcdn.com/w40/id.png' },
              { code: 'EN', src: 'https://flagcdn.com/w40/gb.png' },
            ].map((lang) => (
              <button
                key={lang.code}
                className="group flex items-center hover:scale-110 transition-transform"
              >
                <div className="relative h-3 w-5 overflow-hidden border border-gray-300">
                  <Image
                    src={lang.src}
                    alt={lang.code}
                    fill
                    className="object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <nav className="navbar px-4 md:px-24 min-h-[80px] bg-white border-b border-gray-100 flex items-center justify-between">

        <div className="navbar-start w-auto">
          <Link href="/" className="flex items-center">
            <Image src="/logo/uib.png" alt="Logo UIB" width={110} height={45} className="h-10 w-auto object-contain" priority />
          </Link>
        </div>

        <div className="navbar-end flex-grow justify-start">
          <div className="hidden lg:flex h-full w-full justify-start ml-20">
            <ul className="menu menu-horizontal p-0 font-medium text-[#434040] text-[15px] items-center gap-6">

              <li className="list-none relative group">
                <Link
                  href="/"
                  className={`px-3 py-4 transition-all duration-300 no-underline ${isActive('/') ? 'text-[#e67e22]' : 'text-[#434040] hover:text-[#e67e22]'
                    }`}
                >
                  Beranda
                  {isActive('/') && (
                    <motion.div 
                      layoutId="activeNav" 
                      className="absolute bottom-2 left-3 right-3 h-0.5 bg-[#e67e22]" 
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              </li>

              <li
                className="relative list-none group"
                onMouseEnter={() => setHoveredMenu('admisi')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  href="#"
                  className={`flex items-center gap-1 px-3 py-4 cursor-pointer no-underline transition-all duration-300 ${isActive('/admisi') || hoveredMenu === 'admisi' ? 'text-[#e67e22]' : 'text-[#434040]'
                    }`}
                >
                  <span className="font-medium">Admisi</span>
                  <motion.div animate={{ rotate: hoveredMenu === 'admisi' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FaChevronDown size={10} className={`${hoveredMenu === 'admisi' || isActive('/admisi') ? 'text-[#e67e22]' : 'text-gray-400'}`} />
                  </motion.div>
                  {isActive('/admisi') && (
                    <motion.div 
                      layoutId="activeNav" 
                      className="absolute bottom-2 left-3 right-3 h-0.5 bg-[#e67e22]" 
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
                <AnimatePresence>
                  {hoveredMenu === 'admisi' && (
                    <motion.ul initial="hidden" animate="visible" exit="hidden" variants={dropdownVariants} className="absolute top-full left-0 z-[1001] bg-white shadow-2xl w-56 p-2 border-t-4 border-[#e67e22] list-none rounded-b-xl">
                      <li><Link href="/admisi/pendaftaran" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Pendaftaran</Link></li>
                      <li><Link href="/admisi/sertifikasi" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Sertifikasi</Link></li>
                      <li><Link href="/admisi/beasiswa" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Beasiswa</Link></li>
                      <li><Link href="/admisi/bantuankeuangan" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Bantuan Keuangan</Link></li>
                      <li><Link href="/admisi/biayakuliah" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Biaya Kuliah</Link></li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              <li
                className="relative list-none group"
                onMouseEnter={() => setHoveredMenu('kuliah')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  href="/akademik"
                  className={`flex items-center gap-1 px-3 py-4 cursor-pointer no-underline transition-all duration-300 ${isActive('/akademik') || hoveredMenu === 'kuliah' ? 'text-[#e67e22]' : 'text-[#434040]'
                    }`}
                >
                  <span className="font-medium">Akademik</span>
                  <motion.div animate={{ rotate: hoveredMenu === 'kuliah' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FaChevronDown size={10} className={`${hoveredMenu === 'kuliah' || isActive('/akademik') ? 'text-[#e67e22]' : 'text-gray-400'}`} />
                  </motion.div>
                  {isActive('/akademik') && (
                    <motion.div 
                      layoutId="activeNav" 
                      className="absolute bottom-2 left-3 right-3 h-0.5 bg-[#e67e22]" 
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
                <AnimatePresence>
                  {hoveredMenu === 'kuliah' && (
                    <motion.ul initial="hidden" animate="visible" exit="hidden" variants={dropdownVariants} className="absolute top-full left-0 z-[1001] bg-white shadow-2xl w-56 p-2 border-t-4 border-[#e67e22] list-none rounded-b-xl">
                      <li><Link href="/akademik/programsarjana" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Program Sarjana</Link></li>
                      <li><Link href="/akademik/programmagister" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Program Magister</Link></li>
                      <li><Link href="/akademik/kehidupankampus" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Kehidupan Kampus</Link></li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              <li
                className="relative list-none group"
                onMouseEnter={() => setHoveredMenu('penelitian')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  href="/penelitianpengabdian"
                  className={`flex items-center gap-1 px-3 py-4 cursor-pointer whitespace-nowrap no-underline transition-all duration-300 ${isActive('/penelitianpengabdian') || hoveredMenu === 'penelitian' ? 'text-[#e67e22]' : 'text-[#434040]'
                    }`}
                >
                  <span className="font-medium">Penelitian & Pengabdian</span>
                  <motion.div animate={{ rotate: hoveredMenu === 'penelitian' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FaChevronDown size={10} className={`${hoveredMenu === 'penelitian' || isActive('/penelitianpengabdian') ? 'text-[#e67e22]' : 'text-gray-400'}`} />
                  </motion.div>
                  {isActive('/penelitianpengabdian') && (
                    <motion.div 
                      layoutId="activeNav" 
                      className="absolute bottom-2 left-3 right-3 h-0.5 bg-[#e67e22]" 
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
                <AnimatePresence>
                  {hoveredMenu === 'penelitian' && (
                    <motion.ul initial="hidden" animate="visible" exit="hidden" variants={dropdownVariants} className="absolute top-full left-0 z-[1001] bg-white shadow-2xl w-60 p-2 border-t-4 border-[#e67e22] list-none rounded-b-xl">
                      <li><Link href="/penelitianpengabdian/penelitian" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Penelitian</Link></li>
                      <li><Link href="/penelitianpengabdian/pengabdian" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Pengabdian</Link></li>
                      <li><Link href="/penelitianpengabdian/seminar" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Seminar</Link></li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              <li className="list-none relative group">
                <Link
                  href="/international"
                  className={`px-3 py-4 transition-all duration-300 no-underline ${isActive('/international') ? 'text-[#e67e22]' : 'text-[#434040] hover:text-[#e67e22]'
                    }`}
                >
                  Program Internasional
                  {isActive('/international') && (
                    <motion.div 
                      layoutId="activeNav" 
                      className="absolute bottom-2 left-3 right-3 h-0.5 bg-[#e67e22]" 
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              </li>

              <li
                className="relative list-none group"
                onMouseEnter={() => setHoveredMenu('tentang')}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  href="/tentang"
                  className={`flex items-center gap-1 px-3 py-4 cursor-pointer no-underline transition-all duration-300 ${isActive('/tentang') || hoveredMenu === 'tentang' ? 'text-[#e67e22]' : 'text-[#434040]'
                    }`}
                >
                  <span className="font-medium">Tentang</span>
                  <motion.div animate={{ rotate: hoveredMenu === 'tentang' ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FaChevronDown size={10} className={`${hoveredMenu === 'tentang' || isActive('/tentang') ? 'text-[#e67e22]' : 'text-gray-400'}`} />
                  </motion.div>
                  {isActive('/tentang') && (
                    <motion.div 
                      layoutId="activeNav" 
                      className="absolute bottom-2 left-3 right-3 h-0.5 bg-[#e67e22]" 
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
                <AnimatePresence>
                  {hoveredMenu === 'tentang' && (
                    <motion.ul initial="hidden" animate="visible" exit="hidden" variants={dropdownVariants} className="absolute top-full left-0 z-[1001] bg-white shadow-2xl w-56 p-2 border-t-4 border-[#e67e22] list-none rounded-b-xl">
                      <li><Link href="/tentang/sejarah" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Sejarah</Link></li>
                      <li><Link href="/tentang/akreditasi" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Akreditasi</Link></li>
                      <li><Link href="/tentang/ymti" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Ymti-batam</Link></li>
                      <li><Link href="/tentang/pimpinan" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Pimpinan</Link></li>
                      <li><Link href="/tentang/alumni" className="block py-3 px-4 hover:bg-orange-50 hover:text-[#e67e22] transition-colors rounded-md no-underline text-[#434040]">Alumni</Link></li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>


            </ul>
          </div>

          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost hover:bg-transparent transition-all duration-300">
              <FaBars size={24} />
            </label>
            <ul tabIndex={0} className="dropdown-content mt-3 z-[1001] bg-white shadow-2xl w-[92vw] max-w-[380px] border-t-4 border-[#e67e22] p-0 list-none overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">

              <li className="border-b border-gray-100">
                <Link href="/" className="block py-4 px-6 font-medium hover:bg-gray-50 no-underline text-[#434040]">Beranda</Link>
              </li>

              <li className="border-b border-gray-100">
                <details className="group w-full">
                  <summary className="flex items-center justify-between py-4 px-6 font-medium cursor-pointer hover:bg-gray-50 list-none">
                    <span className="flex-grow text-[#434040]">Admisi</span>
                    <FaChevronDown size={10} className="text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="bg-gray-50 list-none p-0">
                    <li><Link href="/admisi/pendaftaran" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Pendaftaran</Link></li>
                    <li><Link href="/admisi/sertifikasi" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Sertifikasi</Link></li>
                    <li><Link href="/admisi/beasiswa" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Beasiswa</Link></li>
                    <li><Link href="/admisi/bantuankeuangan" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Bantuan Keuangan</Link></li>
                    <li><Link href="/admisi/biayakuliah" className="block py-3 px-10 text-sm hover:text-[#e67e22] no-underline">Biaya Kuliah</Link></li>
                  </ul>
                </details>
              </li>

              <li className="border-b border-gray-100">
                <details className="group w-full">
                  <summary className="flex items-center justify-between py-4 px-6 font-medium cursor-pointer hover:bg-gray-50 list-none">
                    <Link href="/tentang" className="no-underline flex-grow text-[#434040]">Tentang</Link>
                    <FaChevronDown size={10} className="text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="bg-gray-50 list-none p-0">
                    <li><Link href="/tentang/sejarah" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Sejarah</Link></li>
                    <li><Link href="/tentang/akreditasi" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Akreditasi</Link></li>
                    <li><Link href="/tentang/ymti" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Ymti-batam</Link></li>
                    <li><Link href="/tentang/pimpinan" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Pimpinan</Link></li>
                    <li><Link href="/tentang/alumni" className="block py-3 px-10 text-sm hover:text-[#e67e22] no-underline">Alumni</Link></li>
                  </ul>
                </details>
              </li>

              <li className="border-b border-gray-100">
                <details className="group w-full">
                  <summary className="flex items-center justify-between py-4 px-6 font-medium cursor-pointer hover:bg-gray-50 list-none">
                    <Link href="/akademik" className="no-underline flex-grow text-[#434040]">Akademik</Link>
                    <FaChevronDown size={10} className="text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="bg-gray-50 list-none p-0">
                    <li><Link href="/akademik/programsarjana" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Program Sarjana</Link></li>
                    <li><Link href="/akademik/programmagister" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Program Magister</Link></li>
                    <li><Link href="/akademik/kehidupankampus" className="block py-3 px-10 text-sm hover:text-[#e67e22] no-underline">Kehidupan Kampus</Link></li>

                  </ul>
                </details>
              </li>

              <li className="border-b border-gray-100">
                <details className="group w-full">
                  <summary className="flex items-center justify-between py-4 px-6 font-medium cursor-pointer hover:bg-gray-50 list-none">
                    <Link href="/penelitianpengabdian" className="no-underline flex-grow text-[#434040]">Penelitian & Pengabdian</Link>
                    <FaChevronDown size={10} className="text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="bg-gray-50 list-none p-0">
                    <li><Link href="/penelitianpengabdian/penelitian" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Penelitian</Link></li>
                    <li><Link href="/penelitianpengabdian/pengabdian" className="block py-3 px-10 text-sm hover:text-[#e67e22] border-b border-gray-200/50 no-underline">Pengabdian</Link></li>
                    <li><Link href="/penelitianpengabdian/seminar" className="block py-3 px-10 text-sm hover:text-[#e67e22] no-underline">Seminar</Link></li>
                  </ul>
                </details>
              </li>

              <li>
                <Link href="/international" className="block py-4 px-6 font-medium hover:bg-gray-50 no-underline text-[#434040]">Program Internasional</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}