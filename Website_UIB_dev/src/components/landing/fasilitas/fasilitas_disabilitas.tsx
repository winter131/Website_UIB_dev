'use client'
import React from 'react'
import { motion } from 'framer-motion'

// --- DATA GAMBAR FASILITAS DISABILITAS ---
const gambarDisabilitas = [
    { id: 1, src: '/img/story1.JPG', alt: 'Lift Khusus' },
    { id: 2, src: '/img/story2.JPG', alt: 'Toilet Disabilitas' },
    { id: 3, src: '/img/story3.JPG', alt: 'Ramp Akses 1' },
    { id: 4, src: '/img/DSC06279.JPG', alt: 'Ramp Akses 2' }
]

export default function FasilitasDisabilitas() {
    return (
        <section className="w-full bg-white pb-24">
            {/* --- HEADER NAVY (Sesuai Gambar) --- */}
            <div className="bg-[#1A365D] py-16 md:py-20 mb-16">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        {/* Judul Kiri */}
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-white text-3xl md:text-4xl font-bold tracking-tight"
                        >
                            Fasilitas Disabilitas
                        </motion.h2>

                        {/* Deskripsi Kanan */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="max-w-xl"
                        >
                            <p className="text-white/80 text-sm md:text-base leading-relaxed font-medium">
                                Universitas Internasional Batam (UIB) adalah kampus ramah terhadap disabilitas,
                                karena menyediakan fasilitas untuk memudahkan para mahasiswa penyandang disabilitas dalam beraktivitas.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* --- GALERI FOTO (Sesuai Gambar) --- */}
            <div className="container mx-auto px-6 md:px-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {gambarDisabilitas.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group"
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Overlay Tipis saat Hover */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}