'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ExternalLink, User, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react'

const lecturers = [
    { id: "2663773674130212", name: "Dr. Abdurrakhman Alhakim, S.H., M.H.", link: "https://www.uib.ac.id/abdurrakhman-alhakim/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S3", title: "Lektor 300" },
    { id: "4146767668130343", name: "Agustianto, S.H, M.Kn.", link: "https://www.uib.ac.id/agustianto/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S2", title: "Lektor 300" },
    { id: "5655773674130302", name: "Dr. David Tan, S.H., M.H., M.Kn., M.M.", link: "https://www.uib.ac.id/david-tan/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S3", title: "Lektor 300" },
    { id: "6463773674230192", name: "Emiliya Febriyani, S.H., M.H.", link: "https://www.uib.ac.id/emiliya-febriyani/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S2", title: "Tenaga Pengajar" },
    { id: "6950770671130282", name: "Febri Jaya, S.H., M.H.", link: "https://www.uib.ac.id/febri-jaya/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S2", title: "Lektor 200" },
    { id: "1444770671130282", name: "Dr. Hari Sutra Disemadi, S.H., M.H.", link: "https://www.uib.ac.id/dr-hari-sutra-disemadi-s-h-m-h/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S3", title: "Lektor 300" },
    { id: "339774675230203", name: "Ninne Zahara Silviani, S.H., M.H.", link: "https://www.uib.ac.id/ninne-zahara-silviani/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S2", title: "Asisten Ahli" },
    { id: "3351760661230133", name: "Dr. Nurlaily, S.E., S.H., M.Kn.", link: "https://www.uib.ac.id/dr-nurlaily-s-e-s-h-m-kn/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S3", title: "Lektor 200" },
    { id: "9936732633130042", name: "Dr. Rufinus Hotmaulana Hutauruk, S.H., M.M., M.H.", link: "https://www.uib.ac.id/rufinus-hotmaulana-hutauruk/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S3", title: "Lektor 300" },
    { id: "0935760661230232", name: "Shelvi Rusdiana, S.H., M.H.", link: "https://www.uib.ac.id/shelvi-rusdiana/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S2", title: "Asisten Ahli" },
    { id: "5139757658231133", name: "Shenti Agustini, S.H., M.H.", link: "https://www.uib.ac.id/shenti-agustini/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S2", title: "Lektor 200" },
    { id: "9936753654130122", name: "Tantimin, S.H., M.H.", link: "https://www.uib.ac.id/tantimin/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S2", title: "Lektor 300" },
    { id: "543771672230272", name: "Winda Fitri, S.H., M.H.", link: "https://www.uib.ac.id/winda-fitri/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S2", title: "Lektor 300" },
    { id: "7243767668130303", name: "Dr. Windi Afdal, S.H., M.H.", link: "https://www.uib.ac.id/windi-afdal/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S3", title: "Lektor 200" },
    { id: "2435770671230273", name: "Assoc. Prof. Dr. Winsherly Tan, S.H., M.H.", link: "https://www.uib.ac.id/winsherly-tan/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S3", title: "Lektor Kepala 400" },
    { id: "2236739640130073", name: "Dr. Ampuan Situmeang, S.H., M.H.", link: "https://www.uib.ac.id/dr-ampuan-situmeang-s-h-m-h/", prodi: "Magister Hukum", faculty: "Hukum", edu: "S3", title: "Lektor Kepala 400" },
    { id: "3543756657130143", name: "Dr. Florianus Yudhi Priyo Amboro, S.H., M.Hum.", link: "https://www.uib.ac.id/dr-fl-yudhi-priyo-amboro-s-h-m-hum/", prodi: "Magister Hukum", faculty: "Hukum", edu: "S3", title: "Lektor Kepala 400" },
    { id: "6056735636230030", name: "Prof. Dr. Hj. Elza Syarief, S.H., M.H.", link: "https://www.uib.ac.id/prof-dr-elza-syarief-s-h-m-h/", prodi: "Magister Hukum", faculty: "Hukum", edu: "S3", title: "Guru Besar 850" },
    { id: "4444747648130100", name: "Dr. Lu Sudirman, S.H., M.M., M.Hum.", link: "https://www.uib.ac.id/dr-lu-sudirman-s-h-m-m-m-hum/", prodi: "Magister Hukum", faculty: "Hukum", edu: "S3", title: "Lektor Kepala 550" },
    { id: "9459747648230080", name: "Rina Shahriyani Shahrullah, S.H., M.C.L., Ph.D.", link: "https://www.uib.ac.id/rina-shahriyani-shahrullah-s-h-mcl-ph-d/", prodi: "Magister Hukum", faculty: "Hukum", edu: "S3", title: "Lektor Kepala 550" },
    { id: "8552778679230103", name: "Hanifah Ghafila Romadona, S.H., M.H..", link: "https://www.uib.ac.id/hanifah-ghafila-romadona/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S2", title: "Tenaga Pengajar" },
    { id: "8646779680230072", name: "Nadia Carolina Weley, S.H., M.H.", link: "https://www.uib.ac.id/nadia-carolina-weley/", prodi: "Ilmu Hukum", faculty: "Hukum", edu: "S2", title: "Tenaga Pengajar" },
    { id: "8546755656230100", name: "Dr. Triana Dewi Seroja, S.H., M.Hum.", link: "https://www.uib.ac.id/dr-triana-dewi-seroja-s-h-m-hum/", prodi: "Magister Hukum", faculty: "Hukum", edu: "S3", title: "Lektor 200" },
]

export default function DosenFh() {
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
                                            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-[#1a365d] group-hover:bg-[#1a365d] group-hover:text-white transition-all">
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
                                            lecturer.edu === 'S3' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
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