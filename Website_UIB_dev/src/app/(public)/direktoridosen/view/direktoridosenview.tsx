'use client'
import React from 'react'
import { motion } from 'framer-motion'


import {
    Scale,
    Briefcase,
    Monitor,
    Building2,
    GraduationCap,
    FlaskConical,
    ChevronRight
} from 'lucide-react'
import Link from 'next/link'

export default function DirektoriDosenView() {
    const faculties = [
        { name: "Fakultas Bisnis dan Manajemen", icon: <Briefcase size={20} />, href: "/direktoridosen/direktorifbm" },
        { name: "Fakultas Teknik Sipil dan Perencanaan", icon: <Building2 size={20} />, href: "/direktoridosen/direktoriftsp" },
        { name: "Fakultas Ilmu Komputer", icon: <Monitor size={20} />, href: "/direktoridosen/direktorifik" },
        { name: "Fakultas Hukum", icon: <Scale size={20} />, href: "/direktoridosen/direktorifh" },
        { name: "Fakultas Pendidikan", icon: <GraduationCap size={20} />, href: "/direktoridosen/direktorifip" },
        { name: "Fakultas Kesehatan dan Sains", icon: <FlaskConical size={20} />, href: "/direktoridosen/direktorifks" },
    ]

    return (
        <main className="min-h-screen bg-white font-poppins selection:bg-[#1a365d] selection:text-white">

            <section className="pt-40 pb-16 border-b border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a365d]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-6 md:px-20 max-w-5xl">
                    <h1 className="text-3xl md:text-4xl font-black text-[#1a365d] leading-tight mb-4 tracking-tight">
                        Direktori Dosen
                    </h1>
                    <p className="text-slate-500 max-w-xl text-sm leading-relaxed">
                        Jelajahi tenaga pengajar berdasarkan fakultas. Setiap fakultas memiliki dosen dengan keahlian dan bidang riset yang berbeda.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6 md:px-20 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        {faculties.map((faculty, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                            >
                                <Link 
                                    href={faculty.href}
                                    className="group flex items-center justify-between py-5 border-b border-slate-100 hover:border-[#1a365d] transition-all"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="text-slate-300 group-hover:text-[#1a365d] transition-colors">
                                            {faculty.icon}
                                        </div>
                                        <span className="text-sm font-bold text-[#1a365d] group-hover:text-[#f6a623] transition-colors">
                                            {faculty.name}
                                        </span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#1a365d] group-hover:text-white transition-all">
                                        <ChevronRight size={16} />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    )
}