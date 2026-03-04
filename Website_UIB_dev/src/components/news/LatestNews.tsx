'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import { getLatestNews } from '@/actions/newsActions'

export default function LatestNews() {
    const [allNews, setAllNews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getLatestNews();
                setAllNews(data || []);
            } catch (error) {
                console.error("Failed to fetch news:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, []);

    const getImageUrl = (image: string | null | undefined) => {
        if (!image) return '/img/news-main.jpg';
        if (image.startsWith('http') || image.startsWith('/')) return image;
        return '/' + image;
    };

    const mainNews = allNews.length > 0 ? allNews[0] : null;
    const secondaryNews = allNews.slice(1, 3);
    const smallNewsItems = allNews.slice(3, 8);

    if (isLoading) {
        return (
            <section className="py-12 bg-white font-poppins text-[#2A3955]">
                <div className="container mx-auto px-4 md:px-20 text-center text-gray-400">
                    Memuat berita...
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 bg-[#F7F7F7] font-poppins text-[#2A3955]">
            <div className="container mx-auto px-4 md:px-20">

                {/* Judul Section */}
                <div className='text-center font-bold text-[#2A3955] mb-10 text-3xl tracking-tight'>
                    <h1>Berita Terbaru</h1>
                </div>

                {/* GRID UTAMA (Headline & Secondary) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">

                    {/* Headline - Sisi Kiri */}
                    <div className="lg:col-span-7">
                        {mainNews ? (
                            <Link
                                href={`/news/${mainNews.slug}`}
                                className="relative overflow-hidden rounded-xl h-[400px] lg:h-[450px] block"

                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement;

                                    const img = el.querySelector<HTMLImageElement>('[data-main-img]');
                                    const overlay = el.querySelector<HTMLElement>('[data-overlay]');
                                    if (img) img.style.transform = 'scale(1.07)';
                                    if (overlay) overlay.style.background = 'linear-gradient(to top, rgba(26,54,93,0.97) 0%, rgba(26,54,93,0.45) 60%, transparent 100%)';
                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                                    const img = el.querySelector<HTMLImageElement>('[data-main-img]');
                                    const overlay = el.querySelector<HTMLElement>('[data-overlay]');
                                    if (img) img.style.transform = 'scale(1)';
                                    if (overlay) overlay.style.background = 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)';
                                }}
                            >
                                {/* Gambar */}
                                <img
                                    data-main-img
                                    src={getImageUrl(mainNews.image)}
                                    className="w-full h-full object-cover"
                                    style={{
                                        transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                    }}
                                    alt="Main News"
                                />
                                {/* Overlay */}
                                <div
                                    data-overlay
                                    className="absolute inset-0 p-8 flex flex-col justify-end"
                                    style={{
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
                                        transition: 'background 0.6s ease',
                                    }}
                                >
                                    <span className="bg-[#e67e22] text-white text-[10px] font-bold px-3 py-1 rounded-sm w-fit mb-3 uppercase tracking-widest">
                                        {mainNews.tag}
                                    </span>
                                    <h3 className="text-white text-xl md:text-3xl font-bold leading-tight mb-3">
                                        {mainNews.title}
                                    </h3>
                                    <div className="flex items-center gap-3 text-gray-300 text-xs font-medium">
                                        <span>{mainNews.date}</span>
                                        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                        <span className="italic">Oleh: {mainNews.author}</span>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className="bg-gray-100 rounded-xl h-[400px] lg:h-[450px] flex items-center justify-center text-gray-500">
                                Belum ada berita.
                            </div>
                        )}
                    </div>

                    {/* Berita Menengah - Sisi Kanan */}
                    <div className="lg:col-span-5 flex flex-col gap-4 ">
                        {secondaryNews.map((news) => (
                            <Link
                                href={`/news/${news.slug}`}
                                key={news.id}
                                className="group block rounded-xl overflow-hidden bg-white"
                                style={{
                                    transition: 'background-color 0.4s ease,  0.4s ease, box-shadow 0.4s ease',
                                }}
                                onMouseEnter={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.backgroundColor = '#1a365d';

                                }}
                                onMouseLeave={e => {
                                    const el = e.currentTarget as HTMLElement;
                                    el.style.backgroundColor = '';

                                }}
                            >
                                {/* Gambar */}
                                <div className="h-36 w-full overflow-hidden flex-shrink-0">
                                    <img
                                        src={getImageUrl(news.image)}
                                        className="w-full h-full object-cover"
                                        style={{
                                            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                        }}
                                        onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)')}
                                        onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                                        alt={news.title}
                                    />
                                </div>

                                {/* Teks */}
                                <div className="p-3">
                                    <span
                                        className="text-[10px] font-bold block mb-1 uppercase tracking-wider"
                                        style={{ transition: 'color 0.4s ease', color: '#0055aa' }}
                                        ref={(el) => {
                                            if (!el) return;
                                            const parent = el.closest('a');
                                            if (!parent) return;
                                            parent.addEventListener('mouseenter', () => { el.style.color = '#e67e22'; });
                                            parent.addEventListener('mouseleave', () => { el.style.color = '#0055aa'; });
                                        }}
                                    >
                                        {news.date}
                                    </span>
                                    <h4
                                        className="text-[14px] font-bold leading-snug line-clamp-2"
                                        style={{ color: '#2A3955', transition: 'color 0.4s ease' }}
                                        ref={(el) => {
                                            if (!el) return;
                                            const parent = el.closest('a');
                                            if (!parent) return;
                                            parent.addEventListener('mouseenter', () => { el.style.color = '#ffffff'; });
                                            parent.addEventListener('mouseleave', () => { el.style.color = '#2A3955'; });
                                        }}
                                    >
                                        {news.title}
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* GRID BAWAH (Small News) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {smallNewsItems.map((news) => (
                        <Link
                            href={`/news/${news.slug}`}
                            key={news.id}
                            className="group block rounded-xl overflow-hidden border-transparent bg-white"
                            style={{ transition: 'background-color 0.4s ease, box-shadow 0.4s ease' }}
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.backgroundColor = '#1a365d';

                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLElement;
                                el.style.backgroundColor = '';

                            }}
                        >
                            {/* Gambar */}
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={getImageUrl(news.image)}
                                    className="w-full h-full object-cover"
                                    style={{
                                        transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                    }}
                                    onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.08)')}
                                    onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                                    alt={news.title}
                                />
                            </div>

                            {/* Teks */}
                            <div className="p-3">
                                <span
                                    className="text-[10px] font-bold block mb-1 uppercase tracking-wider "
                                    style={{ color: '#0055aa', transition: 'color 0.4s ease' }}
                                    ref={(el) => {
                                        if (!el) return;
                                        const parent = el.closest('a');
                                        if (!parent) return;
                                        parent.addEventListener('mouseenter', () => { el.style.color = '#e67e22'; });
                                        parent.addEventListener('mouseleave', () => { el.style.color = '#0055aa'; });
                                    }}
                                >
                                    {news.date}
                                </span>
                                <h4
                                    className="text-[14px] font-bold leading-snug line-clamp-2"
                                    style={{ color: '#2A3955', transition: 'color 0.4s ease' }}
                                    ref={(el) => {
                                        if (!el) return;
                                        const parent = el.closest('a');
                                        if (!parent) return;
                                        parent.addEventListener('mouseenter', () => { el.style.color = '#ffffff'; });
                                        parent.addEventListener('mouseleave', () => { el.style.color = '#2A3955'; });
                                    }}
                                >
                                    {news.title}
                                </h4>
                            </div>
                        </Link>
                    ))}

                    {/* Tombol Lihat Lainnya */}
                    <Link
                        href="/news"
                        className="flex flex-col items-center justify-center rounded-xl p-4 min-h-[140px] border-2 border-dashed"
                        style={{
                            borderColor: '#d1d5db',
                            transition: 'background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
                        }}
                        onMouseEnter={e => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.backgroundColor = '#1a365d';
                            el.style.borderColor = '#e67e22';

                            const text = el.querySelector<HTMLElement>('[data-label]');
                            const icon = el.querySelector<HTMLElement>('[data-icon]');
                            if (text) text.style.color = '#ffffff';
                            if (icon) { icon.style.backgroundColor = '#e67e22'; }
                        }}
                        onMouseLeave={e => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.backgroundColor = '';

                            el.style.boxShadow = '';
                            const text = el.querySelector<HTMLElement>('[data-label]');
                            const icon = el.querySelector<HTMLElement>('[data-icon]');
                            if (text) text.style.color = '#2A3955';
                            if (icon) { icon.style.backgroundColor = '#1a365d'; }
                        }}
                    >
                        <span
                            data-label
                            className="font-bold text-[10px] mb-3 text-center uppercase tracking-wider"
                            style={{ color: '#2A3955', transition: 'color 0.4s ease' }}
                        >
                            Lihat Berita Lainnya
                        </span>
                        <div
                            data-icon
                            className="text-white p-3 rounded-full"
                            style={{ backgroundColor: '#1a365d', transition: 'background-color 0.4s ease' }}
                        >
                            <FaArrowRight size={14} />
                        </div>
                    </Link>
                </div>

            </div>
        </section>
    );
}
