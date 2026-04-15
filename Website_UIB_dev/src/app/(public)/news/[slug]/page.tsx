import React from 'react'
import { notFound } from 'next/navigation'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import { getNewsBySlug, getLatestNews } from '@/actions/newsActions'
import Link from 'next/link'
import { FaCalendarAlt, FaUser, FaTag, FaChevronLeft, FaArrowRight } from 'react-icons/fa'

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const news = await getNewsBySlug(slug);

    if (!news) {
        notFound();
    }

    const latestNews = await getLatestNews();

    const getImageUrl = (image: string | null | undefined) => {
        if (!image) return '/img/news-main.jpg';
        if (image.startsWith('http') || image.startsWith('/')) return image;
        return '/' + image;
    };

    return (
        <main className="min-h-screen bg-white font-poppins text-[#2A3955] selection:bg-[#e67e22] selection:text-white">
            <NavbarLanding />

            {/* SPACING TOP */}
            <div className="h-28 md:h-36"></div>

            {/* HEADER SECTION (Minimalist Editorial) */}
            <div className="container mx-auto px-6 md:px-20 max-w-6xl">
                <nav className="mb-10">
                    <Link
                        href="/news"
                        className="group inline-flex items-center gap-2 text-slate-400 hover:text-[#e67e22] text-[10px] font-black uppercase tracking-[0.2em] transition-all"
                    >
                        <FaChevronLeft size={8} className="transition-transform group-hover:-translate-x-1" /> Back to News
                    </Link>
                </nav>

                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-[#e67e22]/10 text-[#e67e22] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-[#e67e22]/20">
                            {news.tag}
                        </span>
                        <div className="h-px w-12 bg-slate-100"></div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                            <FaCalendarAlt size={10} className="text-slate-300" /> {news.date}
                        </p>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black leading-[1.15] mb-8 tracking-tight text-[#1A253A]">
                        {news.title}
                    </h1>

                    <div className="flex items-center gap-4 text-slate-500 text-xs py-6 border-y border-slate-50">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#2A3955] font-black italic">
                            {news.author.charAt(0)}
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-black tracking-widest text-[#2A3955] mb-0.5">Written by</p>
                            <p className="font-medium text-slate-600 italic"> {news.author}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FEATURED IMAGE */}
            <div className="container mx-auto px-6 md:px-20 max-w-6xl mb-16 md:mb-24">
                <div className="relative aspect-[21/10] w-full overflow-hidden rounded-3xl shadow-2xl shadow-slate-200">
                    <img
                        src={getImageUrl(news.image)}
                        alt={news.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* CONTENT & SIDEBAR */}
            <div className="container mx-auto px-6 md:px-20 max-w-6xl pb-24 md:pb-40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">

                    {/* Main Content (2/3) */}
                    <article className="lg:col-span-8">
                        <div
                            className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed font-light text-justify
                            prose-p:mb-8 prose-p:leading-[1.8]
                            prose-headings:text-[#1A253A] prose-headings:font-black prose-headings:tracking-tight prose-headings:mb-6
                            prose-h2:text-3xl prose-h2:mt-12
                            prose-a:text-[#e67e22] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-[#1A253A] prose-strong:font-black
                            prose-blockquote:border-l-4 prose-blockquote:border-[#e67e22] prose-blockquote:bg-slate-50 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:italic prose-blockquote:rounded-r-xl prose-blockquote:my-10
                            prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12
                            prose-ul:my-8 prose-li:mb-2"
                            dangerouslySetInnerHTML={{ __html: news.description }}
                        />

                        {/* Footer & Tags */}
                        <div className="mt-24 pt-12 border-t border-slate-100">
                            <div className="flex flex-wrap items-center justify-between gap-6">
                                <div>
                                    <h4 className="text-[#1A253A] font-black text-[10px] uppercase tracking-[0.2em] mb-4">Related Categories</h4>
                                    <div className="flex gap-2">
                                        <span className="bg-[#e67e22] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-[#e67e22]/20">
                                            #{news.tag}
                                        </span>
                                        <span className="bg-slate-100 text-slate-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest hover:bg-slate-200 transition-colors cursor-default">
                                            #{news.category || "News"}
                                        </span>
                                    </div>
                                </div>

                                {/* Minimalist Share */}
                                <div className="flex items-center gap-4">
                                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Share this Story</span>
                                    <div className="flex gap-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#1A253A] hover:text-white hover:border-[#1A253A] transition-all cursor-pointer">
                                                <div className="w-3 h-3 bg-current rounded-sm"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar (1/3) */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-32 space-y-16">
                            {/* Section: Recommended */}
                            <div>
                                <div className="flex items-center gap-4 mb-10">
                                    <h3 className="text-[#1A253A] font-black text-xs uppercase tracking-[0.3em] whitespace-nowrap">
                                        Read Next
                                    </h3>
                                    <div className="h-px w-full bg-slate-100"></div>
                                </div>

                                <div className="space-y-10">
                                    {latestNews
                                        .filter((item: any) => item.slug !== slug)
                                        .slice(0, 4)
                                        .map((item: any) => (
                                            <Link
                                                href={`/news/${item.slug}`}
                                                key={item.id}
                                                className="group flex gap-5 items-start"
                                            >
                                                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                                                    <img
                                                        src={getImageUrl(item.image)}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-[#e67e22] text-[9px] font-bold uppercase tracking-widest">
                                                        {item.date}
                                                    </span>
                                                    <h4 className="text-sm font-bold text-[#1A253A] leading-snug group-hover:text-[#e67e22] transition-colors duration-300 line-clamp-2">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </div>

                            {/* Section: Explorer More CTA */}
                            <div className="relative p-8 rounded-3xl bg-[#1A253A] overflow-hidden group shadow-2xl shadow-slate-300">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-[#e67e22]/20 transition-all duration-700"></div>
                                <h5 className="relative z-10 text-white font-black text-lg leading-tight mb-4">
                                    Discover more stories from UIB
                                </h5>
                                <p className="relative z-10 text-slate-400 text-xs font-light leading-relaxed mb-8">
                                    Explore our latest achievements, student life, and academic excellence in Batam city.
                                </p>
                                <Link
                                    href="/news"
                                    className="relative z-10 inline-flex items-center gap-3 px-6 py-3 bg-[#e67e22] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-[#1A253A] transition-all duration-500"
                                >
                                    Browse Archive <FaArrowRight size={10} />
                                </Link>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>

            <Footer />
        </main>
    )
}
