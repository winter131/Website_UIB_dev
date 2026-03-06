'use client'
import React from 'react'
import Image from 'next/image'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { Calendar, Clock, MapPin, ArrowRight, BookOpen, Users } from 'lucide-react'

// Dummy Data untuk Jadwal Seminar
const seminarSchedules = [
    {
        id: 1,
        date: "15 Agustus 2026",
        time: "09:00 - 12:00 WIB",
        title: "Seminar Nasional Teknologi Informasi & AI",
        speaker: "Dr. Budi Santoso, M.Kom (Pakar Data Science)",
        location: "Aula Utama UIB / Zoom Meeting",
        status: "Pendaftaran Buka",
        type: "Hybrid",
        category: "Teknologi"
    },
    {
        id: 2,
        date: "05 September 2026",
        time: "13:00 - 15:30 WIB",
        title: "Perkembangan Hukum Bisnis di Era Digital",
        speaker: "Prof. Dr. Andi Wijaya, S.H., M.H.",
        location: "Ruang Seminar Fak. Hukum UIB",
        status: "Segera Hadir",
        type: "Offline",
        category: "Hukum"
    },
    {
        id: 3,
        date: "20 Oktober 2026",
        time: "10:00 - 14:00 WIB",
        title: "Strategi Manajemen Bisnis Pasca Pandemi",
        speaker: "Rina Gunawan, MBA (CEO Startup Nusantara)",
        location: "Zoom Meeting",
        status: "Pendaftaran Tutup",
        type: "Online",
        category: "Bisnis"
    }
]

export default function SeminarUIB() {
    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
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

                <div className="container mx-auto px-6 md:px-20 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                        <Calendar size={14} className="text-[#f1c40f]" /> Info Kegiatan
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.1]">
                        Jadwal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">Seminar & Lokakarya</span>
                    </h1>

                    <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-0 max-w-2xl mx-auto font-light">
                        Ikuti berbagai seminar, lokakarya, dan konferensi yang diselemggarakan oleh sivitas akademika UIB. Perluas wawasan dan jaringan profesional Anda.
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

                    <div className="space-y-6">
                        {seminarSchedules.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col md:flex-row">
                                {/* Date Column */}
                                <div className="bg-slate-50 text-slate-800 p-6 md:w-48 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
                                    <div className="text-3xl font-black text-[#2A3955] mb-1">{item.date.split(' ')[0]}</div>
                                    <div className="text-sm font-bold tracking-widest uppercase text-slate-500">{item.date.split(' ')[1]} {item.date.split(' ')[2]}</div>
                                </div>

                                {/* Content Column */}
                                <div className="p-6 md:p-8 flex-1 flex flex-col justify-center bg-white">
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-semibold uppercase tracking-wider">
                                            {item.category}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${item.type === 'Online' ? 'bg-green-50 text-green-600 border border-green-100' : item.type === 'Offline' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                                            {item.type}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-[#2A3955] mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                                        {item.title}
                                    </h3>

                                    <p className="text-slate-600 text-sm mb-4">
                                        <span className="font-semibold text-slate-800">{item.speaker}</span>
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-slate-500 border-t border-slate-100 pt-4 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-slate-400" />
                                            <span>{item.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-slate-400" />
                                            <span>{item.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Column */}
                                <div className="p-6 md:w-56 flex flex-col justify-center items-center md:items-end bg-white border-t md:border-t-0 md:border-l border-slate-100 gap-3">
                                    <div className="flex flex-col items-center md:items-end w-full">
                                        <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mb-1">Status Pendaftaran</p>
                                        <span className={`text-sm font-bold ${item.status === 'Pendaftaran Buka' ? 'text-green-600' : item.status === 'Segera Hadir' ? 'text-blue-600' : 'text-slate-400'}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <button
                                        disabled={item.status !== 'Pendaftaran Buka'}
                                        className={`w-full py-2.5 px-4 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${item.status === 'Pendaftaran Buka'
                                                ? 'bg-[#2A3955] text-white hover:bg-blue-800'
                                                : item.status === 'Segera Hadir'
                                                    ? 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100'
                                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed hidden md:flex'
                                            }`}
                                    >
                                        {item.status === 'Pendaftaran Buka' ? 'Daftar' : 'Lihat Detail'}
                                        {item.status === 'Pendaftaran Buka' && <ArrowRight size={14} />}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    )
}
