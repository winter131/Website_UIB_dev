'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight, Info, CreditCard } from 'lucide-react'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import DiskonMahasiswa from '@/components/landing/informasi/diskonmahasiswa'

export default function DiskonMahasiswaView() {
    return (
        <main className="min-h-screen bg-white font-poppins text-slate-700">
            <NavbarLanding />

            {/* --- 1. TOP BANNER (UIB Discount Card Partner) --- */}
            <section className="container mx-auto px-6 md:px-20 pt-32">
                <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100 italic">
                    <img
                        src="/img/Discount-card-new-1024x480.webp"
                        alt="UIB Discount Card Partner Banner"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            {/* --- SECTION: TENTANG PROGRAM (FLOATING OVERLAP STYLE) --- */}
            <section className="py-20 bg-white overflow-hidden">
                <div className="container mx-auto px-6 md:px-20 relative">
                    <div className="flex flex-col lg:flex-row items-center">

                        {/* Sisi Kiri: Foto Kegiatan (60% Width) */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="w-full lg:w-[60%] z-0"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                                <img
                                    src="/img/diskon.webp"
                                    alt="Pertemuan Program UIB Discount Card"
                                    className="w-full h-[300px] md:h-[450px] object-cover"
                                />
                            </div>
                        </motion.div>

                        {/* Sisi Kanan: Kotak Informasi Biru (Floating Overlap) */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="w-full lg:w-[50%] lg:-ml-28 z-10 bg-[#1A365D] p-8 md:p-14 shadow-2xl relative mt-[-40px] lg:mt-0"
                        >
                            {/* Aksen Garis Vertikal Oranye di Sisi Kanan Luar (Sesuai Gambar) */}
                            <div className="absolute top-0 right-0 h-full w-1.5 bg-[#e67e22]" />

                            <div className="relative">
                                {/* Judul dengan ukuran yang lebih terkontrol (text-xl ke text-2xl) */}
                                <h2 className="text-xl md:text-2xl font-black mb-6 uppercase text-white leading-tight tracking-tight">
                                    <span className=" rounded">Tentang Program UIB Discount Card</span>
                                </h2>

                                <div className="space-y-4">
                                    {/* Menggunakan text-xs pada mobile dan text-sm pada desktop agar tidak kebesaran */}
                                    <p className="text-xs md:text-sm leading-relaxed text-white/90 font-normal">
                                        Universitas Internasional Batam (UIB) Discount Card merupakan program pemberian manfaat dari mitra yang bisa berupa diskon/potongan harga atau penawaran istimewa kepada pemegang kartu penanda sivitas akademika UIB, baik sebagai dosen, mahasiswa, alumni serta karyawan.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* --- 3. MANFAAT DISCOUNT CARD --- */}
            <section className="py-4 container mx-auto px-6 md:px-20">
                <h3 className="text-xl font-black text-[#1A365D] mb-4 uppercase tracking-tight flex items-center gap-3">
                    <div className="w-12 h-1.5 bg-[#e67e22] rounded-full" /> Manfaat Discount Card
                </h3>
                <p className='text-sm font-normal text-slate-600 leading-relaxed mb-4'>
                    Adapun manfaat dari program UIB Discount Card ini adalah:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        'Media publikasi dan promosi bagi para mitra dalam memasarkan produknya melalui potongan harga, promo, maupun penawaran lainnya.',
                        'Meningkatkan jumlah mahasiswa baru/konsumen baru bagi kedua belah pihak.',
                        'Memberikan benefit dan fasilitas yang lebih luas bagi pemegang kartu sivitas akademika.',
                        'Meningkatkan word of mouth bagi kedua belah pihak di masyarakat tentang produk dan jasa yang ditawarkan masing-masing.'
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 italic group hover:border-[#e67e22]/30 transition-colors"
                        >
                            <CheckCircle2 size={24} className="text-[#e67e22] shrink-0" />
                            <p className="text-sm font-bold text-slate-600 leading-relaxed">{item}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="py-24 bg-slate-50 mt-10">
                <div className="container mx-auto px-6 md:px-20 text-center">
                    <h3 className="text-2xl font-black text-[#1A365D] mb-16 uppercase tracking-widest">
                        Identitas Pemegang Kartu
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { t: 'Kartu Tanda Mahasiswa UIB', img: '/img/Kartu Tanda Mahasiswa UIB.webp' },
                            { t: 'Kartu Alumni UIB', img: '/img/Kartu Alumni UIB.webp' },
                            { t: 'Kartu Tanda Mahasiswa Magang', img: '/img/Kartu Tanda Mahasiswa Magang UIB.webp' },
                            { t: 'Kartu Tanda Dosen/Karyawan', img: '/img/Kartu Tanda Dosenkaryawan.webp' },
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="relative bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center"
                            >
                                {/* Area Gambar: Center Aligned */}
                                <div className="w-full flex items-center justify-center p-6 bg-white min-h-[180px]">
                                    <img
                                        src={card.img}
                                        alt={card.t}
                                        className="max-w-full h-auto transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                {/* Judul Pindah ke Bawah Gambar */}
                                <div className="w-full p-4 bg-slate-50 border-t border-slate-100 mt-auto">
                                    <p className="text-[10px] font-black uppercase text-[#1A365D] tracking-widest leading-tight">
                                        {card.t}
                                    </p>
                                </div>

                                {/* Garis Oranye Bawah */}
                                <div className="h-1.5 w-full bg-[#e67e22] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 5. BENTUK BENEFIT & KETENTUAN --- */}
            <section className="py-24 container mx-auto px-6 md:px-20">
                <div className="max-w-4xl">
                    <h3 className="text-3xl font-black text-[#1A365D] mb-12 uppercase">Bentuk-bentuk benefit dari pihak mitra:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="pl-8 border-l-4 border-[#e67e22]">
                            <h4 className="text-xl font-black text-[#1A365D] mb-6">1. Potongan Harga (Diskon 5% - 20%)</h4>
                            <ul className="text-sm space-y-4 text-slate-500 font-bold italic">
                                <li className="flex items-center gap-3"><ChevronRight size={14} className="text-[#e67e22]" /> Potongan harga pembelian langsung.</li>
                                <li className="flex items-center gap-3 text-[#1A365D]"><ChevronRight size={14} className="text-[#e67e22]" /> Potongan harga pembelian khusus (Event tertentu).</li>
                                <li className="flex items-center gap-3"><ChevronRight size={14} className="text-[#e67e22]" /> Buy 1 Get 1 / Penawaran paket khusus.</li>
                            </ul>
                        </div>
                        <div className="pl-8 border-l-4 border-[#1A365D]">
                            <h4 className="text-xl font-black text-[#1A365D] mb-6">2. Pemberian Fasilitas/Hadiah</h4>
                            <ul className="text-sm space-y-4 text-slate-500 font-bold italic">
                                <li className="flex items-center gap-3"><ChevronRight size={14} className="text-[#1A365D]" /> Hadiah langsung (Merchandise).</li>
                                <li className="flex items-center gap-3 text-[#1A365D]"><ChevronRight size={14} className="text-[#1A365D]" /> Prioritas pelayanan atau antrean khusus.</li>
                                <li className="flex items-center gap-3"><ChevronRight size={14} className="text-[#1A365D]" /> Tambahan durasi penggunaan jasa.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-20 p-10 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 flex flex-col md:flex-row gap-8 items-center shadow-inner">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                            <Info className="text-blue-600" size={32} />
                        </div>
                        <p className="text-base font-bold text-blue-800 leading-relaxed italic text-center md:text-left">
                            "Setiap calon pendaftar atau pendaftar wajib menunjukkan identitas diri (KTM/Karyawan) sebelum melakukan pembayaran untuk mendapatkan manfaat benefit yang telah disepakati bersama."
                        </p>
                    </div>
                </div>
            </section>

            {/* --- 6. BAGIAN TABEL --- */}
            <DiskonMahasiswa />

            <Footer />
        </main>
    )
}
