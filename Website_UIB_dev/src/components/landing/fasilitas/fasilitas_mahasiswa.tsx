'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Building2, Map } from 'lucide-react'

// --- DATA FASILITAS ---
const fasilitasUIB = [
    {
        id: 1,
        name: 'Perpustakaan',
        description: 'Perpustakaan UIB menyediakan ribuan koleksi buku digital dan cetak, ruang diskusi yang nyaman, serta akses jurnal internasional untuk mendukung riset dan pembelajaran mahasiswa.'
    },
    {
        id: 2,
        name: 'Musholla',
        description: 'Fasilitas ibadah yang bersih dan sejuk terletak di area strategis kampus, memudahkan seluruh civitas akademika untuk menjalankan ibadah tepat waktu.'
    },
    {
        id: 3,
        name: 'Taman',
        description: 'Area terbuka hijau yang asri sebagai tempat bersantai, belajar bersama di luar ruangan, atau sekadar menikmati udara segar di tengah kesibukan perkuliahan.'
    },
    {
        id: 4,
        name: 'Klinik',
        description: 'UIB Health Clinic memberikan layanan kesehatan dasar bagi mahasiswa dan staf, dilengkapi dengan tenaga medis profesional dan obat-obatan standar.'
    },
    {
        id: 5,
        name: 'Asrama',
        description: 'Hunian mahasiswa yang aman dan nyaman (Residential Lab) dengan fasilitas lengkap, mendukung pembentukan karakter dan lingkungan belajar yang kolaboratif.'
    }
]

export default function FasilitasMahasiswa() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (id: number) => {
        setActiveIndex(activeIndex === id ? null : id);
    };

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-20">

                <div className="flex flex-col lg:flex-row items-start gap-16">
                    {/* --- BAGIAN KANAN: LIST FASILITAS (Accordion) --- */}
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

                        {/* Accordion List */}
                        <div className="space-y-4">
                            {fasilitasUIB.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    className={`overflow-hidden rounded-2xl shadow-lg transition-all cursor-pointer border border-transparent ${activeIndex === item.id
                                        ? 'ring-2 ring-offset-2 ring-slate-100 shadow-xl'
                                        : 'hover:shadow-md'
                                        } ${item.name === 'Perpustakaan'
                                            ? 'bg-[#1a365d] text-white shadow-blue-900/10'
                                            : 'bg-[#e67e22] text-white shadow-orange-900/10'
                                        }`}
                                    onClick={() => toggleAccordion(item.id)}
                                >
                                    <div className="flex items-center justify-between p-6">
                                        <div className="flex items-center gap-4">
                                            <span className="text-sm font-black opacity-40">{item.id.toString().padStart(2, '0')}</span>
                                            <h4 className="text-sm font-black uppercase tracking-wider">{item.name}</h4>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: activeIndex === item.id ? 90 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ChevronRight size={20} className={activeIndex === item.id ? "opacity-100" : "opacity-60"} />
                                        </motion.div>
                                    </div>

                                    <AnimatePresence>
                                        {activeIndex === item.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            >
                                                <div className="px-6 pb-8 pt-0">
                                                    <div className="w-full h-px bg-white/20 mb-5" />
                                                    <p className="text-sm font-medium leading-relaxed opacity-90">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                    {/* --- BAGIAN KIRI: GAMBAR KAMPUS (Sticky on Desktop) --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 lg:sticky lg:top-32"
                    >
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group">
                            <img
                                src="/img/gym.JPG"
                                alt="Gedung UIB"
                                className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2A3955]/40 to-transparent" />
                        </div>

                        {/* Dekorasi Aksen */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#e67e22] rounded-3xl -z-10 hidden md:block" />
                    </motion.div>



                </div>
            </div>
        </section>
    )
}
