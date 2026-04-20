'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import AboutHeader from '@/components/landing/tentang/about-header'
import { User, GraduationCap, Building2, Briefcase, Landmark, BookOpen } from 'lucide-react'

// 1. DATA PIMPINAN: Terbagi berdasarkan kategori sesuai image_331fbd.jpg
const pimpinanData = {
  Rektorat: [
    { name: 'Dr. Iskandar Itan', role: 'Rektor', image: '/rektorat/pak itan.webp' },
    { name: 'Dr. Meiliana', role: 'Wakil Rektor Bidang Akademik', image: '/rektorat/Dr. Meiliana.webp' },
    { name: 'Dr. Teddy Jurnali', role: 'Wakil Rektor Bidang Keuangan dan Operasional', image: '/rektorat/Dr. Teddy Jurnali.webp' },
    { name: 'Dr. Hepy Hefri Ariyanto', role: 'Wakil Rektor Bidang Kemahasiswaaan dan Kerja Sama', image: '/rektorat/Dr. Hepy Hefri Ariyanto.webp' },
  ],
  Fakultas: [
    {
      name: 'Dr. Dewi Khornida Marheni, S.E., M.M.',
      role: 'Dekan Fakultas Bisnis dan Manajemen',
      image: '/img/pimpinan/dewi.jpg'
    },
    {
      name: 'Pandu Prasodjo, S.Pd., M.Pd.',
      role: 'Dekan Fakultas Ilmu Pendidikan',
      image: '/img/pimpinan/pandu.jpg'
    },
    {
      name: 'Tony Wibowo, Ph.D.',
      role: 'Dekan Fakultas Ilmu Komputer',
      image: '/img/pimpinan/tony.jpg'
    },
    {
      name: 'Prof. Dr. Ir. Andri Irfan Rifai, S.T., M.T.',
      role: 'Dekan Fakultas Teknik Sipil dan Perencanaan',
      image: '/img/pimpinan/andri.jpg'
    },
    {
      name: 'Assoc. Prof. Dr. Lu Sudirman',
      role: 'Dekan Fakultas Hukum',
      image: '/img/pimpinan/lu.jpg'
    },
  ],
  Lembaga: [
    { name: 'Dr. Hepy Hefri Ariyanto', role: 'Ketua LPPM', image: '/img/pimpinan/lppm.jpg' },
    { name: 'Dr. Hepy Hefri Ariyanto', role: 'Ketua LPPM', image: '/img/pimpinan/lppm.jpg' },
  ],
  Kantor: [
    { name: 'Heri Janto, S.E., M.M.', role: 'Kepala Kantor Adm. Akademik', image: '/img/pimpinan/kaa.jpg' },
  ],
  "Program Studi": [
    { name: 'Nama Kaprodi', role: 'Ketua Program Studi Manajemen', image: '/img/pimpinan/kaprodi.jpg' },

  ]
}

type Category = keyof typeof pimpinanData

export default function PimpinanView() {
  const [activeTab, setActiveTab] = useState<Category>('Rektorat')

  return (
    <main className="min-h-screen bg-white font-poppins">
      <NavbarLanding />
      <AboutHeader title="Pimpinan UIB" />

      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6 md:px-20 max-w-7xl">

          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#1a365d] text-3xl md:text-4xl font-extrabold mb-4 uppercase tracking-tight"
            >
              Struktur Kepemimpinan
            </motion.h2>
            <div className="w-24 h-1.5 bg-[#f6a623] mx-auto rounded-full"></div>
          </div>

          {/* Navigasi Tabs: Desain menarik seperti image_331fbd.jpg */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {(Object.keys(pimpinanData) as Category[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-md text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-sm border ${activeTab === tab
                  ? 'bg-[#f6a623] text-white border-[#f6a623] scale-105 shadow-orange-200'
                  : 'bg-[#1a365d] text-white border-[#1a365d] hover:bg-[#2a4a7d]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Konten Area dengan Animasi */}
          {/* Konten Area dengan Animasi */}
          <div className="flex justify-center w-full min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.4 }}
                /* Ganti 'grid' menjadi 'flex flex-wrap justify-center' 
                    agar item selalu berada di tengah halaman
                */
                className="flex flex-wrap justify-center gap-x-10 gap-y-16 w-full"
              >
                {pimpinanData[activeTab].map((person, index) => (
                  /* Gunakan basis lebar agar tetap terlihat seperti kolom tapi bisa fleksibel ke tengah */
                  <div key={index} className="w-full sm:w-[calc(50%-2.5rem)] lg:w-[calc(33.33%-2.5rem)] xl:w-[calc(20%-2.5rem)] max-w-[250px]">
                    <PimpinanCard
                      name={person.name}
                      role={person.role}
                      image={person.image}
                    />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}

// SUB-KOMPONEN: Kartu Pimpinan (Desain Bulat sesuai image_331fbd.jpg)
function PimpinanCard({ name, role, image }: { name: string, role: string, image: string }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="flex flex-col items-center text-center group"
    >
      {/* Container Gambar Melingkar */}
      <div className="relative w-48 h-48 mb-6 p-1 rounded-full border-2 border-gray-200 group-hover:border-[#f6a623] transition-colors duration-500 overflow-hidden shadow-lg bg-white">
        <div className="relative w-full h-full rounded-full overflow-hidden  transition-all duration-700">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback jika gambar tidak ditemukan
              const target = e.target as HTMLImageElement;
              target.src = "https://ui-avatars.com/api/?name=" + name + "&background=1a365d&color=fff";
            }}
          />
        </div>
      </div>

      {/* Detail Informasi */}
      <h3 className="text-[#1a365d] font-bold text-base md:text-lg leading-tight mb-2 group-hover:text-[#f6a623] transition-colors duration-300 min-h-[3rem] flex items-center justify-center">
        {name}
      </h3>

      <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed uppercase tracking-wide">
        {role}
      </p>

      {/* Dekorasi Aksen */}
      <div className="w-8 h-1 bg-[#f6a623] mt-4 rounded-full opacity-0 group-hover:opacity-100 group-hover:w-16 transition-all duration-500"></div>
    </motion.div>
  )
}
