'use client'
import React from 'react'
import Link from 'next/link'
import { Microscope, Users, ArrowRight } from 'lucide-react'

export default function DirectorySection() {
  return (
    <section className="flex flex-col py-10 px-5 bg-red- font-poppins ">
      <div className="container mx-auto px-4 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
          
          {/* DIREKTORI JURNAL / PENELITIAN */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 bg-[#2A3955] text-white px-4 py-2 mb-6">
              <Microscope size={20} className="text-[#ffffff]" />
              <span className="font-bold text-[15px] uppercase tracking-wide">Direktori Jurnal</span>
            </div>
            
            <p className="text-gray-600 text-[14px] leading-relaxed mb-2 w-full">
              Akses koleksi jurnal ilmiah Universitas Internasional Batam, mencakup berbagai penelitian inovatif di bidang teknologi, kesehatan, dan ilmu sosial.
            </p>
            
            <Link 
              href="/directory/jurnal"
              className="group flex items-center justify-between border border-[#2A3955] text-[#2A3955] px-5 py-2.5 rounded-sm text-[13px] font-bold transition-all hover:bg-[#2A3955]  hover:text-[#ffffff] min-w-[240px]"
            >
              <span>Direktori Jurnal UIB Selengkapnya</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* DIREKTORI DOSEN / PENGABDIAN */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 bg-[#2A3955] text-white px-4 py-2 mb-6">
              <Users size={20} className="text-[#ffffff]" />
              <span className="font-bold text-[15px] uppercase tracking-wide">Direktori Dosen</span>
            </div>
            
            <p className="text-gray-600 text-[14px] leading-relaxed mb-2 w-full">
              Temukan profil tenaga pendidik profesional UIB yang berkomitmen dalam pengabdian masyarakat dan pengembangan ilmu pengetahuan terkini.
            </p>
            
            <Link 
              href="/directory/dosen"
              className="group flex items-center justify-between border border-[#2A3955] text-[#2A3955] px-5 py-2.5 rounded-sm text-[13px] font-bold transition-all hover:bg-[#2A3955] hover:text-white min-w-[240px]"
            >
              <span>Direktori Dosen UIB Selengkapnya</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
