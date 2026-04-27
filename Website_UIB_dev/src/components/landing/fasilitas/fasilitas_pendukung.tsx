'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'


const fasilitasPendukungKiri = [
    { 
        id: 1, 
        name: 'Aula', 
        description: 'Ruang pertemuan serbaguna yang luas untuk seminar, konferensi, dan acara besar lainnya, dilengkapi dengan sistem tata suara dan pencahayaan profesional.' 
    },
    { 
        id: 2, 
        name: 'Internet Kampus', 
        description: 'Akses Wi-Fi berkecepatan tinggi yang mencakup seluruh area kampus (indoor maupun outdoor), mendukung kegiatan riset dan perkuliahan mahasiswa setiap saat.' 
    },
    { 
        id: 3, 
        name: 'Studio Band', 
        description: 'Fasilitas kreativitas musik bagi mahasiswa, lengkap dengan instrumen berkualitas dan peredam suara untuk mengasah bakat seni.' 
    },
    { 
        id: 4, 
        name: 'Video Conference Room', 
        description: 'Ruang meeting yang canggih untuk pertemuan jarak jauh, perkuliahan tamu internasional, dan diskusi interaktif via video streaming.' 
    },
    { 
        id: 5, 
        name: 'Kantin', 
        description: 'Pusat kuliner kampus yang bersih dengan beragam pilihan menu sehat dan halal, menjadi tempat favorit mahasiswa untuk bersantai di sela waktu kuliah.' 
    }
]


const fasilitasPendukungKanan = [
    { 
        id: 6, 
        name: 'Gym', 
        description: 'Pusat kebugaran dengan peralatan fitness modern dan coach berpengalaman untuk menjaga kesehatan fisik sivitas akademika UIB.' 
    },
    { 
        id: 7, 
        name: 'Meditasi', 
        description: 'Ruang tenang yang dirancang khusus untuk meditasi dan relaksasi mental, membantu mahasiswa mengelola stres di tengah aktivitas akademik.' 
    },
    { 
        id: 8, 
        name: 'Research Lounge', 
        description: 'Area eksklusif bagi bagi peneliti dan mahasiswa bimbingan tugas akhir untuk berdiskusi dalam suasana yang tenang dan kondusif.' 
    },
    { 
        id: 9, 
        name: 'Discussion Area', 
        description: 'Ruang terbuka kolaboratif di berbagai sudut kampus untuk belajar kelompok dan berbagi ide inovatif antarmahasiswa.' 
    },
    { 
        id: 10, 
        name: 'Sport Hall', 
        description: 'Fasilitas olahraga indoor untuk berbagai cabang seperti basket, futsal, dan bulu tangkis, mendukung gaya hidup aktif di kampus.' 
    }
]

export default function FasilitasPendukung() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (id: number) => {
        setActiveIndex(activeIndex === id ? null : id);
    };

    return (
        <section className="py-24 bg-[#FDFDFD] overflow-hidden">
            <div className="container mx-auto px-6 md:px-20">

                <div className="relative flex flex-col lg:flex-row items-center mb-24">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:w-[60%] z-0"
                    >
                        <div className="relative overflow-hidden rounded-[2rem] shadow-xl">
                            <img
                                src="/img/Utama.JPG"
                                alt="Mahasiswa UIB"
                                className="w-full h-[400px] md:h-[500px] object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:w-[50%] lg:-ml-12 z-10 bg-[#1A365D] p-10 md:p-14 text-white rounded-3xl shadow-2xl relative"
                    >
                        <div className="absolute top-0 right-0 h-full w-2 bg-[#ffc107] rounded-r-3xl" />

                        <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                            Fasilitas Pendukung
                        </h2>
                        <p className="text-white/80 text-base md:text-lg font-medium leading-relaxed">
                            UIB memiliki berbagai Fasilitas Pendukung kelas dunia yang dapat digunakan oleh seluruh sivitas akademika maupun masyarakat umum untuk meningkatkan produktivitas serta kenyamanan selama di lingkungan kampus.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    <div className="space-y-4">
                        {fasilitasPendukungKiri.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                className={`overflow-hidden rounded-2xl shadow-lg transition-all cursor-pointer border border-transparent ${
                                    activeIndex === item.id ? 'ring-2 ring-offset-2 ring-blue-50 shadow-xl' : 'hover:shadow-md'
                                } bg-[#e67e22] text-white shadow-orange-900/10`}
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
                                            transition={{ duration: 0.35, ease: "easeInOut" }}
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

                    <div className="space-y-4">
                        {fasilitasPendukungKanan.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                className={`overflow-hidden rounded-2xl shadow-lg transition-all cursor-pointer border border-transparent ${
                                    activeIndex === item.id ? 'ring-2 ring-offset-2 ring-orange-50 shadow-xl' : 'hover:shadow-md'
                                } bg-[#e67e22] text-white shadow-orange-900/10`}
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
                                            transition={{ duration: 0.35, ease: "easeInOut" }}
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

                </div>
            </div>
        </section>
    )
}