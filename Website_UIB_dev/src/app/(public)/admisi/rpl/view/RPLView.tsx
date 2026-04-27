'use client'
import React from 'react'


import { motion } from 'framer-motion'
import { Info, ArrowRight } from 'lucide-react'
import RPLInfo from '@/components/landing/admisi/rpl'

export default function RPLView() {
    return (
        <main className="min-h-screen bg-white font-poppins selection:bg-[#e67e22] selection:text-white">

            <section className="pt-40 pb-12 bg-[#f8f9fa]">
                <div className="container mx-auto px-6 md:px-16 max-w-6xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-8 h-1 bg-[#e67e22] rounded-full"></span>
                            <span className="text-[#e67e22] text-[10px] font-black uppercase tracking-widest">Jalur Alternatif</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-[#1A253A] uppercase mb-4">Program <span className="text-[#e67e22]">RPL</span></h1>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">Rekognisi Pembelajaran Lampau - Ubah pengalaman kerja Anda menjadi kredit akademik (SKS).</p>
                    </motion.div>
                </div>
            </section>
            <section className="py-12">
                <div className="container mx-auto px-6 md:px-16 max-w-6xl">
                    <div className="bg-white rounded-[40px] border border-slate-100 p-2 md:p-4">
                        <RPLInfo />
                    </div>
                </div>
            </section>

        </main>
    )
}