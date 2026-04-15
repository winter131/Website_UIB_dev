'use client'
import React from 'react'

export default function AboutHeader({ title }: { title: string }) {
  return (
    <section className="relative w-full h-[300px] md:h-[350px] bg-white overflow-hidden">
      
      {/* Background Pattern - Sangat tipis dengan gradasi */}
      <div 
        className="absolute inset-0 opacity-[0.10] pointer-events-none z-0"
        style={{ 
          backgroundImage: "url('/img/batik_new.jpg')", 
          backgroundSize: '700px',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* Overlay gradasi putih dari atas ke bawah */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/5 z-0"></div>

      {/* Container Utama */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 h-full flex items-end relative z-10">
        
        {/* Konten Utama */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full pb-8 md:pb-12 gap-4">
          
          {/* Sisi Kiri: Judul Halaman dan Subtitle */}
          <div className="max--2xl space-y-2">
            
            
            {/* Judul Utama */}
            <h1 className="text-[#1a365d] text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {title}
            </h1>
            
            {/* Subtitle/Description */}
            <p className="text-[#4a5568] text-sm md:text-base mt-2">
              JL. Gajah Mada, Baloi Permai, Batam, Kepulauan Riau 29442 Indonesia
            </p>
          </div>

          {/* Sisi Kanan: Informasi Akreditasi dengan layout vertikal */}
          <div className="flex flex-col items-start text-right">
            
            {/* Status Akreditasi */}
            <h2 className="text-[#1a365d] text-xl   md:text-2xl font-extrabold leading-tight mb-1">
              Terakreditasi Unggul
            </h2>
            
            {/* Nomor SK dengan background */}
            <div className="inline-block bg-[#f0f4f8] px-3 py-1 rounded">
              <p className="text-[#e67e22] text-xs font-bold tracking-tight">
                BAN-PT No.2777/SK/BAN-PT/Ak/PT/X/2025
              </p>
            </div>
          </div>

        </div>
      </div>

    
    </section>
  )
}
