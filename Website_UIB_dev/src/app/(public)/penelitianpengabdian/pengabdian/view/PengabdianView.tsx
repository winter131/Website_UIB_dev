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

function MiniPhotoSlider() {
    const rawPhotos = ["/img/story3.jpg", "/img/story2.jpg", "/img/gedungUIB.jpg", "/img/story1.jpg", "/img/C1700307.JPG", "/img/TE.webp"];
    // Clone array to allow infinite-like feeling or enough items to slide
    const photos = [...rawPhotos, ...rawPhotos];

    const [startIndex, setStartIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Number of items to show at once
    const itemsToShow = 3;
    const maxIndex = rawPhotos.length; // Slide by raw physical length

    const nextSlide = () => {
        setStartIndex((prev) => (prev + 1) % maxIndex);
    };

    const prevSlide = () => {
        setStartIndex((prev) => (prev === 0 ? maxIndex - 1 : prev - 1));
    };

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(timer);
    }, [isHovered, maxIndex]);

    return (
        <div
            className="relative w-full h-full overflow-hidden flex items-center bg-[#2A3955]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            {/* Carousel Track Edge-to-Edge */}
            <div
                className="flex w-full h-full transition-transform duration-700 ease-[0.33,1,0.68,1]"
                style={{ transform: `translateX(-${startIndex * (100 / itemsToShow)}%)` }}
            >
                {photos.map((src, i) => (
                    <div
                        key={i}
                        className="relative flex-none w-[33.333333%] h-full overflow-hidden group/item cursor-pointer border-r border-[#2A3955]"
                    >
                        <Image src={src} alt={`Kegiatan Pengabdian ${i}`} fill className="object-cover transition-transform duration-700 group-hover/item:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2A3955]/80 via-transparent to-transparent pointer-events-none opacity-80" />

                        {/* Hover Overlay Text */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-8 group-hover/item:translate-y-0 opacity-0 group-hover/item:opacity-100 transition-all duration-500">
                            <div className="w-8 h-1 bg-[#f1c40f] rounded-full mb-3" />
                            <h4 className="text-white font-bold text-lg leading-tight mb-1 shadow-black">Dokumentasi Lapangan</h4>
                            <p className="text-white/80 text-xs">Pemberdayaan dan pendampingan di desa mitra</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows (visible on hover) */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-[#2A3955] hover:text-white text-[#2A3955] backdrop-blur-sm transition-all shadow-xl border border-slate-100 pointer-events-auto active:scale-95"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 hover:bg-[#2A3955] hover:text-white text-[#2A3955] backdrop-blur-sm transition-all shadow-xl border border-slate-100 pointer-events-auto active:scale-95"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
                {rawPhotos.map((_, i) => (
                    <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setStartIndex(i); }}
                        className={`h-2 rounded-full transition-all duration-500 ${i === startIndex ? 'w-8 bg-[#f1c40f] shadow-sm' : 'w-2 bg-slate-300 hover:bg-[#2A3955]/50'}`}
                        aria-label={`Go to group ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

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
                        src="/img/DSC06279.jpg"
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
                                Pengabdian
                                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white ">Sepenuh Hati untuk Kepri</p>
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
                            <h3 className="text-lg font-bold mb-3 relative z-10">SIM LPPM</h3>
                            <p className="text-slate-300 text-xs mb-6 relative z-10">Kelola administrasi, pengajuan proposal hibah, hingga laporan akhir dalam satu dashboard terintegrasi.</p>
                            <button className="w-full py-3 bg-white text-[#2A3955] hover:bg-slate-100 rounded-md text-[10px] font-black uppercase tracking-widest transition-all relative z-10">
                                Masuk ke Portal
                            </button>
                        </div>

                        <DocumentDownload />
                    </div>

                </div>
            </section>

            {/* SECTION: RENCANA INDUK PENGABDIAN (REDESIGN) */}
            <section className="py-24 relative bg-slate-50 overflow-hidden">
                {/* Top/Bottom subtle borders */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* Decorative background circle */}
                <div className="absolute -left-40 -top-40 w-96 h-96 bg-blue-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
                <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-[#f1c40f]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />

                <div className="container mx-auto px-6 md:px-20 relative z-10">
                    {/* Header/Title Centered */}
                    <div className="text-center max-w-3xl mx-auto mb-16">

                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#2A3955] mb-6 leading-tight">
                            Rencana Induk Pengabdian <br />

                        </h2>
                        <div className="w-24 h-1.5 bg-[#f1c40f] mx-auto rounded-full mb-8"></div>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 text-justify">
                            Rencana Induk Pengabdian kepada Masyarakat (RIPM) merumuskan sinergi akademik untuk menyelesaikan persoalan sosial yang riil. Target kami adalah mewujudkan masyarakat Kepri yang berdaya saing, mandiri, dan berkesadaran lingkungan tinggi.
                        </p>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 text-justify">
                            Pilar pengabdian difokuskan pada pengentasan kemiskinan ekstrem, pemberdayaan ekonomi sirkular pada pesisir laut, hingga pendampingan hukum komprehensif bagi anak dan perempuan.
                        </p>

                    </div>
                </div>

                {/* Full-width Carousel Area */}
                <div className="w-full mt-16 h-[300px] md:h-[450px] shadow-2xl relative overflow-hidden group">
                    <MiniPhotoSlider />
                </div>
            </section >
            <Footer />
        </main >
    )
}