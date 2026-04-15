'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import DocumentDownload from '@/components/landing/penelitianpengabdian/document'
import {
    Users, Map, Heart, Lightbulb,
    ChevronRight, ChevronLeft, Download, ExternalLink,
    BarChart3, Calendar, GraduationCap, Quote
} from 'lucide-react'

const testimonialData = [
    {
        name: "",
        badge: "UIB Meraih Garuda Award",
        quote: "Kinerja Universitas Internasional Batam dalam bidang penelitian mendapatkan apresiasi berupa Garuda Award untuk karegori publikasi pada acara Anugerah DIKTIRISTEK 2023.",
        currentRole: "Dosen Fakultas Ilmu Komputer",
        image: "/img/garuda.webp"
    },
    {
        name: "",
        badge: "LPPM UIB Masuk Dalam Klaster Utama",
        quote: "UIB merupakan kampus di wilayah LLDIKTI wilayah X mendapatkan penghargaan DIKTIRISTEK pada tahun 2022 penghargaan ini merupakan apresiasi pelaporan kerja sama yang sudah di laksanakan oleh UIB, penghargaan ini merupakan salah satu kontribusi kepada LLDIKTI wilayah X..",
        currentRole: "Dosen Fakultas Bisnis",
        image: "/img/KlasterUtama.webp"
    }
];

export default function PenelitianUIB() {
    const [testiIndex, setTestiIndex] = useState(0);

    const nextTesti = () => {
        setTestiIndex((prev) => (prev + 1) % testimonialData.length);
    };

    const prevTesti = () => {
        setTestiIndex((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextTesti();
        }, 30000); // 30 seconds
        return () => clearInterval(interval);
    }, [testiIndex]);

    return (
        <main className="min-h-screen bg-white font-sans text-slate-900">
            <NavbarLanding />

            {/* HEADER SECTION */}
            <header className="pt-42 pb-25 relative overflow-hidden bg-[#2A3955] shadow-[inset_0_-50px_100px_rgba(42,57,85,0.9)]">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/img/C1700307.jpg"
                        alt="Penelitian UIB Background"
                        fill
                        className="object-cover opacity-30 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2A3955] via-[#2A3955]/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A3955] via-transparent to-transparent" />
                </div>

                {/* Subtle Subtle Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none z-0 mix-blend-color-burn">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                </div>

                <div className="container mx-auto px-6 md:px-20 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-2xl">

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.1]">
                                Penelitian
                                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">untuk Kemajuan Bangsa.</p>
                            </h1>

                            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-10 max-w-xl font-light">
                                Menghasilkan riset inovatif yang berdampak nyata bagi perkembangan industri dan penyelesaian masalah sosial ekonomi di Kepulauan Riau dan global.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-3.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2 group">
                                    Mulai Penelitian <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="px-8 py-3.5 bg-white/5 border border-white/20 text-white rounded-lg text-sm font-bold hover:bg-white/10 transition-all backdrop-blur-sm">
                                    Jelajah Publikasi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            <section className="py-20 container mx-auto px-6 md:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT: CONTENT (8 Columns) */}
                    <div className="lg:col-span-8 space-y-12">
                        <div>
                            <div className="flex items-center gap-2 mb-2 text-[#2A3955]">
                                <BarChart3 size={18} />
                                <span className="font-bold text-xs uppercase tracking-[2px]">Fokus Bidang</span>
                            </div>
                            <h2 className="text-2xl font-black text-slate-800">Ruang Lingkup Pengabdian</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: 'Pemberdayaan UMKM', desc: 'Transformasi bisnis lokal melalui manajemen modern.' },
                                { title: 'Literasi Pendidikan', desc: 'Peningkatan kualitas edukasi bagi kelompok marginal.' },
                                { title: 'Teknologi Inklusif', desc: 'Digitalisasi layanan publik di tingkat desa.' },
                                { title: 'Kelestarian Lingkungan', desc: 'Manajemen sampah dan energi terbarukan komunitas.' },

                            ].map((pilar, i) => (
                                <div key={i} className="group p-6 bg-slate-100 border border-slate-100 rounded-xl hover:bg-white hover:border-[#2A3955] hover:shadow-xl hover:shadow-[#2A3955]/5 transition-all duration-300">
                                    <h3 className="font-bold text-[#2A3955] mb-2 group-hover:text-blue-600">{pilar.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{pilar.desc}</p>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer group-hover:text-[#2A3955]">
                                        Detail Program <ChevronRight size={14} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* RIGHT: SIDEBAR (4 Columns) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* PORTAL LOGIN */}
                        <div className="bg-[#2A3955] rounded-xl p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <ExternalLink size={60} />
                            </div>
                            <h3 className="text-lg font-bold mb-3 relative z-10">Portal SIM LPPM</h3>
                            <p className="text-slate-300 text-xs mb-6 relative z-10">Kelola administrasi, pengajuan proposal, hingga laporan akhir dalam satu dashboard terintegrasi.</p>
                            <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-md text-[10px] font-black uppercase tracking-widest transition-all relative z-10">
                                Masuk ke Portal
                            </button>
                        </div>

                        <DocumentDownload />
                    </div>

                </div>
            </section>
            {/* SECTION: RENCANA INDUK PENELITIAN */}
            <section className="py-24 relative overflow-hidden bg-[#2A3955]">
                {/* Background Details - Modern Dot Pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 2px, transparent 0)', backgroundSize: '32px 32px' }} />
                </div>
                {/* Large decorative icon/shape on the right */}
                <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
                    <Lightbulb size={600} className="text-white" />
                </div>

                <div className="container mx-auto px-6 md:px-20 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Text Content */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                                <Map size={14} className="text-[#f1c40f]" /> Arah Kebijakan
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                                Rencana Induk Penelitian <br />
                                <span className="text-[#f1c40f]">(RIP) 2026-2030</span>
                            </h2>
                            <div className="w-20 h-1.5 bg-blue-500 rounded-full mb-8"></div>

                            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 font-light">
                                Rencana Induk Penelitian (RIP) UIB dirancang sebagai pedoman utama arah riset di lingkungan kampus. RIP ini mensinergikan potensi akademik dengan kebutuhan nyata industri dan masyarakat luas, berfokus pada inovasi yang berkelanjutan.
                            </p>
                            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-10 font-light">
                                Kami berkomitmen mengutamakan riset terapan yang mampu memberikan solusi strategis dalam pengembangan ekonomi daerah Kepulauan Riau serta berkontribusi di kancah global.
                            </p>

                            <button className="px-6 py-3 bg-white text-[#2A3955] rounded-md text-sm font-bold hover:bg-slate-100 transition-all shadow-xl flex items-center gap-2 group">
                                Unduh RIP Lengkap <Download size={16} className="group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>

                        {/* Graphic / Highlight Card */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-lg"></div>
                            <div className="bg-white rounded-3xl p-10 relative shadow-2xl border border-slate-100">
                                <div className="w-16 h-16 bg-[#f1c40f]/20 text-[#f1c40f] rounded-2xl flex items-center justify-center mb-8">
                                    <BarChart3 size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-[#2A3955] mb-4">4 Pilar Fokus Riset</h3>
                                <ul className="space-y-4">
                                    {[
                                        'Inovasi Teknologi & Digitalisasi',
                                        'Pengembangan Ekonomi & Bisnis Berkelanjutan',
                                        'Pemberdayaan Hukum & Masyarakat',
                                        'Infrastruktur & Rekayasa Lingkungan'
                                    ].map((pilar, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <ChevronRight size={14} className="text-blue-600" />
                                            </div>
                                            <span className="text-slate-600 text-sm font-medium">{pilar}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* SECTION 1: SLIDER TESTIMONI UTAMA */}
            <section className="py-20 bg-[#e9e9e9] border-b border-gray-100">
                <div className="container mx-auto px-6 md:px-20 relative">
                    <div className="relative max-w-6xl mx-auto">
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={testiIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="grid grid-cols-1 lg:grid-cols-12 items-center border-gray-100 border-gray-700 "
                            >
                                <div className="lg:col-span-7 relative h-[400px] md:h-[450px] w-full">
                                    <Image src={testimonialData[testiIndex].image} alt={testimonialData[testiIndex].name} fill className="object-cover" priority />
                                </div>
                                <div className="lg:col-span-5 relative z-10">
                                    <div className="bg-white p-8 md:p-12 lg:-ml-24 shadow-sm border border-gray-50 relative">
                                        <Quote size={40} className="text-gray-100 mb-6" />
                                        <h3 className="text-[#1a365d] text-2xl font-bold mb-1">{testimonialData[testiIndex].name}</h3>
                                        <p className="text-gray-500 text-xs mb-6 uppercase tracking-widest">{testimonialData[testiIndex].badge}</p>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-6 text-justify italic">
                                            "{testimonialData[testiIndex].quote}"
                                        </p>
                                        <p className="text-[#1a365d] text-[11px] font-bold border-t border-gray-100 pt-4 uppercase tracking-tight">
                                            {testimonialData[testiIndex].currentRole}
                                        </p>

                                        {/* Navigation Arrows */}
                                        <div className="absolute -bottom-6 right-8 flex gap-2">
                                            <button
                                                onClick={prevTesti}
                                                className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded-full shadow-sm text-gray-400 hover:text-[#1a365d] hover:border-[#1a365d] transition-colors"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button
                                                onClick={nextTesti}
                                                className="w-12 h-12 flex items-center justify-center bg-[#1a365d] rounded-full shadow-md text-white hover:bg-[#e67e22] transition-colors"
                                            >
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
            <Footer />
        </main >
    )
}