'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'


import {
    GraduationCap,
    Search,
    Calendar,
    CheckCircle2,
    ArrowRight,
    ChevronRight,
    BookOpen,
    Trophy,
    Users,
    HandHelping
} from 'lucide-react'


const beasiswaData = [
    {
        id: 'Beasiswa-Cemerlang',
        title: 'Beasiswa Akademik Unggulan',
        category: 'Cemerlang',
        icon: <GraduationCap size={24} />,
        color: 'bg-blue-50 text-blue-600',
        description: 'Beasiswa penuh bagi calon mahasiswa dengan prestasi akademik luar biasa di tingkat nasional.',
        benefits: ['Bebas Biaya Kuliah 100%', 'Tunjangan Buku', 'Prioritas Program Internasional'],
        deadline: '30 Juni 2026',
        requirements: ['Nilai rata-rata rapor min. 85', 'Lulus Tes Potensi Akademik', 'Wawancara Rektor'],
    },

    {
        id: 'Beasiswa-Insanmandiri',
        title: 'Beasiswa KIPK',
        category: 'Insan Mandiri',
        icon: <BookOpen size={24} />,
        color: 'bg-emerald-50 text-emerald-600',
        description: 'Dukungan bagi penghafal Al-Qur\'an untuk melanjutkan pendidikan tinggi berkualitas.',
        benefits: ['Bebas Biaya Kuliah 100%', 'Asrama Gratis', 'Pembinaan Karakter'],
        deadline: '30 Juni 2026',
        requirements: ['Hafal min. 10 Juz', 'Lulus Tes Hafalan', 'Rekomendasi Pondok/Sekolah'],
    },
    {
        id: 'Beasiwa-Prestasi',
        title: 'Beasiswa Prestasi Olahraga',
        category: 'Prestasi',
        icon: <BookOpen size={24} />,
        color: 'bg-emerald-50 text-emerald-600',
        description: 'Dukungan bagi penghafal Al-Qur\'an untuk melanjutkan pendidikan tinggi berkualitas.',
        benefits: ['Bebas Biaya Kuliah 100%', 'Asrama Gratis', 'Pembinaan Karakter'],
        deadline: '30 Juni 2026',
        requirements: ['Hafal min. 10 Juz', 'Lulus Tes Hafalan', 'Rekomendasi Pondok/Sekolah'],
    },


]

const categories = ['Insan Mandiri', 'Cemerlang', 'Prestasi']

const fadeInUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
}

const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
}

export default function DaftarBeasiswaView() {
    const [activeCategory, setActiveCategory] = useState('Semua')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredBeasiswa = beasiswaData.filter(item => {
        const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <main className="min-h-screen bg-[#F8FAFC] font-poppins selection:bg-[#e67e22]/30">

            <section className="relative pt-40 pb-24 overflow-hidden bg-[#2A3955]">



            </section>

            <section className="sticky top-[80px] z-[40] bg-white border-b border-slate-200">
                <div className="container mx-auto px-6 md:px-20 py-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2.5 rounded-full text-[13px] font-bold whitespace-nowrap transition-all duration-300 ${activeCategory === cat
                                        ? 'bg-[#2A3955] text-white shadow-lg shadow-[#2A3955]/20'
                                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="relative group max-w-md w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#e67e22] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Cari beasiswa..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:bg-white focus:ring-4 focus:ring-[#e67e22]/10 focus:border-[#e67e22] transition-all outline-none"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-[#FDFDFD]">
                <div className="container mx-auto px-6 lg:px-12">
                    <AnimatePresence mode="wait">
                        {filteredBeasiswa.length > 0 ? (
                            <motion.div
                                key={activeCategory + searchQuery}
                                className="flex flex-col gap-8"
                                initial="hidden"
                                animate="visible"
                                variants={staggerContainer}
                            >
                                {filteredBeasiswa.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        variants={fadeInUp}
                                        className="group relative bg-white rounded-[2.5rem] border border-slate-200 hover:border-[#e67e22]/40 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500 overflow-hidden"
                                    >
                                        <div className="flex flex-col lg:flex-row items-stretch">

                                            <div className="lg:w-[22%] p-8 flex flex-col justify-between bg-slate-50/50 group-hover:bg-white border-b lg:border-b-0 lg:border-r border-slate-100 transition-colors duration-500">
                                                <div>
                                                    <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                                        {React.cloneElement(item.icon as any, { size: 32 })}
                                                    </div>
                                                    <span className="inline-block px-3 py-1 rounded-lg bg-white border border-slate-200 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-3">
                                                        {item.category}
                                                    </span>
                                                    <h3 className="text-2xl font-extrabold text-[#2A3955] leading-tight group-hover:text-[#e67e22] transition-colors">
                                                        {item.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            <div className="lg:w-[33%] p-8 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col">
                                                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                    <HandHelping size={14} className="text-[#e67e22]" /> Cakupan Beasiswa
                                                </h4>
                                                <p className="text-slate-500 text-[13px] leading-relaxed mb-6 italic">
                                                    "{item.description}"
                                                </p>
                                                <div className="space-y-3 mt-auto">
                                                    {item.benefits.map((benefit, idx) => (
                                                        <div key={idx} className="flex items-start gap-3 text-slate-700">
                                                            <CheckCircle2 size={16} className="text-[#e67e22] mt-0.5 shrink-0" />
                                                            <span className="text-[13px] font-semibold tracking-tight leading-snug">{benefit}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="lg:w-[25%] p-8 flex flex-col bg-slate-50/20 group-hover:bg-white transition-colors">
                                                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                    <Trophy size={14} className="text-[#e67e22]" /> Persyaratan Utama
                                                </h4>
                                                <ul className="space-y-4">
                                                    {item.requirements.map((req, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0 group-hover:bg-[#e67e22] transition-colors" />
                                                            <span className="text-slate-600 text-[13px] font-medium leading-relaxed">{req}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>



                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-40 bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100"
                            >
                                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search size={40} className="text-slate-200" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#2A3955]">Beasiswa Tidak Ditemukan</h3>
                                <p className="text-slate-400 mt-2">Coba sesuaikan kategori atau kata kunci pencarian Anda.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

        </main>
    )
}