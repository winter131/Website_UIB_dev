'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import AboutHeader from '@/components/landing/tentang/about-header'
import { ChevronLeft, ChevronRight, Quote, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// DATA SLIDER 1: Testimoni Utama
const testimonialData = [
  {
    id: 1,
    image: "/img/C1700295.jpg", 
    name: "Kevin Lijaya Lukman",
    title: "Peraih Msc Curry Award, tesis bidang Geologi Terbaik se-Inggris Raya",
    badge: "Awardee",
    quote: "Saya percaya dengan keberadaannya saya di sini itu mudah-mudahan bisa mempengaruhi Indonesia ke arah yang lebih baik. LPDP itu sangat open minded banget. Berkarya itu tidak harus di pemerintahan. Jadi bisa di wadah manapun yang bisa berkontribusi untuk Indonesia.",
    currentRole: "Kevin kini bekerja sebagai Business Development Manager PT Sebuku Iron Lateritic Ores."
  },
]

// DATA SLIDER 2: Tokoh Alumni
const granteeData = [
  {
    id: 1,
    image: "/img/blank.webp",
    name: "Khoirul Anwar",
    subTitle: "Ketua tim peneliti PATRIOT-Net, Universitas Telkom",
    tag: "Grantees",
    date: "06 February 2026",
    desc: "Saya sebagai ketua tim penelitian PATRIOT-Net Telkom University sangat berbahagia dan bangga atas adanya program LPDP Rispro ini."
  },
  {
    id: 2,
    image: "/img/blank.webp",
    name: "Irham",
    subTitle: "Model Tata Kelola Pertanian Berkelanjutan, Universitas Gadjah Mada",
    tag: "Grantees",
    date: "06 February 2026",
    desc: "RISPRO ini luar biasa ya. Artinya memberikan dana yang cukup bagi peneliti dengan prosedur yang mendukung pengembangan Usahatani Organik."
  },
  {
    id: 3,
    image: "/img/blank.webp",
    name: "Siti Aminah",
    subTitle: "Pengembangan Ekonomi Kreatif, Universitas Internasional Batam",
    tag: "Grantees",
    date: "06 February 2026",
    desc: "Program ini memungkinkan kolaborasi lintas disiplin yang sangat dibutuhkan untuk memajukan sektor kreatif di daerah kepulauan."
  },
  {
    id: 4,
    image: "/img/blank.webp",
    name: "Budi Santoso",
    subTitle: "Inovasi Teknologi Maritim, Institut Teknologi Sepuluh Nopember",
    tag: "Grantees",
    date: "06 February 2026",
    desc: "Dukungan riset ini memberikan ruang bagi putra-putri bangsa untuk menciptakan solusi teknologi yang aplikatif."
  },
  {
    id: 5,
    image: "/img/blank.webp",
    name: "Alumni Berprestasi",
    subTitle: "Peneliti Bidang Inovasi, Universitas Indonesia",
    tag: "Grantees",
    date: "06 February 2026",
    desc: "Kontribusi riset ini diharapkan mampu mendorong kemajuan industri nasional melalui implementasi teknologi tepat guna."
  }
]

export default function AlumniView() {
  const [testiIndex, setTestiIndex] = useState(0)
  const [granteeIndex, setGranteeIndex] = useState(0)
  const itemsPerPage = 3 // Tampilan 3 kolom tetap

  // Logika Looping Navigasi Tokoh Alumni
  const nextGrantee = useCallback(() => {
    // Berhenti atau loop jika sudah mencapai akhir tampilan 3 kolom
    setGranteeIndex((prev) => (prev + 1) % (granteeData.length - (itemsPerPage - 1)))
  }, [granteeData.length])

  const prevGrantee = () => {
    setGranteeIndex((prev) => (prev - 1 + (granteeData.length - (itemsPerPage - 1))) % (granteeData.length - (itemsPerPage - 1)))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextGrantee()
    }, 5000)
    return () => clearInterval(interval)
  }, [nextGrantee])

  return (
    <main className="min-h-screen bg-white font-poppins relative">
      <NavbarLanding />
      <AboutHeader title="Alumni & Prestasi" />

      {/* SECTION 1: SLIDER TESTIMONI UTAMA */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-20 relative">
          <div className="relative max-w-6xl mx-auto">
            <AnimatePresence mode='wait'>
              <motion.div 
                key={testiIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 items-center"
              >
                <div className="lg:col-span-7 relative h-[400px] md:h-[550px] w-full">
                  <Image src={testimonialData[testiIndex].image} alt={testimonialData[testiIndex].name} fill className="object-cover" priority />
                </div>
                <div className="lg:col-span-5 relative z-10">
                  <div className="bg-white p-8 md:p-12 lg:-ml-24 shadow-sm border border-gray-50">
                    <Quote size={40} className="text-gray-100 mb-6" />
                    <h3 className="text-[#1a365d] text-2xl font-bold mb-1">{testimonialData[testiIndex].name}</h3>
                    <p className="text-gray-500 text-xs mb-6 uppercase tracking-widest">{testimonialData[testiIndex].badge}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 text-justify italic">
                      "{testimonialData[testiIndex].quote}"
                    </p>
                    <p className="text-[#1a365d] text-[11px] font-bold border-t border-gray-100 pt-4 uppercase tracking-tight">
                      {testimonialData[testiIndex].currentRole}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 2: SLIDER TOKOH ALUMNI (3 KOLOM TERARAH) */}
      <section className="py-24 bg-gray-50/50 overflow-hidden">
        <div className="container mx-auto px-6 md:px-20">
          
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-[#1a365d] text-2xl font-bold uppercase tracking-[0.2em]">Tokoh Alumni</h2>
              <div className="w-12 h-1.5 bg-[#f6a623] mt-2"></div>
            </div>
            
            <div className="flex gap-3">
              <button onClick={prevGrantee} className="p-2 border-2 border-[#1a365d] text-[#1a365d] hover:bg-[#1a365d] hover:text-white transition-all shadow-sm">
                <ChevronLeft size={22} />
              </button>
              <button onClick={nextGrantee} className="p-2 border-2 border-[#1a365d] text-[#1a365d] hover:bg-[#1a365d] hover:text-white transition-all shadow-sm">
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <motion.div 
                animate={{ x: `-${granteeIndex * (100 / itemsPerPage)}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="flex gap-6" // Gap disesuaikan agar rapat
                style={{ width: `${(granteeData.length / itemsPerPage) * 100}%` }}
              >
                {granteeData.map((grantee) => (
                  <div key={grantee.id} style={{ width: `calc(100% / ${granteeData.length})` }} className="flex-shrink-0">
                    <div className="bg-white border border-gray-100 p-6 shadow-sm flex flex-col items-center h-full hover:shadow-md transition-all duration-300">
                      
                      {/* Gambar Persegi */}
                      <div className="relative w-40 h-40 mb-6 overflow-hidden rounded-md border border-gray-100 shadow-sm">
                        <Image 
                          src={grantee.image} 
                          alt={grantee.name} 
                          fill 
                          className="object-cover" 
                        />
                      </div>

                      <div className="text-center w-full">
                        <h3 className="text-lg font-bold text-[#1a365d] mb-1 leading-tight">{grantee.name}</h3>
                        <p className="text-gray-500 text-[10px] mb-4 leading-snug h-10 overflow-hidden">{grantee.subTitle}</p>
                        
                        <div className="flex items-center justify-center gap-3 mb-6">
                          <span className="border border-[#1a365d] text-[#1a365d] text-[8px] px-2 py-0.5 font-bold uppercase tracking-tight">
                            {grantee.tag}
                          </span>
                          <span className="text-gray-400 text-[9px] font-semibold flex items-center gap-1.5">
                            <Calendar size={12} /> {grantee.date}
                          </span>
                        </div>

                        <p className="text-gray-600 text-[11px] leading-relaxed text-center line-clamp-4">
                          {grantee.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
