'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, BookOpen, ShieldCheck, Zap } from 'lucide-react';

export default function RPLInfo() {
  return (
    <div className="bg-white font-poppins">
      <div className="mb-12">
        <h2 className="text-2xl font-black text-[#1A253A] uppercase tracking-tight"><span className="text-[#e67e22]">RPL</span> (Rekognisi Pembelajaran Lampau)</h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Konversi Pengalaman Kerja Menjadi SKS</p>
      </div>
      <div className="bg-[#2A3955] text-white rounded-[32px] p-8 md:p-12 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="max-w-2xl relative z-10">
          <h3 className="text-xl font-black mb-4 uppercase tracking-tight text-[#e67e22]">Kuliah Lebih Cepat & Hemat</h3>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">Program RPL memungkinkan Anda mendapatkan pengakuan akademik atas pengalaman kerja atau sertifikasi yang telah dimiliki, sehingga masa studi menjadi lebih singkat.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Zap, title: 'Efisiensi Waktu', desc: 'Selesaikan studi lebih cepat dibanding jalur reguler.' },
          { icon: ShieldCheck, title: 'Legalitas Terjamin', desc: 'Sesuai dengan regulasi Kemendikbudristek.' },
          { icon: BookOpen, title: 'Multi Jalur', desc: 'Tersedia untuk berbagai program studi sarjana.' }
        ].map((item, i) => (
          <div key={i} className="p-6 border border-slate-100 rounded-2xl">
            <item.icon className="text-[#e67e22] mb-4" size={24} />
            <h4 className="text-sm font-black text-[#1A253A] uppercase mb-2">{item.title}</h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}