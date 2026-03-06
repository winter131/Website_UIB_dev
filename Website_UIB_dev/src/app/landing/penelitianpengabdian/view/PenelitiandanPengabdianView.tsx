'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FileDown, Award, Search, BookOpen, Eye,
    TrendingUp, Users, Newspaper, ChevronRight,
    Database, ArrowUpRight, GraduationCap, Sparkles, Calendar,
    PlayCircle
} from 'lucide-react'

const heroData = {
    image: "/img/C1700307.jpg",
    title: "Penelitian dan Pengabdian",
    desc: "Mendorong inovasi melalui riset unggulan dan kontribusi nyata kepada masyarakat untuk masa depan yang lebih baik."
};

const researchNews = [
    { title: "Dosen UIB Raih Hibah Penelitian Internasional 2026", date: "12 Februari 2026", img: "/img/DSC06279.jpg" },
    { title: "Workshop Penulisan Jurnal Scopus Q1 Berstandar Global", date: "10 Februari 2026", img: "/img/story2.jpg" },
    { title: "Pengabdian Masyarakat: Digitalisasi UMKM di Batam", date: "08 Februari 2026", img: "/img/gedungUIB.jpg" },
    { title: "Kolaborasi Riset Maritim dengan National University", date: "05 Februari 2026", img: "/img/C1700307.jpg" }
];

interface ModernLinkProps {
    text: string;
    href: string;
    light?: boolean;
}

/**
 * Komponen ModernLink: Versi lebih ringkas dengan animasi ultra-smooth.
 * Menggunakan cubic-bezier untuk efek pergerakan yang lebih organik.
 */
const ModernLink = ({ text, href, light = false }: ModernLinkProps) => (
    <Link href={href} className="group relative inline-flex flex-col items-start pt-3 w-fit cursor-pointer">
        <div className={`flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider transition-transform duration-300 ease-out group-hover:translate-x-2 ${light ? 'text-white' : 'text-[#2A3955]'}`}>
            {text}
            <ChevronRight size={16} className="transition-transform duration-300 ease-out" />
        </div>

        {/* Underline: Memanjang secara proporsional sesuai keinginan Anda, ditambah trik will-change agar smooth */}
        <div className="mt-1 h-[2px] bg-[#f1c40f] rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-[width] w-10 group-hover:w-[calc(100%+12px)]" />
    </Link>
)

export default function PenelitiandanPengabdianView() {
    const [activeTab, setActiveTab] = useState('penelitian')

    return (
        <main className="min-h-screen bg-[#FDFDFD] font-poppins selection:bg-[#2A3955] selection:text-white">
            <NavbarLanding />

            {/* HERO SECTION */}
            <section className="relative w-full h-[350px] md:h-[650px] overflow-hidden flex items-center">
                <Image src={heroData.image} alt="UIB Hero" fill priority className="object-cover" objectPosition="center 10%" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A253A]/90 via-[#1A253A]/60 to-transparent z-10"></div>
                <div className="relative z-20 container mx-auto px-6 md:px-12 lg:px-24">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl text-white">
                        <div className="inline-flex items-center gap-2 bg-[#e67e22] text-white font-bold tracking-[2px] uppercase text-[10px] mb-4 px-4 py-1.5 rounded-lg">
                            <Sparkles size={14} /> Research & Innovation
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">{heroData.title}</h1>
                        <p className="text-white/70 text-sm md:text-lg max-w-xl font-light">{heroData.desc}</p>
                    </motion.div>
                </div>
            </section>

            {/* QUICK STATS BAR */}
            <section className="relative z-30 -mt-10 px-6 md:px-12 lg:px-24">
                <div className="bg-[#2A3955] rounded-[2rem] p-8 shadow-2xl border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                    {[
                        { label: "Total Penelitian", value: "240+", icon: BookOpen },
                        { label: "Pengabdian", value: "115+", icon: Users },
                        { label: "Publikasi Sinta", value: "85+", icon: Award }
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-4 border-r border-white/10 last:border-0">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#e67e22]">
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-black">{stat.value}</div>
                                <div className="text-[10px] uppercase tracking-widest font-bold text-white/40">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* INTRO SECTION */}
            <section className="py-20 bg-white border-b border-gray-100">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <h2 className="text-3xl font-black text-[#1a365d] mb-4">Mendorong Inovasi & Kontribusi Nyata</h2>
                    <div className="w-16 h-1.5 bg-[#e67e22] rounded-full mb-12"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 text-gray-500 text-justify leading-relaxed font-light">
                        <p>Universitas Internasional Batam berkomitmen untuk memajukan ilmu pengetahuan melalui ekosistem **Penelitian** yang berorientasi pada inovasi dan solusi industri. Kami mendorong sivitas akademika untuk menghasilkan publikasi ilmiah berkualitas yang diakui di tingkat nasional maupun internasional.</p>
                        <p>Melalui program **Pengabdian kepada Masyarakat**, UIB berupaya mentransformasikan hasil-hasil riset menjadi manfaat praktis bagi warga Kepulauan Riau. Fokus kami adalah pemberdayaan masyarakat, digitalisasi UMKM, dan penyelesaian masalah sosial ekonomi secara berkelanjutan.</p>
                    </div>
                </div>
            </section>

            {/* NEWS SECTION */}
            <section className="py-20 bg-[#FDFDFD]">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h3 className="text-2xl font-black text-[#2A3955] mb-2 uppercase tracking-tight">Berita & Publikasi</h3>
                            <div className="w-12 h-1 bg-[#e67e22]"></div>
                        </div>
                        <Link href="/landing" className="text-xs font-bold text-[#2A3955] hover:text-[#e67e22] flex items-center gap-1 transition-colors uppercase tracking-widest">
                            Lihat Semua <ChevronRight size={16} />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {researchNews.map((news, i) => (
                            <Link href="#" key={i} className="group block h-full">
                                <motion.div whileHover={{ y: -5 }} className="bg-white h-full rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-50 transition-all duration-500 hover:bg-[#2A3955]">
                                    <div className="aspect-[4/3] overflow-hidden relative">
                                        <Image src={news.img} alt={news.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="p-6 transition-colors duration-500">
                                        <div className="flex items-center gap-2 text-[#0055aa] group-hover:text-[#e67e22] text-[10px] font-bold mb-3 transition-colors uppercase"><Calendar size={12} /> {news.date}</div>
                                        <h4 className="text-sm font-bold text-[#2A3955] group-hover:text-white leading-snug transition-colors line-clamp-2">{news.title}</h4>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROGRAM & LAYANAN UNGGULAN (BENTO GRID) */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="mb-10 text-center">
                        <h2 className="text-2xl md:text-3xl font-black text-[#1a365d] mb-3">Program & Layanan Unggulan</h2>
                        <div className="w-16 h-1.5 bg-[#e67e22] mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1: Sosialisasi */}
                        <div className="md:col-span-2 relative bg-[#0055aa] rounded-2xl p-8 md:p-10 text-white overflow-hidden flex flex-col justify-end min-h-[350px] shadow-lg border border-white/10 group">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                            <div className="absolute -top-6 -right-6 opacity-10 transition-transform duration-1000 group-hover:scale-105"><PlayCircle size={220} /></div>
                            <div className="relative z-10 w-full md:w-3/4">
                                <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20"><PlayCircle size={24} /></div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">Sosialisasi dan Workshop</h3>
                                <p className="text-[13px] text-white/80 mb-6 leading-relaxed">Rekaman video sosialisasi dan kegiatan workshop penelitian tahun 2026/2027.</p>
                                <ModernLink text="Pelajari Lebih Lanjut" href="/sosialisasi" light={true} />
                            </div>
                        </div>

                        {/* Card 2: EQUITY */}
                        <div className="md:col-span-1 relative bg-white rounded-2xl p-8 text-[#2A3955] flex flex-col justify-end min-h-[350px] border border-slate-100 shadow-md group overflow-hidden">
                            <div className="absolute -top-6 -right-6 opacity-[0.03] text-[#0055aa] transition-transform duration-1000 group-hover:scale-105"><BookOpen size={150} /></div>
                            <div className="relative z-10">
                                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-[#0055aa] border border-blue-100"><BookOpen size={24} /></div>
                                <h3 className="text-xl font-bold mb-3 leading-tight">Program EQUITY</h3>
                                <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">Enhancing Quality Education for International Impacts 2025.</p>
                                <ModernLink text="Pelajari Lebih Lanjut" href="/equity" />
                            </div>
                        </div>

                        {/* Card 3: Panduan */}
                        <div className="md:col-span-1 relative bg-[#1a365d] rounded-2xl p-8 text-white flex flex-col justify-end min-h-[350px] shadow-lg border border-white/10 group overflow-hidden">
                            <div className="absolute -top-6 -right-6 opacity-10 transition-transform duration-1000 group-hover:scale-105"><GraduationCap size={150} /></div>
                            <div className="relative z-10">
                                <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20 text-[#f1c40f]"><GraduationCap size={24} /></div>
                                <h3 className="text-xl font-bold mb-3 leading-tight">Panduan 2026</h3>
                                <p className="text-[13px] text-white/60 mb-6 leading-relaxed">Panduan resmi penelitian dan publikasi Direktorat Penelitian UIB.</p>
                                <ModernLink text="Pelajari Lebih Lanjut" href="/panduan" light={true} />
                            </div>
                        </div>

                        {/* Card 4: Klinik */}
                        <div className="md:col-span-2 relative bg-gradient-to-br from-[#e67e22] to-[#d35400] rounded-2xl p-8 md:p-10 text-white overflow-hidden flex flex-col justify-end min-h-[350px] shadow-lg group">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                            <div className="absolute -bottom-10 -right-10 opacity-10 transition-transform duration-1000 group-hover:-translate-y-4"><TrendingUp size={250} /></div>
                            <div className="relative z-10 w-full md:w-3/4">
                                <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20"><TrendingUp size={24} /></div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">Klinik Publikasi</h3>
                                <p className="text-[13px] text-white/80 mb-6 leading-relaxed">Layanan pendampingan penulisan artikel ilmiah hingga sukses submit jurnal bereputasi.</p>
                                <ModernLink text="Pelajari Lebih Lanjut" href="/klinik" light={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}