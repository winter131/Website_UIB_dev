'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users2, Star, Sparkles, ArrowRight, Landmark, CheckCircle2, Info } from 'lucide-react';

export default function BeasiswaAdmisiInfo() {
    const scholarshipList = [
        {
            title: 'Beasiswa Cemerlang',
            tag: 'Full Scholarship',
            icon: Trophy,
            criteria: [
                'Warga Negara Indonesia',
                'Lulus SMA/SMK/MA/Sederajat',
                'Usia maksimal 21 tahun',
                'Nilai Rata-rata Rapor minimal 8.50',
                'Nilai USM (Ujian Saringan Masuk) ≥ 80',
                'Prestasi akademik/non-akademik minimal tingkat provinsi'
            ],
            benefits: [
                { label: 'Gratis 100% Biaya Laboratorium', color: 'blue' },
                { label: 'Gratis 100% Biaya Kuliah (BPP & SKS)', color: 'red' },
                { label: 'Gratis 100% Uang SPP/Uang Gedung', color: 'orange' }
            ]
        },
        {
            title: 'Beasiswa Insan Mandiri',
            tag: 'Bantuan Sosial',
            icon: Users2,
            criteria: [
                'Warga Negara Indonesia',
                'Usia maksimal 21 tahun',
                'Nilai Rata-rata Rapor minimal 7.50',
                'Nilai USM ≥ 65',
                'Keluarga kurang mampu (KIP/SKTM)'
            ],
            benefits: [
                { label: 'Gratis 100% Biaya Laboratorium', color: 'blue' },
                { label: 'Gratis 100% Biaya Kuliah (BPP & SKS)', color: 'red' },
                { label: 'Gratis 100% Uang SPP/Uang Gedung', color: 'orange' }
            ]
        },
        {
            title: 'Beasiswa Prestasi 1',
            tag: 'Partial 50%',
            icon: Star,
            criteria: [
                'Warga Negara Indonesia',
                'Usia maksimal 21 tahun',
                'Nilai Rata-rata Rapor minimal 8.00',
                'Nilai USM ≥ 80'
            ],
            benefits: [
                { label: 'Gratis 100% Uang SPP/Uang Gedung', color: 'blue' },
                { label: 'Gratis 50% Biaya Kuliah (BPP & SKS)', color: 'red' }
            ]
        },
        {
            title: 'Beasiswa Prestasi 2',
            tag: 'Partial 25%',
            icon: Star,
            criteria: [
                'Warga Negara Indonesia',
                'Usia maksimal 21 tahun',
                'Nilai Rata-rata Rapor minimal 7.50',
                'Nilai USM ≥ 70'
            ],
            benefits: [
                { label: 'Gratis 100% Uang SPP/Uang Gedung', color: 'blue' },
                { label: 'Gratis 25% Biaya Kuliah (BPP & SKS)', color: 'red' }
            ]
        },
        {
            title: 'Beasiswa Prestasi 3',
            tag: 'Gedung 100%',
            icon: Star,
            criteria: [
                'Nilai Rata-rata Rapor minimal 7.50',
                'Nilai USM ≥ 60'
            ],
            benefits: [
                { label: 'Gratis 100% Uang SPP/Uang Gedung', color: 'blue' }
            ]
        },
        {
            title: 'Beasiswa Prestasi 4',
            tag: 'Gedung 75%',
            icon: Star,
            criteria: [
                'Nilai Rata-rata Rapor minimal 7.00',
                'Nilai USM ≥ 50'
            ],
            benefits: [
                { label: 'Gratis 75% Uang SPP/Uang Gedung', color: 'blue' }
            ]
        }
    ];

    return (
        <div className="bg-white font-sans selection:bg-orange-100">
            <div className="max-w-6xl mx-auto px-4 py-12">

                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-[#e67e22] animate-pulse" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Credential Center</span>
                        </div>
                        <h2 className="text-2xl font-black text-[#1A253A] uppercase tracking-tight">
                            Beasiswa <span className="text-[#e67e22]">UIB</span>
                        </h2>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Uji kompetensi berstandar internasional untuk mahasiswa dan umum.</p>
                    </div>

                </div>

                <div className="grid grid-cols-1 gap-10">
                    {scholarshipList.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 overflow-hidden flex flex-col lg:flex-row"
                        >
                            <div className="p-8 lg:p-12 lg:w-3/5">
                                <div className="flex items-center gap-5 mb-8">
                                    <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center text-[#e67e22] group-hover:bg-[#2A3955] group-hover:text-white transition-all duration-500 shadow-inner">
                                        <item.icon size={28} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">{item.title}</h4>
                                        </div>
                                        <span className="text-[10px] font-black bg-orange-50 text-[#e67e22] px-3 py-1 rounded-lg uppercase tracking-widest">{item.tag}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <Info size={14} /> Kualifikasi Pendaftar
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                        {item.criteria.map((text, idx) => (
                                            <div key={idx} className="flex items-start gap-3 text-[13px] text-slate-600 font-medium">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                                <span className="leading-tight">{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 lg:p-12 lg:w-2/5 bg-slate-50/50 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 text-center lg:text-left">Cakupan Beasiswa</p>
                                <div className="space-y-3">
                                    {item.benefits.map((benefit, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-4 rounded-2xl flex items-center gap-4 transition-all border shadow-sm ${benefit.color === 'blue' ? 'bg-[#2A3955] border-[#2A3955] text-white shadow-blue-900/10' :
                                                benefit.color === 'red' ? 'bg-[#C0392B] border-[#C0392B] text-white shadow-red-900/10' :
                                                    'bg-[#e67e22] border-[#e67e22] text-white shadow-orange-900/10'
                                                }`}
                                        >
                                            <CheckCircle2 size={18} className="shrink-0" />
                                            <span className="text-[12px] font-black uppercase leading-none tracking-wide">
                                                {benefit.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <button className="mt-10 group/btn flex items-center justify-center lg:justify-start gap-3 text-[10px] font-black uppercase text-slate-400 hover:text-[#2A3955] transition-all tracking-[0.2em]">
                                    Detail Persyaratan <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>


            </div>
        </div>
    );
}