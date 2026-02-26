'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Import Icons
import { FaGraduationCap, FaInfoCircle, FaHeadset } from 'react-icons/fa'

// Import Custom Components (Pastikan path file sesuai dengan proyek Anda)
import NavbarLanding from '@/components/landing/navbar'
import Hero from '@/components/landing/hero'
import LatestNews from '@/components/landing/news'
import CompanyProfile from '@/components/landing/profile'
import SambutanRektor from '@/components/landing/welcome'
import Rankings from '@/components/landing/rankings'
import AcademicPrograms from '@/components/landing/programs'
import DirectorySection from '@/components/landing/directory'
import LatestArticles from '@/components/landing/articles'
import StudentAchievements from '@/components/landing/student-achievements'
import Footer from '@/components/landing/footer'

// --- KONFIGURASI ANIMASI ---
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" } as any
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function LandingPage() {
  // Data Menu: Memudahkan update rute di masa depan
  const quickLinks = [
    {
      title: 'Pendaftaran Beasiswa',
      desc: 'Informasi lengkap persyaratan pendaftaran beasiswa UIB.',
      icon: <FaGraduationCap size={44} />,
      href: '/landing' // Ganti ke rute spesifik nanti
    },
    {
      title: 'Program Studi',
      desc: 'Daftar program studi unggulan dengan kurikulum berbasis industri.',
      icon: <FaInfoCircle size={44} />,
      href: '/landing' // Ganti ke rute spesifik nanti
    },
    {
      title: 'Informasi Pendaftaran',
      desc: 'Pusat bantuan teknis dan informasi akademik mahasiswa baru.',
      icon: <FaHeadset size={44} />,
      href: '/landing' // Ganti ke rute spesifik nanti
    }
  ];

  return (
    <main className="bg-[#FCFCFC] min-h-screen pt-[110px] overflow-x-hidden font-poppins text-[#2A3955]">
      <NavbarLanding />

      {/* HERO SECTION */}
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <Hero />
      </motion.div>

      {/* 1. QUICK LINKS SECTION (Rise with Stagger Effect) */}
      <section className="max-w-7xl mx-auto -mt-16 md:-mt-20 relative z-50 px-6 mb-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {quickLinks.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-[#f3edd1] p-10 flex flex-row items-start gap-6 hover:-translate-y-2 transition-all duration-300 shadow-md group border-b-4 border-transparent hover:border-[#e67e22]"
            >
              <div className="text-[#2A3955] mt-1 shrink-0 group-hover:scale-110 transition-transform">{item.icon}</div>
              <div className="flex flex-col text-left">
                <h2 className="font-bold text-[17px] leading-tight mb-2 uppercase tracking-tight">{item.title}</h2>
                <p className="text-[13px] text-gray-600 leading-relaxed font-light">{item.desc}</p>

                {/* Link Internal untuk masa depan */}
                <Link
                  href={item.href}
                  className="mt-6 inline-block w-fit text-[11px] font-black text-[#e67e22] tracking-[0.2em] hover:underline"
                >
                  MORE
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 2. MAIN CONTENT SECTIONS (Rise on Scroll) */}
      {[
        <LatestNews key="news" />,
        <CompanyProfile key="profile" />,
        <SambutanRektor key="welcome" />,
        <Rankings key="rankings" />,
        <AcademicPrograms key="programs" />,
        <StudentAchievements key="achievements" />,
        <DirectorySection key="directory" />,
        <LatestArticles key="articles" />
      ].map((Component, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          {Component}
        </motion.div>
      ))}

      <Footer />
    </main>
  )
}