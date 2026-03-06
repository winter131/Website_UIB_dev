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
    const [index, setIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const photos = ["/img/DSC06279.jpg", "/img/story2.jpg", "/img/gedungUIB.jpg", "/img/story1.jpg"];

    const nextSlide = () => setIndex((prev) => (prev + 1) % photos.length);
    const prevSlide = () => setIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(() => {
            nextSlide();
        }, 3000);
        return () => clearInterval(timer);
    }, [isHovered]);

    return (
        <div
            className="relative w-full h-full overflow-hidden rounded-xl group bg-slate-900 min-h-[250px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence mode='wait'>
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image src={photos[index]} alt="Kegiatan Pengabdian" fill className="object-cover" />
                </motion.div>
            </AnimatePresence>
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A3955]/90 via-[#2A3955]/20 to-transparent pointer-events-none" />

            {/* Navigation Arrows (visible on hover) */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-[#2A3955] text-white backdrop-blur-sm transition-all shadow-md"
                >
                    <ChevronLeft size={16} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 hover:bg-[#2A3955] text-white backdrop-blur-sm transition-all shadow-md"
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col justify-end">
                <h4 className="text-white font-bold text-lg mb-1 leading-tight transform group-hover:-translate-y-1 transition-transform cursor-default">Kilas Kegiatan</h4>
                <p className="text-white/80 text-[11px] font-medium leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all cursor-default">Pemberdayaan dan pendampingan di desa mitra</p>
                <div className="flex gap-1.5 mt-4 z-20">
                    {photos.map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                            className={`h-1.5 rounded-full transition-all duration-500 hover:bg-white/80 ${i === index ? 'w-5 bg-[#f1c40f]' : 'w-2 bg-white/30'}`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
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

                    {/* Bento Box Layout Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]">

                        {/* Large Box 1: Slider (Spans 2 cols, 2 rows) */}
                        <div className="md:col-span-2 lg:col-span-2 row-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-2 hover:shadow-lg transition-all group">
                            <MiniPhotoSlider />
                        </div>

                        {/* Box 2: Kolaborasi */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all group lg:col-span-1 row-span-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Users size={24} />
                                </div>
                                <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight size={14} />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#2A3955] text-base mb-1">Kolaborasi Pentahelix</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">Sinergi multipihak di desa mitra & pemerintah</p>
                            </div>
                        </div>

                        {/* Box 3: Inkubasi */}
                        <div className="bg-[#2A3955] p-6 rounded-2xl shadow-sm border border-[#2A3955] hover:shadow-xl hover:-translate-y-1 transition-all group lg:col-span-1 row-span-1 flex flex-col justify-between text-white relative overflow-hidden">
                            {/* Decorative glow */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#f1c40f]/20 blur-2xl rounded-full"></div>
                            <div className="flex justify-between items-start relative z-10">
                                <div className="w-12 h-12 bg-white/10 text-[#f1c40f] rounded-xl flex items-center justify-center group-hover:bg-[#f1c40f] group-hover:text-[#2A3955] transition-colors">
                                    <Lightbulb size={24} />
                                </div>
                                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight size={14} />
                                </div>
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-bold text-white text-base mb-1">Inkubasi Bisnis</h3>
                                <p className="text-xs text-blue-200 leading-relaxed">Bisnis sirkular hijau & berkelanjutan</p>
                            </div>
                        </div>

                        {/* Box 4: Pelatihan */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all group md:col-span-1 lg:col-span-1 row-span-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                                    <GraduationCap size={24} />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#2A3955] text-base mb-1">Pelatihan Vokasi</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">Kecakapan untuk kelompok rentan</p>
                            </div>
                        </div>

                        {/* Box 5: Advokasi */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all group md:col-span-1 lg:col-span-1 row-span-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                                    <Heart size={24} />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#2A3955] text-base mb-1">Sadar Hukum</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">Pendampingan dan advokasi lingkungan hidup</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    )
}