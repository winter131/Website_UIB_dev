'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { motion } from 'framer-motion'
import { Landmark, GraduationCap, ArrowRight, ChevronRight, Globe, ArrowUpRight } from 'lucide-react'
import DownloadCard from '@/components/landing/kuliahdiuib/downloadcard'
import { relative } from 'path'

const fakultasData = [
  { name: 'Fakultas Bisnis dan Manajemen', img: '/img/C1700307.jpg' },
  { name: 'Fakultas Hukum', img: '/img/C1700295.jpg' },
  { name: 'Fakultas Teknik Sipil dan perencanaan', img: '/img/DSC06279.jpg' },
  { name: 'Fakultas Ilmu Komputer', img: '/img/Gp.jpg' },
  { name: 'Fakultas Ilmu Pendidikan', img: '/img/story2.jpg' },
  { name: 'Program  Kesehatan dan Sains', img: '/img/TE.webp' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function KuliahdiUibView() {
  return (
    <main className="min-h-screen" style={{ background: '#f4f5f7' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap');
        .font-sora { font-family: 'Sora', sans-serif; }
        .font-dm   { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <NavbarLanding />

      {/* ─────────────────────────────────────────────
          SECTION 1 — HERO / STATISTIK
      ───────────────────────────────────────────── */}
      <section className="pt-32 md:pt-44 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20"
          >
            {/* Kiri — heading */}
            <div className="lg:w-1/2">
              <p
                className="font-dm"
                style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#e67e22', fontWeight: 600, marginBottom: '16px' }}
              >
                Kuliah di UIB
              </p>
              <h1
                className="font-sora"
                style={{ fontSize: 'clamp(30px, 4vw, 50px)', fontWeight: 800, color: '#2A3955', lineHeight: 1.1, letterSpacing: '-1px' }}
              >
                Memberi Dukungan,<br />
                Menggali Potensi,<br />
                <span style={{ color: '#e67e22' }}>Mewujudkan Impian.</span>
              </h1>
            </div>

            {/* Kanan — deskripsi + stats */}
            <div className="lg:w-1/2 space-y-10">
              <p
                className="font-dm"
                style={{ fontSize: '15px', color: 'rgba(42,57,85,0.55)', lineHeight: 1.75 }}
              >
                Program Pendidikan Tersedia di Universitas Internasional Batam — mempersiapkan generasi unggul berdaya saing global.
              </p>

              <div style={{ display: 'flex', gap: '32px' }}>
                {[
                  { icon: Landmark, value: '7', label: 'Fakultas' },
                  { icon: GraduationCap, value: '14', label: 'Program Studi' },
                ].map(({ icon: Icon, value, label }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '14px',
                        background: '#fff5ec',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={22} strokeWidth={1.8} color="#e67e22" />
                    </div>
                    <div>
                      <div className="font-sora" style={{ fontSize: '26px', fontWeight: 800, color: '#2A3955', lineHeight: 1 }}>{value}</div>
                      <div className="font-dm" style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#aaa', fontWeight: 600, marginTop: '4px' }}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginTop: '48px', height: '2px', background: 'linear-gradient(90deg, #e67e22 0%, #2A3955 55%, transparent 100%)', transformOrigin: 'left', borderRadius: '2px' }}
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 2 — GRID FAKULTAS
      ───────────────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">

          {/* Sub-header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
          >
            <div>
              <p className="font-dm" style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#e67e22', fontWeight: 600, marginBottom: '8px' }}>
                Pilih Jalurmu
              </p>
              <h2 className="font-sora" style={{ fontSize: '24px', fontWeight: 700, color: '#2A3955', letterSpacing: '-0.5px' }}>
                Fakultas & Program Studi
              </h2>
            </div>
            
          </motion.div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>

            {/* Info card — navy */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                gridColumn: 'span 2',
                background: '#2A3955',
                borderRadius: '20px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', right: '-30px', top: '-30px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(230,126,34,0.1)' }} />
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#e67e22', borderRadius: '20px 0 0 20px' }} />
              <div>
                <p className="font-dm" style={{ fontSize: '10px', letterSpacing: '2.5px', textTransform: 'uppercase', color: '#e67e22', fontWeight: 600, marginBottom: '12px' }}>
                  Fakultas & Sekolah
                </p>
                <h3 className="font-sora" style={{ fontSize: '18px', fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: '10px' }}>
                  UIB menawarkan beragam<br />program studi berkualitas.
                </h3>
                <p className="font-dm" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>
                  Kurikulum berbasis industri untuk karir global.
                </p>
              </div>
              <Link
                href="/landing/beasiswa"
                className="font-dm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#e67e22', color: '#fff', borderRadius: '100px', padding: '11px 22px', fontSize: '12px', fontWeight: 600, textDecoration: 'none', width: 'fit-content', marginTop: '20px', boxShadow: '0 6px 24px rgba(230,126,34,0.35)' }}
              >
                Biaya Pendidikan <ChevronRight size={15} />
              </Link>
            </motion.div>

            {/* Fakultas photo cards */}
            {fakultasData.map((f, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', minHeight: '220px', cursor: 'pointer' }}
                className="group"
              >
                <Image
                  src={f.img}
                  alt={f.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(42,57,85,0.92) 0%, rgba(42,57,85,0.15) 60%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '22px' }}>
                  <h3
                    className="font-sora"
                    style={{ fontSize: '15px', fontWeight: 700, color: '#fff', lineHeight: 1.25, transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)' }}
                  >
                    {f.name}
                  </h3>
                </div>
                {/* Orange accent dot on hover */}
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#e67e22',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                  }}
                  className="group-hover:opacity-100"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 3 — BEASISWA
      ───────────────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: '#2A3955', borderRadius: '24px', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr' }}
            className="flex-col lg:grid"
          >
            {/* Kiri — gambar */}
            <div style={{ position: 'relative', minHeight: '360px' }}>
              <Image src="/img/C1700307.jpg" alt="Beasiswa UIB" fill className="object-cover" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, #2A3955 100%)' }} />
              {/* Icon badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '28px',
                  left: '28px',
                  background: '#e67e22',
                  borderRadius: '16px',
                  padding: '12px',
                  boxShadow: '0 8px 24px rgba(230,126,34,0.4)',
                }}
              >
                <GraduationCap size={28} color="#fff" />
              </div>
            </div>

            {/* Kanan — teks */}
            <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
              

              <h1 className="font-sora" style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, letterSpacing: '-0.5px' }}>
                Fakultas Kedokteran
              </h1>
              <p className="font-dm" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>
                UIB memiliki berbagai program beasiswa yang membantu memastikan pendidikan berkualitas dapat dijangkau semua kalangan.
              </p>
              <Link
                href="/landing/beasiswa"
                className="font-dm group"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#e67e22', color: '#fff', borderRadius: '100px', padding: '12px 24px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', width: 'fit-content', boxShadow: '0 8px 28px rgba(230,126,34,0.35)', marginTop: '4px' }}
              >
                Lebih Lengkap
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          SECTION 4 — DOWNLOAD & ERASMUS
      ───────────────────────────────────────────── */}
     

          <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {/* Gunakan items-start dan pastikan tidak ada padding top pada grid ini */}
          <div 
            style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }} 
            className="flex flex-col lg:grid items-start pt-0"
          >

            {/* SISI KIRI: DownloadCard - Paksa margin dan padding ke 0 */}
            <motion.div 
              initial={{ opacity: 0, y: 0 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="m-0 p-0 flex flex-col items-stretch"
              style={{ marginTop: 0 }} // Memastikan tidak ada margin top
            >
              <DownloadCard />
            </motion.div>

            {/* SISI KANAN: Erasmus Card - Pastikan y: 0 agar sejajar sejak awal */}
            <motion.div
              initial={{ opacity: 0, y: 0 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{ 
                margin: 0, 
                background: '#fff', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                border: '1px solid #ebebeb', 
                boxShadow: '0 2px 12px rgba(0,0,0,0.04)' 
              }}
              className="group"
            >
              {/* Konten Image Erasmus */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '21/8', overflow: 'hidden' }}>
                <Image
                  src="/img/TE.webp"
                  alt="Program Erasmus"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(42,57,85,0.5) 0%, transparent 60%)' }} />
              </div>

              <div style={{ padding: '32px 36px' }}>
                {/* Label & Deskripsi Erasmus */}
                <div
                  className="font-dm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(42,57,85,0.08)', color: '#2A3955', borderRadius: '100px', padding: '6px 14px', fontSize: '10px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}
                >
                  <Globe size={12} /> Program Erasmus
                </div>
                <p
                  className="font-dm"
                  style={{ fontSize: '14px', color: 'rgba(42,57,85,0.6)', lineHeight: 1.75, marginBottom: '24px' }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae similique dignissimos explicabo?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat praesentium officia necessitatibus amet odit dolorum in illo cum sunt modi.
                </p>
                <Link
                  href="#"
                  className="font-dm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1.5px solid #2A3955', color: '#2A3955', borderRadius: '100px', padding: '10px 22px', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}
                >
                  Selengkapnya <ChevronRight size={15} />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}