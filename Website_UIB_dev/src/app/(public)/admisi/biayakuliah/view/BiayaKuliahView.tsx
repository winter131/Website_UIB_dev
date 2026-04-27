'use client'
import React from 'react'
import { motion } from 'framer-motion'
import BiayaKuliahAdmisiInfo from '@/components/landing/admisi/biayakuliah'

export default function BiayaKuliahView() {
    return (
        <main className="min-h-screen bg-white font-poppins selection:bg-[#e67e22] selection:text-white">

            {/* Header Section */}
            <section className="pt-40 pb-12 bg-[#f8f9fa]">
                <div className="container mx-auto px-6 md:px-16 max-w-6xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-8 h-1 bg-[#e67e22] rounded-full"></span>
                            <span className="text-[#e67e22] text-[10px] font-black uppercase tracking-widest">Financial Transparency</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-[#1A253A] uppercase mb-4">Informasi <span className="text-[#e67e22]">Biaya Kuliah</span></h1>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">Rincian estimasi biaya pendidikan untuk membantu Anda merencanakan masa depan akademik di Universitas Internasional Batam.</p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section inside Premium Card */}
            <section className="py-12">
                <div className="container mx-auto px-6 md:px-16 max-w-6xl">
                    <div className="bg-white rounded-[40px] border border-slate-100 p-4 md:p-8 shadow-sm">
                        <BiayaKuliahAdmisiInfo />
                    </div>
                </div>
            </section>

        </main>
    )
}