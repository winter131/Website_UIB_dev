'use client'
import React from 'react'
import { motion } from 'framer-motion'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { PlusSquare, FileText, Download, ExternalLink } from 'lucide-react'

export default function UnduhDokumenView() {
    const akademikDocs = [
        { name: "Legalisir Ijazah dan Transkrip Akademik", url: "#" },
        { name: "Dokumen Seputar Ijazah dan Surat Keterangan Pengganti Ijazah", url: "#" },
        { name: "Dokumen Seputar Surat Keterangan Mahasiswa", url: "#" },
        { name: "Dokumen Kalender Akademik UIB", url: "#" },
        { name: "Dokumen Panduan Akademik UIB", url: "#" },
        { name: "Dokumen Seputar Akreditasi Universitas", url: "#" },
        { name: "Dokumen Translate Alih Bahasa Ijazah", url: "#" },
        { name: "Dokumen Undur Diri dan Pindah Kuliah", url: "#" },
    ];

    const fakultasLinks = [
        { name: "Fakultas Bisnis dan Manajemen", url: "#" },
        { name: "Fakultas Hukum", url: "#" },
        { name: "Fakultas Teknik Sipil dan Perencanaan", url: "#" },
        { name: "Fakultas Teknologi Industri", url: "#" },
        { name: "Fakultas Ilmu Agama Islam", url: "#" },
        { name: "Fakultas Psikologi dan Ilmu Sosial Budaya", url: "#" },
        { name: "Fakultas Matematika dan Ilmu Pengetahuan Alam", url: "#" },
        { name: "Fakultas Kedokteran", url: "#" },
    ];

    const brosurDocs = [
        { name: "Brosur Program Sarjana (S1) 2026", url: "#" },
        { name: "Brosur Program Pascasarjana (S2) 2026", url: "#" },
        { name: "Leaflet Beasiswa Unggulan", url: "#" },
    ];

    return (
        <main className="mt-10 pt-20 bg-white font-sans selection:bg-[#1A253A] selection:text-white min-h-screen">
            <NavbarLanding />

            {/* HEADER SECTION */}
            <header className="bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto px-6 md:px-20 py-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-2xl"
                    >
                        <h1 className="text-4xl font-black text-[#2A3955] mb-4">Pusat Unduhan</h1>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Akses dokumen resmi, panduan akademik, dan tautan penting fakultas Universitas Internasional Batam dalam satu pintu.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* MAIN CONTENT GRID */}
            <section className="container mx-auto px-6 md:px-20 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* KOLOM KIRI: DOKUMEN AKADEMIK */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-[#1A253A] mb-2 uppercase tracking-wide">Dokumen Akademik</h2>
                            <div className="w-16 h-1 bg-[#e67e22] mb-6"></div>
                            <p className="text-slate-600 text-sm mb-6">
                                Daftar dokumen resmi untuk menunjang proses administrasi dan akademik mahasiswa.
                            </p>

                            <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                                {akademikDocs.map((doc, index) => (
                                    <a
                                        key={index}
                                        href={doc.url}
                                        className="flex items-center gap-4 p-4 bg-slate-50 border-b border-slate-200 last:border-b-0 hover:bg-white transition-all group"
                                    >
                                        <Download size={18} className="text-[#e67e22] shrink-0" />
                                        <span className="text-[#1A253A] font-medium text-sm md:text-base group-hover:text-[#e67e22] group-hover:underline">
                                            {doc.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN: INFORMASI & BROSUR */}
                    <div className="space-y-12">
                        {/* SUB-SECTION: FAKULTAS */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#1A253A] mb-2 uppercase tracking-wide">Informasi Tambahan</h2>
                            <div className="w-16 h-1 bg-[#e67e22] mb-6"></div>
                            <p className="text-slate-600 text-sm mb-6">
                                Kunjungi tautan resmi fakultas untuk mendapatkan agenda dan berita terbaru.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {fakultasLinks.map((fakultas, index) => (
                                    <a
                                        key={index}
                                        href={fakultas.url}
                                        className="flex items-center justify-between p-3 border border-slate-200 rounded hover:border-[#e67e22] hover:bg-slate-50 transition-all text-sm group"
                                    >
                                        <span className="text-[#1A253A] font-semibold">{fakultas.name}</span>
                                        <ExternalLink size={14} className="text-slate-400 group-hover:text-[#1A253A]" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* SUB-SECTION: BROSUR */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#1A253A] mb-2 uppercase tracking-wide">Brosur & Katalog</h2>
                            <div className="w-16 h-1 bg-[#e67e22] mb-6"></div>
                            <div className="space-y-3">
                                {brosurDocs.map((brosur, index) => (
                                    <a
                                        key={index}
                                        href={brosur.url}
                                        className="flex items-center gap-3 p-4 bg-[#1A253A] text-white rounded-lg hover:bg-[#2a3955] transition-all group"
                                    >
                                        <Download size={18} className="text-[#e67e22]" />
                                        <span className="font-medium text-sm">{brosur.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    )
}
