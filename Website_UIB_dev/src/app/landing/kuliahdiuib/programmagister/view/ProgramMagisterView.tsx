'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { motion } from 'framer-motion'
import {
  Landmark, GraduationCap, Globe, BookOpen, Scale, Building2, Monitor, ArrowUpRight, HeartPulse, Utensils, Languages, Dna
} from 'lucide-react'

// --- DATA JURUSAN (TETAP SAMA) ---
const jurusanData = [
  { id: '01', name: 'Magister Manajemen', jenjang: 'S1', fakultas: 'Fakultas Bisnis dan Manajemen', akreditasi: 'Unggul', deskripsi: 'Mengkaji pengelolaan sumber daya organisasi secara strategis untuk tantangan bisnis global.', icon: Landmark, href: '/prodi/manajemen' },
  { id: '02', name: 'Magister Hukum', jenjang: 'S1', fakultas: 'Fakultas Ilmu Hukum', akreditasi: 'Baik Sekali', deskripsi: 'Mempelajari audit, perpajakan, dan analisis laporan keuangan perusahaan secara mendalam.', icon: BookOpen, href: '/prodi/akuntansi' },
  
]

// --- DATA HERO (TETAP SAMA) ---
const heroData = {
  image: "/img/C1700307.jpg",
  title: "Program Magister ",
  desc: "Temukan program studi impianmu di Universitas Internasional Batam. Kami mencetak lulusan yang berintegritas, profesional, dan berjiwa wirausaha."
};

const getHoverStyle = (id: string, isHovered: boolean) => {
  const isOdd = parseInt(id) % 2 !== 0
  const hoverBg = isOdd ? '#e67e22' : '#1a365d'
  const iconRestBg = isOdd ? '#fff5ec' : '#eef1f6'
  const iconRestColor = isOdd ? '#e67e22' : '#1a365d'
  
  return {
    bg: isHovered ? hoverBg : '#ffffff',
    border: isHovered ? hoverBg : '#ebebeb',
    shadow: isHovered ? (isOdd ? '0 15px 35px rgba(230,126,34,0.25)' : '0 15px 35px rgba(26,54,93,0.2)') : '0 4px 12px rgba(0,0,0,0.03)',
    iconBg: isHovered ? 'rgba(255,255,255,0.2)' : iconRestBg,
    iconColor: isHovered ? '#fff' : iconRestColor,
    numColor: isHovered ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.03)',
    textPrimary: isHovered ? '#fff' : '#1a365d',
    textSecondary: isHovered ? 'rgba(255,255,255,0.8)' : '#666',
    textMeta: isHovered ? 'rgba(255,255,255,0.6)' : '#999',
    badgeColor: isHovered ? '#fff' : (isOdd ? '#e67e22' : '#1a365d'),
    arrowColor: isHovered ? '#fff' : '#ccc',
    fakultasColor: isHovered ? 'rgba(255,255,255,0.5)' : '#aaa',
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function ProgramMagisterView() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-poppins">
      <NavbarLanding />

      {/* HERO SECTION - DISEDERHANAKAN & LEBIH GELAP */}
      <section className="relative w-full h-screen overflow-hidden bg-gray-100 flex items-center">
        <Image 
          src={heroData.image} 
          alt="UIB Hero" 
          fill 
          priority 
          className="object-cover"
          objectPosition="center 10%" 
        />
        
        {/* OVERLAY GRADIENT HITAM - Dipergelap untuk menimpa deskripsi */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent z-10"></div>
        
        {/* Content Area - Disederhanakan & Font Dikecilkan */}
        <div className="relative z-20 container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl text-white"
          >
            

            {/* Judul Besar & Bersih - Font Dikecilkan */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
              {heroData.title}
            </h1>

            {/* Deskripsi Jelas - Font Dikecilkan */}
            <p className="text-white/90 text-base md:text-lg mb-0 leading-relaxed max-w-2xl">
              {heroData.desc}
            </p>

            {/* Button Dihilangkan */}
          </motion.div>
        </div>
      </section>

      {/* JURUSAN GRID SECTION (TETAP SAMA) */}
      <section id="daftar-jurusan" className="px-6 py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jurusanData.map((item, i) => {
            const Icon = item.icon
            const isHovered = hovered === item.id
            const s = getHoverStyle(item.id, isHovered)

            return (
              <motion.div key={item.id} custom={i} variants={fadeUp} initial="hidden" animate="visible">
                <Link href={item.href} className="block no-underline">
                  <div
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      background: s.bg,
                      border: `1px solid ${s.border}`,
                      boxShadow: s.shadow,
                      borderRadius: '24px',
                      padding: '32px',
                      transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    className="relative overflow-hidden flex flex-col justify-between min-h-[280px]"
                  >
                    <span style={{ color: s.numColor }} className="absolute -bottom-4 -right-2 text-8xl font-black select-none pointer-events-none transition-colors duration-300">
                      {item.id}
                    </span>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div style={{ background: s.iconBg, color: s.iconColor }} className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300">
                          <Icon size={22} />
                        </div>
                        <ArrowUpRight size={20} style={{ color: s.arrowColor, transform: isHovered ? 'translate(3px, -3px)' : 'none' }} className="transition-all duration-300" />
                      </div>

                      <div className="flex items-center gap-2 mb-3 text-[10px] font-bold uppercase tracking-widest">
                        <span style={{ color: s.badgeColor }}>{item.jenjang}</span>
                        <span style={{ color: s.textMeta }}>•</span>
                        <span style={{ color: s.textMeta }}>{item.akreditasi}</span>
                      </div>

                      <h3 style={{ color: s.textPrimary }} className="text-xl font-bold mb-3 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p style={{ color: s.textSecondary }} className="text-xs leading-relaxed transition-colors duration-300">
                        {item.deskripsi}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6">
                      <p style={{ color: s.fakultasColor }} className="text-[10px] font-medium transition-colors duration-300">
                        {item.fakultas}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* CTA CARD (TETAP SAMA) */}
        <div className="max-w-6xl mx-auto mt-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#1a365d] rounded-[32px] p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-[#e67e22]" />
            <div className="relative z-10 text-center md:text-left">
              <p className="text-[#e67e22] text-[10px] font-bold uppercase tracking-[3px] mb-4">Butuh Bantuan?</p>
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">Masih bingung memilih jurusan?</h2>
              <p className="text-white/40 text-sm max-w-md">Konsultasikan minat dan bakatmu dengan tim akademik kami untuk masa depan yang tepat.</p>
            </div>
            <Link 
              href="#"
              className="relative z-10 bg-[#e67e22] text-white px-8 py-4 rounded-full font-bold text-sm shadow-[0_10px_30px_rgba(230,126,34,0.3)] hover:bg-[#cf6d1a] transition-all flex items-center gap-2"
            >
              Konsultasi Sekarang
              <ArrowUpRight size={16} />
            </Link>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}