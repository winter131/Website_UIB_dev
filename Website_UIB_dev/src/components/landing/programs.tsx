'use client'
import React from 'react'
import Link from 'next/link'
import { GraduationCap, BookOpen, Award, School, Microscope, Landmark } from 'lucide-react'

export default function AcademicPrograms() {
  return (
    <section className="relative py-20 font-poppins overflow-hidden bg-[#FCFCFC]">



      <div className="container relative z-10 mx-auto px-4 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            { title: "Fasilitas", link: "/Fasilitas", icon: <Landmark size={24} /> },
            { title: "Batam dan Sekitarnya", link: "/Batam-dan-Sekitarnya", icon: <GraduationCap size={24} /> },
            { title: "Diskon Mahasiswa", link: "/Diskon-Mahasiswa", icon: <Award size={24} /> },
            { title: "Kemahasiswaan", link: "/Kemahasiswaan", icon: <BookOpen size={24} /> },
            { title: "Akreditasi", link: "/Akreditasi", icon: <Microscope size={24} /> },
            { title: "Panduan", link: "/Panduan", icon: <School size={24} /> },
          ].map((item, idx) => (
            <Link key={idx} href={item.link} className="block group">
              {/* CARD: Menggunakan bg-white solid untuk menutupi batik di area kartu */}
              <div className="h-full bg-white p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#0055aa]/30">
                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-[#0055aa] transition-colors">
                    {React.cloneElement(item.icon as React.ReactElement, {
                      className: "text-[#0055aa] group-hover:text-white transition-colors"
                    } as any)}
                  </div>
                  <h3 className="text-[17px] font-bold text-[#434040] tracking-tight group-hover:text-[#e67e22] transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-gray-500 text-[13px] leading-relaxed mb-4">
                  Temukan informasi lengkap mengenai {item.title} di Universitas Internasional Batam untuk menunjang pengalaman kuliah Anda.
                </p>

                <div className="flex items-center text-[#0055aa] text-[11px] font-bold uppercase tracking-widest group-hover:text-[#e67e22] transition-all">
                  Selengkapnya <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  )
}