'use client'
import React from 'react'
import { motion } from 'framer-motion'
import {
    FaUserGraduate, FaChalkboardTeacher, FaUsers, FaUserTie,
    FaGraduationCap, FaLaptopCode, FaCertificate, FaRunning,
    FaBriefcase, FaMicrophone, FaFlask, FaBook
} from 'react-icons/fa'
import { HiAcademicCap } from 'react-icons/hi2'

const stats = [
    { label: 'Guru Besar', value: '4', icon: <FaUserGraduate className="w-5 h-5" /> },
    { label: 'Lektor Kepala', value: '25', icon: <FaUserTie className="w-5 h-5" /> },
    { label: 'Lektor', value: '93', icon: <FaChalkboardTeacher className="w-5 h-5" /> },
    { label: 'Asisten Ahli', value: '9', icon: <FaUsers className="w-5 h-5" /> },
    { label: 'Tenaga Pengajar', value: '37', icon: <FaUsers className="w-5 h-5" /> },
];

const systems = [
    { name: 'Portal Mahasiswa', icon: <FaGraduationCap />, desc: 'Nilai, KRS, & akademik' },
    { name: 'Pembelajaran Daring', icon: <FaLaptopCode />, desc: 'E-learning & materi' },
    { name: 'Layanan Sertifikasi', icon: <FaCertificate />, desc: 'Pendaftaran sertifikat' },
    { name: 'Student Activities', icon: <FaRunning />, desc: 'Kegiatan mahasiswa' },
    { name: 'Kerja Praktek', icon: <FaBriefcase />, desc: 'Pengajuan magang' },
    { name: 'Daftar Sidang', icon: <FaMicrophone />, desc: 'Tugas akhir & skripsi' },
    { name: 'SIM LPPM', icon: <FaFlask />, desc: 'Penelitian & pengabdian' },
    { name: 'Sister', icon: <HiAcademicCap />, desc: 'Sumber daya terintegrasi' },
    { name: 'Sumber Pembelajaran', icon: <FaBook />, desc: 'Perpustakaan digital' },
];

export default function AksesUIB() {
    return (
        <div className="w-full bg-slate-50 font-sans pb-12 pt-[90px]">
            {/* Hero Section - Shorter */}
            <section className="relative w-full h-[180px] flex items-center justify-center overflow-hidden bg-[#1a365d]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d] to-[#2A4B8C] opacity-90"></div>
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 text-center px-6"
                >
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight uppercase">Akses UIB</h1>
                    <div className="w-12 h-1 bg-[#fbc531] mx-auto rounded-full mb-4"></div>
                    <p className="text-blue-100 text-sm max-w-lg mx-auto font-medium opacity-80">
                        Gerbang digital layanan dan sistem informasi terintegrasi UIB.
                    </p>
                </motion.div>
            </section>

            {/* Stats Section - More Compact */}
            <section className="max-w-5xl mx-auto -mt-10 relative z-20 px-4">
                <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 p-5 md:p-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
                        {stats.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex flex-col items-center border-r last:border-0 border-slate-100 md:px-2"
                            >
                                <div className="w-9 h-9 bg-blue-50 text-[#1a365d] rounded-xl flex items-center justify-center mb-2">
                                    {item.icon}
                                </div>
                                <div className="text-[#1a365d] text-2xl font-black">
                                    {item.value}
                                </div>
                                <div className="text-slate-400 text-[9px] font-bold uppercase tracking-widest text-center">
                                    {item.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Systems Grid - Smaller Cards */}
            <section className="max-w-5xl mx-auto mt-12 px-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-[#1a365d] text-xl font-black tracking-tight uppercase">Sistem Informasi</h2>
                        <div className="h-0.5 w-10 bg-[#fbc531] mt-1"></div>
                    </div>
                    <div className="bg-slate-200 text-[#1a365d] px-4 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-wider">
                        9 Layanan
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {systems.map((sys, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.03 }}
                            whileHover={{ y: -4, shadow: '0 10px 30px -10px rgb(26 54 93 / 0.2)' }}
                            className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col items-start text-left cursor-pointer transition-all group relative overflow-hidden"
                        >
                            <div className="w-10 h-10 bg-slate-50 text-[#1a365d] rounded-xl flex items-center justify-center mb-4 text-xl group-hover:bg-[#1a365d] group-hover:text-white transition-colors">
                                {sys.icon}
                            </div>

                            <h4 className="text-[#1a365d] font-black text-sm mb-1 group-hover:text-[#e67e22] transition-colors uppercase tracking-tight">
                                {sys.name}
                            </h4>
                            <p className="text-slate-400 text-[11px] font-medium leading-tight">
                                {sys.desc}
                            </p>

                            <div className="mt-4 flex items-center text-[9px] font-black text-[#1a365d] uppercase tracking-widest opacity-40 group-hover:opacity-100">
                                <span>Akses</span>
                                <div className="ml-1 w-3 h-px bg-[#1a365d] transition-all group-hover:w-5"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>


        </div>
    )
}

