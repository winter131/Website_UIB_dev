'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, User, Tag, Calendar, Share2, ChevronLeft } from 'lucide-react'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import Image from 'next/image'
import { FaMapMarkerAlt, FaPhoneAlt, FaSearch, FaChevronDown, FaBars } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

export default function NewsDetail() {
    const { slug } = useParams()
    const router = useRouter()
    const [news, setNews] = useState<any>(null)
    const [relatedNews, setRelatedNews] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        if (!slug) return

        const fetchDetail = async () => {
            try {
                const response = await fetch(`/api/news/${slug}`)
                if (response.ok) {
                    const data = await response.json()
                    setNews(data)

                    // Fetch related news
                    const relatedRes = await fetch('/api/news')
                    if (relatedRes.ok) {
                        const allData = await relatedRes.json()
                        // Ambil 4 berita terbaru, tapi jangan tampilkan berita yang sedang dibaca ini
                        const filtered = allData.filter((item: any) => item.slug !== slug).slice(0, 4)
                        setRelatedNews(filtered)
                    }
                } else {
                    // Gagal dapat data, kembali ke home atau tampilkan error
                    router.push('/landing/news')
                }
            } catch (error) {
                console.error("Gagal load berita:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDetail()
    }, [slug])



    // Helper untuk path gambar (Dari news.tsx)
    const getImageUrl = (image: string | null | undefined) => {
        if (!image) return '/img/news-main.jpg';
        if (image.startsWith('http') || image.startsWith('/')) return image;
        return '/' + image;
    };

    if (isLoading) {
        return (
            <main className="bg-[#FCFCFC] min-h-screen pt-[110px] font-poppins flex items-center justify-center">
                <NavbarLanding />
                <div className="text-[#2A3955] animate-pulse">Memuat Berita...</div>
            </main>
        )
    }

    if (!news) return null; // Jika data kosong dan belum redirect

    return (
        <main className="bg-[#F8F9FA] min-h-screen font-poppins text-[#2A3955] relative">
            {/* NAVBAR */}
            <NavbarLanding />

            {/* HERO IMAGE BANNER */}
            <div className="relative w-full h-[450px] md:h-[550px] lg:h-[600px] mt-[80px]">
                <img
                    src={getImageUrl(news.image)}
                    alt={news.title}
                    className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A253A] via-[#1A253A]/60 to-transparent"></div>

                {/* BACK BUTTON (OVERLAY) */}
                <div className="absolute top-8 left-4 md:left-20 z-10">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm transition-all shadow-sm"
                    >
                        <ChevronLeft size={18} /> Kembali
                    </button>
                </div>

                {/* TEXT OVERLAY */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:px-20 lg:pb-16">
                    <div className="container mx-auto max-w-5xl">
                        <span className="bg-[#e67e22] text-white text-[11px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest inline-block mb-5 shadow-md">
                            {news.tag}
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white drop-shadow-md">
                            {news.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 font-medium">
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                                <Calendar size={15} className="text-[#e67e22]" />
                                {news.date}
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                                <User size={15} className="text-[#e67e22]" />
                                Oleh: <span className="text-white">{news.author}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="container mx-auto px-4 md:px-1 max-w-5xl relative z-20 -mt-8 md:-mt-12 mb-20">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-14 border border-gray-100 flex flex-col lg:flex-row gap-12">

                    {/* LEFT: ARTICLE */}
                    <div className="w-full lg:w-4/4">
                        <article className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed marker:text-[#e67e22] prose-img:rounded-xl prose-img:shadow-md prose-headings:font-bold prose-headings:text-[#2A3955] prose-a:text-[#0055aa] hover:prose-a:text-[#e67e22] transition-colors">
                            <div dangerouslySetInnerHTML={{ __html: news.description }} />
                        </article>
                    </div>

                    {/* RIGHT: SIDEBAR (SHARE & TAGS) */}
                    <div className="w-full lg:w-2/4 flex flex-col gap-8 border-t lg:border-t-0 lg:border-l border-gray-100 pt-8 lg:pt-0 lg:pl-8">
                        {/* SHARE WIDGET */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Share2 size={16} /> Bagikan
                            </h3>
                            <div className="flex gap-3">
                                <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </button>
                                <button className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all shadow-sm">
                                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                                </button>
                                <button className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all shadow-sm">
                                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                </button>
                            </div>
                        </div>

                        {/* TAGS WIDGET */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Tag size={16} /> Kategori
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <Link href="/news" className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-[#e67e22] hover:text-white transition-colors">
                                    {news.tag}
                                </Link>
                                <Link href="/news" className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-[#2A3955] hover:text-white transition-colors">
                                    Universitas
                                </Link>
                            </div>
                        </div>

                        {/* RELATED NEWS WIDGET */}
                        <div className="mt-4">
                            <h3 className="text-sm font-bold text-[#2A3955] border-b-2 border-[#e67e22] pb-2 mb-5 inline-block pr-6">
                                Berita Lainnya
                            </h3>
                            <div className="flex flex-col gap-5">
                                {relatedNews.map((rn) => (
                                    <Link href={`/news/${rn.slug}`} key={rn.id} className="group flex gap-4 items-center">
                                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                                            <img
                                                src={getImageUrl(rn.image)}
                                                alt={rn.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-[#0055aa] font-bold uppercase tracking-wider mb-1">
                                                {rn.date}
                                            </span>
                                            <h4 className="text-xs font-bold text-[#2A3955] group-hover:text-[#e67e22] transition-colors line-clamp-2 leading-snug">
                                                {rn.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
