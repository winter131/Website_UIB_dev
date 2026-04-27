import React from 'react'
import { notFound } from 'next/navigation'


import { getNewsBySlug, getLatestNews } from '@/actions/newsActions'
import DetailNewsView from '@/components/landing/news/DetailNewsView'

export default async function HalamanDetailBerita({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const news = await getNewsBySlug(slug);

    if (!news) {
        notFound();
    }

    const latestNews = await getLatestNews();

    return (
        <main className="min-h-screen bg-white font-poppins text-[#2A3955] selection:bg-[#e67e22] selection:text-white">

            <DetailNewsView
                news={news}
                latestNews={latestNews}
                slug={slug}
                backLink="/berita"
                backLabel="Kembali ke Berita"
                readMorePath="/baca"
            />

        </main>
    )
}