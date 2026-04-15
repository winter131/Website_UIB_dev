'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import AboutHeader from '@/components/landing/tentang/about-header'
import { ArrowRight } from 'lucide-react'

export default function SejarahView() {
  return (
    <main className="min-h-screen bg-white font-poppins">
      <NavbarLanding />
      
      {/* Banner Utama */}
      <AboutHeader title="Sejarah" />

      {/* 1. Section Sejarah / Kebijakan - Image Adjusted to 4/3 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Sisi Kiri: Menggunakan aspect-[4/3] agar tidak terlalu 'tinggi' */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <Image 
                src="/img/gedungUIB.jpg" 
                alt="Kampus UIB"
                fill
                className="object-cover transition-transform 5"
              />
            </div>

            {/* Sisi Kanan: Konten Teks */}
            <div className="flex flex-col gap-8 py-2">
              <div className="group">
                <h3 className="text-[#1a365d] font-bold text-2xl mb-4">
                  Perjalanan UIB
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 text-justify">
                  Kebijakan Umum Universitas Internasional Batam (UIB) ditetapkan untuk setiap periode kepemimpinan Rektor dalam menjalankan mandat pendidikan tinggi. Hal ini mencakup tata kelola yang transparan dan akuntabel sesuai dengan statuta universitas.
                </p>
                <Link 
                  href="/landing/kebijakan-umum" 
                  className="flex items-center gap-2 text-[#1a365d] text-xs font-bold hover:translate-x-1 transition-transform inline-flex">
                  Selanjutnya tentang Kebijakan Umum <ArrowRight size={14} />
                </Link>
              </div>

              <div className="group">
                <h3 className="text-[#1a365d] font-bold text-2xl mb-4">
                  Visi Masa Depan
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 text-justify">
                  UIB terus berkomitmen untuk menghasilkan lulusan yang kompeten di bidangnya, didukung oleh fasilitas modern dan kurikulum yang adaptif terhadap perkembangan industri global.
                </p>
                <Link 
                  href="/landing/kebijakan-umum" 
                  className="flex items-center gap-2 text-[#1a365d] text-xs font-bold hover:translate-x-1 transition-transform inline-flex">
                  Selanjutnya tentang Visi UIB <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Section Gambar "Monitor Size" - Refined Height & Container */}
      <section className="bg-gradient-to-b from-transparent to-[#eceeee] pb-30 md:pb-32 ">
        <div className="container mx-auto px-20 md:px-20 w-full "> 
          {/* max-w-6xl membatasi agar gambar tidak terlalu melebar di layar ultra-wide */}
          <div className="relative w-full h-[300px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl ">
            <Image 
              src="/img/C1700295.jpg" 
              alt="Pemandangan Full Gedung UIB"
              fill
              className="object-cover transition-opacity duration-1000"
              priority
            />
            {/* Overlay Gradient halus */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d]/30 via-transparent to-transparent pointer-events-none"></div>
          </div>
          
          {/* Opsional: Menambahkan Caption halus di bawah gambar */}
          <p className="mt-6 text-center text-gray-500 text-xs italic tracking-wide">
            Gedung Utama Universitas Internasional Batam — Simbol Modernitas Pendidikan
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}