'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link' // Import Link yang benar untuk navigasi
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import {
    Layers,
    Zap,
    Lightbulb,
    ShieldCheck,
    ArrowUpRight
} from 'lucide-react'

export default function ConferenceView() {
    const cards = [
        {
            title: "CONESINTECH",
            desc: "Menjaga standar kualitas riset yang berkelanjutan dan terukur secara global.",
            icon: <Layers size={22} />,
            tag: "Quality",
            link: "/landing/conference/conesintech"
        },
        {
            title: "COMBINES",
            desc: "Integrasi multidisiplin ilmu untuk solusi teknologi yang lebih komprehensif.",
            icon: <Zap size={22} />,
            tag: "Integration",
            link: "/landing/conference/combines"
        },
        {
            title: "CONCEPT",
            desc: "Eksplorasi ide-ide fundamental yang mendorong batas inovasi masa depan.",
            icon: <Lightbulb size={22} />,
            tag: "Innovation",
            link: "/landing/conference/concept"
        },
        {
            title: "NACOSPRO",
            desc: "Networking and Collaboration System for Professionals and Researchers.",
            icon: <ShieldCheck size={22} />,
            tag: "Platform",
            link: "/landing/conference/nacospro"
        }
    ];

    return (
        <main className="mt-20 bg-white font-sans text-[#2A3955] min-h-screen">
            <NavbarLanding />

            <section className="py-24 container mx-auto px-6 md:px-20">
                {/* HEADER */}
                <div className="max-w-4xl mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#e67e22] font-black text-xs tracking-[0.3em] uppercase mb-4 block"
                    >
                        Framework & Vision
                    </motion.span>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-8">
                        OUR CORE <br />
                        <span className="italic font-light opacity-60">FOUNDATION.</span>
                    </h2>
                </div>

                {/* 4 INDEPENDENT CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cards.map((card, index) => (
                        <Link href={card.link} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group flex flex-col justify-between p-8 min-h-[340px] bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-[0_20px_50px_rgba(42,57,85,0.1)] transition-all duration-500 rounded-3xl cursor-pointer"
                            >
                                {/* TOP AREA: Icon & Tag */}
                                <div>
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="text-[#e67e22] group-hover:scale-110 transition-transform duration-500">
                                            {card.icon}
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-300 group-hover:text-[#e67e22] transition-colors uppercase tracking-widest">
                                            {card.tag}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-[#e67e22] transition-colors duration-300">
                                        {card.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed pr-4">
                                        {card.desc}
                                    </p>
                                </div>

                                {/* BOTTOM AREA: Minimal Link Label */}
                                <div className="pt-6 border-t border-slate-200/50 flex items-center justify-between overflow-hidden">
                                    <span className="text-[9px] font-black opacity-30 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-[#2A3955]">
                                        Explore {card.title}
                                    </span>
                                    <div className="translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                                        <ArrowUpRight size={18} className="text-[#e67e22]" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    )
}