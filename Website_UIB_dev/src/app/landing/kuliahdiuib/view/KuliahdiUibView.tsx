'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { Landmark, GraduationCap, ArrowRight, ChevronRight } from 'lucide-react'

export default function KuliahdiUibView() {
  return (
    <main className="min-h-screen bg-white font-poppins">
      <NavbarLanding />
      
      {/* SECTION 1: HEADER & STATISTIK */}
      <section className="relative pt-32 md:pt-40 pb-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20">
            <div className="w-full lg:w-1/2">
              <h1 className="text-[#1a365d] text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] tracking-tight">
                Memberi Dukungan, Menggali Potensi, dan Mewujudkan Impian.
              </h1>
            </div>

            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-[#1a365d] text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                Program Pendidikan Tersedia di Universitas Internasional Batam
              </h2>
              
              <div className="flex flex-wrap items-center gap-8 md:gap-12 pt-4">
                <div className="flex items-center gap-3 group">
                  <div className="p-2 text-[#e67e22]"><Landmark size={32} strokeWidth={1.5} /></div>
                  <div>
                    <div className="text-xl font-bold text-[#e67e22] leading-none">7</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mt-1">Fakultas</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="p-2 text-[#e67e22]"><GraduationCap size={32} strokeWidth={1.5} /></div>
                  <div>
                    <div className="text-xl font-bold text-[#e67e22] leading-none">14</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mt-1">Program Studi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: GRID FAKULTAS (4 KOLOM) */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
            
            {/* BARIS 1: Kartu Utama (Navy) */}
            <div className="lg:col-span-2 bg-[#1a365d] rounded-3xl p-8 flex flex-col justify-between text-white relative overflow-hidden group shadow-lg">
              <div className="relative z-10">
                <span className="text-[#e67e22] text-sm font-bold uppercase tracking-wider mb-4 block">Fakultas dan Sekolah</span>
                <h2 className="text-2xl font-bold mb-4 leading-tight">
                  Universitas Internasional Batam (UIB) menawarkan beragam program studi.
                </h2>
                <p className="text-white/80 text-sm mb-6">
                  Lihat rincian biaya kuliah di sini.
                </p>
              </div>
              <div className="relative z-10">
                <Link href="/landing/beasiswa" className="inline-flex items-center gap-2 bg-white text-[#1a365d] px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-all">
                  Biaya Pendidikan <ChevronRight size={18} />
                </Link>
              </div>
            </div>

            {/* Grid Kartu Fakultas */}
            {[
              { name: "Fakultas Ekonomi", img: "/img/ekonomi.jpg" },
              { name: "Fakultas Hukum", img: "/img/hukum.jpg" },
              { name: "Fakultas Teknik Sipil", img: "/img/teknik.jpg" },
              { name: "Fakultas Ilmu Komputer", img: "/img/komputer.jpg" },
              { name: "Fakultas Ilmu Pendidikan", img: "/img/pendidikan.jpg" },
              { name: "Program Pascasarjana", img: "/img/pasca.jpg" },
            ].map((f, i) => (
              <div key={i} className="relative rounded-3xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500">
                <Image src={f.img} alt={f.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d]/95 via-[#1a365d]/20 to-transparent opacity-90 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-white font-bold text-lg leading-tight group-hover:-translate-y-2 transition-transform duration-500">
                    {f.name}
                  </h3>
                </div>
              </div>
            ))}

            {/* Kartu Penutup (Oranye) */}
            <div className="lg:col-span-2 bg-[#e67e22] rounded-3xl p-8 flex flex-col justify-between text-white relative overflow-hidden group shadow-lg">
              <div className="relative z-10">
                <span className="text-[#1a365d] text-sm font-bold uppercase tracking-wider mb-4 block">Informasi Pendaftaran</span>
                <h2 className="text-2xl font-bold mb-4 leading-tight">Mulai Perjalanan Akademik Anda Bersama Kami.</h2>
              </div>
              <div className="relative z-10">
                <Link href="#" className="inline-flex items-center gap-2 bg-[#1a365d] text-white px-6 py-3 rounded-full font-bold text-sm transition-all">
                  Daftar Sekarang <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: BEASISWA (Navy & Oranye) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[6/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-[#1a365d]">
                <Image src="/img/beasiswa-uib.jpg" alt="Beasiswa UIB" fill className="object-cover" />
                <div className="absolute bottom-8 left-8 bg-[#e67e22] p-4 rounded-2xl text-white shadow-xl">
                    <GraduationCap size={32} />
                </div>
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#e67e22]/10 rounded-full blur-3xl -z-10" />
            </div>

            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center gap-3 bg-[#1a365d] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg">
                <div className="w-2 h-2 bg-[#e67e22] rounded-full animate-pulse" />
                Beasiswa Universitas
              </div>
              
              <div className="space-y-6">
                <h2 className="text-[#1a365d] font-bold text-4xl leading-tight">
                    Tidak Ada Mimpi Yang Terlalu Besar, Sekarang Kamu Juga Bisa!
                </h2>
                <p className="text-gray-500 leading-relaxed">
                    Universitas Internasional Batam memiliki berbagai beasiswa yang membantu Anda menavigasi berbagai pilihan dan memastikan bahwa UIB adalah pilihan yang terjangkau untuk pendidikan Anda.
                </p>
              </div>

              <div className="pt-4">
                <Link href="#" className="inline-flex items-center gap-4 bg-[#e67e22] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#d35400] transition-all group shadow-xl shadow-orange-100">
                  Beasiswa Selengkapnya 
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" /> 
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}