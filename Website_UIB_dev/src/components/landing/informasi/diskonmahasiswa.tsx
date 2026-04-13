'use client'
import React from 'react'
import { motion } from 'framer-motion'
import {
    MapPin,
    Calendar,
    Tag,
    Info,
    Users,
    Store,
    ExternalLink,
    CheckCircle
} from 'lucide-react'

// --- DATA DISKON SESUAI GAMBAR REFERENSI ---
const diskonData = [
    {
        no: 1,
        partner: "Hotel Santika",
        masaBerakhir: "30-Nov-25",
        benefit: "Link",
        lokasi: "Hotel Santika Batam",
        syarat: "Link",
        pengguna: "Mahasiswa, Alumni, Dosen dan Staf UIB"
    },
    {
        no: 2,
        partner: "Miracle Aesthetic Clinic Batam",
        masaBerakhir: "10-Apr-2025",
        benefit: "Potongan 10% untuk: 1) Pembelian produk Miracle Aesthetic Clinic, kecuali produk oral dan racik; 2) Perawatan medis berupa peeling, ultrasound, laser, dan light based therapy; dan 3) Perawatan facial atau estetik",
        lokasi: "Miracle Aesthetic Clinic Batam",
        syarat: "• Mahasiswa membawa KTM dan KTP • Dosen/Staff membawa kartu karyawan dan KTP",
        pengguna: "Mahasiswa, Alumni, Dosen dan Staf UIB"
    },
    {
        no: 3,
        partner: "Batam Eye Care",
        masaBerakhir: "01-Apr-2026",
        benefit: "Potongan 20% untuk jasa konsultasi dokter",
        lokasi: "Batam Eye Care",
        syarat: "- Mahasiswa membawa KTM dan KTP - Dosen/Staff membawa kartu karyawan dan KTP",
        pengguna: "Mahasiswa, Dosen dan Staf UIB"
    },
    {
        no: 4,
        partner: "Laboratorium Klinik Osmaro",
        masaBerakhir: "28-Jul-2026",
        benefit: "Link",
        lokasi: "Laboratorium Klinik Osmaro",
        syarat: "- Mahasiswa membawa KTM dan KTP - Dosen/Staff membawa kartu karyawan dan KTP",
        pengguna: "Mahasiswa, Dosen dan Staf UIB"
    }
]

export default function DiskonMahasiswa() {
    return (
        <div className="font-poppins bg-white selection:bg-[#e67e22]/30">

            {/* --- HERO SECTION --- */}
            {/* <section className="pt-32 pb-16 bg-[#1A365D] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#e67e22] opacity-10 rounded-full blur-3xl"></div>
                <div className="container mx-auto px-6 md:px-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center md:text-left"
                    >
                        <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter mb-4">
                            Benefit <span className="text-[#e67e22]">Mitra UIB</span>
                        </h1>
                        <div className="w-20 h-1.5 bg-[#e67e22] rounded-full mb-6 mx-auto md:mx-0"></div>
                        <p className="max-w-2xl text-white/70 text-lg font-medium">
                            Keuntungan eksklusif bagi Sivitas Akademika UIB melalui kerjasama strategis dengan berbagai mitra penyedia layanan.
                        </p>
                    </motion.div>
                </div>
            </section> */}

            {/* --- TABLE SECTION --- */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6 md:px-20">

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[1000px]">
                                <thead>
                                    <tr className="bg-slate-100 border-b border-slate-200">
                                        <th className="py-6 px-6 text-xs font-black uppercase tracking-widest text-[#2A3955] text-center border-r border-slate-200">No</th>
                                        <th className="py-6 px-6 text-xs font-black uppercase tracking-widest text-[#2A3955] border-r border-slate-200">Nama Partner</th>
                                        <th className="py-6 px-6 text-xs font-black uppercase tracking-widest text-[#2A3955] border-r border-slate-200">Masa Berakhir</th>
                                        <th className="py-6 px-6 text-xs font-black uppercase tracking-widest text-[#2A3955] border-r border-slate-200">Benefit</th>
                                        <th className="py-6 px-6 text-xs font-black uppercase tracking-widest text-[#2A3955] border-r border-slate-200">Lokasi Berlaku</th>
                                        <th className="py-6 px-6 text-xs font-black uppercase tracking-widest text-[#2A3955] border-r border-slate-200">Syarat Penggunaan</th>
                                        <th className="py-6 px-6 text-xs font-black uppercase tracking-widest text-[#2A3955]">Pengguna</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {diskonData.map((item, idx) => (
                                        <tr key={item.no} className="hover:bg-slate-50 transition-colors">
                                            <td className="py-8 px-6 text-center font-bold text-slate-400 border-r border-slate-100">{item.no}</td>
                                            <td className="py-8 px-6 font-bold text-[#1A365D] border-r border-slate-100">{item.partner}</td>
                                            <td className="py-8 px-6 text-sm font-semibold text-slate-500 border-r border-slate-100 italic">{item.masaBerakhir}</td>
                                            <td className="py-8 px-6 border-r border-slate-100">
                                                {item.benefit === "Link" ? (
                                                    <a href="#" className="inline-flex items-center gap-1 text-blue-600 font-bold underline hover:text-[#e67e22] transition-colors">
                                                        Link <ExternalLink size={14} />
                                                    </a>
                                                ) : (
                                                    <p className="text-xs leading-relaxed text-slate-600 font-medium max-w-[300px]">{item.benefit}</p>
                                                )}
                                            </td>
                                            <td className="py-8 px-6 text-xs font-bold text-[#1A365D] uppercase tracking-wide border-r border-slate-100">{item.lokasi}</td>
                                            <td className="py-8 px-6 border-r border-slate-100">
                                                {item.syarat === "Link" ? (
                                                    <a href="#" className="inline-flex items-center gap-1 text-blue-600 font-bold underline hover:text-[#e67e22] transition-colors">
                                                        Link <ExternalLink size={14} />
                                                    </a>
                                                ) : (
                                                    <p className="text-xs leading-relaxed text-slate-500 italic max-w-[200px] whitespace-pre-line">{item.syarat}</p>
                                                )}
                                            </td>
                                            <td className="py-8 px-6">
                                                <div className="flex flex-wrap gap-1">
                                                    <span className="text-[10px] font-black uppercase text-[#e67e22] bg-orange-50 px-3 py-1 rounded-md border border-orange-100">
                                                        {item.pengguna}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Alert */}
                        {/* <div className="bg-[#2A3955] p-6 text-center md:text-left">
                            <div className="flex flex-col md:flex-row items-center gap-4 text-white">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <Info size={20} className="text-[#e67e22]" />
                                </div>
                                <p className="text-xs font-medium opacity-80 italic">
                                    Catatan: Informasi benefit dan syarat penggunaan dapat berubah mengikuti kebijakan terbaru dari pihak partner Universitas Internasional Batam.
                                </p>
                            </div>
                        </div> */}
                    </motion.div>

                    {/* Cards for Info
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                        <div className="p-8 bg-white rounded-3xl shadow-xl border border-slate-100 flex gap-6 items-start group">
                            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#e67e22] transition-colors">
                                <CheckCircle className="text-[#e67e22] group-hover:text-white" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-[#1A365D] mb-2 uppercase tracking-tight">Klaim Benefit</h4>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">Cukup tunjukkan Kartu Tanda Mahasiswa (KTM) atau Kartu Karyawan aktif Anda pada kasir mitra yang tertera di atas sebelum melakukan transaksi.</p>
                            </div>
                        </div>
                        <div className="p-8 bg-white rounded-3xl shadow-xl border border-slate-100 flex gap-6 items-start group">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#1A365D] transition-colors">
                                <Users className="text-[#1A365D] group-hover:text-white" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-[#1A365D] mb-2 uppercase tracking-tight">Cakupan Pengguna</h4>
                                <p className="text-sm text-slate-500 leading-relaxed font-medium">Program kerjasama ini berlaku untuk Mahasiswa aktif, Alumni yang terdata, serta seluruh Dosen dan Staff Universitas Internasional Batam.</p>
                            </div>
                        </div>
                    </div> */}

                </div>
            </section>
        </div>
    )
}