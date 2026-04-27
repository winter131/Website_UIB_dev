'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
    Map, Lightbulb, ChevronRight, ChevronLeft,
    Download, ExternalLink, BarChart3, Quote, Info
} from 'lucide-react'
import DocumentDownload from '@/components/landing/penelitianpengabdian/document'

const testimonialData = [
    {
        name: "Garuda Award 2023",
        badge: "Pencapaian Pengabdian",
        quote: "Kinerja Universitas Internasional Batam dalam bidang pengabdian mendapatkan apresiasi berupa Garuda Award untuk kategori publikasi pada acara Anugerah DIKTIRISTEK 2023.",
        currentRole: "Penghargaan Nasional",
        image: "/img/garuda.webp"
    },
    {
        name: "Klaster Utama",
        badge: "Status LPPM",
        quote: "UIB merupakan kampus di wilayah LLDIKTI wilayah X mendapatkan penghargaan DIKTIRISTEK pada tahun 2022 penghargaan ini merupakan apresiasi pelaporan kerja sama pengabdian.",
        currentRole: "Akreditasi Pengabdian",
        image: "/img/KlasterUtama.webp"
    }
];

function MiniPhotoSlider() {
    const rawPhotos = ["/img/story3.jpg", "/img/story2.jpg", "/img/gedungUIB.jpg", "/img/story1.jpg", "/img/C1700307.JPG", "/img/TE.webp"];
    const photos = [...rawPhotos, ...rawPhotos];
    const [startIndex, setStartIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const itemsToShow = 3;
    const maxIndex = rawPhotos.length;

    const nextSlide = () => setStartIndex((prev) => (prev + 1) % maxIndex);
    const prevSlide = () => setStartIndex((prev) => (prev === 0 ? maxIndex - 1 : prev - 1));

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(nextSlide, 3000);
        return () => clearInterval(timer);
    }, [isHovered, maxIndex]);

    return (
        <div
            className="relative w-full h-full overflow-hidden flex items-center bg-slate-50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="flex w-full h-full transition-transform duration-700 ease-[0.33,1,0.68,1]"
                style={{ transform: `translateX(-${startIndex * (100 / itemsToShow)}%)` }}
            >
                {photos.map((src, i) => (
                    <div key={i} className="relative flex-none w-[33.333333%] h-full overflow-hidden border-r border-white/10 group/item">
                        <Image src={src} alt={`Kegiatan ${i}`} fill className="object-cover transition-transform duration-700 group-hover/item:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover/item:translate-y-0 opacity-0 group-hover/item:opacity-100 transition-all duration-500">
                            <h4 className="text-white font-bold text-sm uppercase tracking-tight">Dokumentasi Lapangan</h4>
                            <p className="text-white/70 text-[10px]">Pemberdayaan masyarakat mitra</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <button onClick={prevSlide} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center pointer-events-auto hover:bg-white hover:text-slate-900 transition-all">
                    <ChevronLeft size={18} />
                </button>
                <button onClick={nextSlide} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center pointer-events-auto hover:bg-white hover:text-slate-900 transition-all">
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}

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
                    <Image src="/img/DSC06279.JPG" alt="Background" fill className="object-cover opacity-15" priority />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#1A253A]/70 via-[#1A253A] to-[#1A253A]" />
                </div>
                <div className="container mx-auto px-6 md:px-20 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight uppercase tracking-tight">
                            Pengabdian <br />
                            <span className="text-blue-400">Sepenuh Hati untuk Kepri.</span>
                        </h1>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                            Menghasilkan riset inovatif yang berdampak nyata bagi perkembangan industri dan penyelesaian masalah sosial ekonomi di Kepulauan Riau.
                        </p>
                        <div className="flex gap-3">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-500 transition-all flex items-center gap-2">
                                Mulai Pengabdian <ChevronRight size={14} />
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
                                <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:shadow-xl hover:shadow-slate-200/40 transition-all">
                                    <h3 className="font-bold text-sm text-[#1A253A] mb-2 uppercase tracking-tight">{pilar.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">{pilar.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#1A253A] rounded-xl p-6 text-white shadow-lg">
                            <h3 className="text-base font-bold mb-2">SIM LPPM</h3>
                            <p className="text-slate-400 text-[11px] mb-6 leading-relaxed">Kelola administrasi, pengajuan proposal hibah, hingga laporan akhir terintegrasi.</p>
                            <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
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
                                    <Image src={testimonialData[testiIndex].image} alt="Award" fill className="object-contain p-6" priority />
                                </div>
                                <div className="lg:col-span-5 p-8 md:p-10">
                                    <Quote size={32} className="text-slate-100 mb-4" />
                                    <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-2 block">
                                        {testimonialData[testiIndex].badge}
                                    </span>
                                    <h3 className="text-lg font-black text-[#1A253A] uppercase mb-4">{testimonialData[testiIndex].name}</h3>
                                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed italic mb-8 border-l-2 border-blue-100 pl-4">
                                        "{testimonialData[testiIndex].quote}"
                                    </p>
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{testimonialData[testiIndex].currentRole}</p>
                                        <div className="flex gap-2">
                                            <button onClick={prevTesti} className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50"><ChevronLeft size={16} /></button>
                                            <button onClick={nextTesti} className="w-8 h-8 rounded-full bg-[#1A253A] text-white flex items-center justify-center hover:bg-blue-600"><ChevronRight size={16} /></button>
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
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 text-blue-600 mb-2">
                            <Map size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Arah Kebijakan</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-[#1A253A] uppercase mb-4 leading-tight">Rencana Induk Pengabdian</h2>
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed">Target kami adalah mewujudkan masyarakat Kepri yang berdaya saing, mandiri, dan berkesadaran lingkungan tinggi.</p>
                    </div>

                    <div className="w-full h-[350px] md:h-[500px] rounded-[32px] overflow-hidden border border-slate-100 shadow-xl group">
                        <MiniPhotoSlider />
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button className="px-6 py-3 bg-[#1A253A] text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition-all flex items-center gap-2">
                            Unduh Dokumen RIPM <Download size={14} />
                        </button>
                    </div>
                </div>
            </section>

        </main>
    )
}