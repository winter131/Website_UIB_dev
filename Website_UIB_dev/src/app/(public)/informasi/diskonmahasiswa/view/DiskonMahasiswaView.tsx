'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { 
    CheckCircle2, 
    ChevronRight, 
    Info, 
    CreditCard,
    ArrowRight
} from 'lucide-react'


import DiskonMahasiswa from '@/components/landing/informasi/diskonmahasiswa'

export default function DiskonMahasiswaView() {
    const identities = [
        { title: 'KTM Mahasiswa', img: '/img/Kartu Tanda Mahasiswa UIB.webp' },
        { title: 'Kartu Alumni', img: '/img/Kartu Alumni UIB.webp' },
        { title: 'KTM Magang', img: '/img/Kartu Tanda Mahasiswa Magang UIB.webp' },
        { title: 'Dosen / Karyawan', img: '/img/Kartu Tanda Dosenkaryawan.webp' },
    ]

    const benefits = [
        {
            title: "Potongan Harga",
            desc: "Diskon berkisar antara 5% hingga 20% untuk berbagai produk dan jasa.",
            items: ["Pembelian produk di outlet", "Event khusus UIB", "Promo Buy 1 Get 1"]
        },
        {
            title: "Fasilitas & Hadiah",
            desc: "Manfaat tambahan di luar potongan harga tunai.",
            items: ["Merchandise eksklusif", "Antrean prioritas", "Ekstra durasi jasa"]
        }
    ]

    return (
        <main className="min-h-screen bg-white font-poppins selection:bg-[#1a365d] selection:text-white">

            <section className="pt-32 pb-12">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                        <img
                            src="/img/Discount-card-new-1024x480.webp"
                            alt="UIB Discount Card"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        <div className="w-full lg:w-1/2">
                            <h1 className="text-3xl font-black text-[#1a365d] mb-6 uppercase tracking-tight">
                                Tentang Program <br/>
                                <span className="text-[#f6a623]">UIB Discount Card</span>
                            </h1>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                Universitas Internasional Batam (UIB) Discount Card merupakan program pemberian manfaat dari mitra yang bisa berupa diskon atau penawaran istimewa kepada pemegang kartu penanda sivitas akademika UIB.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Publikasi & Promosi Strategis",
                                    "Akuisisi Konsumen Baru",
                                    "Benefit Luas Sivitas UIB",
                                    "Memperkuat Word-of-Mouth"
                                ].map((txt, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                                        <CheckCircle2 size={16} className="text-[#f6a623]" /> {txt}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="rounded-2xl overflow-hidden shadow-md">
                                <img src="/img/diskon.webp" alt="Kegiatan Program" className="w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="mb-12">
                        <h2 className="text-2xl font-black text-[#1a365d] uppercase tracking-tight mb-2">Identitas Pemegang Kartu</h2>
                        <div className="w-12 h-1 bg-[#f6a623] rounded-full" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {identities.map((card, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 text-center space-y-4">
                                <div className="aspect-[1.6/1] flex items-center justify-center p-2">
                                    <img src={card.img} alt={card.title} className="max-w-full h-auto drop-shadow-sm" />
                                </div>
                                <p className="text-[10px] font-black uppercase text-[#1a365d] tracking-widest">{card.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 container mx-auto px-6 md:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-black text-[#1a365d] uppercase tracking-tight">Bentuk Benefit Mitra</h3>
                        <div className="space-y-6">
                            {benefits.map((b, i) => (
                                <div key={i} className="border-l-4 border-slate-100 pl-6 space-y-3 hover:border-[#f6a623] transition-colors">
                                    <h4 className="text-lg font-bold text-[#1a365d]">{b.title}</h4>
                                    <p className="text-sm text-slate-500 italic">{b.desc}</p>
                                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                                        {b.items.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                                                <ArrowRight size={10} className="text-[#f6a623]" /> {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#1a365d] p-10 rounded-2xl text-white">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#f6a623]">
                                <Info size={20} />
                            </div>
                            <h5 className="text-lg font-black uppercase tracking-tight">Informasi Penting</h5>
                        </div>
                        <p className="text-sm leading-relaxed opacity-80 border-l border-white/20 pl-6 italic">
                            "Setiap calon pendaftar atau pendaftar wajib menunjukkan identitas diri (KTM/Karyawan) sebelum melakukan pembayaran untuk mendapatkan manfaat benefit yang telah disepakati bersama."
                        </p>
                    </div>
                </div>
            </section>

            <section className="pb-32 container mx-auto px-6 md:px-20">
                <div className="mb-10">
                    <h3 className="text-2xl font-black text-[#1a365d] uppercase tracking-tight">Daftar Mitra Resmi</h3>
                    <div className="w-12 h-1 bg-[#f6a623] rounded-full mt-2" />
                </div>
                <DiskonMahasiswa />
            </section>

        </main>
    )
}