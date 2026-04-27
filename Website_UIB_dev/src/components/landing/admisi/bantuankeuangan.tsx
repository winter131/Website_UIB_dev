'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, HeartHandshake, ShieldAlert, BadgeInfo } from 'lucide-react';

export default function BantuanKeuanganInfo() {
  return (
    <div className="bg-white font-poppins">
      <div className="mb-12">
        <h2 className="text-2xl font-black text-[#1A253A] uppercase tracking-tight"><span className="text-[#e67e22]">Bantuan</span> Keuangan</h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Solusi Pembayaran Fleksibel untuk Anda</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 border border-slate-100 rounded-3xl hover:border-[#e67e22]/30 transition-all group">
          <CreditCard className="text-[#e67e22] mb-4" size={32} />
          <h3 className="text-lg font-black text-[#1A253A] mb-4 uppercase">Cicilan Biaya Kuliah</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">Program cicilan bulanan tanpa bunga (0%) untuk meringankan beban biaya pendidikan selama masa studi.</p>
          <ul className="space-y-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <li className="flex items-center gap-2">• Tenor hingga 6-12 Bulan</li>
            <li className="flex items-center gap-2">• Tanpa Jaminan</li>
            <li className="flex items-center gap-2">• Proses Cepat</li>
          </ul>
        </div>
        <div className="p-8 border border-slate-100 rounded-3xl hover:border-[#e67e22]/30 transition-all">
          <HeartHandshake className="text-[#e67e22] mb-4" size={32} />
          <h3 className="text-lg font-black text-[#1A253A] mb-4 uppercase">Dana Darurat Pendidikan</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">Bantuan khusus bagi mahasiswa yang mengalami kendala finansial mendadak agar studi tetap berlanjut.</p>
          <button className="px-6 py-3 bg-[#2A3955] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#e67e22] transition-all">Ajukan Konsultasi</button>
        </div>
      </div>
    </div>
  );
}