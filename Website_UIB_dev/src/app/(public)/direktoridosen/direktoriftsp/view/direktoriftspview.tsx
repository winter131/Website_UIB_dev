'use client'
import React from 'react'


import { Building2 } from 'lucide-react'
import DosenFtsp from '@/components/landing/direktoridosen/dosenftsp'

export default function DirektoriFtspView() {
    return (
        <main className="min-h-screen bg-white font-poppins selection:bg-[#1a365d] selection:text-white">

            <section className="pt-40 pb-16 bg-slate-50 border-b border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#f6a623]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-6 md:px-20 relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/50 border border-blue-200 text-[#1a365d] text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">
                            <Building2 size={12} /> Fakultas Teknik Sipil dan Perencanaan
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-[#1a365d] mb-6 leading-tight tracking-tight">
                            Direktori <span className="text-[#f6a623]">Dosen FTSP</span>
                        </h1>
                        <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
                            Daftar tenaga pendidik profesional pada Fakultas Teknik Sipil dan Perencanaan Universitas Internasional Batam.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 pb-32">
                <div className="container mx-auto px-6 md:px-20">
                    <DosenFtsp />
                </div>
            </section>

        </main>
    )
}