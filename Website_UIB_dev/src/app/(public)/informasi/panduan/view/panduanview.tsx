'use client'
import React from 'react'


import { Play } from 'lucide-react'

export default function PanduanView() {
    return (
        <main className="min-h-screen bg-white font-poppins selection:bg-[#1a365d]/10">

            <section className="py-20 md:py-40 bg-slate-50">
                <div className="container mx-auto px-6 md:px-20 max-w-6xl">


                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#1a365d] text-[10px] font-black uppercase tracking-widest mb-6">
                            <Play size={12} fill="currentColor" /> Tutorial Resmi
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-[#1a365d] mb-6 tracking-tight">
                            Panduan <span className="text-[#f6a623]">Pendaftaran</span>
                        </h1>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl">
                            Silakan tonton video tutorial di bawah ini untuk panduan langkah demi langkah proses pendaftaran mahasiswa baru.
                        </p>
                    </div>


                    <div className="relative aspect-video w-full max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-[6px] md:border-[12px] border-white bg-white">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/E3ez3tOA_D4?si=rX1m-oG-o-F-O-K8"
                            title="Panduan Pendaftaran UIB"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Universitas Internasional Batam</p>
                    </div>

                </div>
            </section>

        </main>
    )
}