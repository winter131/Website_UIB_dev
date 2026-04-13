'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Compass, Anchor, ShoppingBag, Utensils } from 'lucide-react'

// --- DATA DESTINASI ---
const destinasiBatam = [
    { id: 1, desc: 'Ikon kebanggaan Batam yang menghubungkan rangkaian pulau (Batam, Rempang, Galang).', img: '/img/d7a22392b6340cb4f22cc8fa29ff977e.jpg' },
    { id: 2, desc: 'Pusat perbelanjaan barang impor dan elektronik terlengkap dengan harga kompetitif.', img: '/img/dataran-engku-putri.JPEG' },
    { id: 3, desc: 'Landmark ikonik di Bukit Clara yang menjadi spot foto wajib bagi pengunjung.', img: '/img/aktivitas anak muda di alun-alun engku putri.JPG' },
    { id: 4, desc: 'Nikmati hidangan laut segar khas Kepri di Piayu Laut atau kawasan Kelong yang asri.', img: '/img/Wikipedia.jpg' },
    { id: 5, desc: 'Pusat perbelanjaan strategis di depan terminal feri Batam Center.', img: '/img/Shutterstock Akhmad Dody Firmansyah.JPG' },
    { id: 6, desc: 'Kawasan wisata terpadu dengan wahana permainan dan pemandangan laut yang indah.', img: '/img/osc.medcom.id.JPG' },
    { id: 7, desc: 'Pusat kuliner laut dengan suasana terapung yang ikonik di Batam.', img: '/img/BP Batam 2.JPEG' },
    { id: 8, desc: 'Fasilitas pendukung gaya hidup sehat di lingkungan kampus UIB.', img: '/img/BP Batam.JPEG' },
    { id: 9, desc: 'Taman hiburan tepi pantai lengkap dengan berbagai wahana dan festival musik.', img: '/img/BP Batam1.JPEG' },
    { id: 10, desc: 'Pusat kuliner laut dengan suasana terapung yang ikonik di Batam.', img: '/img/BC5DA3C1-493D-4BAB-AB3C-DB3AAB893A24.JPEG' },
    { id: 11, desc: 'Fasilitas pendukung gaya hidup sehat di lingkungan kampus UIB.', img: '/img/446670129.JPG' },
    { id: 12, desc: 'Taman hiburan tepi pantai lengkap dengan berbagai wahana dan festival musik.', img: '/img/446670117.JPG' },
    { id: 13, desc: 'Pusat kuliner laut dengan suasana terapung yang ikonik di Batam.', img: '/img/kepri-Coral-reosrt-Batam-8-815x598.JPG' },
    { id: 14, desc: 'Fasilitas pendukung gaya hidup sehat di lingkungan kampus UIB.', img: '/img/20035604-a4b3bc6635878287c4d82bef3f52623d.webp' },
    { id: 15, desc: 'Taman hiburan tepi pantai lengkap dengan berbagai wahana dan festival musik.', img: '/img/972844_720.JPG' }
]

// --- SUB-COMPONENT: DESTINATION CARD ---
const DestinationCard = ({ item, dark = false }: { item: any; dark?: boolean }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="group cursor-pointer"
    >
        <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 shadow-xl ${dark ? 'border-4 border-white/10' : ''}`}>
            <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${dark ? 'from-[#1A365D]/80' : 'from-black/70'} via-transparent to-transparent`} />
            <div className="absolute bottom-5 left-6 right-6">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">{item.name}</h3>
            </div>
        </div>
        <p className={`text-xs leading-relaxed font-medium px-3 ${dark ? 'text-white/200' : 'text-slate-500'}`}>
            {item.desc}
        </p>
    </motion.div>
)

export default function BatamdanSekitarnya() {
    return (
        <div className="font-poppins bg-white selection:bg-[#e67e22]/30">

            {/* --- SECTION 1: INTRO & IKONIK --- */}
            <section className="pt-20 pb-10 bg-white">
                <div className="container mx-auto px-10 md:px-20">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 text-[#1A365D]">
                            Batam <span className="text-[#e67e22]">dan Sekitarnya</span>
                        </h2>
                        <p className="max-w-4xl mx-auto text-sm leading-relaxed font-medium text-slate-600">
                            Batam adalah sebuah pulau dan juga kota terbesar di Provinsi Kepulauan Riau, Indonesia.
                            Terletak strategis di sebelah selatan Singapura, Batam telah berkembang pesat menjadi pusat industri, perdagangan, dan pariwisata.
                            Pulau ini terkenal dengan zona ekonomi khususnya, yang menarik investasi dan membantu mendorong pertumbuhan ekonomi di wilayah tersebut.
                            Selain itu, keindahan alamnya, pantai yang menawan, dan berbagai kegiatan rekreasi membuat Batam menjadi destinasi yang menarik bagi wisatawan lokal maupun internasional.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-10 bg-white border-t border-slate-100">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 text-[#1A365D]">
                            Alun Alun Engku <span className="text-[#e67e22]">Putri Batam</span>
                        </h2>
                        <p className="max-w-4xl mx-auto text-sm leading-relaxed font-medium text-slate-600">
                            Pusat kegiatan masyarakat Batam di jantung Batam Center yang menjadi tempat favorit untuk berolahraga, bersantai, dan berbagai acara kebudayaan.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {destinasiBatam.slice(0, 3).map((item) => (
                            <DestinationCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 2: MODERN LIFESTYLE (DARK MODE) --- */}
            <section className="py-16 bg-[#1A365D] border-t border-white/10">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 text-white">
                            Modern <span className="text-[#e67e22]">Lifestyle</span>
                        </h2>
                        <p className="max-w-4xl mx-auto text-sm leading-relaxed font-medium text-white/80">
                            Batam menawarkan berbagai fasilitas penunjang gaya hidup modern, mulai dari pusat perbelanjaan internasional hingga kawasan bisnis yang berkembang pesat.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {destinasiBatam.slice(3, 6).map((item) => (
                            <DestinationCard key={item.id} item={item} dark />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: WISATA & KULINER --- */}
            <section className="py-16 bg-white border-t border-slate-100">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 text-[#1A365D]">
                            Wisata & <span className="text-[#e67e22]">Kuliner</span>
                        </h2>
                        <p className="max-w-4xl mx-auto text-sm leading-relaxed font-medium text-slate-600">
                            Nikmati keindahan alam dan kelezatan hidangan laut segar khas Kepulauan Riau yang tersebar di berbagai sudut pulau.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {destinasiBatam.slice(6, 9).map((item) => (
                            <DestinationCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Nagoya Thamrin City --- */}
            <section className="py-16 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 text-[#1A365D]">
                            Nagoya <span className="text-[#e67e22]">Thamrin City</span>
                        </h2>
                        <p className="max-w-4xl mx-auto text-sm leading-relaxed font-medium text-slate-600">
                            Kawasan terpadu yang menyatukan hunian modern, pusat kuliner, and area komersial di lokasi paling strategis di Batam.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {destinasiBatam.slice(9, 12).map((item) => (
                            <DestinationCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </section>
            {/* --- Nagoya Thamrin City --- */}
            <section className="py-16 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-6 md:px-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black uppercase mb-6 text-[#1A365D]">
                            Kepri <span className="text-[#e67e22]">Coral</span>
                        </h2>
                        <p className="max-w-4xl mx-auto text-sm leading-relaxed font-medium text-slate-600">
                            Kawasan terpadu yang menyatukan hunian modern, pusat kuliner, and area komersial di lokasi paling strategis di Batam.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {destinasiBatam.slice(12, 15).map((item) => (
                            <DestinationCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </section>

        </div>
    )
}