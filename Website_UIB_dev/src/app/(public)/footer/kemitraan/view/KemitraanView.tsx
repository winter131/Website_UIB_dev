'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import {
    ChevronRight, Award, Globe2, Building2,
    Handshake, Users, Sparkles, MapPin,
    ArrowRight, FileDown, GraduationCap
} from 'lucide-react'

// --- COMPONENT: MODERN LINK (ULTRA SMOOTH) ---
const ModernLink = ({ text, href, light = false }: { text: string, href: string, light?: boolean }) => (
    <Link href={href} className="group relative inline-flex flex-col items-start pt-3 w-fit cursor-pointer overflow-visible">
        <div className={`flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.12em] transition-all duration-500 ease-[0.33,1,0.68,1] group-hover:translate-x-3 ${light ? 'text-white' : 'text-[#1A253A]'}`}>
            {text}
            <ChevronRight size={16} className="transition-transform duration-500 ease-[0.33,1,0.68,1]" />
        </div>
        <div className="mt-1 h-[2px] bg-[#f1c40f] rounded-full transition-all duration-500 ease-[0.33,1,0.68,1] w-8 group-hover:w-[calc(100%+15px)]" />
    </Link>
)

export default function KemitraanView() {
    const kemitraanList = [
        { title: "Kemitraan Dengan Global", link: "/", icon: Globe2, desc: "Jejaring kemitraan nasional dan internasional melalui program investasi riset dan mobilitas global." },
        { title: "Institusi Pendidikan", link: "/landing/footer/kemitraan/pendidikan", icon: GraduationCap, desc: "Kontribusi di bidang pendidikan mencakup berbagai bentuk kerjasama kurikulum dan riset bersama." },
        { title: "Pemerintah/BUMN/BUMD", link: "/landing/footer/kemitraan/pemerintah", icon: Building2, desc: "Kemitraan sektor publik untuk pengembangan kebijakan strategis dan pemberdayaan ekonomi daerah." },
        { title: "Kemitraan Dengan DUDI", link: "/landing/footer/kemitraan/dudi", icon: Handshake, desc: "Sinergi dengan dunia usaha dan dunia industri (DUDI) untuk sinkronisasi kompetensi lulusan." },
        { title: "Organisasi Non-Pemerintah", link: "/landing/footer/kemitraan/ngo", icon: Users, desc: "Melibatkan NGO dalam program pengabdian masyarakat dan penyelesaian isu sosial berkelanjutan." },
        { title: "Kemitraan Dengan UMKM", link: "/landing/footer/kemitraan/umkm", icon: Sparkles, desc: "Kemitraan yang efektif untuk meningkatkan daya saing UMKM melalui digitalisasi dan pendampingan." },
    ];

    return (
        <main className="mt-20 bg-white font-poppins selection:bg-[#1A253A] selection:text-white">
            <NavbarLanding />

            {/* 1. HERO IMAGE SECTION - ENHANCED WITH OVERLAY */}
            <section className="w-full relative overflow-hidden">
                <div className="relative h-[250px] md:h-[400px] w-full">
                    <Image
                        src="/img/C1700307.jpg"
                        alt="Hero Kemitraan"
                        fill
                        priority
                        className="object-cover object-[center_10%]"
                    />
                    {/* Gradient Overlay Premium */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A253A]/90 via-[#1A253A]/40 to-transparent z-10 flex items-center">
                        <div className="container mx-auto px-6 md:px-20">
                            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                                <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tighter">
                                    Strategic <br /> <span className="text-[#f1c40f]">Partnership.</span>
                                </h1>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. DESKRIPSI TEKS - REFINED TYPOGRAPHY */}
            <section className="py-20 container mx-auto px-6 md:px-20 border-b border-slate-100">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-10 items-start">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-3xl md:text-4xl font-black text-[#1A253A] leading-[1.1] mb-4">
                                Membangun Sinergi <br /> Berkelanjutan
                            </h2>
                            <div className="w-16 h-1.5 bg-[#e67e22] rounded-full"></div>
                        </div>
                        <div className="w-full md:w-2/3 text-sm md:text-base text-slate-500 leading-relaxed space-y-6 text-justify font-light">
                            <p>
                                Universitas Internasional Batam berkomitmen untuk memajukan ilmu pengetahuan melalui ekosistem pendidikan yang adaptif. Berdasarkan regulasi nasional, kami menempatkan kemitraan sebagai pilar utama dalam pengembangan kurikulum yang relevan dengan kebutuhan industri masa depan.
                            </p>
                            <p>
                                Melalui Biro Humas dan Kerja Sama, UIB menjadi jembatan strategis antara dunia akademik dan stakeholder global untuk menciptakan lulusan yang kompetitif dan berintegritas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SECTION PENGHARGAAN - PREMIUM CARD STYLE */}
            <section className="py-24 bg-[#F8FAFC]">
                <div className="container mx-auto px-6 md:px-20 space-y-24">
                    {/* Award 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 bg-[#1A253A]/5 text-[#1A253A] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                <Award size={14} className="text-[#f1c40f]" /> Recognition 2022
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-[#1A253A] leading-tight">UIB Meraih Bronze Winner pada Anugerah Diktiristek 2022</h3>
                            <p className="text-slate-500 font-light leading-relaxed">Pada Anugerah Diktiristek 2022, Universitas Internasional Batam dengan bangga meraih Bronze Winner untuk kategori Pelaporan Kerja Sama Terbaik di Perguruan Tinggi Swasta, sebuah pencapaian yang mencerminkan komitmen kami terhadap kualitas dan transparansi dalam setiap kolaborasi.</p>
                        </div>
                        <div className="w-full md:w-72 aspect-[3/4] relative rounded-m overflow-hidden shadow-2xl border-2 border-white bg-white">
                            <Image src="/img/bronze.webp" alt="Award 2022" fill className="object-contain p-4" />
                        </div>
                    </div>


                    <div className="flex flex-col md:flex-row-reverse items-center gap-16 max-w-6xl mx-auto">
                        <div className="flex-1 space-y-6 md:text-right">
                            <div className="inline-flex items-center gap-2 bg-[#1A253A]/5 text-[#1A253A] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest md:flex-row-reverse">
                                <Award size={14} className="text-[#f1c40f]" /> Recognition 2023
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-[#1A253A] leading-tight">UIB Meraih Silver Winner pada Di Anugerah Diktisaintek 2024</h3>
                            <p className="text-slate-500 font-light leading-relaxed">Di Anugerah Diktisaintek 2024, Universitas Internasional Batam berhasil mempertahankan Silver Winner, sebagai bukti dedikasi kami yang berkelanjutan dalam mengelola dan menyempurnakan setiap aspek kerja sama yang kami jalin.</p>
                        </div>
                        <div className="w-full md:w-72 aspect-[3/4] relative rounded-xl overflow-hidden shadow-2xl border-8 border-white bg-white">
                            <Image src="/img/diktisaintek.webp" alt="Award 2023" fill className="object-contain p-4" />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 bg-[#1A253A]/5 text-[#1A253A] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                <Award size={14} className="text-[#f1c40f]" /> Recognition 2022
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-[#1A253A] leading-tight">UIB Meraih Silver WinnerPada Anugerah Diktiristek 2023</h3>
                            <p className="text-slate-500 font-light leading-relaxed"> Pada Anugerah Diktiristek 2023, Universitas Internasional Batam melangkah lebih jauh dengan meraih Silver Winner, menegaskan konsistensi kami dalam meningkatkan kualitas dan mengoptimalkan pelaporan kerja sama yang terus berkembang.</p>
                        </div>
                        <div className="w-full md:w-72 aspect-[3/4] relative rounded-m overflow-hidden shadow-2xl border-2 border-white bg-white">
                            <Image src="/img/silver.webp" alt="Award 2022" fill className="object-contain p-4" />
                        </div>
                    </div>

                </div>
            </section>

            {/* 4. GRID KEMITRAAN - MODERN BENTO CARDS */}
            <section className="py-24 container mx-auto px-6 md:px-20">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-[#1A253A] mb-4">Kategori Kerjasama</h2>
                    <div className="w-20 h-1.5 bg-[#e67e22] mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {kemitraanList.map((item, index) => (
                        <div key={index} className="group border border-slate-100 p-8 rounded-xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                                <item.icon size={100} className="text-[#1A253A]/5" />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-xl font-black text-[#1A253A] mb-4 group-hover:text-[#e67e22] transition-colors">{item.title}</h4>
                                <p className="text-sm text-slate-500 font-light mb-8 leading-relaxed line-clamp-3">{item.desc}</p>
                                <ModernLink text="Selengkapnya" href={item.link} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. BLUE CTA SECTION - GLASSMORPHISM */}
            <section className="bg-[#e67e22] py-16 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="container mx-auto px-6 md:px-20 relative z-10 flex flex-col md:flex-row gap-12 items-center max-w-6xl">
                    <div className="flex-1 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-black leading-tight">Jajaki Kemitraan Strategis</h2>
                        <p className="text-white/80 font-light leading-relaxed">
                            Kami bermitra dengan berbagai sektor industri untuk membangun masa depan pendidikan yang lebih inklusif dan berdampak.
                        </p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md flex items-center gap-6 border border-white/20 shadow-2xl min-w-[320px]">
                        <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center shadow-lg">
                            <MapPin className="text-[#e67e22]" size={28} />
                        </div>
                        <div>
                            <p className="font-black text-sm uppercase tracking-widest">Biro Humas & Kerja Sama</p>
                            <p className="text-xs text-white/70">Gedung A, Lantai 1, Kampus UIB</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. BOTTOM CTA - DARK & BOLD */}
            <section className="bg-[#1A253A] py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="relative z-10 border border-white/10 inline-block p-10 rounded-2xl bg-white/5 backdrop-blur-sm max-w-xl mx-auto group">
                    <Handshake size={48} className="mx-auto text-[#f1c40f] mb-6 transition-transform group-hover:scale-110" />
                    <h3 className="text-white text-3xl font-black mb-4">Inisiasi Kerja Sama Baru</h3>
                    <p className="text-slate-400 text-sm mb-8 font-light">Mari melangkah bersama dalam membangun peradaban pengetahuan yang lebih baik.</p>
                    <button className="bg-white text-[#1A253A] px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#e67e22] hover:text-white transition-all shadow-xl shadow-black/20">
                        <Link href="/">Unduh Rencana Kerja Sama</Link>
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    )
}
