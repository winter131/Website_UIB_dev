'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import {
    ChevronLeft, ChevronRight, FileText, Download, Send,
    LayoutTemplate, Users, Calendar, MapPin,
    ArrowUpRight, Quote, CheckCircle2,
    School
} from 'lucide-react'

export default function ConesintechView() {
    const steps = [
        { date: "15 Jan 2026", title: "Abstract Submission", desc: "Batas awal pengumpulan abstrak penelitian." },
        { date: "20 Feb 2026", title: "Acceptance Notification", desc: "Pengumuman hasil review tahap pertama." },
        { date: "10 Mar 2026", title: "Full Paper Deadline", desc: "Pengumpulan naskah lengkap sesuai template." },
        { date: "05 Apr 2026", title: "Early Bird Payment", desc: "Batas akhir pembayaran biaya registrasi awal." },
        { date: "24 Oct 2026", title: "Conference Day", desc: "Pelaksanaan konferensi utama di Batam." },
    ];

    const speakers = [
        { name: "Prof. Sarah Jenkins", role: "AI Ethics Specialist", univ: "MIT", img: "/api/placeholder/400/500" },
        { name: "Dr. Ridwan Hakim", role: "Sustainable Energy", univ: "ITS", img: "/api/placeholder/400/500" },
        { name: "Annette Black", role: "Global Tech CEO", univ: "San Francisco", img: "/api/placeholder/400/500" },
        { name: "Dr. James Wilson", role: "Quantum Computing", univ: "Stanford", img: "/api/placeholder/400/500" },
        { name: "Prof. Yuki Tanaka", role: "Robotics Design", univ: "Tokyo Univ", img: "/api/placeholder/400/500" },
        { name: "Maria Garcia", role: "Cloud Security", univ: "Madrid Tech", img: "/api/placeholder/400/500" },
        { name: "Dr. Karl Schmidt", role: "Bio-Technology", univ: "Munich", img: "/api/placeholder/400/500" },
    ];

    const universities = [
        { name: "UTM", img: "/img/utm.png" },
        { name: "ITS", img: "/img/its.png" },
        { name: "USM", img: "/img/usm.png" },
        { name: "UTeM", img: "/img/utm.png" },
        { name: "Unhas", img: "/img/unhas.png" },
    ];

    const scrollRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Account for sticky header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <main className="mt-5 bg-[#fcfcfc] font-sans text-[#2A3955] min-h-screen selection:bg-[#e67e22] selection:text-white">
            <NavbarLanding />
            <header className="relative pt-40 pb-24 overflow-hidden bg-white">
                {/* PATTERN OVERLAY - Menggunakan Grid Blueprint */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath stroke='%232A3955' stroke-width='1' d='M0 40L40 0M0 0l40 40' opacity='0.5'/%3E%3C/g%3E%3C/svg%3E")` }}>
                </div>

                {/* ELEMEN DEKORATIF - Lingkaran Oranye Besar yang Samar */}
                <div className="absolute -top-40 -left-20 w-[600px] h-[600px] bg-[#e67e22]/5 rounded-full blur-[120px] z-0 pointer-events-none"></div>

                <div className="container mx-auto px-6 md:px-20 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">

                        {/* SISI KIRI: JUDUL & BRANDING */}
                        <div className="w-full lg:w-7/12 space-y-10">
                            <Link
                                href="/landing/conference"
                                className="inline-flex items-center gap-4 text-[10px] font-black tracking-[0.4em] text-[#e67e22] hover:text-[#2A3955] transition-all group"
                            >
                                <div className="w-10 h-[2px] bg-[#e67e22] group-hover:w-16 transition-all"></div>
                                BACK TO DIRECTORY
                            </Link>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-[2px] w-12 bg-[#2A3955]/20"></div>
                                    <span className="text-[#2A3955]/40 font-bold text-[10px] tracking-[0.3em] uppercase">
                                        Conference on Business, Social Sciences and Technology
                                    </span>
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] text-[#2A3955]">
                                    The 5th <br />
                                    <span className="text-transparent" style={{ WebkitTextStroke: '2px #e67e22' }}>CoMBInES</span> <br />
                                    <span className="text-4xl md:text-5xl opacity-20">2025</span>
                                </h1>
                            </div>


                            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-xl border-l-4 border-[#e67e22] pl-6 italic">
                                Baloi-Sei Ladi, Jl. Gajah Mada, Tiban Indah, Kec. Sekupang, Kota Batam, Kepulauan Riau 29426
                            </p>
                        </div>

                        {/* SISI KANAN: DETAIL INFO (CARD STYLE) */}


                    </div>
                </div>
            </header>
            {/* --- ACTION BUTTONS (DOCK STYLE) --- */}
            <section className="sticky top-24 z-30 py-4 pointer-events-none">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="bg-white/80 backdrop-blur-xl border border-slate-100 p-2 rounded-2xl shadow-2xl inline-flex flex-wrap gap-2 pointer-events-auto">
                        <button
                            onClick={() => scrollToSection('about')}
                            className="px-6 py-3 bg-[#2A3955] text-white rounded-xl text-[10px] font-black tracking-widest flex items-center gap-2 hover:bg-[#e67e22] transition-all uppercase"
                        >
                            <LayoutTemplate size={14} /> About
                        </button>
                        <button
                            onClick={() => scrollToSection('speakers')}
                            className="px-6 py-3 bg-slate-50 text-[#2A3955] rounded-xl text-[10px] font-black tracking-widest flex items-center gap-2 hover:bg-slate-100 transition-all uppercase"
                        >
                            <Users size={14} /> Speakers
                        </button>
                        <button
                            onClick={() => scrollToSection('timeline')}
                            className="px-6 py-3 bg-slate-50 text-[#2A3955] rounded-xl text-[10px] font-black tracking-widest flex items-center gap-2 hover:bg-slate-100 transition-all uppercase"
                        >
                            <Calendar size={14} /> Timeline
                        </button>
                        <button
                            onClick={() => scrollToSection('partners')}
                            className="px-6 py-3 bg-slate-50 text-[#2A3955] rounded-xl text-[10px] font-black tracking-widest flex items-center gap-2 hover:bg-slate-100 transition-all uppercase"
                        >
                            <ArrowUpRight size={14} /> Partners
                        </button>
                        <button
                            onClick={() => scrollToSection('universities')}
                            className="px-6 py-3 bg-slate-50 text-[#2A3955] rounded-xl text-[10px] font-black tracking-widest flex items-center gap-2 hover:bg-slate-100 transition-all uppercase"
                        >
                            <School size={14} /> Universities
                        </button>
                    </div>
                </div>
            </section>

            {/* --- EXPLANATION SECTION --- */}
            <section id="about" className="py-32 container mx-auto px-6 md:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative">
                        <div className="absolute -top-20 -left-10 text-[12rem] font-black text-slate-100 -z-10 select-none">UIB</div>
                        <h2 className="text-4xl font-black mb-8 leading-tight">About The <br />Conference.</h2>
                        <div className="space-y-6 text-slate-600 leading-relaxed">
                            <p>CONESINTECH (Conference on Sustainable Innovation and Technology) adalah inisiatif tahunan yang dirancang untuk menjembatani kesenjangan antara teori akademis dan implementasi industri.</p>
                            <p>Kami percaya bahwa teknologi terbaik adalah teknologi yang berkelanjutan. Melalui proses peer-review yang ketat, kami memastikan bahwa setiap naskah yang diterbitkan memberikan kontribusi nyata bagi literatur global.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#e67e22] p-8 rounded-[2rem] text-white flex flex-col justify-end min-h-[250px]">
                            <span className="text-5xl font-black mb-2 tracking-tighter italic">20+</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">International Partners</span>
                        </div>
                        <div className="bg-[#2A3955] p-8 rounded-[2rem] text-white flex flex-col justify-end min-h-[250px]">
                            <span className="text-5xl font-black mb-2 tracking-tighter italic">100%</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Peer Reviewed</span>
                        </div>
                    </div>
                </div>
            </section>
            <section id='universities' className='py-32 bg-white overflow-hidden'>
                <div className="container mx-auto px-6 md:px-20 mb-12">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 text-center">In Collaboration With</h3>
                </div>

                {/* MARQUEE CONTAINER */}
                <div className="flex overflow-hidden relative">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 20,
                            ease: "linear",
                            repeat: Infinity
                        }}
                        className="flex gap-12 whitespace-nowrap items-center min-w-full"
                    >
                        {/* Duplicate content for seamless loop */}
                        {[...universities, ...universities, ...universities, ...universities].map((u, i) => (
                            <div key={i} className="flex flex-col items-center gap-4 group shrink-0 w-40">
                                <div className="h-16 w-32 relative transition-transform duration-500 group-hover:scale-110">
                                    <Image
                                        src={u.img}
                                        alt={u.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* --- KEYNOTE SPEAKERS (MANUAL SLIDER) --- */}
            <section id="speakers" className="py-32 bg-slate-900 text-white overflow-hidden">
                <div className="container mx-auto px-6 md:px-20 mb-20">
                    <div className="flex justify-between items-end">
                        <h2 className="text-5xl font-black tracking-tighter uppercase italic">Keynote <br />Speakers.</h2>
                        <div className="flex gap-4 mb-2">
                            <button
                                onClick={() => scroll('left')}
                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#e67e22] hover:border-[#e67e22] transition-all group"
                            >
                                <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#e67e22] hover:border-[#e67e22] transition-all group"
                            >
                                <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* SLIDER CONTAINER */}
                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto scrollbar-hide px-6 md:px-20 pb-10 snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {speakers.map((s, i) => (
                        <div key={i} className="inline-block w-[350px] shrink-0 snap-center">
                            <div className="group relative bg-white/5 border border-white/10 rounded-[3rem] p-4 overflow-hidden transition-all hover:bg-white/10">
                                <div className="relative h-[450px] w-full rounded-[2.5rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <Image src={s.img} alt={s.name} fill className="object-cover" />
                                </div>
                                <div className="pt-8 pb-4 px-4 text-center">
                                    <p className="text-[10px] font-bold tracking-[0.3em] text-[#e67e22] mb-2 uppercase">{s.role}</p>
                                    <h3 className="text-2xl font-black mb-1 whitespace-normal">{s.name}</h3>
                                    <p className="text-xs text-white/40 uppercase tracking-widest">{s.univ}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- TIMELINE (MODERN CARD STRIP) --- */}
            <section id="timeline" className="py-32 bg-white overflow-hidden">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
                        <div className="max-w-xl">
                            <span className="text-[#e67e22] font-black text-xs tracking-[0.3em] uppercase mb-4 block">
                                Roadmap
                            </span>
                            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none text-[#2A3955]">
                                IMPORTANT <br />
                                <span className="text-[#e67e22]">DATELINE.</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 text-sm max-w-xs italic border-l-2 border-slate-100 pl-4">
                            Pastikan Anda tidak melewatkan setiap tahapan krusial dalam proses partisipasi konferensi ini.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="group relative p-8 bg-slate-50 rounded-[2.5rem] hover:bg-[#2A3955] transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[280px]"
                            >
                                {/* BACKGROUND NUMBER */}
                                <span className="absolute -right-4 -top-4 text-9xl font-black text-[#2A3955]/5 group-hover:text-white/5 transition-colors duration-500">
                                    {i + 1}
                                </span>

                                <div className="relative z-10">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-6 group-hover:bg-[#e67e22] transition-colors duration-500">
                                        <Calendar size={18} className="text-[#e67e22] group-hover:text-white" />
                                    </div>
                                    <span className="text-[#e67e22] text-[10px] font-black tracking-widest uppercase block mb-2">
                                        {step.date}
                                    </span>
                                    <h3 className="text-lg font-black text-[#2A3955] leading-tight group-hover:text-white transition-colors duration-500 uppercase tracking-tighter">
                                        {step.title}
                                    </h3>
                                </div>

                                <p className="relative z-10 text-slate-500 text-xs leading-relaxed group-hover:text-slate-300 transition-colors duration-500 italic mt-4">
                                    {step.desc}
                                </p>

                                {/* DECORATIVE DOT */}
                                <div className="absolute bottom-6 right-8 w-2 h-2 rounded-full bg-[#e67e22] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* --- ACADEMIC PARTNERS & MEMBERS --- */}
            <section id="partners" className="py-32 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-6 md:px-20 text-center">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-16">Academic Partners & Membership</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 items-center">
                        <div className="h-12 relative flex items-center justify-center font-black text-2xl text-[#2A3955] opacity-20">SCOPUS</div>
                        <div className="h-12 relative flex items-center justify-center font-black text-2xl text-[#2A3955] opacity-20">IEEE</div>
                        <div className="h-12 relative flex items-center justify-center font-black text-2xl text-[#2A3955] opacity-20">SINTA</div>
                        <div className="h-12 relative flex items-center justify-center font-black text-2xl text-[#2A3955] opacity-20">ELSEVIER</div>
                        <div className="h-12 relative flex items-center justify-center font-black text-2xl text-[#2A3955] opacity-20">ACM</div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
