'use client'
import React from 'react'
import {
    FileText,
    Calendar,
    CreditCard,
    ArrowRight,
    CheckCircle2,
    Info
} from 'lucide-react'

export default function DocumentDownload() {
    return (
        <div className="space-y-6">
            <div className="bg-[#2A3955] p-8 rounded-[2rem] text-white">
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 opacity-60">Biaya Pendaftaran</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-medium">Jalur Beasiswa</span>
                        <span className="text-lg font-black text-[#e67e22]">Rp 150k</span>
                    </div>
                    <div className="h-px bg-white/10 w-full" />
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-medium">Jalur Reguler</span>
                        <span className="text-lg font-black">Rp 250k</span>
                    </div>
                </div>
                <p className="mt-6 text-[10px] text-white/40 leading-relaxed italic">
                    * Pembayaran via Virtual Account Bank mitra.
                </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <h3 className="text-xs font-black text-[#2A3955] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <span className="w-6 h-1 bg-[#e67e22] rounded-full" /> Berkas Syarat
                </h3>
                <div className="space-y-4">
                    {[
                        'Scan Kartu Keluarga', 'Scan KTP/Pelajar',
                        'Pas Foto Latar Biru', 'Scan Rapor Sem 1-4'
                    ].map((text, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-600">
                            <CheckCircle2 size={14} className="text-[#e67e22] shrink-0" />
                            <span className="text-[11px] font-bold">{text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <a
                href="https://pendaftaran.uib.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 bg-[#e67e22] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#d3731f] transition-all shadow-lg shadow-orange-100"
            >
                Daftar Online <ArrowRight size={16} />
            </a>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                <Info size={18} className="text-blue-500 shrink-0" />
                <p className="text-[9px] text-blue-700 leading-relaxed font-medium">
                    Butuh bantuan? Hubungi WhatsApp Admisi di jam kerja.
                </p>
            </div>
        </div>
    )
}