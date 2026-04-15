import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllNews } from '@/actions/newsActions'

const CATEGORIES = ['Semua', 'Pengumuman', 'Prodi Hukum', 'Prodi Bahasa', 'Artikel', 'Kampus'];

export default function NewsGridArchive() {
    const [allNews, setAllNews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            try {
                // Now using getAllNews with the category filter
                const data = await getAllNews(selectedCategory);
                setAllNews(data || []);
            } catch (error) {
                console.error("Failed to fetch news:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, [selectedCategory]);

    const getImageUrl = (image: string | null | undefined) => {
        if (!image) return '/img/news-main.jpg';
        if (image.startsWith('http') || image.startsWith('/')) return image;
        return '/' + image;
    };

    return (
        <section className="py-16 bg-white font-sans text-[#333]">
            <div className="container mx-auto px-4 md:px-20">

                {/* --- CATEGORY FILTER --- */}
                <div className="flex flex-wrap items-center gap-3 mb-16 justify-center">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${selectedCategory === cat
                                ? 'bg-[#0055aa] text-white border-[#0055aa] shadow-lg shadow-blue-100'
                                : 'bg-white text-gray-400 border-gray-100 hover:border-[#0055aa] hover:text-[#0055aa]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* --- GRID BERITA (3 KOLOM) --- */}
                {isLoading ? (
                    <div className="py-20 text-center text-gray-400 font-medium">
                        Memuat berita...
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {allNews.map((news) => (
                                <article key={news.id} className="flex flex-col group animate-in fade-in duration-500">
                                    {/* Image Container */}
                                    <Link href={`/news/${news.slug}`} className="relative aspect-video overflow-hidden rounded-lg mb-4 shadow-sm border border-gray-100 bg-gray-50">
                                        <img
                                            src={getImageUrl(news.image)}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            alt={news.title}
                                        />
                                    </Link>

                                    {/* Content */}
                                    <div className="flex flex-col flex-1">
                                        <Link href={`/news/${news.slug}`}>
                                            <h2 className="text-[18px] font-bold text-[#2A3955] leading-tight mb-3 hover:text-[#0055aa] transition-colors line-clamp-2 uppercase tracking-tight">
                                                {news.title}
                                            </h2>
                                        </Link>

                                        <p className="text-[13px] text-gray-500 leading-relaxed mb-4 line-clamp-3 font-light">
                                            {news.summary || (news.description ? news.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : "Penjelasan singkat mengenai isi berita...")}
                                        </p>

                                        <div className="mt-auto flex flex-col gap-1">
                                            <span className="text-[11px] font-bold text-[#e67e22] uppercase tracking-wider">
                                                {news.source || "UIB.AC.ID"} — {news.category || "Berita"}
                                            </span>
                                            <span className="text-[11px] text-gray-400 font-medium">
                                                {news.date}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {allNews.length === 0 && (
                            <div className="py-20 text-center text-slate-400 italic">
                                Belum ada berita untuk kategori "{selectedCategory}".
                            </div>
                        )}

                        {/* --- PAGINATION (Sesuai Gambar) --- */}
                        {allNews.length > 0 && (
                            <div className="mt-20 flex justify-center items-center gap-2">
                                <button className="w-10 h-10 flex items-center justify-center rounded bg-[#0055aa] text-white font-bold text-sm shadow-md">1</button>
                                <button className="w-10 h-10 flex items-center justify-center rounded bg-white text-gray-500 border border-gray-200 font-bold text-sm hover:bg-gray-50 transition-colors">2</button>
                                <button className="w-10 h-10 flex items-center justify-center rounded bg-white text-gray-500 border border-gray-200 font-bold text-sm hover:bg-gray-50 transition-colors">3</button>
                                <button className="px-4 h-10 flex items-center justify-center rounded bg-white text-gray-500 border border-gray-200 font-bold text-sm hover:bg-gray-50 transition-colors uppercase tracking-widest">Last</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}