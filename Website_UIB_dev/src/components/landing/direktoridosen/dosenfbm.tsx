'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ExternalLink, User, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react'

const lecturers = [
    { id: "2834772673230352", name: "Anita, S.E., M.M.", link: "https://www.uib.ac.id/anita-s-e-m-m-csrs-csra-csp/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 200" },
    { id: "2646769670130262", name: "Dr. Budi Chandra, S.E., M.M.", link: "https://www.uib.ac.id/dr-budi-chandra-s-e-m-m/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 300" },
    { id: "7954769670130292", name: "Budi Harsono, S.E., M.M.", link: "https://www.uib.ac.id/budi-harsono/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 200" },
    { id: "7058763664230193", name: "Erna Wati, S.E., M.M.", link: "https://www.uib.ac.id/erna-wati-se-mm-csrs-csra-csp/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 200" },
    { id: "3554720621130003", name: "Prof. Dr. Handoko Karjantoro, S.E., M.Sc.", link: "https://www.uib.ac.id/prof-dr-handoko-karjantoro-cpa/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Guru Besar 850" },
    { id: "3336764665130243", name: "Dr. Hendi, S.E., M.M.", link: "https://www.uib.ac.id/dr-hendi-s-e-ak-m-m-ca-cpa-bkp-cfma/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 300" },
    { id: "4246740641130063", name: "Dr. Iskandar Itan, S.E., M.M.", link: "https://www.uib.ac.id/dr-iskandar-itan-crbc/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor Kepala 400" },
    { id: "0551772673230242", name: "Ivone, S.E., M.M.", link: "https://www.uib.ac.id/ivone/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 300" },
    { id: "-", name: "Iwan Suhardjo, S.E., M.Si.", link: "#", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Asisten Ahli" },
    { id: "6448772673130202", name: "Kennardi Tanujaya, S.E., M.M.", link: "https://www.uib.ac.id/kennardi-tanujaya-s-e-m-m-cpa/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 200" },
    { id: "7744767668130422", name: "Dr. Mardianto, S.E., M.M.", link: "https://www.uib.ac.id/dr-mardianto-s-e-m-m-acca/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor Kepala 400" },
    { id: "9443777678230062", name: "Mariska Ramadana, S.Ak., M.M.", link: "https://www.uib.ac.id/mariska-ramadana/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Asisten Ahli" },
    { id: "6836750651230192", name: "Dr. Meiliana, S.E., M.Si", link: "https://www.uib.ac.id/dr-meiliana-s-e-m-si-pma-crm/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 200" },
    { id: "6553766667130193", name: "Dr. Natalis Christian, S.E., M.M.", link: "https://www.uib.ac.id/dr-natalis-christian-s-e-m-m/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor Kepala 550" },
    { id: "0934769670230362", name: "Ria Karina, S.E., M.M.", link: "https://www.uib.ac.id/ria-karina-s-e-m-m/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 200" },
    { id: "1942769670130382", name: "Robby Krisyadi, S.E., M.M.", link: "https://www.uib.ac.id/robby-krisyadi/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 300" },
    { id: "7745770671230322", name: "Dr. Santi Yopie, S.E., M.M.", link: "https://www.uib.ac.id/dr-santi-yopie-s-e-m-m/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 300" },
    { id: "0336771672230253", name: "Sari Dewi, S.E., M.Ak.", link: "https://www.uib.ac.id/sari-dewi-s-e-m-ak/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 300" },
    { id: "1957778679230042", name: "Sheila Septiany, S.Ak., M.M.", link: "https://www.uib.ac.id/sheila-septiany/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Tenaga Pengajar" },
    { id: "7449766667130243", name: "Dr. Supriyanto, S.E., M.M.", link: "https://www.uib.ac.id/dr-santi-yopie-s-e-m-m/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 300" },
    { id: "0353744645130073", name: "Dr. Teddy Jurnali, S.E., M.M. M.Si.", link: "https://www.uib.ac.id/dr-teddy-jurnali-pma-crm/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor Kepala 550" },
    { id: "5462774675130272", name: "Erizal Wibisono Santoso, S.Ak., M.Ak", link: "https://www.uib.ac.id/erizal-wibisono-santoso/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Tenaga Pengajar" },
    { id: "7058763664230193", name: "Serly, S.E., M.M.", link: "https://www.uib.ac.id/serly/", prodi: "Akuntansi", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 200" },
    { id: "3436755656130122", name: "Dr. Adi Neka Fatyandri, B.A., M.B.A.", link: "https://www.uib.ac.id/dr-adi-neka-fatyandri-bba-mba-crm/", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 300" },
    { id: "8261753654130113", name: "Alden Nelson, S.T., M.M.", link: "https://www.uib.ac.id/alden-nelson-st-mm-chcm-ctmp-cirp/", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 300" },
    { id: "9658773674230232", name: "Andina Fasha, S.IP., M.M", link: "https://www.uib.ac.id/andina-fasha/", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Tenaga Pengajar" },
    { id: "6362768669130303", name: "Dr. Antony Sentoso, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor Kepala 400" },
    { id: "4560756657230143", name: "Dessy Aliandrina, S.T., M.Sc., Ph.D", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 200" },
    { id: "2554770671230322", name: "Desty Febria, S.Pd., M.TESOL", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 200" },
    { id: "3643771672230282", name: "Dr. Dewi Khornida Marheni, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 200" },
    { id: "7450769670230273", name: "Dhita Hafizha Asri, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 200" },
    { id: "1459771672130253", name: "Edy Yulianto Putra, S.M., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 300" },
    { id: "9435760661231242", name: "Erilia Kesumahati, S.Si., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 300" },
    { id: "9163752653231063", name: "Dr. Evi Silvana Muchsinati, S.E., M.Si.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 300" },
    { id: "5954769670130272", name: "Fendy Cuandra, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 300" },
    { id: "3847733634130112", name: "Dr. Ferdinand Nainggolan, S.E., M.B.A", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 300" },
    { id: "8049749650130173", name: "Dr. Golan Hasan, S.E., M.Si.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor Kepala 400" },
    { id: "5659771672130322", name: "Hery Haryanto, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 200" },
    { id: "8146769670230333", name: "Dr. Hesniati, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor Kepala 400" },
    { id: "8445772673130212", name: "Hilarius Raditya Priambada Purba, S.Pd., M.Pd.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Asisten Ahli" },
    { id: "3450761662130162", name: "Immanuel Zai, S.T., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 300" },
    { id: "3150764665237003", name: "Isnaini Nuzula Agustin, S.Si, M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 300" },
    { id: "9534750651130182", name: "Dr. Johny Budiman, S.E., S.H, M.M., M.Ak., M.A.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 300" },
    { id: "3446763664237003", name: "Dr. Lady, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 300" },
    { id: "9333762663231033", name: "Dr. Listia Nurjanah, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 200" },
    { id: "5955756657131112", name: "Dr. Muhammad Donal Mon, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 300" },
    { id: "0556751652131093", name: "Dr. Nasar Buntu Laulita, S.T., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor Kepala 400" },
    { id: "7563754655237003", name: "Renny Christiarini, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 300" },
    { id: "9949764665230272", name: "Ridhayati Farid, S.Psi, M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Asisten Ahli" },
    { id: "9538772673230232", name: "Rizni Aulia Qadri, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 300" },
    { id: "9444772673230243", name: "Serly, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 200" },
    { id: "5938778679230060", name: "Siti Rohani, S.M., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Tenaga Pengajar" },
    { id: "6750770671130272", name: "Sukiantono Tang, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 300" },
    { id: "4851753654130102", name: "Dr. Suyono Saputra, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 300" },
    { id: "5438755656130102", name: "Prof. Dr. Wisnu Yuwono, SE., MM, CRM., MCE", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Guru Besar 850" },
    { id: "5138763664130263", name: "Dr. Yandi Suprapto, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor Kepala 400" },
    { id: "9744772673230302", name: "Yuddy Giovanna Priscilla, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 200" },
    { id: "0561747648130113", name: "Dr. Yulfiswandi, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 300" },
    { id: "-", name: "Badriatul Mawadah, S.E., M.M", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "-" },
    { id: "0039755656231073", name: "Yuli Indah Fajar Dini, S.S., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Tenaga Pengajar" },
    { id: "6959754655130092", name: "Yuswardi, S.E., M.M.", prodi: "Manajemen", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 200" },
    { id: "9742770671230342", name: "Dame Afrina Sihombing, S.E., M.M.", prodi: "Pariwisata", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 300" },
    { id: "0647772673230292", name: "Fitriana Aidnilla Sinambela, S.Tr., M.M.", prodi: "Pariwisata", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 200" },
    { id: "8258730631230023", name: "Prof. Dr. Oda Ignatius Besar Hariyanto, M.Si", prodi: "Pariwisata", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Guru Besar 850" },
    { id: "2348769670230313", name: "Dr. Ratih Anggraini, S.Pd, M.M.", prodi: "Pariwisata", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 300" },
    { id: "3638764665130312", name: "Renza Fahlevi, S.E., M.M.", prodi: "Pariwisata", faculty: "Bisnis dan Manajemen", edu: "S2", title: "Lektor 200" },
    { id: "9960779680130082", name: "Fahmi Muhamad Rizky, S.Par., M.Par.", prodi: "Pariwisata", faculty: "Bisnis dan Manajemen", edu: "-", title: "-" },
    { id: "7133749650130153", name: "Dr. Agustinus Setyawan, S.T., M.M.", prodi: "Magister Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor Kepala 400" },
    { id: "4554768669130303", name: "Dr. Candy, S.E., M.M.", prodi: "Magister Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor Kepala 550" },
    { id: "4450751652130062", name: "Dr. Hepy Hefri Ariyanto, S.E., M.M.", prodi: "Magister Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor 300" },
    { id: "0435755656230132", name: "Dr. Lily Purwianti, S.E., M.M.", prodi: "Magister Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor Kepala 550" },
    { id: "7752738639230072", name: "Dr. Lily Sudhartio, M.Sc.", prodi: "Magister Manajemen", faculty: "Bisnis dan Manajemen", edu: "S3", title: "Lektor Kepala 400" },
]

export default function DosenFbm() {
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
                                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-[9px] font-black border ${lecturer.edu === 'S3' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'
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
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${currentPage === page
                                                ? 'bg-[#1a365d] text-white shadow-lg shadow-blue-900/20'
                                                : 'text-slate-400 hover:bg-slate-50'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    )
                                } else if (page === currentPage - 2 || page === currentPage + 2) {
                                    return <span key={page} className="text-slate-300 px-1">...</span>
                                }
                                return null
                            })}
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