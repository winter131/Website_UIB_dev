'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Landmark, GraduationCap, Globe, BookOpen, Scale, Building2, Monitor, ArrowUpRight, HeartPulse, Utensils, Languages, Dna
} from 'lucide-react'

const fakultasData = [
  {
    nama: 'Fakultas Bisnis dan Manajemen',
    jurusan: [
      { id: '01', name: 'Manajemen', jenjang: 'S1', akreditasi: 'Unggul', deskripsi: 'Mengkaji pengelolaan sumber daya organisasi secara strategis untuk tantangan bisnis global.', icon: Landmark, href: '/prodi/manajemen' },
      { id: '02', name: 'Akuntansi', jenjang: 'S1', akreditasi: 'Baik Sekali', deskripsi: 'Mempelajari audit, perpajakan, dan analisis laporan keuangan perusahaan secara mendalam.', icon: BookOpen, href: '/prodi/akuntansi' },
      { id: '03', name: 'Pariwisata', jenjang: 'S1', akreditasi: 'Unggul', deskripsi: 'Mempelajari pengelolaan destinasi dan industri hospitality berstandar internasional.', icon: Globe, href: '/prodi/pariwisata' },
    ]
  },
  {
    nama: 'Fakultas Ilmu Komputer',
    jurusan: [
      { id: '04', name: 'Sistem Informasi', jenjang: 'S1', akreditasi: 'Baik Sekali', deskripsi: 'Mengintegrasikan teknologi informasi dengan proses bisnis dan manajemen organisasi modern.', icon: Monitor, href: '/prodi/sistem-informasi' },
      { id: '05', name: 'Teknologi Informasi', jenjang: 'S1', akreditasi: 'Baik Sekali', deskripsi: 'Mempelajari pengembangan perangkat lunak, algoritma, dan teknologi digital masa depan.', icon: GraduationCap, href: '/prodi/teknologi-informasi' },
    ]
  },
  {
    nama: 'Fakultas Teknik Sipil dan Perencanaan',
    jurusan: [
      { id: '06', name: 'Teknik Sipil', jenjang: 'S1', akreditasi: 'Unggul', deskripsi: 'Mempelajari perancangan, konstruksi, dan pemeliharaan infrastruktur bangunan modern.', icon: Building2, href: '/prodi/teknik-sipil' },
      { id: '07', name: 'Arsitektur', jenjang: 'S1', akreditasi: 'Baik Sekali', deskripsi: 'Memadukan seni dan teknologi dalam merancang ruang bangunan yang fungsional dan estetis.', icon: Building2, href: '/prodi/arsitektur' },
    ]
  },
  {
    nama: 'Fakultas Hukum',
    jurusan: [
      { id: '08', name: 'Ilmu Hukum', jenjang: 'S1', akreditasi: 'Unggul', deskripsi: 'Mengkaji sistem hukum nasional dan internasional serta penegakan keadilan masyarakat.', icon: Scale, href: '/prodi/ilmu-hukum' },
    ]
  },
  {
    nama: 'Fakultas Pendidikan',
    jurusan: [
      { id: '09', name: 'Pendidikan Bahasa Inggris', jenjang: 'S1', akreditasi: 'Baik Sekali', deskripsi: 'Mengembangkan kompetensi pengajaran bahasa Inggris profesional dengan metode modern.', icon: Languages, href: '/prodi/pendidikan-bahasa-inggris' },
    ]
  },
  {
    nama: 'Fakultas Kesehatan dan Sains',
    jurusan: [
      { id: '10', name: 'Biologi', jenjang: 'S1', akreditasi: 'Baik Sekali', deskripsi: 'Mengeksplorasi ilmu hayati dan bioteknologi untuk solusi kesehatan dan lingkungan.', icon: Dna, href: '/prodi/biologi' },
      { id: '11', name: 'Gizi', jenjang: 'S1', akreditasi: 'Baik Sekali', deskripsi: 'Mempelajari ilmu gizi, dietetika, dan kesehatan masyarakat untuk gaya hidup sehat.', icon: Utensils, href: '/prodi/gizi' },
    ]
  },
  {
    nama: 'Fakultas Kedokteran',
    jurusan: [
      { id: '12', name: 'Kedokteran program Sarjana', jenjang: 'S1', akreditasi: 'Baik Sekali', deskripsi: 'Menempuh pendidikan medis untuk menjadi praktisi kesehatan profesional dan berintegritas.', icon: HeartPulse, href: '/prodi/kedokteran' },
    ]
  },
]

const heroData = {
  image: "/img/Utama.jpg",
  title: "Program Sarjana",
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
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" } as any,
  }),
}

export default function ProgramSarjanaView() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-poppins">
      <section className="relative w-full h-screen overflow-hidden bg-gray-100 flex items-center">
        <Image
          src={heroData.image}
          alt="UIB Hero"
          fill
          priority
          className="object-cover"
          objectPosition="center 20%"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent z-10"></div>
        <div className="relative z-20 container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
              {heroData.title}
            </h1>
            <p className="text-white/90 text-base md:text-lg mb-0 leading-relaxed max-w-2xl italic font-light">
              {heroData.desc}
            </p>
          </motion.div>
        </div>
      </section>

      <section id="daftar-jurusan" className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto space-y-24">
          {fakultasData.map((fakultas, fIndex) => (
            <div key={fIndex} className="space-y-10">
              <div className="flex items-center gap-6">
                <h2 className="text-2xl md:text-3xl font-black text-[#1a365d] uppercase tracking-tight relative pr-10">
                  {fakultas.nama}
                  <span className="absolute right-0 bottom-1.5 w-8 h-1 bg-[#e67e22] rounded-full"></span>
                </h2>
                <div className="flex-1 h-px bg-slate-100 hidden md:block"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {fakultas.jurusan.map((item, i) => {
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
                            borderRadius: '32px',
                            padding: '32px',
                            transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                          }}
                          className="relative overflow-hidden flex flex-col justify-between min-h-[300px]"
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

                            <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest">
                              <span style={{ color: s.badgeColor }}>{item.jenjang}</span>
                              <span style={{ color: s.textMeta }}>•</span>
                              <span style={{ color: s.textMeta }}>{item.akreditasi}</span>
                            </div>

                            <h3 style={{ color: s.textPrimary }} className="text-xl font-black mb-3 transition-colors duration-300 leading-tight uppercase">
                              {item.name}
                            </h3>
                            <p style={{ color: s.textSecondary }} className="text-[11px] leading-relaxed transition-colors duration-300 font-medium">
                              {item.deskripsi}
                            </p>
                          </div>

                          <div className="relative z-10 mt-6">
                            <p style={{ color: s.fakultasColor }} className="text-[9px] font-black uppercase tracking-widest transition-colors duration-300">
                              UIB SARJANA
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* <div className="max-w-6xl mx-auto mt-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#1a365d] rounded-[48px] p-10 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#e67e22]" />
            <div className="relative z-10 text-center md:text-left">
              <p className="text-[#e67e22] text-[10px] font-black uppercase tracking-[3px] mb-4">Butuh Bantuan?</p>
              <h2 className="text-white text-3xl md:text-4xl font-black mb-3 uppercase tracking-tighter italic">Masih bingung memilih jurusan?</h2>
              <p className="text-white/40 text-sm max-w-md font-medium">Konsultasikan minat dan bakatmu dengan tim akademik kami untuk masa depan yang tepat.</p>
            </div>
            <Link
              href="/pendaftaran"
              className="relative z-10 bg-[#e67e22] text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-[0_20px_40px_rgba(230,126,34,0.3)] hover:bg-white hover:text-[#1a365d] transition-all flex items-center gap-2"
            >
              Konsultasi Sekarang
              <ArrowUpRight size={16} />
            </Link>
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </motion.div>
        </div> */}
      </section>
    </main>
  )
}