'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Building2, Map } from 'lucide-react'

// --- DATA FASILITAS ---
const fasilitasUIB = [
    { id: 1, name: 'Perpustakaan' },
    { id: 2, name: 'Musholla' },
    { id: 3, name: 'Taman' },
    { id: 4, name: 'Klinik' },
    { id: 5, name: 'Asrama' }
]

export default function FasilitasView() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-20">

                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* --- BAGIAN KIRI: GAMBAR KAMPUS --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group">
                            <img
                                src="/path-to-your-image/uib-building.jpg"
                                alt="Gedung UIB"
                                className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2A3955]/40 to-transparent" />
                        </div>

                        {/* Dekorasi Aksen */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#e67e22] rounded-3xl -z-10 hidden md:block" />
                    </motion.div>

                    {/* --- BAGIAN KANAN: LIST FASILITAS --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <div className="mb-10">
                            <h2 className="text-3xl md:text-4xl font-black text-[#2A3955] mb-4 flex items-center gap-3">
                                Fasilitas Umum
                            </h2>
                            <div className="w-16 h-1.5 bg-[#2A3955] rounded-full mb-6" />
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Berbagai fasilitas yang dapat diakses oleh masyarakat yang ingin lebih mengenal kehidupan Kampus UIB.
                            </p>
                        </div>

                        {/* List Accordion-style */}
                        <div className="space-y-3">
                            {fasilitasUIB.map((item) => (
                                <motion.div
                                    key={item.id}
                                    whileHover={{ x: 10 }}
                                    className="group flex items-center justify-between p-5 bg-[#e67e22] hover:bg-[#d3731f] text-white rounded-xl shadow-lg shadow-orange-100 transition-all cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-black opacity-60">{item.id}.</span>
                                        <h4 className="text-sm font-black uppercase tracking-wider">{item.name}</h4>
                                    </div>
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Footer Info */}
                        <div className="mt-10 flex items-center gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <Map size={20} className="text-[#2A3955]" />
                            </div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                                Lokasi Strategis di Pusat Kota Batam <br />
                                <span className="text-[#2A3955]">Baloi - Sei Ladi</span>
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}