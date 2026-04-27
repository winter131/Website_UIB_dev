'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'


import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

const seminarSchedules = [
    {
        id: 1,
        date: "15 Agustus 2026",
        time: "09:00 - 12:00 WIB",
        title: "Seminar Nasional Teknologi Informasi & AI",
        location: "Aula Utama UIB / Zoom",
        tag: "Teknologi"
    },
    {
        id: 2,
        date: "05 September 2026",
        time: "13:00 - 15:30 WIB",
        title: "Perkembangan Hukum Bisnis di Era Digital",
        location: "Ruang Seminar Fak. Hukum",
        tag: "Hukum"
    },
];

export default function SeminarUIB() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-white font-sans text-slate-800">

            <header className="pt-40 pb-12 bg-[#1e293b] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Image src="/img/gedungUIB.jpg" alt="UIB" fill className="object-cover" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                            Seminar & Lokakarya
                        </h1>
                        <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
                            Rangkaian agenda akademik dan pengembangan profesional di lingkungan UIB.
                        </p>
                    </div>
                </div>
            </header>

            <section className="py-12 container mx-auto px-6 lg:px-20">
                <div className="max-w-5xl mx-auto">

                    <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                        <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">Agenda Terdekat</h2>
                        <div className="hidden md:flex gap-4">
                            {['Semua', 'Teknologi', 'Bisnis'].map((cat) => (
                                <button key={cat} className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {seminarSchedules.map((item) => (
                            <div
                                key={item.id}
                                className="group p-5 bg-white border border-gray-100 rounded-lg hover:border-blue-200 hover:shadow-sm transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[10px] font-bold py-0.5 px-2 bg-blue-50 text-blue-600 rounded uppercase">
                                            {item.tag}
                                        </span>
                                        <div className="flex items-center text-slate-400 gap-1.5 text-[11px]">
                                            <Calendar size={12} />
                                            {item.date}
                                        </div>
                                    </div>

                                    <h3 className="text-base font-bold text-slate-900 mb-4 leading-snug group-hover:text-blue-700 transition-colors">
                                        {item.title}
                                    </h3>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center text-slate-500 text-xs gap-2">
                                            <Clock size={13} className="text-slate-300" />
                                            {item.time}
                                        </div>
                                        <div className="flex items-center text-slate-500 text-xs gap-2">
                                            <MapPin size={13} className="text-slate-300" />
                                            {item.location}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => router.push(`/landing/penelitianpengabdian/seminar/view/${item.id}`)}
                                    className="w-full py-2.5 rounded text-[11px] font-bold border border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center gap-2"
                                >
                                    LIHAT DETAIL
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    )
}