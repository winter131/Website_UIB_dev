'use client'

import React from 'react';
import Link from 'next/link';
import { Download } from 'lucide-react';

export default function DocumentDownload() {
    return (
        <div className="bg-white border-2 border-slate-50 rounded-xl p-6">
            <h3 className="text-xs font-black text-[#2A3955] mb-5 uppercase tracking-widest border-b border-slate-100 pb-3">Pusat Unduhan</h3>
            <div className="space-y-4">
                {[
                    { name: 'Panduan Pengabdian Masyarakat v.2026', href: '/panduan-abdimas-2026.pdf' },
                    { name: 'Template Proposal Hibah Internal', href: '/template-proposal-hibah.docx' },
                    { name: 'Logbook Harian Kegiatan Lapangan', href: '/logbook-kegiatan.xlsx' }
                ].map((doc, idx) => (
                    <Link key={idx} href={doc.href} target="_blank" className="flex items-start gap-3 group cursor-pointer">
                        <Download size={16} className="mt-1 text-slate-300 group-hover:text-blue-600" />
                        <span className="text-[11px] font-semibold text-slate-600 group-hover:text-[#2A3955] leading-tight transition-colors">{doc.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}