'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'


import AboutHeader from '@/components/landing/tentang/about-header'
import { ChevronLeft, ChevronRight, Quote, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

const testimonialData = [
  {
    id: 1,
    image: "/img/C1700295.jpg",
    name: "Kevin Lijaya Lukman",
    badge: "Featured Alumnus",
    quote: "LPDP itu sangat open minded. Berkarya itu tidak harus di pemerintahan, bisa di wadah manapun yang berkontribusi untuk Indonesia.",
    currentRole: "Business Development Manager PT SILO"
  }
]

const granteeData = [
  { id: 1, image: "/img/blank.webp", name: "Khoirul Anwar", tag: "Research", date: "06 Feb 2026", desc: "Ketua tim peneliti PATRIOT-Net, Universitas Telkom." },
  { id: 2, image: "/img/blank.webp", name: "Irham", tag: "Agri-Tech", date: "06 Feb 2026", desc: "Model Tata Kelola Pertanian Berkelanjutan, UGM." },
  { id: 3, image: "/img/blank.webp", name: "Siti Aminah", tag: "Creative", date: "06 Feb 2026", desc: "Pengembangan Ekonomi Kreatif, UIB Batam." },
  { id: 4, image: "/img/blank.webp", name: "Budi Santoso", tag: "Maritime", date: "06 Feb 2026", desc: "Inovasi Teknologi Maritim, ITS Surabaya." },
  { id: 5, image: "/img/blank.webp", name: "Dewi Lestari", tag: "Education", date: "07 Feb 2026", desc: "Transformasi Digital Pendidikan Dasar, UNY." },
  { id: 6, image: "/img/blank.webp", name: "Ahmad Zaki", tag: "Economy", date: "08 Feb 2026", desc: "Analisis Kebijakan Moneter Digital, UI." },
  { id: 7, image: "/img/blank.webp", name: "Rina Wijaya", tag: "Health", date: "09 Feb 2026", desc: "Inovasi Sistem Deteksi Dini Penyakit Tropis, Unair." },
  { id: 8, image: "/img/blank.webp", name: "Taufik Hidayat", tag: "Energy", date: "10 Feb 2026", desc: "Pengembangan Panel Surya Efisiensi Tinggi, ITB." },
]

export default function AlumniView() {
  const [granteeIndex, setGranteeIndex] = useState(0)
  const itemsVisible = 4
  const gap = 20 

  const nextGrantee = useCallback(() => {
    const maxIndex = granteeData.length - itemsVisible
    setGranteeIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [granteeData.length])

  const prevGrantee = () => {
    const maxIndex = granteeData.length - itemsVisible
    setGranteeIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(nextGrantee, 5000)
    return () => clearInterval(interval)
  }, [nextGrantee])

  return (
    <main className="min-h-screen bg-white font-poppins selection:bg-[#f6a623]/20">

      <AboutHeader title="Alumni & Prestasi" />

      <section className="py-10 bg-gray-50/50">
        <div className="container mx-auto px-6 lg:px-40">
          <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
              <div className="md:col-span-3 relative h-[250px] md:h-auto overflow-hidden">
                <Image src={testimonialData[0].image} alt={testimonialData[0].name} fill className="object-cover" />
              </div>
              <div className="md:col-span-9 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#f6a623]" />
                  <span className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase">{testimonialData[0].badge}</span>
                </div>
                <h3 className="text-[#1a365d] text-lg font-bold mb-2">{testimonialData[0].name}</h3>
                <div className="relative">
                  <Quote size={20} className="text-[#f6a623] opacity-20 absolute -left-6 -top-2" />
                  <p className="text-gray-600 text-sm leading-relaxed italic">"{testimonialData[0].quote}"</p>
                </div>
                <p className="mt-4 text-[#1a365d] text-[10px] font-bold border-t border-gray-50 pt-3">{testimonialData[0].currentRole}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-20">

          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-[#1a365d] text-xl font-bold tracking-tight uppercase">Tokoh Alumni</h2>
              <div className="h-1 w-10 bg-[#f6a623] mt-2" />
            </div>

            <div className="flex gap-2">
              <button
                onClick={prevGrantee}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full hover:bg-[#1a365d] hover:text-white transition-all shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextGrantee}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full hover:bg-[#1a365d] hover:text-white transition-all shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: `calc(-${granteeIndex * (100 / itemsVisible)}% - ${granteeIndex * (gap / itemsVisible)}px)`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ gap: `${gap}px` }}
            >
              {granteeData.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0"
                  style={{
                    width: `calc((100% / ${itemsVisible}) - ${(gap * (itemsVisible - 1)) / itemsVisible}px)`
                  }}
                >
                  <div className="group bg-white border border-gray-100 p-4 rounded-xl hover:shadow-lg hover:border-[#f6a623]/20 transition-all duration-300 h-full">
                    <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[8px] font-bold bg-[#f6a623]/10 text-[#f6a623] px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-[#1a365d] text-sm font-bold mb-1 group-hover:text-[#f6a623] transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-[10px] leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


    </main>
  )
}