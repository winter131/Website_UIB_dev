'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CreditCard, CheckCircle2, ArrowRight } from 'lucide-react'
import KalkulatorBeasiswa, { sarjanaData } from './kalkulatorbeasiswa'

const pascaData = [
  { kategori: 'Umum', total: '50.000.000', s1: '30.000.000', s2: '10.000.000', s3: '10.000.000' },
  { kategori: 'Sivitas Akademika UIB, Alumni dan Kelas Kerja Sama', total: '40.000.000', s1: '20.000.000', s2: '10.000.000', s3: '10.000.000' },
  { kategori: 'Fast Track (Mahasiswa S1 UIB yang mendaftar pada semester 7)', total: '27.000.000', s1: '13.500.000', s2: '6.750.000', s3: '6.750.000' },
];

export default function BiayaKuliahAdmisiInfo() {
  const [activeTab, setActiveTab] = useState('Sarjana')

  return (
    <div className="space-y-12">
      {/* Navigation Tabs */}
      <div className="bg-slate-50 p-1.5 rounded-2xl inline-flex mb-8">
        {['Sarjana', 'Pasca Sarjana', 'RPL'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#2A3955] text-white shadow-lg' : 'text-slate-500 hover:text-[#2A3955]'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        {activeTab === 'Sarjana' && (
          <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-12">
            <div>
              <div className="bg-[#1a365d] p-8 rounded-t-[32px] text-center border-b-4 border-[#e67e22]">
                <h2 className="text-xl font-black text-white uppercase tracking-wider">ESTIMASI <span className="text-[#e67e22]">BIAYA SEMESTER 1</span></h2>
              </div>
              <div className="overflow-x-auto bg-white border border-slate-100 rounded-b-[32px]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[#fbc531]">
                      <th className="py-5 px-6 text-center border border-slate-300 font-black uppercase text-[10px]">Program Studi</th>
                      <th className="py-5 px-4 text-center border border-slate-300 font-black uppercase text-[10px]">Gedung/SPP</th>
                      <th className="py-5 px-4 text-center border border-slate-300 font-black uppercase text-[10px]">PPL</th>
                      <th className="py-5 px-4 text-center border border-slate-300 font-black uppercase text-[10px]">BPP Pokok</th>
                      <th className="py-5 px-4 text-center border border-slate-300 font-black uppercase text-[10px]">Biaya SKS</th>
                      <th className="py-5 px-6 text-center border border-slate-300 font-black uppercase text-[10px] bg-orange-400">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sarjanaData.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors text-center font-bold text-slate-700 text-[10px]">
                        <td className="py-4 px-6 border border-slate-100 text-left bg-slate-50/50 uppercase">{row.prodi}</td>
                        <td className="py-4 px-4 border border-slate-100">{row.gedung}</td>
                        <td className="py-4 px-4 border border-slate-100">{row.ppl}</td>
                        <td className="py-4 px-4 border border-slate-100">{row.bpp}</td>
                        <td className="py-4 px-4 border border-slate-100">{row.sks}</td>
                        <td className="py-4 px-6 border border-slate-100 font-black bg-orange-50 text-[#1a365d]">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <KalkulatorBeasiswa />
          </motion.div>
        )}


        {activeTab === 'Pasca Sarjana' && (
          <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-[#1a365d] p-8 rounded-t-[32px] text-center border-b-4 border-[#e67e22]">
              <h2 className="text-xl font-black text-white uppercase tracking-wider">SKEMA <span className="text-[#e67e22]">PEMBAYARAN S2</span></h2>
            </div>
            <div className="overflow-x-auto bg-white border border-slate-100 rounded-b-[32px] overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#2A3955] text-white">
                    <th className="py-5 px-4 border border-white/10 font-black uppercase text-[10px]" rowSpan={2}>No</th>
                    <th className="py-5 px-8 border border-white/10 font-black uppercase text-[10px] text-center" rowSpan={2}>Kategori</th>
                    <th className="py-5 px-8 border border-white/10 font-black uppercase text-[10px] text-center" rowSpan={2}>Total Biaya</th>
                    <th className="py-5 px-8 border border-white/10 font-black uppercase text-[10px] text-center" colSpan={3}>Cicilan Per Semester</th>
                  </tr>
                  <tr className="bg-[#1e2a3f] text-white">
                    <th className="py-3 px-4 border border-white/10 font-black uppercase text-center text-[9px]">Sem 1</th>
                    <th className="py-3 px-4 border border-white/10 font-black uppercase text-center text-[9px]">Sem 2</th>
                    <th className="py-3 px-4 border border-white/10 font-black uppercase text-center text-[9px]">Sem 3</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] font-bold text-slate-600">
                  {pascaData.map((row, i) => (
                    <tr key={i} className="text-center hover:bg-slate-50 transition-colors">
                      <td className="py-6 px-4 border border-slate-50">{i + 1}</td>
                      <td className="py-6 px-8 border border-slate-50 text-left uppercase tracking-tight">{row.kategori}</td>
                      <td className="py-6 px-8 border border-slate-50 text-[#e67e22]">Rp {row.total}</td>
                      <td className="py-6 px-4 border border-slate-50">Rp {row.s1}</td>
                      <td className="py-6 px-4 border border-slate-50">Rp {row.s2}</td>
                      <td className="py-6 px-4 border border-slate-50">Rp {row.s3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === 'RPL' && (
          <motion.div key="rpl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-[#1a365d] p-10 rounded-[32px] text-white relative overflow-hidden shadow-xl">
              <h2 className="text-2xl font-black uppercase mb-10 flex items-center gap-4 relative z-10">
                BIAYA KULIAH <span className="text-[#fbc531]">JALUR RPL</span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <h3 className="text-lg font-black mb-4 uppercase text-[#fbc531]">Program Sarjana (S1)</h3>
                  <div className="space-y-3 text-[11px] font-bold">
                    <div className="flex justify-between border-b border-white/10 pb-2"><span>Uang Gedung</span><span>Rp 5.000.000,-</span></div>
                    <div className="flex justify-between border-b border-white/10 pb-2"><span>Administrasi</span><span>Rp 3.000.000,-</span></div>
                    <div className="flex justify-between border-b border-white/10 pb-2"><span>BPP Pokok</span><span>Rp 6.000.000,-</span></div>
                    <div className="flex justify-between"><span>Biaya SKS</span><span>Rp 175.000,- /SKS</span></div>
                  </div>
                </div>
                <div className="bg-[#fbc531] p-6 rounded-2xl text-[#1a365d] flex flex-col justify-center text-center">
                  <h3 className="text-lg font-black mb-1 uppercase">Program Magister (S2)</h3>
                  <p className="text-[10px] font-black opacity-70 mb-2 uppercase tracking-widest">BIAYA PAKET TOTAL</p>
                  <div className="text-3xl font-black mb-4">Rp 35.000.000,-</div>
                  <a href="/admisi/pendaftaran" className="px-6 py-3 bg-[#1a365d] text-white rounded-xl font-black uppercase text-[9px] tracking-widest flex items-center justify-center gap-2 no-underline">
                    DAFTAR RPL <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Summary Footer */}
      <div className="p-8 bg-slate-50 rounded-[32px] flex flex-col md:flex-row items-center gap-8 border border-slate-100">
        <div className="bg-[#1a365d] p-4 rounded-2xl text-white">
          <CreditCard size={28} className="text-[#fbc531]" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-lg font-black text-[#1a365d] uppercase tracking-tight">Virtual Account OCBC NISP</h4>
          <p className="text-slate-500 text-[11px] font-medium leading-relaxed">Nikmati kemudahan transaksi biaya kuliah melalui Virtual Account OCBC NISP dan pilihan solusi cicilan pembayaran yang fleksibel.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-[#2A3955] text-[9px] font-black rounded-lg uppercase tracking-wider shadow-sm">
            <CheckCircle2 size={12} className="text-green-500" /> TERINTEGRASI
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-[#2A3955] text-[9px] font-black rounded-lg uppercase tracking-wider shadow-sm">
            <CheckCircle2 size={12} className="text-green-500" /> CICILAN
          </div>
        </div>
      </div>
    </div>
  );
}
