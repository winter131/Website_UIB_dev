'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


import { motion } from 'framer-motion'
import { ChevronRight, MapPin, Building2, TicketPercent } from 'lucide-react'

export default function KehidupanKampusView() {
    return (
        <main className="min-h-screen bg-white font-poppins selection:bg-[#2A3955] selection:text-white">

            <section className="relative w-full h-[250px] md:h-[350px]">
                <Image
                    src="/img/gedungUIB.jpg"
                    alt="Campus Life Hero"
                    fill={true}
                    priority={true}
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 z-10" />
            </section>

            <div className="relative z-20 w-full -mt-20 md:-mt-16">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
                        {[
                            { title: "Fasilitas", desc: "Info lebih lanjut tentang fasilitas Universitas Internasional Batam", img: "/img/DSC06279.jpg", href: "/landing/informasi/fasilitas" },
                            { title: "Batam dan Sekitarnya", desc: "Info lebih lanjut tentang Kota Batam dan sekitarnya", img: "/img/C1700307.jpg", href: "/landing/informasi/batamdansekitarnya" },
                            { title: "Diskon Mahasiswa", desc: "Info lebih lanjut tentang detail Discount Card UIB", img: "/img/Gp.jpg", href: "/landing/informasi/diskonmahasiswa" }
                        ].map((card, i) => (
                            <Link href={card.href} key={i}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    className="relative h-48 sm:h-56 md:h-44 lg:h-48 rounded-xl overflow-hidden shadow-2xl cursor-pointer group"
                                >
                                    <Image src={card.img} alt={card.title} fill={true} className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/60 p-5 flex flex-col justify-center border-b-4 border-transparent group-hover:border-[#e67e22] transition-all">
                                        <h3 className="text-white font-bold text-lg mb-1">{card.title}</h3>
                                        <p className="text-white/70 text-xs md:text-[10px] lg:text-xs leading-tight">{card.desc}</p>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <section className="pt-16 md:pt-24 pb-20">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5">
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                                <Image src="/img/C1700307.jpg" alt="Barelang Bridge" fill={true} className="object-cover" />
                            </div>
                        </div>
                        <div className="lg:col-span-7 space-y-6">
                            <h2 className="text-3xl font-bold text-[#1a365d]">Tentang Batam</h2>
                            <p className="text-gray-600 text-sm leading-relaxed text-justify">
                                Batam merupakan kota dengan letak strategis yang berada di jalur pelayaran Internasional, dan berjarak sangat dekat dengan Singapura dan Malaysia. Kota Batam merupakan bagian dari kawasan khusus perdagangan bebas Batam - Bintan - Karimun (BBK). Salah satu ikon yang menjadi pusat perhatian bagi pendatang adalah <strong>Jembatan Barelang</strong>, yang menghubungkan Batam, Rempang, dan Galang yang selesai dibangun pada tahun 1998.
                            </p>
                            <Link href='/landing/' className="bg-[#1a365d] text-white px-6 py-2 rounded-md text-xs font-medium hover:bg-[#e67e22] transition-colors shadow-lg">
                                Selengkapnya
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-[#1a365d] text-white">

                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6">
                            <h2 className="text-3xl font-bold">Fasilitas UIB</h2>
                            <p className="text-white/80 text-sm leading-relaxed text-justify">
                                Universitas Internasional Batam menyediakan fasilitas-fasilitas unggul yang dapat digunakan untuk mendukung sistem akademik dan meningkatkan kualitas pembelajaran dari segi sarana dan prasarana untuk memberikan pengalaman terbaik bagi para mahasiswa selama masa studi mereka.
                            </p>
                            <Link href='/landing' className="bg-white text-[#1a365d] px-6 py-2 rounded-md text-xs font-bold hover:bg-[#e67e22] hover:text-white transition-colors shadow-lg">
                                Selengkapnya
                            </Link>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                                <Image src="/img/story2.jpg" alt="UIB Facility" fill={true} className="object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-16 md:pt-24 pb-20">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5">
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                                <Image src="/img/TE.webp" alt="Barelang Bridge" fill={true} className="object-cover" />
                            </div>
                        </div>
                        <div className="lg:col-span-7 space-y-6">
                            <h2 className="text-3xl font-bold text-[#1a365d]">Tentang Batam</h2>
                            <p className="text-gray-600 text-sm leading-relaxed text-justify">
                                Batam merupakan kota dengan letak strategis yang berada di jalur pelayaran Internasional, dan berjarak sangat dekat dengan Singapura dan Malaysia. Kota Batam merupakan bagian dari kawasan khusus perdagangan bebas Batam - Bintan - Karimun (BBK). Salah satu ikon yang menjadi pusat perhatian bagi pendatang adalah <strong>Jembatan Barelang</strong>, yang menghubungkan Batam, Rempang, dan Galang yang selesai dibangun pada tahun 1998.
                            </p>
                            <Link href='/landing/' className="bg-[#1a365d] text-white px-6 py-2 rounded-md text-xs font-medium hover:bg-[#e67e22] transition-colors shadow-lg">
                                Selengkapnya
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}