'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Star, BookOpenCheck, ArrowRight, Award } from 'lucide-react';

export default function SertifikasiInfo() {
  const certifications = [
    {
      title: 'Sertifikasi IT',
      items: ['Adobe Certified Professional', 'Microsoft Office Specialist', 'Cisco Certified (CCNA)'],
      icon: <Globe size={20} />,
      color: 'blue'
    },
    {
      title: 'Sertifikasi Bahasa',
      items: ['TOEFL ITP / iBT', 'IELTS Preparation', 'Business English'],
      icon: <BookOpenCheck size={20} />,
      color: 'orange'
    },
    {
      title: 'Akuntansi & Pajak',
      items: ['Zahir Accounting', 'Certified Public Accountant', 'Tax Brevet A & B'],
      icon: <ShieldCheck size={20} />,
      color: 'slate'
    },
    {
      title: 'Manajemen & Bisnis',
      items: ['Manajemen Proyek', 'Digital Marketing', 'LSP UIB (BNSP)'],
      icon: <Star size={20} />,
      color: 'orange'
    }
  ];

  return (
    <div className="bg-white font-sans selection:bg-orange-100">
      {/* Header Kecil */}
      <div className="mb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-2 h-2 rounded-full bg-[#e67e22] animate-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Credential Center</span>
          </div>
          <h2 className="text-2xl font-black text-[#1A253A] uppercase tracking-tight">
            Pusat <span className="text-[#e67e22]">Sertifikasi</span>
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Uji kompetensi berstandar internasional untuk mahasiswa dan umum.</p>
        </div>
        <button className="text-[11px] font-black text-[#1A253A] uppercase flex items-center gap-2 group hover:text-[#e67e22] transition-colors">
          Lihat Semua Jadwal Ujian <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Grid Sertifikasi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {certifications.map((cat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="group p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 hover:border-[#e67e22]/20 transition-all duration-300"
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-all shadow-sm ${cat.color === 'orange' ? 'bg-orange-100 text-[#e67e22]' :
              cat.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-600'
              }`}>
              {cat.icon}
            </div>

            <h3 className="text-xs font-black text-[#1A253A] uppercase mb-3 tracking-wider leading-tight">
              {cat.title}
            </h3>

            <ul className="space-y-2 mb-4">
              {cat.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[11px] font-bold text-slate-500 leading-snug">
                  <div className="mt-1 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-slate-100 mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-[9px] font-black text-[#e67e22] uppercase tracking-widest flex items-center gap-1">
                Daftar Ujian <ArrowRight size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}