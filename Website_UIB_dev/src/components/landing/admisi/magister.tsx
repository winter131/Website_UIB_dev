'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, FileText, UserPlus, Info } from 'lucide-react';

const gelombangData = [
  { nama: 'Gelombang Genap', periode: 'Mei - Juli 2025', tes: 'Agustus 2025', benefit: 'Kuliah mulai September 2025', status: 'Selesai' },
  { nama: 'Gelombang Ganjil', periode: 'November - Desember 2025', tes: 'Januari 2026', benefit: 'Kuliah mulai Februari 2026', status: 'Segera Dibuka' }
];

export default function MagisterGelombang() {
  return (
    <div className="bg-white font-poppins">
      <div className="mb-12">
        <h2 className="text-2xl font-black text-[#1A253A] uppercase tracking-tight">Gelombang <span className="text-[#e67e22]">Magister (S2)</span></h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Program Pascasarjana UIB</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {gelombangData.map((item, index) => (
          <motion.div key={index} className="border border-slate-100 rounded-3xl p-8 hover:shadow-xl transition-all">
            <h3 className="text-lg font-black text-[#1A253A] mb-4 uppercase">{item.nama}</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-sm font-bold text-[#2A3955]"><Clock size={14} /> {item.periode}</div>
              <div className="flex items-center gap-3 text-sm font-bold text-[#2A3955]"><Calendar size={14} /> Tes: {item.tes}</div>
            </div>
            <p className="text-[11px] font-bold text-slate-500 italic">{item.benefit}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-slate-50 rounded-3xl p-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 space-y-4">
          <h4 className="font-black text-[#1A253A] uppercase text-sm">Persyaratan Khusus</h4>
          <ul className="space-y-2 text-xs font-semibold text-slate-600">
            <li>• Ijazah & Transkrip S1 (IPK min 2.75)</li>
            <li>• Skor TOEFL/IELTS (Jika ada)</li>
            <li>• Rekomendasi Akademik/Kerja</li>
          </ul>
        </div>
        <div className="md:w-1/2 space-y-4">
          <h4 className="font-black text-[#1A253A] uppercase text-sm">Program Tersedia</h4>
          <ul className="space-y-2 text-xs font-semibold text-slate-600">
            <li>• Magister Manajemen (MM)</li>
            <li>• Magister Hukum (MH)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}