'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
    Map, Lightbulb, ChevronRight, ChevronLeft,
    Download, ExternalLink, BarChart3, Quote
} from 'lucide-react'
import DocumentDownload from '@/components/landing/penelitianpengabdian/document'

const testimonialData = [
    {
        name: "Garuda Award 2023",
        badge: "Pencapaian Publikasi",
        quote: "Kinerja Universitas Internasional Batam dalam bidang penelitian mendapatkan apresiasi berupa Garuda Award untuk karegori publikasi pada acara Anugerah DIKTIRISTEK 2023.",
        currentRole: "Penghargaan Nasional",
        image: "/img/garuda.webp"
    },
    {
        name: "Klaster Utama",
        badge: "Status LPPM",
        quote: "UIB merupakan kampus di wilayah LLDIKTI wilayah X mendapatkan penghargaan DIKTIRISTEK pada tahun 2022 penghargaan ini merupakan apresiasi pelaporan kerja sama yang sudah di laksanakan oleh UIB.",
        currentRole: "Akreditasi Penelitian",
        image: "/img/KlasterUtama.webp"
    }
];

export default function PenelitianUIB() {
    const [testiIndex, setTestiIndex] = useState(0);

    const nextTesti = () => setTestiIndex((prev) => (prev + 1) % testimonialData.length);
    const prevTesti = () => setTestiIndex((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1));

    useEffect(() => {
        const interval = setInterval(nextTesti, 30000);
        return () => clearInterval(interval);
    }, [testiIndex]);

    return (
        <main className="min-h-screen bg-white font-sans text-slate-900">

            <header className="relative pt-50 pb-24 bg-[#1A253A] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/img/C1700307.JPG"
                        alt="Background"
                        fill
                        className="object-cover opacity-15"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1A253A]/70 via-[#1A253A] to-[#1A253A]" />
                </div>

                <div className="container mx-auto px-6 md:px-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight uppercase tracking-tight">
                            Penelitian <br />
                            <span className="text-blue-400">untuk Kemajuan Bangsa.</span>
                        </h1>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl font-normal">
                            Menghasilkan riset inovatif yang berdampak nyata bagi perkembangan industri dan penyelesaian masalah sosial ekonomi di Kepulauan Riau dan global.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-500 transition-all flex items-center gap-2 group">
                                Mulai Penelitian <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg text-xs font-bold hover:bg-white hover:text-[#1A253A] transition-all">
                                Jelajah Publikasi
                            </button>
                        </div>
                    </motion.div>
                </div>
            </header>

            <section className="py-20 container mx-auto px-6 md:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8">
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 text-blue-600 mb-2">
                                <BarChart3 size={16} />
                                <span className="font-bold text-[10px] uppercase tracking-widest">Fokus Bidang</span>
                            </div>
                            <h2 className="text-xl font-black text-slate-800 uppercase">Ruang Lingkup Pengabdian</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { title: 'Pemberdayaan UMKM', desc: 'Transformasi bisnis lokal melalui manajemen modern.' },
                                { title: 'Literasi Pendidikan', desc: 'Peningkatan kualitas edukasi bagi kelompok marginal.' },
                                { title: 'Teknologi Inklusif', desc: 'Digitalisasi layanan publik di tingkat desa.' },
                                { title: 'Kelestarian Lingkungan', desc: 'Manajemen sampah dan energi terbarukan komunitas.' },
                            ].map((pilar, i) => (
                                <div key={i} className="group p-6 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300">
                                    <h3 className="font-bold text-sm text-[#1A253A] mb-2 group-hover:text-blue-600 uppercase tracking-tight">{pilar.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">{pilar.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#1A253A] rounded-xl p-6 text-white shadow-lg shadow-blue-900/10">
                            <h3 className="text-base font-bold mb-2">Portal SIM LPPM</h3>
                            <p className="text-slate-400 text-[11px] mb-6 leading-relaxed">Kelola administrasi, pengajuan proposal, hingga laporan akhir dalam satu dashboard terintegrasi.</p>
                            <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                                Masuk ke Portal
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="max-w-6xl mx-auto">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={testiIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 lg:grid-cols-12 items-center bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm"
                            >
                                <div className="lg:col-span-7 relative aspect-video lg:aspect-auto lg:h-[450px] bg-slate-100">
                                    <Image
                                        src={testimonialData[testiIndex].image}
                                        alt="Pencapaian"
                                        fill
                                        className="object-contain p-6"
                                        priority
                                    />
                                </div>

                                <div className="lg:col-span-5 p-8 md:p-10">
                                    <Quote size={32} className="text-slate-100 mb-4" />
                                    <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-3 block">
                                        {testimonialData[testiIndex].badge}
                                    </span>
                                    <h3 className="text-lg font-black text-[#1A253A] uppercase mb-4 tracking-tight">
                                        {testimonialData[testiIndex].name}
                                    </h3>
                                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed italic mb-8 border-l-2 border-blue-100 pl-4">
                                        "{testimonialData[testiIndex].quote}"
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            {testimonialData[testiIndex].currentRole}
                                        </p>
                                        <div className="flex gap-2">
                                            <button onClick={prevTesti} className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-all text-slate-400">
                                                <ChevronLeft size={16} />
                                            </button>
                                            <button onClick={nextTesti} className="w-8 h-8 rounded-full bg-[#1A253A] text-white flex items-center justify-center hover:bg-blue-600 transition-all">
                                                <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="bg-[#1A253A] rounded-3xl p-10 md:p-14 relative overflow-hidden shadow-xl border border-white/5">
                        <div className="absolute -right-16 -bottom-16 opacity-[0.03] pointer-events-none text-white">
                            <Lightbulb size={350} />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                                    <Map size={12} /> Arah Kebijakan
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black text-white mb-6 leading-tight uppercase">
                                    Rencana Induk Penelitian <br />
                                    <span className="text-blue-400">(RIP) 2026-2030</span>
                                </h2>
                                <div className="space-y-4 text-slate-400 text-xs md:text-sm leading-relaxed mb-8">
                                    <p>Rencana Induk Penelitian (RIP) UIB dirancang sebagai pedoman utama arah riset di lingkungan kampus, mensinergikan potensi akademik dengan kebutuhan nyata industri.</p>
                                </div>
                                <button className="px-6 py-3 bg-white text-[#1A253A] rounded-lg text-xs font-bold hover:bg-blue-400 hover:text-white transition-all shadow-lg flex items-center gap-2">
                                    Unduh RIP Lengkap <Download size={14} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    'Inovasi Teknologi & Digitalisasi',
                                    'Ekonomi & Bisnis Berkelanjutan',
                                    'Pemberdayaan Hukum & Masyarakat',
                                    'Infrastruktur & Rekayasa Lingkungan'
                                ].map((pilar, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-xl">
                                        <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center">
                                            <ChevronRight size={12} className="text-blue-400" />
                                        </div>
                                        <span className="text-slate-300 text-xs font-bold uppercase tracking-wide">{pilar}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}