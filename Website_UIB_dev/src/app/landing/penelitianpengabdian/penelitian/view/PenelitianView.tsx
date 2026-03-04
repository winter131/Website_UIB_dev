'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import {
    Microscope, Cpu, Leaf, ArrowRight,
    BookOpen, Fingerprint, Sparkles,
    Database, FileText, Globe, Search
} from 'lucide-react'

export default function PenelitianView() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const researchClusters = [
        { title: "Teknologi Digital", icon: Cpu, color: "#3b82f6", tag: "AI & IoT" },
        { title: "Sains Material", icon: Microscope, color: "#6366f1", tag: "Applied Science" },
        { title: "Green Business", icon: Leaf, color: "#10b981", tag: "Sustainability" },
        { title: "Kajian Hukum", icon: Fingerprint, color: "#e67e22", tag: "Policy" }
    ]

    return (
        <main className="min-h-screen bg-[#F8FAFC] font-poppins text-[#1e293b] selection:bg-[#1e293b] selection:text-white">
            <NavbarLanding />

            {/* HERO */}
            <section className="relative w-full h-[520px] overflow-hidden flex items-center pt-24 md:pt-36">
                <Image src="/img/gedungUIB.jpg" alt="UIB Research" fill priority className="object-cover scale-105" />

                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-black/30 z-10" />

                <div className="relative z-20 container mx-auto px-6 md:px-12 lg:px-24">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#e67e22] text-white font-bold tracking-[2px] uppercase text-[10px] mb-8 px-5 py-2 rounded-full shadow-xl shadow-orange-900/30">
                            <Sparkles size={14} /> Research Excellence
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1] text-white">
                            Menjelajahi <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
                                Masa Depan.
                            </span>
                        </h1>

                        <p className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-lg mb-10">
                            Pusat inovasi UIB mengintegrasikan riset multidisiplin untuk menciptakan solusi nyata bagi industri global.
                        </p>

                        <button className="px-8 py-4 bg-white text-[#0f172a] font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-orange-500 hover:text-white transition-all duration-500 shadow-2xl">
                            Eksplorasi Riset
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* STATS */}
            <div className="container mx-auto px-6 md:px-12 lg:px-24 -mt-16 relative z-30">
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] flex flex-wrap justify-around items-center gap-10 border border-slate-100 backdrop-blur-xl">
                    {[
                        { label: "Publikasi", value: "850+", icon: BookOpen },
                        { label: "Paten/HKI", value: "42", icon: FileText },
                        { label: "Jejaring Global", value: "120+", icon: Globe }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -6 }}
                            className="flex items-center gap-5 cursor-default"
                        >
                            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#e67e22] shadow-md">
                                <stat.icon size={26} />
                            </div>
                            <div>
                                <div className="text-3xl font-black text-[#0f172a] leading-none">{stat.value}</div>
                                <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CLUSTERS */}
            <section className="py-28 container mx-auto px-6 md:px-12 lg:px-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-black text-[#0f172a] leading-tight">Klaster Riset Unggulan</h2>
                        <p className="text-slate-400 text-sm mt-5 font-light leading-relaxed">
                            Fokus penelitian dirancang untuk menjawab kebutuhan industri global berbasis inovasi dan keberlanjutan.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {researchClusters.map((cluster, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
                        >
                            <div
                                className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-5 transition-all duration-700 group-hover:scale-[4]"
                                style={{ backgroundColor: cluster.color }}
                            />

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white transition-all duration-500 mb-8">
                                    <cluster.icon size={26} />
                                </div>

                                <h3 className="text-lg font-black mb-4 text-[#0f172a] group-hover:text-[#e67e22] transition-colors duration-500">
                                    {cluster.title}
                                </h3>

                                <p className="text-xs text-slate-400 leading-relaxed font-light mb-8">
                                    Eksplorasi proyek dan capaian inovasi di bidang {cluster.title}.
                                </p>

                                <ArrowRight className="text-slate-300 group-hover:text-[#e67e22] transition-all duration-500 group-hover:translate-x-3" size={22} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* DOCUMENT + PORTAL */}
            <section className="pb-32 container mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-2xl font-black text-[#0f172a]">Pusat Dokumen</h3>
                            <Search size={18} className="text-slate-300" />
                        </div>

                        <div className="space-y-5">
                            {[
                                "Panduan Hibah Riset Internal 2026",
                                "Template Laporan Akhir Pengabdian",
                                "SOP Pengajuan Hak Kekayaan Intelektual"
                            ].map((doc, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 6 }}
                                    className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-[#0f172a] group transition-all duration-500 cursor-pointer"
                                >
                                    <span className="text-sm font-bold text-slate-700 group-hover:text-white transition-colors">
                                        {doc}
                                    </span>
                                    <ArrowRight size={18} className="text-slate-300 group-hover:text-white transition-all duration-500" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5 bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]">
                        <Database size={42} className="text-[#e67e22] mb-8" />
                        <h3 className="text-3xl font-black mb-6 leading-tight">
                            Sistem Informasi <br /> Riset & Inovasi
                        </h3>
                        <p className="text-white/60 text-sm font-light leading-relaxed mb-10">
                            Akses portal terpadu untuk pengajuan proposal, laporan kemajuan, dan manajemen HKI dosen.
                        </p>
                        <button className="w-full py-5 bg-[#e67e22] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all duration-500 shadow-2xl shadow-orange-950/30">
                            Masuk Ke Portal
                        </button>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    )
}