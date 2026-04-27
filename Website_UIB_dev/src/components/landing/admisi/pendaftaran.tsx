'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar,
    ChevronRight,
    ArrowRight,
    ExternalLink,
    GraduationCap,
    Clock,
    ClipboardCheck,
    Info,
    CheckCircle2,
    MapPin,
    AlertCircle,
    ChevronDown,
    MessageCircle
} from 'lucide-react';

export default function PendaftaranInfo() {
    const [activeTab, setActiveTab] = useState('Sarjana');

    const [admissionData] = useState({
        'Sarjana': [
            { gelombang: 'Gelombang 1', periode: 'Oktober - Desember 2025', tes: 'Januari 2026', info: 'Potongan Biaya Pendaftaran 50%', status: 'Dibuka', type: 'Early Bird' },
            { gelombang: 'Gelombang 2', periode: 'Januari - Maret 2026', tes: 'April 2026', info: 'Tersedia Jalur Beasiswa Prestasi', status: 'Mendatang', type: 'Reguler' },
        ],
        'Pascasarjana': [
            { gelombang: 'Intake Ganjil', periode: 'Mei - Juli 2026', tes: 'Agustus 2026', info: 'Program Magister & Doktor', status: 'Dibuka', type: 'Intake' },
        ],
        'Profesi': [
            { gelombang: 'Periode I', periode: 'Maret - April 2026', tes: 'Mei 2026', info: 'Khusus Pendidikan Profesi Akuntansi', status: 'Mendatang', type: 'Professional' },
        ],
        'Internasional': [
            { gelombang: 'Joint Degree', periode: 'Februari - Mei 2026', tes: 'Review Portfolio', info: 'Global Partnership Program', status: 'Dibuka', type: 'International' },
        ],
        'RPL': [
            { gelombang: 'Tipe A', periode: 'Sepanjang Tahun', tes: 'Asesmen Portofolio', info: 'Konversi Pengalaman Kerja ke SKS', status: 'Dibuka', type: 'Experience Based' }
        ]
    });

    const [jadwalSeleksi] = useState([
        { tanggal: '12 Jan 2026', status: 'Sedang Dibuka', nama: 'Seleksi Prestasi Unggulan', kategori: 'Beasiswa' },
        { tanggal: '15 Feb 2026', status: 'Segera Dibuka', nama: 'Ujian Saringan Masuk Gel. 1', kategori: 'Reguler' },
        { tanggal: '10 Mar 2026', status: 'Segera Dibuka', nama: 'Seleksi Jalur Kerjasama', kategori: 'Kemitraan' },
    ]);

    const tabs = Object.keys(admissionData);

    return (
        <div className="bg-white font-sans selection:bg-orange-100">
            <div className="max-w-6xl mx-auto px-4 py-12">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-slate-100 pb-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-8 h-[2px] bg-[#e67e22]"></span>
                            <span className="text-[#e67e22] text-xs font-bold uppercase tracking-widest">Admisi UIB 2026</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                            Rencanakan <span className="text-[#e67e22]">Pendidikanmu</span>
                        </h2>
                        <p className="text-slate-500 mt-3 text-base leading-relaxed">
                            Pilih jenjang yang sesuai dengan minatmu. Berikut adalah estimasi jadwal seleksi dan periode pendaftaran aktif untuk tahun akademik 2026.
                        </p>
                    </div>

                    {/* Urgency Badge */}
                    <div className="lg:flex items-center gap-3 bg-orange-50 border border-orange-100 p-4 rounded-2xl">
                        <AlertCircle className="text-[#e67e22]" size={20} />
                        <div className="text-xs">
                            <p className="font-bold text-slate-800">Benefit Gelombang 1</p>
                            <p className="text-slate-500 text-[10px]">Dapatkan potongan biaya pendaftaran sebesar 50%</p>
                        </div>
                    </div>
                </div>

                {/* Navigasi Tab */}
                <nav className="flex bg-slate-50 p-1.5 rounded-2xl mb-12 overflow-x-auto no-scrollbar border border-slate-100 shadow-sm">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 min-w-[120px] py-3.5 px-4 rounded-xl text-xs font-bold transition-all duration-300 ${activeTab === tab
                                ? 'bg-[#2A3955] text-white shadow-lg'
                                : 'text-slate-500 hover:bg-white hover:text-[#2A3955]'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Sidebar Info Card */}
                    <div className="lg:col-span-4">
                        <motion.div
                            key={activeTab + "card"}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#2A3955] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-300"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <GraduationCap size={120} />
                            </div>

                            <h3 className="text-xl font-bold mb-6 relative z-10">Mengapa Bergabung di {activeTab}?</h3>
                            <ul className="space-y-6 relative z-10">
                                {[
                                    { icon: <CheckCircle2 size={18} />, text: "Akreditasi Institusi Unggul" },
                                    { icon: <MessageCircle size={18} />, text: "Konsultasi Karir & Minat Bakat" },
                                    { icon: <Info size={18} />, text: "Banyak Pilihan Skema Beasiswa" },
                                    { icon: <MapPin size={18} />, text: "Koneksi Industri Global" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4">
                                        <div className="text-[#e67e22] mt-1">{item.icon}</div>
                                        <p className="text-sm font-medium text-slate-200 leading-snug">{item.text}</p>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                                <p className="text-xs text-slate-300 italic">"Kami membimbing Anda dari proses pendaftaran hingga sukses di dunia kerja."</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Timeline List */}
                    <div className="lg:col-span-8 space-y-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                {admissionData[activeTab]?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative group bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 hover:shadow-2xl hover:shadow-slate-100 transition-all border-l-4 hover:border-l-[#e67e22]"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between gap-6">
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded text-slate-500 uppercase tracking-widest">{item.type}</span>
                                                    {item.status === 'Dibuka' && (
                                                        <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full animate-pulse">
                                                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                                            REGISTRASI AKTIF
                                                        </span>
                                                    )}
                                                </div>

                                                <h4 className="text-xl font-bold text-slate-800 mb-6">{item.gelombang}</h4>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                                    <div className="flex gap-4">
                                                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-[#e67e22] transition-colors">
                                                            <Calendar size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Periode Daftar</p>
                                                            <p className="text-sm font-bold text-slate-700">{item.periode}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-[#2A3955] transition-colors">
                                                            <ClipboardCheck size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tanggal Seleksi</p>
                                                            <p className="text-sm font-bold text-slate-700">{item.tes}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[#e67e22] bg-orange-50/50 p-3 rounded-xl border border-orange-100">
                                                    <Info size={14} />
                                                    <span>{item.info}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-center">
                                                <a href="https://pendaftaran.uib.ac.id"
                                                    className="inline-flex items-center justify-center gap-3 bg-[#2A3955] text-white px-8 py-4 rounded-2xl text-xs font-bold hover:bg-[#e67e22] transition-all shadow-lg hover:shadow-orange-200 no-underline whitespace-nowrap group-hover:scale-105 transform">
                                                    Daftar Online <ArrowRight size={18} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>

                        {/* Help Desk Banner */}
                        <div className="bg-slate-900 rounded-3xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4 text-center md:text-left">
                                <div className="p-3 bg-white/10 rounded-2xl hidden md:block">
                                    <MessageCircle className="text-[#e67e22]" />
                                </div>
                                <div>
                                    <h5 className="text-sm font-bold tracking-tight">Konsultasi Admisi Gratis</h5>
                                    <p className="text-xs text-white/60">Hubungi kami jika memiliki kendala pendaftaran.</p>
                                </div>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <button className="flex-1 md:flex-none bg-[#e67e22] px-6 py-3 rounded-xl text-xs font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-orange-900/20">
                                    Kontak via WA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Jadwal Seleksi Mendatang */}
                <div className="mt-20 py-12 bg-slate-50/50 rounded-[40px] px-6 md:px-10 border border-slate-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 uppercase">Jadwal <span className="text-[#e67e22]">Ujian Masuk</span></h2>
                            <p className="text-slate-500 text-xs mt-1 font-medium italic">Simpan tanggal penting di bawah ini agar tidak terlewat.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {jadwalSeleksi.map((item, i) => (
                            <div key={i} className="flex flex-col md:flex-row items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 hover:border-orange-200 transition-all shadow-sm">
                                <div className="flex flex-wrap items-center gap-6 w-full md:w-auto">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tgl Ujian</span>
                                        <span className="text-sm font-black text-[#2A3955]">{item.tanggal}</span>
                                    </div>
                                    <div className="h-8 w-[1px] bg-slate-100 hidden md:block"></div>
                                    <div className="flex flex-col">
                                        <span className={`text-[9px] font-black uppercase mb-1 ${item.status === 'Sedang Dibuka' ? 'text-green-600' : 'text-orange-500'}`}>{item.status}</span>
                                        <h3 className="text-sm font-bold text-slate-800">{item.nama}</h3>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                                    <span className="text-[9px] font-bold bg-slate-50 text-slate-500 px-3 py-1 rounded-full">{item.kategori}</span>
                                    <button className="bg-white border-2 border-[#2A3955] text-[#2A3955] px-6 py-2 rounded-xl text-[10px] font-black hover:bg-[#2A3955] hover:text-white transition-all uppercase tracking-widest">
                                        Beli PIN
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Banner Tes Minat Bakat */}
                <div className="mt-16 bg-gradient-to-br from-[#2A3955] to-[#0F172A] rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <MessageCircle size={300} />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 leading-tight">Masih Ragu dengan Pilihan Jurusan?</h3>
                        <p className="text-slate-300 text-sm md:text-base font-medium mb-8">
                            Ikuti Tes Minat Bakat (Psychotest) yang dirancang khusus untuk membantu Anda menemukan potensi terbaik. Layanan ini tersedia gratis bagi pendaftar Gelombang 1.
                        </p>
                        <button className="bg-[#e67e22] text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white hover:text-[#2A3955] transition-all flex items-center gap-3 shadow-xl">
                            Konsultasi Sekarang <ArrowRight size={18} />
                        </button>
                    </div>
                </div>



            </div>
        </div>
    );
}