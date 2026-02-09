'use client'
import React from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

// Data Berita
const newsData = [
  {
    id: 'db-001',
    slug: 'uib-tutup-2025-prestasi', 
    tag: 'Liputan Utama',
    date: '20 Desember 2025',
    author: 'Humas UIB',
    title: 'UIB Tutup 2025 dengan Prestasi: 6 Penghargaan di Anugerah Diktisaintek',
    image: '/img/news-main.jpg',
  },
  {
    id: 'db-002',
    slug: 'uib-pts-informatif-nasional',
    date: '15 Desember 2025',
    author: 'Admin Akademik',
    title: 'UIB Kembali Dinobatkan sebagai PTS Paling Informatif Nasional',
    image: '/img/news-main.jpg',
  },
  {
    id: 'db-003',
    slug: 'public-hearing-polri-uib',
    date: '12 Desember 2025',
    author: 'Humas UIB',
    title: 'Komisi Percepatan Reformasi Polri Gelar Public Hearing di UIB',
    image: '/img/news-main.jpg',
  }
]

const smallNews = [
  { slug: 'pramuka-uib-acehkuat-2026', title: 'Pramuka UIB Gelar ACEHKUAT 2026 di Batam', date: '06 Januari 2026', image: '/img/news-main.jpg' },
  { slug: 'keamanan-uib-polda-kepri', title: 'Unit Keamanan UIB Raih Penghargaan dari Polda Kepri', date: '04 Januari 2026', image: '/img/news-main.jpg' },
  { slug: 'iskandar-itan-gelar-doktor', title: 'Dr. Iskandar Itan Raih Gelar Doktor Ilmu Manajemen', date: '02 Januari 2026', image: '/img/news-main.jpg' },
  { slug: 'pemulihan-pasca-banjir', title: 'UIB Lanjutkan Pemulihan Pasca Banjir di Sekitar Kampus', date: '01 Januari 2026', image: '/img/news-main.jpg' },
]

export default function LatestNews() {
  return (
    <section className="py-12 bg-white font-poppins text-[#2A3955]">
      <div className="container mx-auto px-4 md:px-20">
        {/* Judul Section */}
        <div className='text-center font-bold text-[#2A3955] mb-10 text-3xl tracking-tight'>
          <h1>Berita Terbaru</h1>
        </div>
        
        {/* GRID UTAMA (Headline & Secondary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Headline - Sisi Kiri */}
          <div className="lg:col-span-7">
            <Link 
              href={`/news/${newsData[0].slug}`}
              className="relative group overflow-hidden rounded-xl h-[400px] lg:h-[450px] shadow-sm block"
            >
              <img 
                src={newsData[0].image} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Main News"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <span className="bg-[#e67e22] text-white text-[10px] font-bold px-3 py-1 rounded-sm w-fit mb-3 uppercase tracking-widest">
                  {newsData[0].tag}
                </span>
                <h3 className="text-white text-xl md:text-3xl font-bold leading-tight mb-3 group-hover:text-[#e67e22] transition-colors">
                  {newsData[0].title}
                </h3>
                <div className="flex items-center gap-3 text-gray-300 text-xs font-medium">
                  <span>{newsData[0].date}</span>
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  <span className="italic">Oleh: {newsData[0].author}</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Berita Menengah - Sisi Kanan */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {newsData.slice(1).map((news) => (
              <Link 
                href={`/news/${news.slug}`} 
                key={news.id} 
                className="group cursor-pointer flex flex-col sm:flex-row lg:flex-col gap-4"
              >
                <div className="h-36 w-full overflow-hidden rounded-lg shadow-sm">
                  <img 
                    src={news.image} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    alt="Secondary News"
                  />
                </div>
                <div>
                  <span className="text-[#0055aa] text-[10px] font-bold block mb-1 uppercase tracking-wider">
                    {news.date}
                  </span>
                  <h4 className="text-[15px] font-bold text-[#2A3955] leading-snug group-hover:text-[#e67e22] transition-colors line-clamp-2">
                    {news.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* GRID BAWAH (Small News) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {smallNews.map((news, i) => (
            <Link href={`/news/${news.slug}`} key={i} className="group cursor-pointer">
              <div className="aspect-video rounded-lg overflow-hidden mb-3 shadow-sm">
                <img 
                  src={news.image} 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" 
                  alt="Small News"
                />
              </div>
              <h5 className="text-[13px] font-bold text-[#2A3955] leading-tight mb-1 group-hover:text-[#e67e22] transition-colors line-clamp-2">
                {news.title}
              </h5>
              <span className="text-[10px] text-[#0055aa] font-medium">{news.date}</span>
            </Link>
          ))}

          {/* Tombol Lihat Lainnya */}
          <Link 
            href="/news" 
            className="flex flex-col items-center justify-center border-2 border-gray-100 rounded-lg p-4 hover:border-[#e67e22]/30 hover:bg-orange-50 transition-all group min-h-[120px]"
          >
              <span className="text-[#2A3955] group-hover:text-[#e67e22] font-bold text-[11px] mb-2 transition-colors text-center uppercase tracking-tighter">
                Lihat Berita Lainnya
              </span>
              <div className="bg-[#2A3955] group-hover:bg-[#e67e22] text-white p-2.5 rounded-full transition-all group-hover:translate-x-1">
                <FaArrowRight size={12} />
              </div>
          </Link>
        </div>
      </div>
    </section>
  )
}