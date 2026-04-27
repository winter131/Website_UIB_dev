'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ExternalLink, User, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react'

const lecturers = [
    { id: "5147771672130293", name: "Ade Jaya Saputra, S.T., M.Eng", link: "https://www.uib.ac.id/ade-jaya-saputra-s-t-m-eng/", prodi: "Teknik Sipil", faculty: "Teknik Sipil dan Perencanaan", edu: "S2", title: "Lektor 300" },
    { id: "9145756657130113", name: "Prof. Dr. Ir. Andri Irfan Rifai, S.T., M.T., MA., M. Eng. Tech., IPU, ASEAN Eng,", link: "https://www.uib.ac.id/assoc-prof-dr-ir-andri-irfan-rifai-s-t-m-t-ma-ipm-asean-eng/", prodi: "Teknik Sipil", faculty: "Teknik Sipil dan Perencanaan", edu: "S3", title: "Lektor Kepala 400" },
    { id: "7144741642230103", name: "Ir. Indrastuti, M.M., M.Sc., Ph.D", link: "https://www.uib.ac.id/ir-indrastuti-m-m-m-sc-mappi-ph-d/", prodi: "Teknik Sipil", faculty: "Teknik Sipil dan Perencanaan", edu: "S3", title: "Lektor 200" },
    { id: "8042771672130363", name: "Jody Martin Ginting, S.T., M.Eng", link: "https://www.uib.ac.id/jody-martin-ginting-st-m-eng/", prodi: "Teknik Sipil", faculty: "Teknik Sipil dan Perencanaan", edu: "S2", title: "Lektor 200" },
    { id: "5134738639130073", name: "Dr. Ir. Mulia Pamadi, M.M., M.Hum", link: "https://www.uib.ac.id/dr-ir-mulia-pamadi-m-r-e-ipu-asean-eng-acpe/", prodi: "Teknik Sipil", faculty: "Teknik Sipil dan Perencanaan", edu: "S3", title: "Lektor 300" },
    { id: "5134738639130073", name: "Yusra Aulia Sari, S.T., M.URP., Ph.D", link: "https://www.uib.ac.id/yusra-aulia-sari-s-t-m-urp/", prodi: "Teknik Sipil", faculty: "Teknik Sipil dan Perencanaan", edu: "S3", title: "Lektor 300" },
    { id: "3350747648130093", name: "Dr.-Ing. Ir. Joewono Prasetijo, Dipl. TREND, M.Sc., P.Tech", link: "https://www.uib.ac.id/joewono-prasetijo/", prodi: "Teknik Sipil", faculty: "Teknik Sipil dan Perencanaan", edu: "S3", title: "-" },
    { id: "5149770671230493", name: "Carissa Dinar Aguspriyanti", link: "https://www.uib.ac.id/carissa-dinar-aguspriyanti-s-t-m-a/", prodi: "Arsitektur", faculty: "Teknik Sipil dan Perencanaan", edu: "S2", title: "Lektor 200" },
    { id: "4561772673230253", name: "Gladies Imanda Utami Rangkuty, S.T., M.A.", link: "https://www.uib.ac.id/gladies-imanda-utami-rangkuty-s-t-m-arch/", prodi: "Arsitektur", faculty: "Teknik Sipil dan Perencanaan", edu: "S2", title: "Lektor 200" },
    { id: "2060756657130113", name: "Hendro Murtiono, S.T., M.Ars.", link: "https://www.uib.ac.id/hendro-murtiono-s-t-m-ars-iai/", prodi: "Arsitektur", faculty: "Teknik Sipil dan Perencanaan", edu: "S2", title: "Lektor 300" },
    { id: "4955749650130122", name: "Ir. I Gusti Ngurah Anom Gunawan, S.T., M.Ars", link: "https://www.uib.ac.id/i-gusti-ngurah-anom-gunawan-s-t-m-ars-iai/", prodi: "Arsitektur", faculty: "Teknik Sipil dan Perencanaan", edu: "S2", title: "Lektor 200" },
    { id: "1842763664230392", name: "Jeanny Laurens Pinassang, S.T., M.T.", link: "https://www.uib.ac.id/jeanny-laurens-pinassang-s-t-m-t/", prodi: "Arsitektur", faculty: "Teknik Sipil dan Perencanaan", edu: "S2", title: "Asisten Ahli" },
    { id: "7836774675230242", name: "Lathifa Nursyamsu, S.Ars., M.Arch", link: "https://www.uib.ac.id/lathifa-nursyamsu-s-ars-m-arch/", prodi: "Arsitektur", faculty: "Teknik Sipil dan Perencanaan", edu: "S2", title: "Asisten Ahli" },
    { id: "8561766667231072", name: "Stivani Ayuning Suwarlan, S.T., M.T., Ph.D. ", link: "https://www.uib.ac.id/stivani-ayuning-suwarlan-s-t-m-t-ph-d/", prodi: "Arsitektur", faculty: "Teknik Sipil dan Perencanaan", edu: "S3", title: "Lektor 200" },
]

export default function DosenFtsp() {
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
                                            <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[#1a365d] group-hover:bg-[#1a365d] group-hover:text-white transition-all">
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
                                            lecturer.edu === 'S3' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'
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