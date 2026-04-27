'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MapPin,
    Calendar,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    Search
} from 'lucide-react'

const diskonData = [
    {
        no: 1,
        partner: "Hotel Santika",
        masaBerakhir: "30-Nov-25",
        benefit: "https://uib1-my.sharepoint.com/:w:/g/personal/cindy_lie_uib_ac_id/IQBYEDBLvKEIQYzokb8cZJjAAUmkKwjJrxBZHOJDa2Nhwvg?e=Owe6wM",
        lokasi: "Hotel Santika Batam",
        syarat: "https://uib1-my.sharepoint.com/:w:/g/personal/cindy_lie_uib_ac_id/IQBYEDBLvKEIQYzokb8cZJjAAUmkKwjJrxBZHOJDa2Nhwvg?e=Owe6wM",
        pengguna: "Mahasiswa, Alumni, Dosen dan Staf UIB"
    },
    {
        no: 2,
        partner: "Miracle Aesthetic Clinic Batam",
        masaBerakhir: "10-Apr-2025",
        benefit: "Potongan 10% untuk produk (kecuali oral/racik), perawatan medis (peeling, laser, facial) dan estetik.",
        lokasi: "Miracle Aesthetic Clinic Batam",
        syarat: "Mahasiswa (KTM + KTP), Dosen/Staff (Kartu Karyawan + KTP)",
        pengguna: "Mahasiswa, Alumni, Dosen dan Staf UIB"
    },
    {
        no: 3,
        partner: "Batam Eye Care",
        masaBerakhir: "01-Apr-2026",
        benefit: "Potongan 20% untuk jasa konsultasi dokter",
        lokasi: "Batam Eye Care",
        syarat: "Mahasiswa (KTM + KTP), Dosen/Staff (Kartu Karyawan + KTP)",
        pengguna: "Mahasiswa, Dosen dan Staf UIB"
    },
    {
        no: 4,
        partner: "Laboratorium Klinik Osmaro",
        masaBerakhir: "28-Jul-2026",
        benefit: "https://uib1-my.sharepoint.com/:w:/g/personal/lingsie_shaufina_uib_ac_id/IQCJis-wjCJqQJnrhOCnzcbvAZpDYCVJorf-ORQ1CEwArhQ?e=lFwwzo",
        lokasi: "Laboratorium Klinik Osmaro",
        syarat: "Mahasiswa (KTM + KTP), Dosen/Staff (Kartu Karyawan + KTP)",
        pengguna: "Mahasiswa, Dosen dan Staf UIB"
    },
    {
        no: 5,
        partner: "PT Kemina Dunia Medika (Dental Care)",
        masaBerakhir: "15-Apr-2030",
        benefit: "Potongan 10% untuk semua jenis pelayanan (kecuali ketentuan tertentu)",
        lokasi: "Semua Cabang di Batam",
        syarat: "Mahasiswa (KTM + KTP), Dosen/Staff (Kartu Karyawan + KTP)",
        pengguna: "Mahasiswa, Dosen dan Staf UIB"
    },
    {
        no: 6,
        partner: "PT Mega Buana Indah (Edukits)",
        masaBerakhir: "28-Agu-2027",
        benefit: "Diskon 10% perlengkapan sekolah, 5% perlengkapan kantor",
        lokasi: "Edukits Batam Centre",
        syarat: "Mahasiswa (KTM + KTP), Dosen/Staff (Kartu Karyawan + KTP)",
        pengguna: "Mahasiswa, Dosen dan Staf UIB"
    },
    {
        no: 7,
        partner: "PT Ballyson Lestari Sukses",
        masaBerakhir: "17-Sep-2030",
        benefit: "Potongan 5-10% untuk sebagian jenis produk",
        lokasi: "Toko Buku Ballyson Batam",
        syarat: "Mahasiswa (KTM + KTP), Dosen/Staff (Kartu Karyawan + KTP)",
        pengguna: "Mahasiswa, Dosen dan Staf UIB"
    },
    {
        no: 8,
        partner: "Klinik Medilab",
        masaBerakhir: "28-Jul-2026",
        benefit: "Link",
        lokasi: "Klinik Medilab Batam",
        syarat: "Link",
        pengguna: "Mahasiswa, Dosen dan Staf UIB"
    },
    {
        no: 9,
        partner: "Doctor Gym",
        masaBerakhir: "20-Okt-2030",
        benefit: "Harga spesial Rp350.000,-/bulan & bebas biaya registrasi",
        lokasi: "Doctor Gym Batam",
        syarat: "Mahasiswa (KTM + KTP), Dosen/Staff (Kartu Karyawan + KTP)",
        pengguna: "Mahasiswa, Dosen dan Staf UIB"
    },
    {
        no: 10,
        partner: "Towzen",
        masaBerakhir: "14-Jan-2026",
        benefit: "Potongan 10%",
        lokasi: "Towzen Batam",
        syarat: "Mahasiswa (KTM + KTP), Dosen/Staff (Kartu Karyawan + KTP)",
        pengguna: "Mahasiswa, Dosen dan Staf UIB"
    },
    {
        no: 11,
        partner: "Klinik Utama Gatsu Medika",
        masaBerakhir: "16-Jun-2026",
        benefit: "Potongan 15% untuk layanan konseling & psikologi",
        lokasi: "Klinik Utama Gatsu Medika",
        syarat: "Mahasiswa (KTM + KTP), Dosen/Staff (Kartu Karyawan + KTP)",
        pengguna: "Mahasiswa, Dosen dan Staf UIB"
    },
    {
        no: 12,
        partner: "Klinik Oto Medika",
        masaBerakhir: "22-Jul-2026",
        benefit: "Harga khusus paket cek lab & X-Ray mulai Rp140.000",
        lokasi: "Klinik Oto Medika Batam",
        syarat: "Mahasiswa (KTM + KTP), Dosen/Staff (Kartu Karyawan + KTP)",
        pengguna: "Mahasiswa, Dosen dan Staf UIB"
    },
    {
        no: 13,
        partner: "Imperial Kitchen",
        masaBerakhir: "01-Apr-2026",
        benefit: "Promo Buy 1 Get 1 untuk menu nasi/mie goreng & ayam panggang tertentu",
        lokasi: "Imperial Kitchen Batam",
        syarat: "Mahasiswa (KTM + KTP), Dosen/Staff (Kartu Karyawan + KTP)",
        pengguna: "Mahasiswa, Dosen dan Staf UIB"
    },
    {
        no: 14,
        partner: "Ascott Batam Region",
        masaBerakhir: "15-Apr-2026",
        benefit: "Potongan 20% kamar & 15% FnB di HARRIS & YELLO Hotels Batam",
        lokasi: "HARRIS, YELLO, & Oakwood Batam",
        syarat: "Mahasiswa (KTM + KTP), Dosen/Staff (Kartu Karyawan + KTP)",
        pengguna: "Mahasiswa, Dosen dan Staf UIB"
    },
    {
        no: 15,
        partner: "Emdee Easy Skin Clinic Batam",
        masaBerakhir: "15-Apr-2026",
        benefit: "Free konsultasi, Potongan 20% treatment & 5% produk",
        lokasi: "Emdee Nagoya Hill",
        syarat: "Mahasiswa (KTM + KTP), Dosen/Staff (Kartu Karyawan + KTP)",
        pengguna: "Mahasiswa, Alumni, Dosen dan Staf UIB"
    }
]

export default function DiskonMahasiswa() {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const filteredData = diskonData.filter(item => 
        item.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lokasi.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="w-full space-y-6">
            <div className="flex justify-end">
                <div className="relative group max-w-xs w-full">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1a365d] transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Cari mitra atau lokasi..." 
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#f6a623]/20 focus:border-[#f6a623] transition-all"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setCurrentPage(1)
                        }}
                    />
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500 text-center">No</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Partner Resmi</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Masa Berlaku</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Benefit Utama</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Syarat & Pengguna</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <AnimatePresence mode="wait">
                                {currentItems.map((item, idx) => (
                                    <motion.tr 
                                        key={item.no} 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="py-6 px-6 text-center text-sm font-medium text-slate-400">
                                            {item.no}
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-bold text-[#1a365d] leading-tight">{item.partner}</h4>
                                                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium italic">
                                                    <MapPin size={10} /> {item.lokasi}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                                                <Calendar size={12} className="text-[#f6a623]" /> {item.masaBerakhir}
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            {item.benefit.startsWith('http') ? (
                                                <a href={item.benefit} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 font-bold underline hover:text-[#f6a623] text-xs transition-colors">
                                                    Lihat Detail <ExternalLink size={12} />
                                                </a>
                                            ) : (
                                                <p className="text-xs text-slate-600 leading-relaxed max-w-[280px]">
                                                    {item.benefit}
                                                </p>
                                            )}
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="space-y-2">
                                                <span className="inline-block px-2 py-0.5 bg-orange-50 text-[#f6a623] text-[9px] font-black uppercase rounded border border-orange-100">
                                                    {item.pengguna}
                                                </span>
                                                {item.syarat.startsWith('http') ? (
                                                    <a href={item.syarat} target="_blank" rel="noopener noreferrer" className="block text-[10px] text-blue-600 font-bold underline italic transition-colors">
                                                        Lihat Syarat (Link)
                                                    </a>
                                                ) : (
                                                    <p className="text-[10px] text-slate-400 leading-tight italic max-w-[200px]">
                                                        {item.syarat}
                                                    </p>
                                                )}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} dari {filteredData.length} mitra
                    </p>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded bg-white border border-slate-200 text-slate-400 hover:text-[#1a365d] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft size={14} />
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-8 h-8 rounded text-xs font-bold transition-all ${
                                            currentPage === page 
                                            ? 'bg-[#1a365d] text-white' 
                                            : 'bg-white border border-slate-200 text-slate-400 hover:border-[#1a365d] hover:text-[#1a365d]'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button 
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded bg-white border border-slate-200 text-slate-400 hover:text-[#1a365d] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}