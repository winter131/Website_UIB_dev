'use client'
import React, { useState } from 'react'
import { Search, Eye, CheckCircle2 } from 'lucide-react'

const accreditationData = [
    {
        faculty: "Akreditasi Universitas",
        programs: [
            { prodi: 'Universitas Internasional Batam', akreditasi: 'Unggul', fileUrl: '/akreditasi/Sertifikat-Akreditasi-APT-UIB-2025.pdf', masaBerlaku: '15 Okt 2030' },
        ]
    },
    {
        faculty: "Fakultas Ilmu Hukum",
        programs: [
            { prodi: 'Ilmu Hukum', akreditasi: 'Unggul', fileUrl: '/akreditasi/ilmu hukum akreditasi.webp', masaBerlaku: '28 Des 2027' },
            { prodi: 'Magister Hukum', akreditasi: 'Unggul', fileUrl: '/akreditasi/magister hukum akreditasi.pdf', masaBerlaku: '01 Mei 2029' },
        ]
    },
    {
        faculty: "Fakultas Bisnis dan Manajemen",
        programs: [
            { prodi: 'Magister Manajemen', akreditasi: 'Unggul', fileUrl: '/akreditasi/magister manajemen akreditasi.webp', masaBerlaku: '04 Jul 2030' },
            { prodi: 'Manajemen', akreditasi: 'Unggul', fileUrl: '/akreditasi/manajemen akreditasi.pdf', masaBerlaku: '02 Agust 2028' },
            { prodi: 'Akuntansi', akreditasi: 'Baik Sekali', fileUrl: '/akreditasi/akuntansi akreditasi.webp', masaBerlaku: '31 Agust 2028' },
            { prodi: 'Pariwisata', akreditasi: 'B', fileUrl: '/akreditasi/pariwisata akreditasi.webp', masaBerlaku: '03 Nov 2025' }
        ]
    },
    {
        faculty: "Fakultas Ilmu Komputer",
        programs: [
            { prodi: 'Sistem Informasi', akreditasi: 'Baik Sekali', fileUrl: '/akreditasi/sistem informasi akreditasi.webp', masaBerlaku: '14 Apr 2028' },
            { prodi: 'Teknologi Informasi', akreditasi: 'Baik Sekali', fileUrl: '/akreditasi/teknologi informasi akreditasi.webp', masaBerlaku: '18 Agust 2030' },
        ]
    },
    {
        faculty: "Fakultas Teknik Sipil dan Perencanaan",
        programs: [
            { prodi: 'Teknik Sipil', akreditasi: 'Unggul', fileUrl: '/akreditasi/teknik sipil akreditasi.webp', masaBerlaku: '20 Apr 2028' },
            { prodi: 'Arsitektur', akreditasi: 'Baik', fileUrl: '/akreditasi/arsitektur akreditasi.webp', masaBerlaku: '16 Feb 2026' },
        ]
    },
    {
        faculty: "Fakultas Pendidikan",
        programs: [
            { prodi: 'Pendidikan Bahasa Inggris', akreditasi: 'Baik Sekali', fileUrl: '/akreditasi/pbi akreditasi.pdf', masaBerlaku: '20 Apr 2028' },
        ]
    },
    {
        faculty: "Fakultas Kesehatan dan Sains",
        programs: [
            { prodi: 'Biologi', akreditasi: 'Baik', fileUrl: '/akreditasi/biologi akreditasi.pdf', masaBerlaku: '21 Mei 2027' },
            { prodi: 'Gizi', akreditasi: 'Baik', fileUrl: '/akreditasi/gizi akreditasi.pdf', masaBerlaku: '28 Mei 2027' },
        ]
    },
    {
        faculty: "Fakultas Kedokteran",
        programs: [
            { prodi: 'Kedokteran Program Sarjana', akreditasi: 'Pertama', fileUrl: '/akreditasi/sarjana kedokteran akreditasi.pdf', masaBerlaku: '21 Mei 2027' },
            { prodi: 'Pendidikan Profesi Dokter Program Profesi', akreditasi: 'Pertama', fileUrl: '/akreditasi/profesi kedokteran akreditasi.pdf', masaBerlaku: '28 Mei 2027' },
        ]
    },
]

export default function Akreditasi() {
    const [searchTerm, setSearchTerm] = useState('')
    const [previewFile, setPreviewFile] = useState<string | null>(null)

    const isImage = (url: string) => /\.(webp|jpg|jpeg|png)$/i.test(url)

    const filteredData = accreditationData.map(group => ({
        ...group,
        programs: group.programs.filter(p =>
            p.prodi.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(group => group.programs.length > 0)

    return (
        <section className="py-20 bg-white min-h-screen">
            <div className="container mx-auto px-6 md:px-20 max-w-7xl">

                <div className="mb-10 flex justify-between items-end gap-6">
                    <h3 className="text-3xl font-black text-[#1a365d]">
                        Akreditasi
                    </h3>

                    <div className="relative w-72">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input
                            type="text"
                            placeholder="Cari prodi..."
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl text-xs font-bold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">

                    <div className="col-span-4 h-[70vh] overflow-y-auto space-y-8 pr-2">

                        {filteredData.map((group, i) => (
                            <div key={i}>

                                <h4 className="text-[10px] font-black text-slate-400 uppercase mb-3">
                                    {group.faculty}
                                </h4>

                                <div className="space-y-3">
                                    {group.programs.map((item, idx) => {
                                        const isActive = previewFile === item.fileUrl
                                        const isUniversity = group.faculty === "Akreditasi Universitas"

                                        return (
                                            <div
                                                key={idx}
                                                onClick={() => setPreviewFile(item.fileUrl)}
                                                className={`p-4 rounded-xl cursor-pointer transition-all border ${isUniversity
                                                        ? 'bg-[#1a365d] text-white border-none'
                                                        : isActive
                                                            ? 'border-[#f6a623] bg-amber-50'
                                                            : 'border-slate-100 hover:border-[#f6a623]'
                                                    }`}
                                            >
                                                <div className="flex justify-between mb-2">
                                                    <span className={`text-[10px] font-bold ${isUniversity ? 'text-amber-300' : 'text-amber-600'
                                                        }`}>
                                                        {item.akreditasi}
                                                    </span>

                                                    {isActive && <CheckCircle2 size={14} />}
                                                </div>

                                                <div className={`text-sm font-bold ${isUniversity ? 'text-white' : 'text-[#1a365d]'
                                                    }`}>
                                                    {item.prodi}
                                                </div>

                                                <div className={`text-[10px] mt-1 ${isUniversity ? 'text-white/70' : 'text-slate-400'
                                                    }`}>
                                                    S/D {item.masaBerlaku}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                            </div>
                        ))}

                    </div>

                    <div className="col-span-8 h-[70vh] bg-slate-50 rounded-2xl flex items-center justify-center overflow-hidden">

                        {previewFile ? (
                            isImage(previewFile) ? (
                                <img src={previewFile} className="max-h-full object-contain p-6" />
                            ) : (
                                <iframe src={`${previewFile}#toolbar=0`} className="w-full h-full" />
                            )
                        ) : (
                            <div className="text-center text-slate-300">
                                <Eye size={40} className="mx-auto mb-3" />
                                <p>Pilih item untuk melihat dokumen</p>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </section>
    )
}