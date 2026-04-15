'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import AboutHeader from '@/components/landing/tentang/about-header'
import { ArrowRight } from 'lucide-react'

export default function TentangView() {
  // Data Statistik untuk 5 kolom
  const stats = [
    { number: '12.450', label: 'Mahasiswa' },
    { number: '450', label: 'Dosen Tetap' },
    { number: '15.000+', label: 'Alumni' },
    { number: '12', label: 'Program Studi' },
    { number: '85', label: 'Kerja Sama Internasional' },
  ]

  return (
    <main className="min-h-screen bg-white font-poppins">
      <NavbarLanding />
      
      {/* 1. Banner Utama */}
      <AboutHeader title="Tentang UIB" />

      {/* 2. Section Visi */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-4xl">
              <span className="text-[#f6a623] text-sm font-bold uppercase tracking-widest block mb-4">
                Visi UIB
              </span>
              <h2 className="text-[#1a365d] text-2xl md:text-4xl font-bold leading-snug">
                Menjadi universitas dengan standar kualitas internasional yang menghasilkan lulusan, ilmu pengetahuan, teknologi dan seni yang dapat mengikuti perubahan global yang dinamis.
              </h2>
            </div>
            <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0">
              {/* Pastikan path logo sudah benar */}
              <Image 
                src="/logo/uib.png" 
                alt="Logo UIB"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section Misi - BG Biru Tua dengan Batik.png */}
          <section className="relative bg-[#1a365d] py-20 md:py-32 overflow-hidden border-b border-white/10">
            {/* Background Batik Baru dengan Opacity */}
            <div 
              className="absolute inset-0 opacity-4 pointer-events-none z-0 bg-repeat"
              style={{ 
                backgroundImage: "url('/img/batik_new.jpg')", // MENGGUNAKAN BATIK.PNG
                backgroundSize: 'cover' // Ukuran pattern, sesuaikan jika perlu
              }}
            ></div>

            <div className="container mx-auto px-6 md:px-20 relative z-10 text-white">
              <h3 className="text-center text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-16 opacity-90">
                Misi
              </h3>
              
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-lg leading-relaxed text-center md:text-left">
                
                {[
                  "Secara terus menerus menerapkan pendidikan yang menyeluruh sesuai dengan standar kualitas internasional.",
                  "Mengembangkan ilmu pengetahuan, teknologi dan seni yang analitis dan inovatif melalui penelitian.",
                  "Melaksanakan pengabdian masyarakat yang humanis.",
                  "Menyelenggarakan tata kelola yang akuntabel dan transparan."
                ].map((text, idx) => (
                  <div key={idx} className="flex flex-col gap-3">
                    <div className="h-1 w-12 bg-[#f6a623] mb-2 hidden md:block"></div>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. Section Statistik - BG Biru Tua dengan Batik.png */}
          <section className="relative bg-[#1a365d] py-16 md:py-20 overflow-hidden">
            {/* Background Batik Baru dengan Opacity */}
            <div 
              className="absolute inset-0 opacity-4 pointer-events-none z-0 bg-repeat"
              style={{ 
                backgroundImage: "url('/img/batik_new.jpg')", // MENGGUNAKAN BATIK.PNG
                backgroundSize: 'cover', // Disamakan dengan section atas agar nyambung
              }}
            ></div>

            <div className="container mx-auto px-6 md:px-20 relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-4">
                {stats.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {/* Garis Vertikal Oranye */}
                    <div className="w-1.5 h-10 md:h-12 bg-[#f6a623] shrink-0"></div>
                    
                    <div className="flex flex-col">
                      <span className="text-white text-2xl md:text-3xl font-extrabold leading-none mb-1">
                        {item.number}
                      </span>
                      <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-wider leading-tight">
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
      <Footer />
    </main>
  )
}