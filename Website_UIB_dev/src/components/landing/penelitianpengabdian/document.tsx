'use client'
import React from 'react'
import { motion } from 'framer-motion'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import {
    FileText,
    Calendar,
    CreditCard,
    ArrowRight,
    CheckCircle2,
    Info
} from 'lucide-react'

export default function InformasiPendaftaranSimple() {
    return (
        <main className="min-h-screen bg-white font-poppins">
            <NavbarLanding />

            {/* --- MINI HERO --- */}
            <section className="pt-32 pb-12 bg-slate-50 border-b border-slate-100">
                <div className="container mx-auto px-6 md:px-20 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-black text-[#2A3955] mb-3 uppercase tracking-tight">
                        Informasi Pendaftaran <span className="text-[#e67e22]">UIB</span>
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">Tahun Akademik 2026/2027</p>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* --- KIRI: JALUR & SYARAT --- */}
                        <div className="lg:col-span-8 space-y-12">

                            {/* Jalur Pendaftaran */}
                            <div>
                                <h2 className="flex items-center gap-2 text-lg font-black text-[#2A3955] mb-6 uppercase tracking-widest">
                                    <span className="w-8 h-1 bg-[#e67e22] rounded-full" /> Jalur Pendaftaran
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { t: 'Jalur Beasiswa', d: 'Tanpa tes tertulis, seleksi nilai rapor semester 1-4.', c: 'bg-orange-50 text-[#e67e22]' },
                                        { t: 'Jalur Reguler (USM)', d: 'Ujian Saringan Masuk (Matematika, Inggris, TPA).', c: 'bg-blue-50 text-blue-600' }
                                    ].map((item, i) => (
                                        <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-slate-300 transition-all">
                                            <h4 className={`text-sm font-black uppercase mb-2 ${item.c.split(' ')[1]}`}>{item.t}</h4>
                                            <p className="text-slate-500 text-xs leading-relaxed">{item.d}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Berkas Syarat */}
                            <div>
                                <h2 className="flex items-center gap-2 text-lg font-black text-[#2A3955] mb-6 uppercase tracking-widest">
                                    <span className="w-8 h-1 bg-[#e67e22] rounded-full" /> Berkas Persyaratan
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
                                    {[
                                        'Scan Kartu Keluarga', 'Scan KTP/Kartu Pelajar',
                                        'Pas Foto (Latar Biru)', 'Scan Rapor Sem 1-4',
                                        'Sertifikat (Opsional)'
                                    ].map((text, i) => (
                                        <div key={i} className="flex items-center gap-2 text-slate-600">
                                            <CheckCircle2 size={16} className="text-[#e67e22] shrink-0" />
                                            <span className="text-xs font-semibold">{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Jadwal Simple */}
                            <div>
                                <h2 className="flex items-center gap-2 text-lg font-black text-[#2A3955] mb-6 uppercase tracking-widest">
                                    <span className="w-8 h-1 bg-[#e67e22] rounded-full" /> Jadwal Seleksi
                                </h2>
                                <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
                                    {[
                                        { g: 'Gelombang 1', d: 'Januari - Maret 2026' },
                                        { g: 'Gelombang 2', d: 'April - Mei 2026' },
                                        { g: 'Gelombang 3', d: 'Juni - Juli 2026' }
                                    ].map((row, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 border-b border-white last:border-0">
                                            <span className="text-xs font-bold text-[#2A3955]">{row.g}</span>
                                            <span className="text-xs font-medium text-slate-500">{row.d}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* --- KANAN: BIAYA & CTA --- */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32 space-y-6">

                                {/* Card Biaya */}
                                <div className="bg-[#2A3955] p-8 rounded-[2rem] text-white">
                                    <h3 className="text-sm font-black uppercase tracking-widest mb-6 opacity-60">Biaya Pendaftaran</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-medium">Jalur Beasiswa</span>
                                            <span className="text-lg font-black text-[#e67e22]">Rp 150k</span>
                                        </div>
                                        <div className="h-px bg-white/10 w-full" />
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-medium">Jalur Reguler</span>
                                            <span className="text-lg font-black">Rp 250k</span>
                                        </div>
                                    </div>
                                    <p className="mt-6 text-[10px] text-white/40 leading-relaxed italic">
                                        * Pembayaran via Virtual Account Bank mitra.
                                    </p>
                                </div>

                                {/* Tombol Aksi */}
                                <a
                                    href="https://pendaftaran.uib.ac.id"
                                    className="flex items-center justify-center gap-2 w-full py-4 bg-[#e67e22] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#d3731f] transition-all shadow-lg shadow-orange-100"
                                >
                                    Daftar Online <ArrowRight size={16} />
                                </a>

                                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                                    <Info size={18} className="text-blue-500 shrink-0" />
                                    <p className="text-[10px] text-blue-700 leading-relaxed font-medium">
                                        Butuh bantuan? Hubungi WhatsApp Admisi di jam kerja (08:00 - 17:00 WIB).
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
