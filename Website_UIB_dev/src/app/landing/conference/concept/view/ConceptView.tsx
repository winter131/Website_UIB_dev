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
        <main className="mt-10 bg-[#fcfcfc] font-sans text-[#2A3955] min-h-screen selection:bg-[#e67e22] selection:text-white">
            <NavbarLanding />
            <header className="relative pt-24 pb-16 overflow-hidden bg-slate-50/50">
                {/* NEW PATTERN: Subtler Floating Crosses */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232A3955' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M19 19V5h2v14h14v2H21v14h-2V21H5v-2h14z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '30px 30px'
                    }}>
                </div>

                <div className="container mx-auto px-6 lg:px-16 relative z-10">
                    <div className="max-w-7xl mx-auto">

                        {/* 1. TOP NAVIGATION & TAGLINE */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 mb-12">
                            <Link
                                href="/landing/conference"
                                className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-[#e67e22] group"
                            >
                                <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK TO DIRECTORY
                            </Link>
                            <div className="flex items-center gap-3 mt-4 md:mt-0">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                    International Research Forum
                                </span>
                                <span className="h-[1px] w-6 bg-slate-300"></span>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-12 gap-12 items-start">

                            {/* 2. MAIN TYPOGRAPHY (Left Side) - Adjusted Font Sizes */}
                            <div className="lg:col-span-7">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-2">
                                        <span className="inline-block px-3 py-1 bg-[#e67e22]/10 text-[#e67e22] text-[10px] font-bold tracking-widest uppercase rounded-full mb-4">
                                            The 5th Series
                                        </span>
                                        <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-tight text-[#2A3955]">
                                            Con<span className="text-[#e67e22]">CEPt</span>
                                            <span className="inline-block ml-4 text-slate-300 font-light">2025</span>
                                        </h1>
                                    </div>

                                    <div className="max-w-xl space-y-6">
                                        <h4 className="text-lg md:text-xl font-semibold text-[#2A3955]/80 leading-snug">
                                            Conference on Business, Social Sciences and Technology
                                        </h4>
                                        <div className="flex gap-4 items-start">
                                            <div className="w-1 h-12 bg-[#e67e22] shrink-0" />
                                            <p className="text-slate-500 font-medium text-sm md:text-base italic leading-relaxed">
                                                "Sustainable Future through Digital Innovation in Community Development"
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* 3. EVENT CARD (Right Side) - More Compact */}
                            <div className="lg:col-span-5">
                                <div className="relative p-[1px] bg-slate-200 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200">
                                    <div className="bg-white p-8 space-y-6">
                                        {/* Date Section */}
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-[#e67e22] uppercase tracking-tighter">Event Date</p>
                                                <h3 className="text-xl font-bold text-[#2A3955]">
                                                    December 17th, 2025
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-2 py-1 px-2 bg-green-50 rounded-md">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="text-[9px] font-bold text-green-700 uppercase">Virtual Host</span>
                                            </div>
                                        </div>

                                        <div className="h-[1px] w-full bg-slate-100"></div>

                                        {/* Location Details */}
                                        <div className="grid grid-cols-1 gap-6">
                                            <div>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Host Institution</p>
                                                <p className="text-[#2A3955] font-semibold text-sm">Tunghai University, Taichung City, Taiwan</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Secretariat</p>
                                                <p className="text-slate-500 font-medium text-xs leading-relaxed">
                                                    Baloi-Sei Ladi, Tiban Indah, Sekupang, Kota Batam, Kepulauan Riau
                                                </p>
                                            </div>
                                        </div>

                                        {/* ACTION BUTTON */}
                                        <button className="group w-full py-4 bg-[#2A3955] hover:bg-[#e67e22] text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                                            Register For Session
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
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

            {/* --- KEYNOTE SPEAKERS (MINIMALIST CLEAN GRID) --- */}
            <section id="speakers" className="py-24 bg-white border-t border-slate-100">
                <div className="container mx-auto px-6 md:px-20">

                    {/* HEADER AREA - CLEAN & LEFT ALIGNED */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-xl">
                            <span className="text-[#e67e22] font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">
                                Academic Visionaries
                            </span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#2A3955] uppercase leading-none">
                                Keynote <span className="text-[#e67e22]">Speakers.</span>
                            </h2>
                        </div>
                        <p className="text-slate-400 text-sm max-w-xs border-l-2 border-slate-100 pl-4 italic">
                            Menghadirkan pakar teknologi dan akademisi dari institusi terkemuka dunia.
                        </p>
                    </div>

                    {/* COMPACT SPEAKER GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {speakers.slice(0, 8).map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                {/* PHOTO CONTAINER */}
                                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden mb-6 bg-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-[#2A3955]/10">
                                    <Image
                                        src={s.img}
                                        alt={s.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* ACCENT STRIPE ON HOVER */}
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#e67e22] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                </div>

                                {/* TEXT CONTENT - CLEAN & SIMPLE */}
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black tracking-[0.2em] text-[#e67e22] uppercase">
                                        {s.role}
                                    </p>
                                    <h3 className="text-lg font-black text-[#2A3955] leading-tight group-hover:text-[#e67e22] transition-colors">
                                        {s.name}
                                    </h3>
                                    <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                                        {s.univ}
                                    </p>
                                </div>

                                {/* MINIMAL LINK */}
                                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="text-[9px] font-black uppercase tracking-widest text-[#2A3955] flex items-center gap-2 border-b border-[#2A3955]">
                                        View Profile <ArrowUpRight size={10} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>


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
        </main >
    )
}