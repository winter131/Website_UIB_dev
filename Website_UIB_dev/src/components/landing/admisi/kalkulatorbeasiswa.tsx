'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, CheckCircle2, ArrowRight } from 'lucide-react'

// Data Biaya Sarjana (Semester 1)
export const sarjanaData = [
  { prodi: 'Teknik Sipil', gedung: '10.500.000', ppl: '3.000.000', bpp: '6.000.000', sks: '3.500.000', total: '23.000.000' },
  { prodi: 'Arsitektur', gedung: '10.500.000', ppl: '3.000.000', bpp: '6.000.000', sks: '3.325.000', total: '22.825.000' },
  { prodi: 'Sistem Informasi', gedung: '10.500.000', ppl: '3.000.000', bpp: '6.000.000', sks: '3.325.000', total: '22.825.000' },
  { prodi: 'Teknologi Informasi', gedung: '10.500.000', ppl: '3.000.000', bpp: '6.000.000', sks: '3.150.000', total: '22.650.000' },
  { prodi: 'Manajemen', gedung: '10.500.000', ppl: '3.000.000', bpp: '6.000.000', sks: '3.150.000', total: '22.650.000' },
  { prodi: 'Akuntansi', gedung: '10.500.000', ppl: '3.000.000', bpp: '6.000.000', sks: '3.150.000', total: '22.650.000' },
  { prodi: 'Pariwisata', gedung: '10.500.000', ppl: '5.000.000', bpp: '6.000.000', sks: '3.500.000', total: '25.000.000' },
  { prodi: 'Ilmu Hukum', gedung: '10.500.000', ppl: '3.000.000', bpp: '6.000.000', sks: '3.500.000', total: '23.000.000' },
  { prodi: 'Pendidikan Bahasa Inggris', gedung: '10.500.000', ppl: '3.000.000', bpp: '6.000.000', sks: '3.500.000', total: '23.000.000' },
  { prodi: 'Gizi', gedung: '10.500.000', ppl: '3.000.000', bpp: '6.000.000', sks: '2.975.000', total: '22.475.000' },
  { prodi: 'Biologi', gedung: '10.500.000', ppl: '3.000.000', bpp: '6.000.000', sks: '2.975.000', total: '22.475.000' },
];

const beasiswaTypes = [
  { id: 'none', label: 'Tanpa Beasiswa', discount: 0, gedungDisc: 0 },
  { id: 'unggulan', label: 'Unggulan (100%)', discount: 100, gedungDisc: 100 },
  { id: 'prestasi1', label: 'Prestasi 1 (50%)', discount: 50, gedungDisc: 100 },
  { id: 'prestasi2', label: 'Prestasi 2 (25%)', discount: 25, gedungDisc: 100 },
  { id: 'prestasi3', label: 'Prestasi 3 (10%)', discount: 10, gedungDisc: 100 },
];

export default function KalkulatorBeasiswa() {
  const [selectedProdi, setSelectedProdi] = useState(sarjanaData[0]);
  const [selectedBeasiswa, setSelectedBeasiswa] = useState(beasiswaTypes[0]);

  const parseValue = (val: string) => parseInt(val.replace(/\./g, ''));

  return (
    <div className="mt-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-1 bg-[#e67e22] rounded-full"></div>
        <h3 className="text-2xl font-black text-[#1a365d] uppercase tracking-tight italic">Simulasi <span className="text-[#e67e22]">Beasiswa</span></h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Panel Kiri: Input */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 text-[#1a365d] rounded-xl flex items-center justify-center font-black text-xs">01</div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pilih Program Studi</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sarjanaData.slice(0, 8).map((d, i) => {
                  const isActive = selectedProdi.prodi === d.prodi;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedProdi(d)}
                      className={`
                        relative group px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-tight text-left border transition-all duration-300
                        ${isActive 
                          ? 'bg-[#1a365d] border-[#1a365d] text-white shadow-lg shadow-blue-900/20 translate-x-1' 
                          : 'bg-white border-slate-100 text-slate-500 hover:border-[#e67e22]/30 hover:bg-slate-50'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="relative z-10">{d.prodi}</span>
                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-[#fbc531] scale-125' : 'bg-slate-200 group-hover:bg-[#e67e22]'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-50 text-[#e67e22] rounded-xl flex items-center justify-center font-black text-xs">02</div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pilih Jenis Beasiswa</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {beasiswaTypes.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBeasiswa(b)}
                    className={`px-5 py-4 rounded-2xl text-[10px] font-bold text-center border transition-all ${selectedBeasiswa.id === b.id ? 'bg-[#e67e22] border-[#e67e22] text-white shadow-xl shadow-orange-900/20' : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-300'}`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Panel Kanan: Hasil */}
        <div className="lg:col-span-5 sticky top-[100px]">
          <div className="bg-[#1a365d] rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
            
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fbc531]">Ringkasan Estimasi</h4>
              <CheckCircle2 size={18} className="text-[#fbc531]" />
            </div>

            <div className="space-y-4 mb-10">
              <div className="flex justify-between">
                <span className="text-blue-100/50 text-[10px] font-bold uppercase">Prodi</span>
                <span className="text-xs font-black uppercase tracking-tight">{selectedProdi.prodi}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100/50 text-[10px] font-bold uppercase">Gedung</span>
                <div className="text-right">
                  <span className={`text-[10px] font-bold ${selectedBeasiswa.gedungDisc > 0 ? 'line-through opacity-30 mr-2' : ''}`}>Rp {selectedProdi.gedung}</span>
                  {selectedBeasiswa.gedungDisc > 0 && <span className="text-xs font-black text-[#fbc531]">GRATIS</span>}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100/50 text-[10px] font-bold uppercase">BPP & SKS</span>
                <div className="text-right">
                  <span className={`text-[10px] font-bold ${selectedBeasiswa.discount > 0 ? 'line-through opacity-30 mr-2' : ''}`}>
                    Rp {(parseValue(selectedProdi.bpp) + parseValue(selectedProdi.sks)).toLocaleString('id-ID')}
                  </span>
                  {selectedBeasiswa.discount > 0 && (
                    <span className="text-xs font-black text-[#fbc531]">
                      Rp {((parseValue(selectedProdi.bpp) + parseValue(selectedProdi.sks)) * (1 - selectedBeasiswa.discount / 100)).toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100/50 text-[10px] font-bold uppercase">PPL & Lab</span>
                <span className="text-xs font-black">Rp {selectedProdi.ppl}</span>
              </div>
            </div>

            <div className="bg-white/10 rounded-[32px] p-8 mb-8 border border-white/10 backdrop-blur-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mb-2">Total Semester 1</p>
              <p className="text-4xl font-black text-[#fbc531] tracking-tighter">
                Rp {
                  (
                    (selectedBeasiswa.gedungDisc === 100 ? 0 : parseValue(selectedProdi.gedung)) +
                    parseValue(selectedProdi.ppl) +
                    (parseValue(selectedProdi.bpp) * (1 - selectedBeasiswa.discount / 100)) +
                    (parseValue(selectedProdi.sks) * (1 - selectedBeasiswa.discount / 100))
                  ).toLocaleString('id-ID')
                }
              </p>
            </div>

            <a 
              href="/admisi/pendaftaran"
              className="w-full bg-[#fbc531] text-[#1a365d] py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-white transition-all no-underline shadow-xl shadow-yellow-500/10"
            >
              Daftar Sekarang <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
