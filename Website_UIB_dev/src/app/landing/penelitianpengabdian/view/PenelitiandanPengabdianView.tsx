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
    Database, ArrowUpRight, GraduationCap, Sparkles
} from 'lucide-react'

const heroData = {
    image: "/img/C1700307.jpg",
    title: "Penelitian dan Pengabdian",
    desc: "Mendorong inovasi melalui riset unggulan dan kontribusi nyata kepada masyarakat untuk masa depan yang lebih baik."
};



export default function PenelitiandanPengabdianView() {
    const [activeTab, setActiveTab] = useState('penelitian')

    return (
        <main className="min-h-screen bg-[#FDFDFD] font-poppins selection:bg-[#2A3955] selection:text-white">
            <NavbarLanding />

            {/* HERO SECTION - COMPACT & CLEAN */}
            <section className="relative w-full h-[350px] md:h-[650px] overflow-hidden flex items-center">
                <Image src={heroData.image} alt="UIB Hero" fill priority className="object-cover" objectPosition="center 30%" />
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

            {/* MAIN CONTENT AREA */}
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* KIRI: Daftar Proyek (8 Kolom) */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                                <div className="p-8 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
                                    <div className="flex p-1 bg-slate-200/50 rounded-2xl">
                                        {['penelitian', 'pengabdian'].map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`px-8 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${activeTab === tab ? 'bg-[#2A3955] text-white shadow-lg' : 'text-slate-500 hover:text-[#2A3955]'}`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="relative hidden md:block">
                                        <Search className="absolute left-4 top-3 text-slate-300" size={16} />
                                        <input type="text" placeholder="Cari judul..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#2A3955]/10" />
                                    </div>
                                </div>

                                <div className="p-4 md:p-8">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-start gap-6 p-6 hover:bg-slate-50 rounded-3xl transition-all group border-b border-slate-50 last:border-0">
                                            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#2A3955] group-hover:text-white transition-all duration-500">
                                                <Database size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-[10px] font-black text-[#e67e22] uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded">Hibah 2026</span>
                                                    <span className="text-[10px] text-slate-400 font-medium italic">Selesai • Mar 2026</span>
                                                </div>
                                                <h4 className="text-base font-bold text-[#2A3955] leading-snug mb-2 group-hover:text-[#e67e22] transition-colors line-clamp-2">
                                                    Optimasi Arsitektur YOLOv11 dengan Space-to-Depth (SPD-Conv) Module untuk Objek Kecil
                                                </h4>
                                                <p className="text-xs text-slate-500 font-medium">Oleh: Dr. Jaya Ridho Nugroho, S.T., M.T.</p>
                                            </div>
                                            <button className="self-center p-3 bg-slate-100 rounded-full text-[#2A3955] hover:bg-[#2A3955] hover:text-white transition-all">
                                                <ArrowUpRight size={20} />
                                            </button>
                                        </div>
                                    ))}
                                    <div className="mt-8 text-center">
                                        <button className="text-xs font-black uppercase tracking-widest text-[#2A3955] hover:text-[#e67e22] transition-colors border-b-2 border-slate-100 hover:border-[#e67e22] pb-1">
                                            Lihat Arsip Selengkapnya
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* KANAN: Sidebar (4 Kolom) */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* PUSAT DOKUMEN */}
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
                                <h3 className="text-sm font-black text-[#2A3955] uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <FileDown className="text-[#e67e22]" size={18} /> Pusat Dokumen
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { title: "Panduan Hibah Internal", size: "2.4MB" },
                                        { title: "Template Laporan Akhir", size: "1.1MB" },
                                        { title: "SOP Pengabdian", size: "850KB" }
                                    ].map((doc, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer group">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-700 group-hover:text-[#2A3955] transition-colors">{doc.title}</span>
                                                <span className="text-[9px] text-slate-400 font-medium uppercase tracking-tighter">PDF • {doc.size}</span>
                                            </div>
                                            <FileDown size={18} className="text-slate-300 group-hover:text-[#e67e22] transition-all" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* PORTAL LINK */}
                            <div className="bg-[#2A3955] rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                                <div className="relative z-10">
                                    <TrendingUp className="text-[#e67e22] mb-4" size={32} />
                                    <h3 className="text-xl font-black mb-2">Sinta Score</h3>
                                    <p className="text-white/60 text-[11px] leading-relaxed mb-6 font-light">Monitor kinerja penelitian dan publikasi jurnal melalui portal resmi Sinta Ristekdikti.</p>
                                    <button className="w-full py-3 bg-white text-[#2A3955] rounded-xl font-bold text-xs hover:bg-[#e67e22] hover:text-white transition-all">
                                        Buka Portal Sinta
                                    </button>
                                </div>
                                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}