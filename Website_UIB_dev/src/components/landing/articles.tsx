'use client'
import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const articles = [
  {
    date: '25 Januari 2026',
    category: 'Teknologi',
    title: 'Penerapan AI dalam Sistem Keamanan Kampus UIB Batam',
  },
  {
    date: '20 Januari 2026',
    category: 'Akademik',
    title: 'Tips Menulis Jurnal Internasional bagi Mahasiswa Tingkat Akhir',
  },
  {
    date: '18 Januari 2026',
    category: 'Event',
    title: 'Rangkuman Student Colloquium 2026: Inovasi Tanpa Batas',
  },
  {
    date: '15 Januari 2026',
    category: 'Riset',
    title: 'Dosen UIB Raih Penghargaan Penelitian Terbaik di Diktisaintek',
  },
  {
    date: '10 Januari 2026',
    category: 'Mahasiswa',
    title: 'Cerita Alumni: Membangun Karier Global dari Batam',
  }
]

export default function LatestArticles() {
  return (
    <section className="relative py-16 bg-[#2A3955] text-white font-poppins overflow-hidden">
      
      {/* Background Texture Samar (Batik New) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/img/batik-new.jpg')] bg-repeat bg-[length:250px_250px]"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-20">
        
        {/* HEADER SECTION - Mengikuti gaya layout image_ea8097.png */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4">
            {/* Dekorasi Ikon Vektor */}
            
            <div className="bg-white px-8 py-2.5 rounded-sm">
              <h2 className="text-[#2A3955] text-2xl font-black uppercase tracking-tight">Artikel Terbaru</h2>
            </div>
          </div>

          <Link 
            href="/articles" 
            className="group flex items-center gap-2 border border-white px-6 py-2.5 rounded-md text-[13px] font-bold hover:bg-white hover:text-[#2A3955] transition-all duration-300"
          >
            Lihat Semua Artikel <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ARTICLES GRID - Horizontal 5 Kolom Tanpa Thumbnail */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {articles.map((item, idx) => (
            <Link key={idx} href="#" className="group flex flex-col h-full border-l border-white/20 pl-6 first:border-l-0 first:pl-0">
              <div className="flex flex-col flex-grow">
                {/* Judul Artikel (Lebih Besar) */}
                <h2 className="text-[15px] font-bold leading-snug group-hover:underline mb-3 min-h-[60px] line-clamp-3 transition-all">
                  {item.title}
                </h2>
                
                {/* Tanggal (Lebih Kecil dari Judul) */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-medium text-white/70 uppercase tracking-widest">
                    {item.date}
                  </span>
                  <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">
                    {item.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}