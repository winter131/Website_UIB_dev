'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { Calendar, Clock, MapPin, ArrowRight, BookOpen, Users, Link as LinkIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Dummy Data untuk Jadwal Seminar
const seminarSchedules = [
    {
        id: 1,
        date: "15 Agustus 2026",
        time: "09:00 - 12:00 WIB",
        title: "Seminar Nasional Teknologi Informasi & AI",
        location: "Aula Utama UIB / Zoom Meeting",


    },
    {
        id: 2,
        date: "05 September 2026",
        time: "13:00 - 15:30 WIB",
        title: "Perkembangan Hukum Bisnis di Era Digital",
        location: "Ruang Seminar Fak. Hukum UIB",


    },

]

export default function SeminarUIB() {
    const router = useRouter();

    return (
        <main className="mt-20 bg-slate-50 font-sans text-slate-900">
            <NavbarLanding />

            {/* HEADER SECTION */}
            <header className="pt-32 pb-16 relative overflow-hidden bg-[#2A3955]">
                {/* Background Details */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/img/gedungUIB.jpg"
                        alt="Background Seminar UIB"
                        fill
                        className="object-cover opacity-10 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A3955] to-transparent" />
                </div>

                <div className="container mx-auto px-10 md:px-20 relative z-20 text-center">

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2 leading-[1.1]">
                        Jadwal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">Seminar & Lokakarya</span>
                    </h1>

                    <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-0 max-w-2xl mx-auto font-light">
                        Ikuti berbagai seminar, lokakarya, dan konferensi yang diselenggarakan oleh sivitas akademika UIB. Perluas wawasan dan jaringan profesional Anda.
                    </p>
                </div>
            </header>

            {/* MAIN CONTENT AREA: LIST JADWAL */}
            <section className="py-20 container mx-auto px-6 md:px-20 min-h-[50vh]">
                <div className="max-w-4xl mx-auto">

                    <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                        <div>
                            <h2 className="text-2xl font-black text-[#2A3955]">Agenda Mendatang</h2>
                            <p className="text-slate-500 text-sm mt-1">Daftar kegiatan terbuka untuk mahasiswa dan umum</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-200 cursor-pointer shadow-sm">Semua</span>
                            <span className="px-4 py-1.5 bg-white text-slate-500 rounded-full text-xs font-semibold border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">Teknologi</span>
                            <span className="px-4 py-1.5 bg-white text-slate-500 rounded-full text-xs font-semibold border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">Bisnis</span>
                        </div>
                    </div>

                    {/* Grid List - Minimalis (2 Kolom) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {seminarSchedules.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-slate-100 p-5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all group flex flex-col h-full">



                                {/* Title & Speaker */}
                                <div className="mb-4 flex-grow">
                                    <h3 className="text-lg font-bold text-[#2A3955] leading-tight mb-2 hover:text-[#e67e22] transition-colors cursor-pointer">
                                        {item.title}
                                    </h3>

                                </div>

                                {/* Bottom Info Row & Action */}
                                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 mt-auto">
                                    <div className="flex flex-col gap-1.5 text-[12px] text-slate-500 w-full">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={13} className="text-[#2A3955]" />
                                            <span className="font-semibold">{item.date}</span>
                                            <span className="mx-1 text-slate-300">•</span>
                                            <span>{item.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={13} className="text-[#2A3955]" />
                                            <span className="truncate">{item.location}</span>
                                        </div>
                                    </div>


                                    {/* <button
                                        disabled={item.status !== 'Pendaftaran Buka'}
                                        className={`w-full sm:w-auto px-5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${item.status === 'Pendaftaran Buka'
                                            ? 'bg-[#2A3955] text-white hover:bg-blue-800'
                                            : item.status === 'Segera Hadir'
                                                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100'
                                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                            }`}
                                    >
                                        {item.status === 'Pendaftaran Buka' ? 'Daftar' : 'Detail'}
                                    </button> */}
                                    <button
                                        onClick={() => router.push(`/landing/penelitianpengabdian/seminar/view/${item.id}`)}
                                        className='border border-[#2A3955] text-[#2A3955] hover:bg-[#2A3955] hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap'
                                    >
                                        Detail
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </section >

            <Footer />
        </main >
    )
}
