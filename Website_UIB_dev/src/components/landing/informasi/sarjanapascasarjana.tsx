import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    ArrowDownToLine,
    CreditCard,
    ChevronRight,
    CheckCircle2,
    Monitor,
    Info,
    Mail,
    Phone,
    ExternalLink
} from 'lucide-react';

export default function SarjanaPascasarjana() {
    const [activeTab, setActiveTab] = useState<'s1' | 's2'>('s1')

    return (
        <main className="min-h-screen bg-white font-poppins text-[#2A3955]">
            <div className="container mx-auto px-6 md:px-20 pt-40 pb-20">
                {/* --- HEADER --- */}

                {/* --- ACCORDION CONTROLS --- */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab('s1')}
                        className={`flex-1 p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${activeTab === 's1' ? 'border-[#2A3955] bg-[#2A3955] text-white' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
                    >
                        <div className="text-left">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Program</span>
                            <h3 className="text-xl font-black uppercase">Sarjana (S1)</h3>
                        </div>
                        <ChevronDown className={`transition-transform duration-300 ${activeTab === 's1' ? 'rotate-180 text-[#e67e22]' : ''}`} />
                    </button>

                    <button
                        onClick={() => setActiveTab('s2')}
                        className={`flex-1 p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${activeTab === 's2' ? 'border-[#2A3955] bg-[#2A3955] text-white' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'}`}
                    >
                        <div className="text-left">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Program</span>
                            <h3 className="text-xl font-black uppercase">Pascasarjana (S2)</h3>
                        </div>
                        <ChevronDown className={`transition-transform duration-300 ${activeTab === 's2' ? 'rotate-180 text-[#e67e22]' : ''}`} />
                    </button>
                </div>

                {/* --- CONTENT AREA --- */}
                <div className="max-w-5xl">
                    <AnimatePresence mode="wait">
                        {activeTab === 's1' ? (
                            <motion.div
                                key="s1-content"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-16"
                            >
                                {/* SEKSI A - SARJANA */}
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
                                        <span className="text-[#e67e22]">A.</span> Persyaratan Pendaftaran
                                    </h2>
                                    <p className="text-sm font-medium text-slate-500 leading-relaxed italic border-l-4 border-slate-100 pl-6">
                                        Pendaftaran terdiri dari Jalur Beasiswa dan Reguler. Dilakukan secara daring melalui <a href="http://pendaftaran.uib.ac.id/" className="text-[#e67e22] font-black underline">pendaftaran.uib.ac.id</a>.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold">
                                        <div className="p-4 bg-slate-50 rounded-xl flex items-center gap-3">
                                            <CreditCard className="text-[#e67e22]" size={20} />
                                            <span>Reguler: Rp 250.000,00 | Beasiswa: Rp 150.000,00</span>
                                        </div>
                                    </div>
                                    <ul className="space-y-3 pl-2 text-sm font-bold text-slate-700">
                                        {['Mengisi formulir online', 'Salinan KK & KTP/Kartu Pelajar/Paspor', 'Foto background biru (Kemeja Putih)', 'Rapor Akhir Sem. Ganjil & Genap Kelas X & XI'].map((text, i) => (
                                            <li key={i} className="flex items-center gap-3"><ChevronRight size={18} className="text-[#e67e22]" /> {text}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* SEKSI B - USM SARJANA */}
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3"><span className="text-[#e67e22]">B.</span> Ujian Saringan Masuk (USM)</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pl-2">
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-black uppercase tracking-widest text-[#e67e22]">1. Tahapan Ujian</h4>
                                            <p className="text-sm font-bold">• CBT: <span className="font-medium text-slate-500">MTK, B. Indo, B. Inggris (120 Menit)</span></p>
                                            <p className="text-sm font-bold">• Wawancara: <span className="font-medium text-slate-500">Tes lisan dengan Dosen (5–10 Menit)</span></p>
                                        </div>
                                        <div className="space-y-3">
                                            <h4 className="text-xs font-black uppercase tracking-widest">2. Aturan USM (Offline/Online)</h4>
                                            <p className="text-xs leading-relaxed text-slate-500 font-medium">Offline: Kemeja putih, celana hitam kain, sepatu. Membawa alat tulis & kartu ujian. <br /> Online: Zoom, HP Android sebagai perangkat ujian.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* SEKSI C - DAFTAR ULANG */}
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3"><span className="text-[#e67e22]">C.</span> Pendaftaran Ulang</h2>
                                    <div className="space-y-4 pl-2 text-sm font-bold">
                                        <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#e67e22]" /> Ambil LoA di akun pendaftaran masing-masing.</p>
                                        <p className="flex items-center gap-2 underline underline-offset-4 decoration-[#e67e22]"><CheckCircle2 size={16} className="text-[#e67e22]" /> Bayar biaya kuliah minimal Rp 3.000.000,00.</p>
                                        <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#e67e22]" /> Unggah Bukti Transfer & Surat Pernyataan (Lampiran 2 & 3).</p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="s2-content"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-16"
                            >
                                {/* --- PASCASARJANA CONTENT --- */}
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
                                        <span className="text-[#e67e22]">A.</span> Persyaratan & Program Studi
                                    </h2>
                                    <div className="p-6 bg-slate-50 rounded-2xl border-l-4 border-[#e67e22]">
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Program Studi Tersedia:</p>
                                        <h4 className="text-xl font-black text-[#2A3955]">Magister Hukum & Magister Manajemen</h4>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-black uppercase text-[#e67e22] tracking-widest">1. Pendaftaran Online</h4>
                                            <p className="text-sm font-medium text-slate-500">Melalui portal resmi: <a href="http://pendaftaran.uib.ac.id/" className="font-bold underline text-[#2A3955]">pendaftaran.uib.ac.id</a></p>
                                        </div>
                                        <div className="space-y-4 text-sm font-bold">
                                            <h4 className="text-xs font-black uppercase tracking-widest">2. Berkas Offline (Dokumen)</h4>
                                            <ul className="space-y-2 text-slate-500 font-medium text-xs">
                                                <li>• Foto Akta Kelahiran & Kartu Keluarga (KK)</li>
                                                <li>• Fotocopy KTP</li>
                                                <li>• Legalisir Ijazah & Transkrip Nilai S1 (1 lembar)</li>
                                                <li>• Pas foto 4x6 (2 lembar), Background Biru, Kemeja Putih</li>
                                                <li>• Mengisi Formulir Pendaftaran S2</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* USM S2 */}
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3"><span className="text-[#e67e22]">B.</span> Ujian Saringan Masuk (USM)</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-2">
                                        {['Ujian Bahasa Inggris (TOEFL)', 'Tes Potensi Akademik (TPA)', 'Interview / Wawancara'].map((tes, i) => (
                                            <div key={i} className="p-4 border border-slate-100 rounded-xl flex items-center gap-3 text-xs font-black uppercase tracking-tighter">
                                                <Monitor size={16} className="text-[#e67e22]" /> {tes}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-blue-50 text-blue-700 rounded-xl text-[11px] font-black uppercase">
                                        <Info size={16} /> Perkuliahan Dilakukan Secara Offline
                                    </div>
                                </div>

                                {/* BIAYA & KONTAK S2 - LAYOUT ATAS BAWAH */}
                                <div className="pt-10 border-t border-slate-100 flex flex-col gap-10 relative z-10">

                                    {/* BAGIAN ATAS: KONTAK */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-[#2A3955] flex items-center gap-2">
                                            <span className="w-4 h-0.5 bg-[#e67e22]"></span> C. Kontak Informasi
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Opsional: kontak tetap bisa grid 2 kolom agar tidak terlalu panjang ke bawah */}
                                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                                                <Mail size={16} className="text-[#e67e22]" />
                                                <span className="text-xs font-bold text-slate-600">humas@uib.ac.id</span>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                                                <Phone size={16} className="text-[#e67e22]" />
                                                <span className="text-xs font-bold text-slate-600">WhatsApp: 0821-7149-1781</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* BAGIAN BAWAH: GAMBAR BIAYA */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-[#2A3955] flex items-center gap-2">
                                            <span className="w-4 h-0.5 bg-[#e67e22]"></span> D. Informasi Biaya
                                        </h4>

                                        <div className="bg-white  border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden group">
                                            <img
                                                src="/uploads/Jadwal-USM-S1-1536x159.webp"
                                                alt="Tabel Biaya Pascasarjana UIB"
                                                className="w-full h-auto group-hover:scale-[1.01] transition-transform duration-700"
                                            />
                                        </div>

                                        <p className="text-[10px] text-slate-400 font-medium italic text-center">
                                            * Klik gambar untuk memperbesar informasi tabel biaya.
                                        </p>
                                    </div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>


            </div>
        </main>
    );
}
