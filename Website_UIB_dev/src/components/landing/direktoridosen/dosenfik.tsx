'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ExternalLink, User, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react'

const lecturers = [
    { id: "7055759660130163", name: "Andik Yulianto, S.T., M.T.", link: "https://www.uib.ac.id/andik-yulianto/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Lektor 300" },
    { id: "4238775676130173", name: "Bayu Syahputra, S.Kom., M.A.", link: "https://www.uib.ac.id/bayu-syahputra/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Asisten Ahli" },
    { id: "0752770671230342", name: "Deli, S.Kom., M.MSI.", link: "https://www.uib.ac.id/deli/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Lektor 300" },
    { id: "7742773674130272", name: "Eryc, S.M., M.M.", link: "https://www.uib.ac.id/eryc/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Lektor 200" },
    { id: "7563771672130453", name: "Fredian Simanjuntak, S.Kom., M.Kom.", link: "https://www.uib.ac.id/fredian-simanjuntak/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Asisten Ahli" },
    { id: "2852750651130152", name: "Dr. Hendi Sama, S.Kom., M.M.", link: "https://www.uib.ac.id/dr-hendi-sama-s-kom-m-m-e-business/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S3", title: "Lektor 300" },
    { id: "5940774675130202", name: "Herman, S.Kom., M.Kom.", link: "https://www.uib.ac.id/herman/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Asisten Ahli" },
    { id: "9857765666231112", name: "Indasari Deu, S.E., M.M.", link: "https://www.uib.ac.id/indasari-deu/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Asisten Ahli" },
    { id: "0741761662130192", name: "Mangapul Siahaan, S.SI., M.M.S.I.", link: "https://www.uib.ac.id/mangapul-siahaan/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Lektor 300" },
    { id: "0648773674130212", name: "Muhamad Dody Firmansyah, S.Kom., M.M.S.I.", link: "https://www.uib.ac.id/muhamad-dody-firmansyah/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Lektor 200" },
    { id: "4642748649230112", name: "Ni'matul Ma'muriyah, M.Eng.", link: "https://www.uib.ac.id/nimatul-mamuriyah/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Lektor 300" },
    { id: "7942755656130182", name: "Dr.-Ing. Sabariman, S.T., M.Sc.", link: "https://www.uib.ac.id/sabariman/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S3", title: "Lektor Kepala 400" },
    { id: "9247750651130153", name: "Surya Tjahyadi, S.T., M.M.", link: "https://www.uib.ac.id/surya-tjahyadi/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Lektor 200" },
    { id: "0860754655130082", name: "Suwarno, S.T., M.M.", link: "https://www.uib.ac.id/suwarno/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Lektor 300" },
    { id: "1534761662130322", name: "Syaeful Anas Aklani, S.Kom., M.Kom.", link: "https://www.uib.ac.id/syaeful-anas-aklani/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Lektor 300" },
    { id: "0258773674130213", name: "Tony Tan, S.Kom., M.Kom.", link: "https://www.uib.ac.id/tony-tan/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Asisten Ahli" },
    { id: "4446764665130213", name: "Tony Wibowo, Ph.D.", link: "https://www.uib.ac.id/tony-wibowo/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S3", title: "Lektor 300" },
    { id: "1642762663130282", name: "Yefta Christian, S.Kom., M.Kom.", link: "https://www.uib.ac.id/yefta-christian/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Lektor 300" },
    { id: "3058754655130093", name: "Zulkarnain, A.Md., S.Kom., M.MSI.", link: "https://www.uib.ac.id/zulkarnain/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Lektor 200" },
    { id: "7748772673130302", name: "Gautama Wijaya, S.Kom., M.T.I", link: "https://www.uib.ac.id/gautama-wijaya/", prodi: "Teknologi Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Asisten Ahli" },
    { id: "2637767668130352", name: "Haeruddin, S.Kom., M.M.S.I", link: "https://www.uib.ac.id/haeruddin/", prodi: "Teknologi Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Lektor 300" },
    { id: "6137757658130173", name: "Heru Wijayanto Aripradono, S.Kom., M.M., M.MT", link: "https://www.uib.ac.id/heru-wijayanto-aripradono/", prodi: "Teknologi Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Lektor 200" },
    { id: "4936773674130232", name: "Jimmy Pratama, S.Kom., M.M.S.I.", link: "#", prodi: "Teknologi Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Lektor 300" },
    { id: "4454770671130253", name: "Stefanus Eko Prasetyo, S.Kom., M.MSI.", link: "https://www.uib.ac.id/stefanus-eko-prasetyo/", prodi: "Teknologi Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "Lektor 300" },
    { id: "5438755656130100", name: "Dr. Wisnu Yuwono, SE., MM", link: "https://www.uib.ac.id/par/dosen-pengajar-par/dr-wisnu-yuwono/", prodi: "Teknologi Informasi", faculty: "Ilmu Komputer", edu: "S3", title: "Lektor Kepala 400" },
    { id: "0353744645130073", name: "Dr. Teddy Jurnali, S.E., M.Si., PMA., CRM.", link: "https://www.uib.ac.id/dr-teddy-jurnali-pma-crm/", prodi: "Teknologi Informasi", faculty: "Ilmu Komputer", edu: "S3", title: "Lektor Kepala 550" },
    { id: "9145756657130113", name: "Prof. Dr. Ir. Andri Irfan Rifai", link: "https://www.uib.ac.id/assoc-prof-dr-ir-andri-irfan-rifai-s-t-m-t-ma-ipm-asean-eng/", prodi: "Teknologi Informasi", faculty: "Ilmu Komputer", edu: "S3", title: "Lektor Kepala" },
    { id: "4549778679230082", name: "Li Cen, S.Kom., M.Kom.", link: "https://www.uib.ac.id/li-cen/", prodi: "Sistem Informasi", faculty: "Ilmu Komputer", edu: "S2", title: "-" },
]

export default function DosenFik() {
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
                                            <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-[#1a365d] group-hover:bg-[#1a365d] group-hover:text-white transition-all">
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
                                            lecturer.edu === 'S3' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
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