'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


import FasilitasMahasiswa from '@/components/landing/fasilitas/fasilitas_mahasiswa'
import FasilitasPendukung from '@/components/landing/fasilitas/fasilitas_pendukung'
import FasilitasDisabilitas from '@/components/landing/fasilitas/fasilitas_disabilitas'
import FasilitasUmum from '@/components/landing/fasilitas/fasilitas_umum'
import {
    ChevronDown,
    ExternalLink,
    CheckCircle2,
    ChevronRight,
    CreditCard,
    Monitor,
    Clock,
    Info,
    Globe,
    Mail,
    Phone
} from 'lucide-react'

export default function FasilitasView() {
    return (
        <main className="min-h-screen bg-white font-poppins text-[#2A3955]">
            <section className="relative w-full h-[300px] md:h-[500px] bg-white overflow-hidden">
                <div
                    className="absolute inset-0  pointer-events-none "
                    style={{
                        backgroundImage: "url('/img/C1700307.jpg')",
                        backgroundSize: '100%',
                        backgroundPosition: 'top'
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-white/5 z-0"></div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 h-full flex items-end relative z-10">

                    <div className="flex flex-col md:flex-row justify-between items-start w-full pb-8 md:pb-12 gap-4">

                        <div className="max--2xl space-y-2">
                        </div>
                    </div>
                </div>
            </section>
            <section className='container mx-auto px-6 md:px-12 lg:px-20 mt-10 justify-center mb-10 items-center text-center'>
                <h1 className='text-3xl font-bold text-[#1a365d]'> Fasilitas Kampus</h1>
                <p className='text-[#1a365d]'>
                    Universitas Internasional Batam tidak hanyak mendukung sistem akademik saja tapi juga
                    meningkatkan kualitas dari segi sarana dan prasarana untuk membuka pengalaman belajar
                    yang terbaik selama masa studi. Kami percaya selalu berproses dalam membangun fasilitas
                    yang baik setiap tahunnya
                </p>
            </section>
            <section>
                <div className='container mx-auto'>
                    <img src="/img/gym.jpg" alt="gym" className='w-full h-[400px] object-cover' />

                </div>
            </section>
            <FasilitasUmum />
            <FasilitasMahasiswa />
            <FasilitasPendukung />
            <FasilitasDisabilitas />
        </main>
    )
}