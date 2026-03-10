'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import {
    ChevronRight, Users, BookOpen, Trophy, Star,
    GraduationCap, Heart, Globe2, Award, Music,
    Dumbbell, Microscope, ArrowRight
} from 'lucide-react'

// --- ANIMATED STAT COUNTER ---
function AnimatedStat({ target, label }: { target: number; label: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const [started, setStarted] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
            { threshold: 0.5 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [started])

    useEffect(() => {
        if (!started) return
        const duration = 1500
        const step = Math.ceil(target / (duration / 16))
        let current = 0
        const timer = setInterval(() => {
            current = Math.min(current + step, target)
            setCount(current)
            if (current >= target) clearInterval(timer)
        }, 16)
        return () => clearInterval(timer)
    }, [started, target])

    return (
        <div ref={ref} className="text-center">
            <p className="text-4xl md:text-5xl font-black text-white">{count.toLocaleString()}+</p>
            <p className="text-white/70 text-xs uppercase tracking-widest mt-1 font-medium">{label}</p>
        </div>
    )
}

const organizations = [
    {
        name: "BEM UIB",
        full: "Badan Eksekutif Mahasiswa",
        desc: "Organisasi mahasiswa tertinggi sebagai wadah aspirasi dan pembinaan kepemimpinan di UIB.",
        icon: Users,
        color: "from-blue-600 to-blue-800",
        href: "#"
    },
    {
        name: "HMPS",
        full: "Himpunan Mahasiswa Program Studi",
        desc: "Organisasi per-prodi yang memfasilitasi pengembangan akademik dan non-akademik mahasiswa.",
        icon: GraduationCap,
        color: "from-[#2A3955] to-[#1A253A]",
        href: "#"
    },
    {
        name: "UKM",
        full: "Unit Kegiatan Mahasiswa",
        desc: "Wadah pengembangan bakat dan minat di bidang olahraga, seni, penalaran, dan keagamaan.",
        icon: Star,
        color: "from-orange-500 to-orange-700",
        href: "#"
    },
]

const services = [
    { icon: Trophy, title: "Prestasi Mahasiswa", desc: "Program pendampingan dan apresiasi bagi mahasiswa berprestasi di tingkat nasional dan internasional." },
    { icon: BookOpen, title: "Beasiswa", desc: "Informasi dan layanan beasiswa dari pemerintah, swasta, dan bantuan biaya pendidikan UIB." },
    { icon: Heart, title: "Kesejahteraan", desc: "Layanan konseling, kesehatan, dan dukungan psikososial untuk mendukung kehidupan kampus yang sehat." },
    { icon: Globe2, title: "Program Internasional", desc: "Kesempatan pertukaran pelajar, magang luar negeri, dan program mobilitas global." },
]

// TODO: Ganti dengan data dinamis dari API/backend
const beritaList = [
    {
        title: "Biro Pengembangan Kemahasiswaan dan Alumni Laksanakan Evaluasi Program 2025",
        date: "25 Februari 2026",
        img: "/img/story2.jpg",
        href: "#"
    },
    {
        title: "Funday Anggota UKM Buddha UIB Tahun Akademik 2025/2026",
        date: "31 Januari 2026",
        img: "/img/story1.jpg",
        href: "#"
    },
    {
        title: "Penampilan Band Mahasiswa UIB Turut Memeriahkan Job Fair 2025",
        date: "18 Desember 2025",
        img: "/img/gedungUIB.jpg",
        href: "#"
    },
]

export default function KemahasiswaanView() {
    return (
        <main className="mt-20 bg-white font-sans text-slate-900">
            <NavbarLanding />

            {/* HERO */}
            <section className="relative w-full h-[300px] md:h-[450px] overflow-hidden">
                <Image
                    src="/img/C1700295.jpg"
                    alt="Kemahasiswaan UIB"
                    fill
                    priority
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#2A3955]/90 via-[#2A3955]/50 to-transparent z-10" />
                <div className="absolute inset-0 z-20 flex items-center">
                    <div className="container mx-auto px-8 md:px-20">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                            <p className="text-white/60 text-xs uppercase tracking-[0.2em] font-bold mb-3">Direktorat</p>
                            <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
                                Kemahasiswaan <br />
                                <span className="text-[#f1c40f]">& Alumni</span>
                            </h1>
                            <p className="text-white/70 text-sm md:text-base mt-4 max-w-md font-light">
                                Mendukung pertumbuhan holistik mahasiswa melalui organisasi, layanan, dan program yang berdampak.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* STATS BAR */}
            <section className="bg-[#2A3955] py-10">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        <AnimatedStat target={4033} label="Mahasiswa Aktif" />
                        <AnimatedStat target={10197} label="Total Alumni" />
                        <AnimatedStat target={641} label="Penerima Beasiswa" />
                        <AnimatedStat target={73} label="Mahasiswa Asing" />
                    </div>
                </div>
            </section>

            {/* INTRO SECTION */}
            <section className="py-20 container mx-auto px-6 md:px-20 border-b border-slate-100">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-start">
                    <div className="md:w-1/3">
                        <h2 className="text-3xl md:text-4xl font-black text-[#2A3955] leading-tight mb-4">
                            Membentuk Pemimpin <br /> Masa Depan
                        </h2>
                        <div className="w-16 h-1.5 bg-[#f1c40f] rounded-full"></div>
                    </div>
                    <div className="md:w-2/3 text-slate-500 text-sm md:text-base leading-relaxed space-y-5 font-light text-justify">
                        <p>
                            Direktorat Kemahasiswaan dan Alumni UIB berkomitmen menciptakan ekosistem pengembangan diri yang komprehensif. Kami percaya bahwa pengalaman di luar kelas adalah bagian tak terpisahkan dari pendidikan berkualitas tinggi.
                        </p>
                        <p>
                            Melalui berbagai program organisasi, kompetisi, beasiswa, dan layanan pendukung, kami hadir untuk memastikan setiap mahasiswa UIB tumbuh tidak hanya cerdas secara intelektual, tetapi juga matang secara sosial dan emosional.
                        </p>
                    </div>
                </div>
            </section>

            {/* ORGANISASI MAHASISWA */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-black text-[#2A3955] mb-3">Organisasi Mahasiswa</h2>
                        <div className="w-16 h-1.5 bg-[#f1c40f] mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {organizations.map((org, i) => (
                            <Link href={org.href} key={i} className="group block">
                                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1">
                                    <div className={`bg-gradient-to-br ${org.color} p-8 flex items-center justify-center`}>
                                        <org.icon size={48} className="text-white/80" />
                                    </div>
                                    <div className="p-6">
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{org.full}</p>
                                        <h3 className="text-xl font-black text-[#2A3955] mb-3 group-hover:text-[#e67e22] transition-colors">{org.name}</h3>
                                        <p className="text-sm text-slate-500 font-light leading-relaxed">{org.desc}</p>
                                        <div className="mt-5 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#2A3955] group-hover:text-[#e67e22] transition-colors">
                                            Lihat Detail <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>



            {/* BERITA KEMAHASISWAAN */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="text-center mb-12">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e67e22] mb-2">Informasi Terkini</p>
                        <h2 className="text-3xl md:text-4xl font-black text-[#2A3955]">Berita Kemahasiswaan</h2>
                        <div className="w-16 h-1.5 bg-[#f1c40f] rounded-full mt-3 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {beritaList.map((news, i) => (
                            <Link href={news.href} key={i} className="group block bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                {/* Thumbnail */}
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={news.img}
                                        alt={news.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                                {/* Content */}
                                <div className="p-5">
                                    <p className="text-[11px] text-slate-400 font-medium mb-2">{news.date}</p>
                                    <h4 className="font-black text-[#2A3955] text-sm leading-snug line-clamp-3 group-hover:text-[#e67e22] transition-colors mb-4">
                                        {news.title}
                                    </h4>
                                    <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#2A3955] group-hover:text-[#e67e22] transition-colors">
                                        Baca Selengkapnya <ArrowRight size={12} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-12">
                        <button className="inline-flex items-center gap-2 border-2 border-[#2A3955] text-[#2A3955] px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#2A3955] hover:text-white transition-all duration-300">
                            Tampilkan Lebih Banyak <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA BOTTOM */}
            <section className="bg-[#2A3955] py-16 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="relative z-10 max-w-2xl mx-auto px-6">
                    <GraduationCap size={48} className="mx-auto text-[#f1c40f] mb-5" />
                    <h3 className="text-3xl font-black mb-3">Siap Berkembang Bersama UIB?</h3>
                    <p className="text-white/60 text-sm font-light mb-8">Bergabunglah dengan ribuan mahasiswa yang telah menemukan potensi terbaik mereka di UIB.</p>
                    <Link href="/landing" className="inline-block bg-[#f1c40f] text-[#2A3955] px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all shadow-lg">
                        Jelajahi UIB
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}