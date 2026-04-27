'use client'
import React from 'react'


import { motion } from 'framer-motion'
import {
    Info,
    ArrowRight
} from 'lucide-react'
import PendaftaranInfo from '@/components/landing/admisi/pendaftaran'

export default function PendaftaranView() {
    return (
        <main className="min-h-screen bg-white font-poppins selection:bg-[#e67e22] selection:text-white">




            <section className="py-40">
                <div className="container mx-auto px-6 md:px-16 max-w-6xl">
                    <div className="bg-white rounded-[40px] border border-slate-100 p-2 md:p-4">
                        <PendaftaranInfo />
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-16 p-8 bg-[#2A3955] rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#e67e22]">
                                <Info size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold uppercase text-sm tracking-tight">Butuh Bantuan Pendaftaran?</h3>
                                <p className="text-slate-400 text-xs">Tim konselor kami siap membantu proses pendaftaran Anda.</p>
                            </div>
                        </div>
                        <a
                            href="https://wa.me/628111111111"
                            className="px-8 py-3 bg-[#e67e22] text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-[#2A3955] transition-all no-underline relative z-10"
                        >
                            Hubungi Kami <ArrowRight size={14} className="inline ml-1" />
                        </a>
                    </motion.div>
                </div>
            </section>


        </main>
    )
}