'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, Clock, FileCheck } from 'lucide-react';

export default function ProfesiInfo() {
  return (
    <div className="bg-white font-poppins">
      <div className="mb-12">
        <h2 className="text-2xl font-black text-[#1A253A] uppercase tracking-tight">Program <span className="text-[#e67e22]">Profesi</span></h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Pendidikan Profesi Berkelanjutan</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="border border-slate-100 rounded-3xl p-8">
          <Award className="text-[#e67e22] mb-4" size={32} />
          <h3 className="text-lg font-black text-[#1A253A] mb-4 uppercase">Profesi Akuntansi (PPAk)</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">Pendidikan untuk menyandang gelar Akuntan (Ak) bagi lulusan Sarjana Akuntansi.</p>
          <div className="space-y-3">
             <div className="flex items-center gap-3 text-xs font-bold text-[#2A3955]"><Clock size={14} /> Durasi: 2 Semester</div>
             <div className="flex items-center gap-3 text-xs font-bold text-[#2A3955]"><FileCheck size={14} /> Akreditasi: Baik Sekali</div>
          </div>
        </div>
        <div className="border border-slate-100 rounded-3xl p-8">
          <Award className="text-[#e67e22] mb-4" size={32} />
          <h3 className="text-lg font-black text-[#1A253A] mb-4 uppercase">Program Lainnya</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">UIB terus mengembangkan program pendidikan profesi sesuai kebutuhan industri.</p>
          <button className="text-[10px] font-black uppercase tracking-widest text-[#e67e22] hover:underline">Pantau Update Terbaru</button>
        </div>
      </div>
    </div>
  );
}