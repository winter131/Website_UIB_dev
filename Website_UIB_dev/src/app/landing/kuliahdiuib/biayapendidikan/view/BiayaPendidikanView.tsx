'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search,
  Filter,
  ChevronRight,
  Info,
  Download,
  CreditCard
} from 'lucide-react'

// Data Hero
const heroData = {
  image: "/img/C1700307.jpg",
  title: "Biaya Pendidikan",
  desc: ""
};

// Data UKT (Data Sementara)
const uibData = [
  // Sarjana
  { prodi: 'Gelombang 1', jenjang: 'Sarjana', ukt: ['750.000', '1.500.000', '2.500.000', '3.500.000', '4.500.000', '5.500.000', '6.500.000', '7.500.000'] },
  { prodi: 'Gelombang 2', jenjang: 'Sarjana', ukt: ['750.000', '1.500.000', '3.000.000', '4.500.000', '6.000.000', '7.500.000', '9.000.000', '10.500.000'] },
  { prodi: 'Gelombang 3', jenjang: 'Sarjana', ukt: ['750.000', '1.500.000', '2.500.000', '3.500.000', '4.500.000', '5.500.000', '7.000.000', '8.500.000'] },
  { prodi: 'Gelombang 4', jenjang: 'Sarjana', ukt: ['750.000', '1.500.000', '3.000.000', '4.500.000', '6.000.000', '7.500.000', '9.000.000', '10.500.000'] },
  // Pasca Sarjana
  { prodi: 'Gelombang 1', jenjang: 'Pasca Sarjana', ukt: ['-', '-', '5.000.000', '7.000.000', '9.000.000', '12.000.000', '15.000.000', '18.000.000'] },
  { prodi: 'Gelombang 2', jenjang: 'Pasca Sarjana', ukt: ['-', '-', '5.000.000', '7.000.000', '9.000.000', '12.000.000', '15.000.000', '18.000.000'] },
  // RPL
  { prodi: 'Gelombang 1', jenjang: 'RPL', ukt: ['-', '-', '4.000.000', '5.500.000', '7.000.000', '8.500.000', '10.000.000', '11.500.000'] },
  { prodi: 'Gelombang 2', jenjang: 'RPL', ukt: ['-', '-', '4.500.000', '6.000.000', '7.500.000', '9.000.000', '10.500.000', '12.000.000'] },
]

// Data Estimasi Kuliah Semester 1 (Data Sementara)
const estimasiKuliahData = [
  // Sarjana
  { prodi: 'Estimasi Reguler', jenjang: 'Sarjana', ukt: ['9.500.000', '10.500.000', '11.500.000', '12.500.000', '13.500.000', '14.500.000', '15.500.000', '16.500.000'] },
  { prodi: 'Estimasi Ekstensi', jenjang: 'Sarjana', ukt: ['10.500.000', '11.500.000', '12.500.000', '13.500.000', '14.500.000', '15.500.000', '16.500.000', '17.500.000'] },
]

export default function BiayaPendidikanView() {
  const [activeTab, setActiveTab] = useState('Sarjana')
  const [searchTerm, setSearchTerm] = useState('')

  // Filter Data berdasarkan Tab dan Search
  const filteredData = uibData.filter(item =>
    item.jenjang === activeTab &&
    item.prodi.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredEstimasiData = estimasiKuliahData.filter(item =>
    item.jenjang === activeTab &&
    item.prodi.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-poppins selection:bg-[#e67e22] selection:text-white">
      <NavbarLanding />

      {/* HERO SECTION - COMPACT */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden flex items-center">
        <Image
          src={heroData.image}
          alt="UIB Hero"
          fill
          priority
          className="object-cover"
          objectPosition="center 10%"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d]/90 via-[#1a365d]/60 to-transparent z-10"></div>
        <div className="relative z-20 container mx-auto px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >

            <h1 className="text-2xl md:text-4xl font-black mt-24">
              {heroData.title}
            </h1>
            <p className="text-white/80 text-sm md:text-lg max-w-xl font-light">
              {heroData.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className=" lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4  top-24">
              <h2 className="text-3xl font-bold text-[#1a365d] mb-4">Mengenal Sistem UKT</h2>
              <div className="w-16 h-1.5 bg-[#e67e22] rounded-full mb-6"></div>
              <p className='text-justify gap-2 mt-5'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className='text-justify gap-2 mt-5'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* TABLE SECTION FULL SCREEN WITH MARGIN */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-[98%] mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 overflow-hidden transition-all duration-500 border border-slate-100">

            {/* CONTROL BAR: FILTERS & SEARCH */}
            <div className="p-8 bg-slate-50/50 border-b border-slate-100">
              <div className="flex flex-col xl:flex-row justify-between items-center gap-8">

                {/* KIRI: Filter Jenjang & Jalur dengan Jarak (gap-8) */}
                <div className="flex flex-wrap items-center gap-8">
                  <div className="flex p-1 bg-slate-200/50 rounded-2xl">
                    {['Sarjana', 'Pasca Sarjana', 'RPL'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === tab ? 'bg-[#2A3955] text-white shadow-lg' : 'text-slate-500 hover:text-[#2A3955]'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                </div>

                {/* KANAN: Bar Pencarian */}
                <div className="relative w-full xl:w-80">
                  <input
                    type="text"
                    placeholder="Cari Program Studi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-[#2A3955]/5 focus:border-[#2A3955] transition-all outline-none"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>
            </div>

            {/* THE TABLE - THEME NAVY #2A3955 */}
            <div className="mb-6 px-4">
              <h3 className="text-2xl font-bold text-[#1a365d] border-l-4 border-[#e67e22] pl-4">Biaya Gedung SPP</h3>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#2A3955] text-white">
                    <th className="text-left py-8 px-10 text-xl font-bold min-w-[350px]" rowSpan={2}>
                      <div className="flex items-center gap-3 italic">
                        <CreditCard size={24} className="text-[#e67e22]" />
                        Periode
                      </div>
                    </th>
                    <th className="text-center py-4 text-[10px] font-black uppercase tracking-[0.3em] border-l border-white/10 bg-black/10" colSpan={8}>
                      peringkat USM
                    </th>
                  </tr>
                  <tr className="bg-[#1e2a3f] text-white">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <th key={n} className="py-5 px-2 text-center text-[11px] font-bold border-l border-white/5 min-w-[110px]">
                        {n}
                      </th>
                    ))}
                  </tr>
                </thead>
                <AnimatePresence mode='wait'>
                  <motion.tbody
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <tr className="bg-[#f1f4f9]">
                      <td colSpan={9} className="py-3 px-10 text-[#2A3955] text-[10px] font-black uppercase tracking-widest border-[#e67e22]">
                        Program {activeTab}
                      </td>
                    </tr>

                    {filteredData.length > 0 ? filteredData.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/80 transition-all group">
                        <td className="py-6 px-10 text-sm font-bold text-[#2A3955] group-hover:pl-12 group-hover:text-[#e67e22] transition-all duration-300">
                          {row.prodi}
                        </td>
                        {row.ukt.map((val, i) => (
                          <td key={i} className={`py-6 px-2 text-center text-xs font-medium border-l border-slate-50/50 ${val === '-' ? 'text-slate-300 italic' : 'text-slate-600'}`}>
                            {val}
                          </td>
                        ))}
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={9} className="py-32 text-center text-slate-400 text-sm italic">
                          Data tidak ditemukan...
                        </td>
                      </tr>
                    )}
                  </motion.tbody>
                </AnimatePresence>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/* TABLE ESTIMASI BIAYA SEM 1 */}
      <section className="py-4 px-4 md:px-8 mb-12">
        <div className="max-w-[98%] mx-auto">
          <div className="mb-6 px-4">
            <h3 className="text-2xl font-bold text-[#1a365d] border-l-4 border-[#e67e22] pl-4">Estimasi Biaya Kuliah Semester 1</h3>
          </div>
          <div className="overflow-x-auto bg-white rounded-[1.5rem] shadow-xl border border-slate-100 p-2">
            <table className="table w-full">
              {/* head */}
              <thead className="bg-[#2A3955] text-white rounded-t-xl">
                <tr>
                  <th className="rounded-tl-2xl py-6 pl-8">No</th>
                  <th className="font-bold py-6 text-[14px]">Program Studi / Periode</th>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <th key={n} className={`text-center py-6 font-bold ${n === 8 ? 'rounded-tr-2xl' : ''}`}>
                      UKT {n}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {filteredEstimasiData.length > 0 ? (
                    filteredEstimasiData.map((row, idx) => (
                      <motion.tr
                        key={`${activeTab}-${idx}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`group ${idx % 2 === 0 ? "bg-slate-50/50 hover:bg-slate-100 transition-colors" : "bg-white hover:bg-slate-100 transition-colors"}`}
                      >
                        <th className="pl-8 text-[#2A3955] transition-colors">{idx + 1}</th>
                        <td className="font-bold text-[#2A3955] py-5 group-hover:text-[#e67e22] transition-colors">{row.prodi}</td>
                        {row.ukt.map((val, i) => (
                          <td key={i} className={`text-center text-xs font-medium border-l border-slate-100/50 ${val === '-' ? 'text-slate-300 italic' : 'text-slate-600'}`}>
                            {val}
                          </td>
                        ))}
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="text-center py-16 text-slate-400 italic">
                        Data {activeTab} tidak ditemukan...
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}