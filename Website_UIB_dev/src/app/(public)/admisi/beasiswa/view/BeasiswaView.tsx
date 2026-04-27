'use client'
import React from 'react'


import { motion } from 'framer-motion'
import BeasiswaAdmisiInfo from '@/components/landing/admisi/beasiswa'

export default function BeasiswaView() {
    return (
        <main className="min-h-screen bg-white font-poppins selection:bg-[#e67e22] selection:text-white">

            <section className="py-40">
                <div className="container mx-auto px-6 md:px-16 max-w-6xl">
                    <div className="bg-white rounded-[40px] border border-slate-100 p-2 md:p-4">
                        <BeasiswaAdmisiInfo />
                    </div>
                </div>
            </section>

        </main>
    )
}