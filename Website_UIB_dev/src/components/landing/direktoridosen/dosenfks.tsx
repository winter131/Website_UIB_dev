'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ExternalLink, User, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react'

const lecturers = [
    { id: "50773674230293", name: "Adelia Paradya Zetta, S.Gz. M.Gz.", link: "https://www.uib.ac.id/adelia-paradya-zetta-s-gz-m-gz/", prodi: "Gizi", faculty: "Kesehatan dan Sains", edu: "S2", title: "Tenaga Pengajar" },
    { id: "58764665231173", name: "dr. Beatrice Cynthia Walter, SpGK", link: "https://www.uib.ac.id/dr-beatrice-cynthia-walter-spgk/", prodi: "Gizi", faculty: "Kesehatan dan Sains", edu: "S2", title: "Tenaga Pengajar" },
    { id: "4357777678230130", name: "Prananingrum Kinasih, S.Gz., M.Gz.", link: "https://www.uib.ac.id/prananingrum-kinasih-s-gz-m-gz/", prodi: "Gizi", faculty: "Kesehatan dan Sains", edu: "S2", title: "Tenaga Pengajar" },
    { id: "2139777678230120", name: "Miftahul Jannah, S.Gz., M.Gz.", link: "https://www.uib.ac.id/miftahul-jannah-s-gz-m-gz/", prodi: "Gizi", faculty: "Kesehatan dan Sains", edu: "S2", title: "Tenaga Pengajar" },
    { id: "5534774675230290", name: "Wahyu Aulia Hasibuan, S.Tr.Gz., M.Gz.", link: "#", prodi: "Gizi", faculty: "Kesehatan dan Sains", edu: "S2", title: "Tenaga Pengajar" },
    { id: "9436770671130300", name: "Khoirul Anwar, S. Si., M. Si", link: "https://www.uib.ac.id/khoirul-anwar-s-si-m-si/", prodi: "Biologi", faculty: "Kesehatan dan Sains", edu: "S2", title: "Tenaga Pengajar" },
    { id: "8259770671230320", name: "Mona Fathia, S. Si., M. Si", link: "https://www.uib.ac.id/mona-fathia-s-si-m-si/", prodi: "Biologi", faculty: "Kesehatan dan Sains", edu: "S2", title: "Tenaga Pengajar" },
    { id: "6735771672230370", name: "Witri Winanda, S. Si., M. Si", link: "https://www.uib.ac.id/witri-winanda-s-si-m-si/", prodi: "Biologi", faculty: "Kesehatan dan Sains", edu: "S2", title: "Tenaga Pengajar" },
    { id: "5840779680130060", name: "Azizul Berlyansah, S.Si., M.Biomed., AIFO.", link: "https://www.uib.ac.id/azizul-berlyansah-s-si-m-biomed-aifo/", prodi: "Biologi", faculty: "Kesehatan dan Sains", edu: "S2", title: "Tenaga Pengajar" },
    { id: "-", name: "Ramadani Fitra, S. Si., M. Si", link: "https://www.uib.ac.id/ramadani-fitra/", prodi: "Biologi", faculty: "Kesehatan dan Sains", edu: "S2", title: "Tenaga Pengajar" },
]

export default function DosenFks() {
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const filteredLecturers = lecturers.filter(lecturer => 
        lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.prodi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.id.includes(searchTerm)
    )

    const totalPages = Math.ceil(filteredLecturers.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const currentLecturers = filteredLecturers.slice(startIndex, startIndex + itemsPerPage)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="w-full">
            <div className="mb-8">
                <div className="relative max-w-md group">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1a365d] transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Cari dosen atau program studi..." 
                        className="w-full pl-12 pr-6 py-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium focus:bg-white focus:ring-4 focus:ring-blue-900/5 focus:border-[#1a365d]/20 outline-none transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value)
                            setCurrentPage(1)
                        }}
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-100">
                            <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">NUPTK</th>
                            <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Nama Dosen</th>
                            <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Program Studi</th>
                            <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] text-center">Jenjang</th>
                            <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Jabatan Akademik</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        <AnimatePresence mode="wait">
                            {currentLecturers.map((lecturer, i) => (
                                <motion.tr 
                                    key={lecturer.id + i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="group hover:bg-slate-50/50 transition-colors"
                                >
                                    <td className="px-5 py-3.5 text-[11px] font-medium text-slate-400 font-mono">
                                        {lecturer.id}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-[#1a365d] group-hover:bg-[#1a365d] group-hover:text-white transition-all">
                                                <User size={12} />
                                            </div>
                                            <a 
                                                href={lecturer.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-xs font-bold text-[#1a365d] hover:text-[#f6a623] transition-colors flex items-center gap-1"
                                            >
                                                {lecturer.name}
                                                {lecturer.link && lecturer.link !== "#" && <ExternalLink size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                                            </a>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className="text-[11px] font-bold text-slate-500 px-2.5 py-0.5 bg-slate-100/50 rounded-md">
                                            {lecturer.prodi}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-center">
                                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[9px] font-black border ${
                                            lecturer.edu === 'S3' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}>
                                            {lecturer.edu}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className="text-[12px] font-bold text-[#1a365d]">{lecturer.title}</span>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>

                {filteredLecturers.length === 0 && (
                    <div className="py-20 text-center">
                        <GraduationCap size={40} className="mx-auto text-slate-200 mb-3" />
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Dosen tidak ditemukan</p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-between px-2">
                    <p className="text-xs text-slate-400 font-medium">
                        Menampilkan <span className="text-[#1a365d] font-bold">{startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredLecturers.length)}</span> dari <span className="text-[#1a365d] font-bold">{filteredLecturers.length}</span> dosen
                    </p>
                    <div className="flex items-center gap-1.5">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                                        currentPage === page 
                                        ? 'bg-[#1a365d] text-white shadow-lg shadow-blue-900/20' 
                                        : 'text-slate-400 hover:bg-slate-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg border border-slate-100 text-slate-400 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}