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

            <header className="relative pt-32 pb-20 overflow-hidden bg-white">
                {/* PATTERN OVERLAY */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.10]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232A3955' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
                </div>

                {/* DECORATIVE BLUR BLOB */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#e67e22]/5 rounded-full blur-3xl z-0 pointer-events-none"></div>

                <div className="container mx-auto px-6 md:px-20 relative z-10">
                    {/* BACK BUTTON */}
                    <Link
                        href="/landing/conference"
                        className="inline-flex items-center gap-4 text-[10px] font-black tracking-[0.3em] text-slate-400 hover:text-[#e67e22] transition-all mb-16 group"
                    >
                        <div className="w-12 h-[1px] bg-slate-200 group-hover:bg-[#e67e22] transition-all"></div>
                        BACK TO DIRECTORY
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        <div className="lg:col-span-8 space-y-8">
                            {/* SUBTITLE */}
                            <div className="space-y-2">
                                <span className="text-[#e67e22] font-bold text-xs tracking-widest uppercase">
                                    International Conference
                                </span>
                                <h4 className="text-[#2A3955] font-medium text-sm md:text-base leading-relaxed max-w-2xl">
                                    Conference on Business, Social Sciences and Technology
                                </h4>
                            </div>

                            {/* MAIN TITLE */}
                            <div className="text-[#2A3955] text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]">
                                <h1 className="inline-block">
                                    The 5th <br />
                                    <span className="text-[#e67e22]">CoNeScieNTech</span> 2025
                                </h1>
                            </div>

                            {/* DATE BADGE & THEME */}
                            <div className="flex flex-col md:flex-row md:items-center gap-6 pt-4">
                                <div className="flex items-center gap-3 bg-[#e67e22] text-white px-5 py-3 rounded-full w-fit shadow-lg shadow-[#e67e22]/20">
                                    <Calendar size={18} />
                                    <span className="text-sm font-bold tracking-tight">18 June 2025</span>
                                </div>
                                <div className="max-w-md">
                                    <p className="text-[#2A3955] font-semibold text-sm leading-snug">
                                        Digital Transformation for Sustainable Development:
                                        <span className="text-slate-400 font-normal"> Challenges and Innovations in Social, Economic, and Technological Fields</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* QUOTE / SIDE TEXT - Layout tetap dipertahankan meskipun kosong di kodingan Anda */}
                        <div className="lg:col-span-4 flex flex-col justify-end">
                            {/* Space for future side content */}
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

            {/* --- TIMELINE (SIMPLE VERSION) --- */}
            <section id="timeline" className="py-32 container mx-auto px-6 md:px-20">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-black mb-16 tracking-tighter uppercase text-[#2A3955]">
                        Conference <span className="text-[#e67e22]">Timeline.</span>
                    </h2>

                    <div className="relative space-y-0 border-l-2 border-slate-100 ml-4 md:ml-0">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="relative pl-10 pb-12 last:pb-0"
                            >
                                {/* DOT INDICATOR */}
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-[#e67e22] z-10"></div>

                                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                                    <span className="text-[#e67e22] text-sm font-black tracking-widest uppercase shrink-0 w-32">
                                        {step.date}
                                    </span>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold text-[#2A3955] uppercase tracking-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed italic max-w-xl">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
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