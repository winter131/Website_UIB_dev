'use client'
import React, { useState, useEffect } from 'react'
import { FileDown, Award, Search, BookOpen, X, Eye } from 'lucide-react'

const accreditationData = [
    {
        faculty: "Akreditasi Universitas",
        programs: [
            { no: 1, prodi: 'Universitas', akreditasi: 'Unggul', fileUrl: '/akreditasi/Sertifikat-Akreditasi-APT-UIB-2025.pdf', masaBerlaku: '15 Okt 2030' },
        ]
    },
    {
        faculty: "Fakultas Ilmu Hukum",
        programs: [
            { no: 1, prodi: 'Ilmu Hukum', akreditasi: 'Unggul', fileUrl: '/akreditasi/ilmu hukum akreditasi.webp', masaBerlaku: '28 Des 2027' },
            { no: 2, prodi: 'Magister Hukum', akreditasi: 'Unggul', fileUrl: '/akreditasi/magister hukum akreditasi.pdf', masaBerlaku: '01 Mei 2029' },
        ]
    },
    {
        faculty: "Fakultas Bisnis dan Manajemen",
        programs: [
            { no: 1, prodi: 'Magister Manajemen', akreditasi: 'Unggul', fileUrl: '/akreditasi/magister manajemen akreditasi.webp', masaBerlaku: '04 Jul 2030' },
            { no: 2, prodi: 'Manajemen', akreditasi: 'Unggul', fileUrl: '/akreditasi/manajemen akreditasi.pdf', masaBerlaku: '02 Agust 2028' },
            { no: 3, prodi: 'Akuntansi', akreditasi: 'Baik Sekali', fileUrl: '/akreditasi/akuntansi akreditasi.webp', masaBerlaku: '31 Agust 2028' },
            { no: 4, prodi: 'Pariwisata', akreditasi: 'B', fileUrl: '/akreditasi/pariwisata akreditasi.webp', masaBerlaku: '03 Nov 2025' }
        ]
    },
    {
        faculty: "Fakultas Ilmu Komputer",
        programs: [
            { no: 1, prodi: 'Sistem Informasi', akreditasi: 'Baik Sekali', fileUrl: '/akreditasi/sistem informasi akreditasi.webp', masaBerlaku: '14 Apr 2028' },
            { no: 2, prodi: 'Teknologi Informasi', akreditasi: 'Baik Sekali', fileUrl: '/akreditasi/teknologi informasi akreditasi.webp', masaBerlaku: '18 Agust 2030' },
        ]
    },
    {
        faculty: "Fakultas Teknik Sipil dan Perencanaan",
        programs: [
            { no: 1, prodi: 'Teknik Sipil', akreditasi: 'Unggul', fileUrl: '/akreditasi/teknik sipil akreditasi.webp', masaBerlaku: '20 Apr 2028' },
            { no: 2, prodi: 'Arsitektur', akreditasi: 'Baik', fileUrl: '/akreditasi/arsitektur akreditasi.webp', masaBerlaku: '16 Feb 2026' },
        ]
    },
    {
        faculty: "Fakultas Pendidikan",
        programs: [
            { no: 1, prodi: 'Pendidikan Bahasa Inggris', akreditasi: 'Baik Sekali', fileUrl: '/akreditasi/pbi akreditasi.pdf', masaBerlaku: '20 Apr 2028' },
        ]
    },
    {
        faculty: "Fakultas Kesehatan dan Sains",
        programs: [
            { no: 1, prodi: 'Biologi', akreditasi: 'Baik', fileUrl: '/akreditasi/biologi akreditasi.pdf', masaBerlaku: '21 Mei 2027' },
            { no: 2, prodi: 'Gizi', akreditasi: 'Baik', fileUrl: '/akreditasi/gizi akreditasi.pdf', masaBerlaku: '28 Mei 2027' },
        ]
    },
    {
        faculty: "Fakultas Kedokteran",
        programs: [
            { no: 1, prodi: 'Kedokteran Program Sarjana', akreditasi: 'Pertama', fileUrl: '/akreditasi/sarjana kedokteran akreditasi.pdf', masaBerlaku: '21 Mei 2027' },
            { no: 2, prodi: 'Pendidikan Profesi Dokter Program Profesi', akreditasi: 'Pertama', fileUrl: '/akreditasi/profesi kedokteran akreditasi.pdf', masaBerlaku: '28 Mei 2027' },
        ]
    },
]

export default function Akreditasi() {
    const [searchTerm, setSearchTerm] = useState('')
    const [previewFile, setPreviewFile] = useState<string | null>(null)

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setPreviewFile(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Memisahkan data Universitas dan Fakultas
    const universityData = accreditationData.find(d => d.faculty === "Akreditasi Universitas")
    const facultyData = accreditationData.filter(d => d.faculty !== "Akreditasi Universitas")

    const filteredFacultyData = facultyData.map(facultyGroup => ({
        ...facultyGroup,
        programs: facultyGroup.programs.filter(program =>
            program.prodi.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(facultyGroup => facultyGroup.programs.length > 0)

    const isImage = (url: string) => /\.(webp|jpg|jpeg|png)$/i.test(url)

    return (
        <section className="py-16 md:py-24 bg-white font-poppins">
            <div className="container mx-auto px-6 md:px-20 max-w-6xl">
                
                {/* --- SEKSI AKREDITASI UNIVERSITAS (SHOW DIRECTLY) --- */}
                {universityData && !searchTerm && (
                    <div className="mb-24">
                        <div className="flex flex-col lg:flex-row gap-12 items-center bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
                            <div className="w-full lg:w-1/2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a365d]/5 text-[#1a365d] text-[10px] font-black uppercase tracking-widest mb-6">
                                    <span className="w-2 h-2 bg-[#f6a623] rounded-full animate-pulse"></span> APT UIB 2025
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-[#1a365d] leading-tight mb-6 tracking-tighter">
                                    Akreditasi <br/> <span className="text-[#f6a623]">Universitas</span>
                                </h2>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="text-5xl font-black text-[#1a365d]">{universityData.programs[0].akreditasi}</div>
                                    <div className="h-10 w-px bg-slate-200"></div>
                                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-tight">
                                        Peringkat <br/> Akreditasi
                                    </div>
                                </div>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-md">
                                    Universitas Internasional Batam secara resmi menyandang predikat Akreditasi <strong>Unggul</strong>, membuktikan standar kualitas pendidikan terbaik bagi mahasiswa.
                                </p>
                                <div className="flex items-center gap-4">
                                    <a 
                                        href={universityData.programs[0].fileUrl} 
                                        download
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a365d] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#f6a623] transition-all duration-500 shadow-lg shadow-blue-900/10"
                                    >
                                        <FileDown size={14} /> Unduh Sertifikat
                                    </a>
                                </div>
                            </div>

                            {/* TAMPILAN SERTIFIKAT LANGSUNG */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative group aspect-[1/1.4] lg:aspect-[4/3] bg-white rounded-2xl shadow-2xl shadow-slate-200 overflow-hidden border-8 border-white">
                                    {isImage(universityData.programs[0].fileUrl) ? (
                                        <img 
                                            src={universityData.programs[0].fileUrl} 
                                            className="w-full h-full object-cover" 
                                            alt="Sertifikat Universitas"
                                        />
                                    ) : (
                                        <iframe 
                                            src={`${universityData.programs[0].fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                                            className="w-full h-full border-none pointer-events-none"
                                            title="Sertifikat Universitas"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors cursor-pointer" onClick={() => setPreviewFile(universityData.programs[0].fileUrl)}></div>
                                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-[#1a365d] shadow-sm">
                                        Perbesar Sertifikat
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- DAFTAR AKREDITASI PRODI --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-black text-[#1a365d] tracking-tighter mb-2">
                            Program Studi
                        </h3>
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.2em]">Daftar Akreditasi Seluruh Program</p>
                    </div>

                    <div className="relative w-full md:w-80 group">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#f6a623] transition-colors" />
                        <input
                            type="text"
                            placeholder="Cari program studi..."
                            className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border-none rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-[#f6a623]/20 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {filteredFacultyData.length > 0 ? (
                        filteredFacultyData.map((facultyGroup, fIdx) => (
                            <div key={fIdx} className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <h4 className="text-[#1a365d] font-black text-[11px] uppercase tracking-[0.3em] whitespace-nowrap">
                                        {facultyGroup.faculty}
                                    </h4>
                                    <div className="h-px w-full bg-slate-100"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {facultyGroup.programs.map((item, pIdx) => (
                                        <div key={pIdx} className="group p-5 bg-white border border-slate-100 rounded-2xl hover:border-[#f6a623]/30 hover:shadow-xl transition-all duration-500">
                                            <div className="flex justify-between items-start mb-4">
                                                <h5 className="text-[15px] font-black text-[#1a365d] leading-snug group-hover:text-[#f6a623] transition-colors pr-4">
                                                    {item.prodi}
                                                </h5>
                                                <span className="shrink-0 px-3 py-1 bg-[#f6a623]/10 text-[#f6a623] text-[9px] font-black rounded-full border border-[#f6a623]/20 uppercase tracking-widest">
                                                    {item.akreditasi}
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                                <div className="text-[10px] font-bold text-slate-400">
                                                    S/D {item.masaBerlaku}
                                                </div>
                                                <button
                                                    onClick={() => setPreviewFile(item.fileUrl)}
                                                    className="inline-flex items-center gap-2 text-[#1a365d] text-[10px] font-black uppercase tracking-widest hover:text-[#f6a623] transition-colors"
                                                >
                                                    Lihat <Eye size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center text-slate-300 font-bold uppercase tracking-widest text-xs">
                            Program studi tidak ditemukan
                        </div>
                    )}
                </div>
            </div>

            {/* --- MODAL PREVIEW --- */}
            {previewFile && (
                <div
                    onClick={() => setPreviewFile(null)}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#1a365d]/95 backdrop-blur-md animate-in fade-in duration-300"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative bg-white w-full max-w-5xl h-[85vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
                    >
                        <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-white z-10">
                            <h4 className="text-[#1a365d] font-black text-[10px] uppercase tracking-[0.2em]">Pratinjau Sertifikat</h4>
                            <div className="flex items-center gap-3">
                                <a href={previewFile} download className="p-2 text-slate-400 hover:text-[#1a365d] transition-all">
                                    <FileDown size={20} />
                                </a>
                                <button onClick={() => setPreviewFile(null)} className="p-2 text-slate-400 hover:text-red-500 transition-all">
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 bg-slate-50 overflow-auto p-4 md:p-10 flex justify-center items-center">
                            {isImage(previewFile) ? (
                                <img src={previewFile} alt="Sertifikat" className="max-w-full max-h-full object-contain shadow-2xl rounded-sm border-8 border-white" />
                            ) : (
                                <iframe src={`${previewFile}#toolbar=0`} className="w-full h-full rounded-xl bg-white border-none" title="PDF Preview" />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
