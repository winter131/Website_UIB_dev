'use client';
import React from 'react'
import Link from 'next/link'
import { FaCalendarAlt, FaChevronLeft, FaArrowRight } from 'react-icons/fa'
import ShareButtons from '@/components/landing/news/ShareButtons'

interface NewsDetailViewProps {
    news: any;
    latestNews: any[];
    slug: string;
    backLink?: string;
    backLabel?: string;
    readMorePath?: string;
}

export default function DetailNewsView({
    news,
    latestNews,
    slug,
    backLink = "/berita",
    backLabel = "Kembali ke Berita",
    readMorePath = "/baca"
}: NewsDetailViewProps) {
    const getImageUrl = (image: string | null | undefined) => {
        if (!image) return '/img/news-main.jpg';
        if (image.startsWith('http') || image.startsWith('/')) return image;
        return '/' + image;
    };

    return (
        <>
            <div className="h-20 md:h-40"></div>

            <div className="container mx-auto px-6 md:px-20 max-w-5xl">
                <nav className="mb-6">
                    <Link
                        href={backLink}
                        className="group inline-flex items-center gap-2 text-slate-400 hover:text-[#e67e22] text-[9px] font-black uppercase tracking-[0.2em] transition-all"
                    >
                        <FaChevronLeft size={7} className="transition-transform group-hover:-translate-x-1" /> {backLabel}
                    </Link>
                </nav>

                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">

                        <p className="text-slate-400 text-[9px] uppercase font-bold tracking-widest flex items-center gap-2">
                            <FaCalendarAlt size={9} className="text-slate-300" /> {news.date}
                        </p>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6 tracking-tighter text-[#1A253A]">
                        {news.title}
                    </h1>

                    <div className="flex items-center gap-3 text-slate-500 text-xs py-4 border-y border-slate-100">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[#2A3955] font-black italic text-xs">
                            {(news.author || 'A').charAt(0)}
                        </div>
                        <div>
                            <p className="text-[8px] uppercase font-black tracking-widest text-[#2A3955] mb-0.5">Editor</p>
                            <p className="font-semibold text-slate-600 text-[11px] italic"> {news.author}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-20 max-w-5xl mb-12 md:mb-16">
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-xl shadow-slate-100/50">
                    <img
                        src={getImageUrl(news.image)}
                        alt={news.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-20 max-w-5xl pb-20 md:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16">

                    <article className="lg:col-span-8">
                        <div
                            className="prose prose-slate prose-base max-w-none text-slate-600 leading-relaxed font-normal text-justify
                            prose-p:mb-6 prose-p:leading-[1.7]
                            prose-headings:text-[#1A253A] prose-headings:font-black prose-headings:tracking-tight prose-headings:mb-4
                            prose-h2:text-2xl prose-h2:mt-10
                            prose-a:text-[#e67e22] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-[#1A253A] prose-strong:font-black
                            prose-blockquote:border-l-4 prose-blockquote:border-[#e67e22] prose-blockquote:bg-slate-50 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:rounded-r-xl prose-blockquote:my-8
                            prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
                            prose-ul:my-6 prose-li:mb-1.5"
                            dangerouslySetInnerHTML={{ __html: news.description }}
                        />

                        <div className="mt-16 pt-8 border-t border-slate-100">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h4 className="text-[#1A253A] font-black text-[9px] uppercase tracking-[0.2em] mb-3">Kategori</h4>
                                    <div className="flex gap-2">
                                        <span className="bg-slate-50 text-slate-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest hover:bg-slate-100 transition-colors cursor-default border border-slate-100">
                                            {news.category || "Berita"}
                                        </span>
                                    </div>
                                </div>

                                <ShareButtons title={news.title} slug={slug} />
                            </div>
                        </div>
                    </article>

                    <aside className="lg:col-span-4">
                        <div className="sticky top-28 space-y-12">
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <h3 className="text-[#1A253A] font-black text-[10px] uppercase tracking-[0.3em] whitespace-nowrap">
                                        Selanjutnya
                                    </h3>
                                    <div className="h-px w-full bg-slate-100"></div>
                                </div>

                                <div className="space-y-8">
                                    {latestNews
                                        .filter((item: any) => item.slug !== slug)
                                        .slice(0, 4)
                                        .map((item: any) => (
                                            <Link
                                                href={`${readMorePath}/${item.slug}`}
                                                key={item.id}
                                                className="group flex gap-4 items-start"
                                            >
                                                <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
                                                    <img
                                                        src={getImageUrl(item.image)}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[#e67e22] text-[8px] font-bold uppercase tracking-widest">
                                                        {item.date}
                                                    </span>
                                                    <h4 className="text-[13px] font-bold text-[#1A253A] leading-snug group-hover:text-[#e67e22] transition-colors duration-300 line-clamp-2">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </div>

                            <div className="relative p-6 rounded-2xl bg-[#1A253A] overflow-hidden group shadow-xl shadow-slate-200 border border-[#1A253A]">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-[#e67e22]/10 transition-all duration-700"></div>
                                <h5 className="relative z-10 text-white font-black text-sm leading-tight mb-3">
                                    Informasi Lainnya
                                </h5>
                                <p className="relative z-10 text-slate-400 text-[10px] font-normal leading-relaxed mb-6 opacity-80">
                                    Temukan pencapaian terbaru dan pengumuman resmi UIB Batam.
                                </p>
                                <Link
                                    href="/berita"
                                    className="relative z-10 inline-flex items-center gap-2 px-4 py-2 bg-[#e67e22] text-white text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-white hover:text-[#1A253A] transition-all duration-500 shadow-lg shadow-orange-500/20"
                                >
                                    Lihat Semua <FaArrowRight size={8} />
                                </Link>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </>
    )
}