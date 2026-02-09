'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Briefcase, Users, User } from 'lucide-react'

// DATA: Struktur organisasi sesuai kategori
const organizationData = {
  Pembina: [
    { name: 'Eddy Hussy', role: 'Ketua', level: 'top' },
    { name: 'Rudy', role: 'Anggota', level: 'bottom' },
    { name: 'Muljadi', role: 'Anggota', level: 'bottom' },
    { name: 'Johannes Sulistijawan Surjaatmadja', role: 'Anggota', level: 'bottom' },
    { name: 'Jim Kery', role: 'Anggota', level: 'bottom' },
    
  ],
  Pengurus: [
    { name: 'Dr. Iskandar Itan', role: 'Ketua Umum', level: 'top' },
    { name: 'Heri Janto', role: 'Sekretaris', level: 'bottom' },
    { name: 'Meiliana', role: 'Bendahara', level: 'bottom' },
  ],
  Pengawas: [
    { name: 'Teguh Widjaja', role: 'Ketua Pengawas', level: 'top' },
    { name: 'Indra Wahidin', role: 'Anggota', level: 'bottom' },
  ],
}

type Category = keyof typeof organizationData

export default function YmtiBatam() {
  const [activeTab, setActiveTab] = useState<Category>('Pembina')

  return (
    <section className="py-20 bg-gray-50 font-poppins overflow-hidden">
      <div className="container mx-auto px-6 md:px-20 max-w-7xl">
        
        {/* Judul Section - Dibuat Lebih Formal */}
        <div className="text-center mb-16">
          <h2 className="text-[#1a365d] text-2xl md:text-3xl font-bold mb-4 uppercase -tracking-normal">
            Struktur Organisasi YMTI
          </h2>
          <div className="w-16 h-1 bg-[#f6a623] mx-auto"></div>
        </div>

        {/* Menu Navigasi (Tabs) - Desain Kotak Formal */}
        <div className="flex flex-wrap justify-center mb-12 bg-white shadow-sm border border-gray-200">
          {(Object.keys(organizationData) as Category[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-6 text-xs md:text-sm uppercase transition-all duration-200 flex items-center justify-center gap-3 border-b-2 ${
                activeTab === tab 
                ? 'bg-[#f6a623] text-white border-[#f6a623]' 
                : 'bg-white text-gray-500 border-transparent hover:text-[#1a365d] hover:bg-gray-50'
              }`}
            >
              {tab === 'Pembina' && <ShieldCheck size={18} />}
              {tab === 'Pengurus' && <Briefcase size={18} />}
              {tab === 'Pengawas' && <Users size={18} />}
              {tab}
            </button>
          ))}
        </div>

        {/* Konten Area - Layout Bersih Tanpa Sudut Terlalu Melengkung */}
        <div className="bg-white p-10 md:p-20 border border-gray-100 shadow-sm min-h-[500px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full" >
              <div className="flex flex-col items-center gap-20">
                
                {/* Level Atas (Ketua) */}
                <div className="flex justify-center w-full">
                  {organizationData[activeTab]
                    .filter(m => m.level === 'top')
                    .map((member, i) => (
                      <MemberCard key={i} name={member.name} role={member.role} isTop />
                  ))}
                </div>

                {/* Level Bawah (Anggota) - Grid Hirarki */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-12 w-full">
                  {organizationData[activeTab]
                    .filter(m => m.level === 'bottom')
                    .map((member, i) => (
                      <MemberCard key={i} name={member.name} role={member.role} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/**
 * Sub-komponen Card Member
 * Desain difokuskan pada kejelasan informasi dan aksen garis dari referensi gambar.
 */
function MemberCard({ name, role, isTop = false }: { name: string, role: string, isTop?: boolean }) {
  return (
    <div className={`flex flex-col items-center text-center group ${isTop ? 'max-w-2xl' : 'w-full'}`}>
      
      {/* Icon Placeholder - Dibuat Minimalis */}
      <div className={`mb-6 p-4 rounded-sm bg-gray-50 text-[#1a365d] border border-gray-100 transition-colors group-hover:bg-[#1a365d] group-hover:text-white ${isTop ? 'scale-110' : ''}`}>
        <User size={isTop ? 32 : 24} strokeWidth={1.5} />
      </div>

      {/* Nama & Peran */}
      <h4 className={`text-[#1a365d] font-bold leading-tight mb-2 tracking-tight ${isTop ? 'text-xl md:text-2xl' : 'text-sm md:text-base'}`}>
        {name}
      </h4>
      <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em]">
        {role}
      </p>

      {/* Aksen Garis Kuning Tipis */}
      <div className="w-6 h-[3px] bg-[#f6a623] mt-4 opacity-70 group-hover:w-12 transition-all duration-300"></div>
    </div>
  )
}