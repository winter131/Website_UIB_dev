'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllNews } from '@/actions/newsActions'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ArrowRight, Newspaper, Hash } from 'lucide-react'

const CATEGORIES = ['Semua', 'Pengumuman', 'Ilmu Hukum', 'Prodi Bahasa', 'Teknologi Informasi', 'Artikel', 'Berita Kampus'];

export default function KumpulanBerita() {
    const [allNews, setAllNews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            try {
                const data = await getAllNews(selectedCategory);
                setAllNews(data || []);
                setCurrentPage(1);
            } catch (error) {
                console.error("Failed to fetch news:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, [selectedCategory]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allNews.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(allNews.length / itemsPerPage);

    const getImageUrl = (image: string | null | undefined) => {
        if (!image) return '/img/news-main.jpg';
        if (image.startsWith('http') || image.startsWith('/')) return image;
        return '/' + image;
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    return (
        <section className="py-20 bg-[#FAFAFB] font-poppins selection:bg-[#2A3955] selection:text-white">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">

                {/* --- HEADER SECTION --- */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A3955]/5 text-[#2A3955] text-[9px] font-black uppercase tracking-[0.2em] mb-4"
                    >
                        <Newspaper size={12} /> Official Newsroom
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-black text-[#1A253A] tracking-tighter mb-4 uppercase">
                        Warta <span className="text-[#e67e22]">UIB</span>
                    </h2>
                    <p className="text-slate-500 max-w-xl mx-auto text-xs md:text-sm font-medium leading-relaxed">
                        Ikuti perkembangan terbaru, prestasi mahasiswa, dan pengumuman resmi dari seluruh lingkungan civitas akademika Universitas Internasional Batam.
                    </p>
                </div>

                {/* --- CATEGORY FILTER --- */}
                <div className="flex flex-wrap items-center gap-2 mb-12 justify-center">
                    {CATEGORIES.map((cat, idx) => (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 border ${selectedCategory === cat
                                    ? 'bg-[#1A253A] text-white border-[#1A253A] shadow-lg shadow-blue-900/20'
                                    : 'bg-white text-slate-400 border-slate-100 hover:border-[#1A253A] hover:text-[#1A253A]'
                                }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* --- GRID BERITA --- */}
                {isLoading ? (
                    <div className="py-24 text-center flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-slate-200 border-t-[#e67e22] rounded-full animate-spin"></div>
                        <p className="text-slate-400 font-black text-[9px] uppercase tracking-[0.3em] animate-pulse">Menyelaraskan Berita...</p>
                    </div>
                ) : (
                    <>
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <AnimatePresence mode='popLayout'>
                                {currentItems.map((news) => (
                                    <motion.article
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={news.id.toString()}
                                        className="flex flex-col bg-white rounded-[1.5rem] overflow-hidden group shadow-[0_5px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(26,41,85,0.15)] transition-all duration-500 border border-slate-50"
                                    >
                                        {/* Image Container */}
                                        <Link href={`/baca/${news.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                                            <img
                                                src={getImageUrl(news.image)}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                alt={news.title}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A253A]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/95 backdrop-blur-md text-[#1A253A] text-[8px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-sm border border-white">
                                                    {news.category || "Berita"}
                                                </span>
                                            </div>
                                        </Link>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 text-slate-400 mb-3 font-bold text-[9px] uppercase tracking-widest">
                                                <Calendar size={10} className="text-[#e67e22]" />
                                                {news.date}
                                            </div>

                                            <Link href={`/baca/${news.slug}`}>
                                                <h2 className="text-base md:text-lg font-black text-[#1A253A] leading-tight mb-3 group-hover:text-[#e67e22] transition-colors line-clamp-2 uppercase tracking-tight">
                                                    {news.title}
                                                </h2>
                                            </Link>

                                            <p className="text-[13px] text-slate-500 leading-relaxed mb-6 line-clamp-3 font-medium opacity-80">
                                                {news.summary || (news.description ? news.description.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : "Penjelasan singkat mengenai isi berita...")}
                                            </p>

                                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                                                <div className="flex flex-col">
                                                    <span className="text-[8px] font-black text-[#e67e22] uppercase tracking-[0.2em] mb-0.5">Source</span>
                                                    <span className="text-[10px] text-[#1A253A] font-bold flex items-center gap-1 italic">
                                                        {news.source || "uib.ac.id"}
                                                    </span>
                                                </div>
                                                <Link href={`/baca/${news.slug}`} className="w-10 h-10 rounded-xl bg-[#1A253A]/5 flex items-center justify-center text-[#1A253A] group-hover:bg-[#1A253A] group-hover:text-white group-hover:rotate-12 transition-all duration-300">
                                                    <ArrowRight size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {allNews.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-24 text-center"
                            >
                                <Hash size={40} className="mx-auto text-slate-200 mb-4" />
                                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em]">
                                    Belum ada berita untuk kategori "{selectedCategory}"
                                </p>
                            </motion.div>
                        )}

                        {/* --- PAGINATION --- */}
                        {totalPages > 1 && (
                            <div className="mt-20 flex justify-center items-center gap-3">
                                <button
                                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-[#1A253A] border border-slate-100 shadow-sm hover:shadow-md disabled:opacity-30 transition-all"
                                >
                                    <ArrowRight size={16} className="rotate-180" />
                                </button>

                                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-lg font-black text-[10px] transition-all ${currentPage === i + 1
                                                    ? 'bg-[#e67e22] text-white shadow-md shadow-orange-500/30'
                                                    : 'text-slate-400 hover:text-[#1A253A] hover:bg-slate-50'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-[#1A253A] border border-slate-100 shadow-sm hover:shadow-md disabled:opacity-30 transition-all"
                                >
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}