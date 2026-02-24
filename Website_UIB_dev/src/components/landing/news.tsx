'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

export default function LatestNews() {
  const [allNews, setAllNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (response.ok) {
          const data = await response.json();
          setAllNews(data);
        }
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

  // Separate data for different grids
  const mainNews = allNews.length > 0 ? allNews[0] : null;
  const secondaryNews = allNews.slice(1, 3);
  const smallNewsItems = allNews.slice(3, 7);

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
    <section className="py-12 bg-white font-poppins text-[#2A3955]">
      <div className="container mx-auto px-4 md:px-20">
        {/* Judul Section */}
        <div className='text-center font-bold text-[#2A3955] mb-10 text-3xl tracking-tight'>
          <h1>Berita Terbaru</h1>
        </div>

        {/* GRID UTAMA (Headline & Secondary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

          {/* Headline - Sisi Kiri */}
          <div className="lg:col-span-7">
            {mainNews ? (
              <Link
                href={`/news/${mainNews.slug}`}
                className="relative group overflow-hidden rounded-xl h-[400px] lg:h-[450px] shadow-sm block"
              >
                <img
                  src={getImageUrl(mainNews.image)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Main News"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                  <span className="bg-[#e67e22] text-white text-[10px] font-bold px-3 py-1 rounded-sm w-fit mb-3 uppercase tracking-widest">
                    {mainNews.tag}
                  </span>
                  <h3 className="text-white text-xl md:text-3xl font-bold leading-tight mb-3 group-hover:text-[#e67e22] transition-colors">
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
                Belum ada berita yang dipublikasikan.
              </div>
            )}
          </div>

          {/* Berita Menengah - Sisi Kanan */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryNews.map((news) => (
              <Link
                href={`/news/${news.slug}`}
                key={news.id}
                className="group cursor-pointer flex flex-col sm:flex-row lg:flex-col gap-4"
              >
                <div className="h-36 w-full overflow-hidden rounded-lg shadow-sm">
                  <img
                    src={getImageUrl(news.image)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt="Secondary News"
                  />
                </div>
                <div>
                  <span className="text-[#0055aa] text-[10px] font-bold block mb-1 uppercase tracking-wider">
                    {news.date}
                  </span>
                  <h4 className="text-[15px] font-bold text-[#2A3955] leading-snug group-hover:text-[#e67e22] transition-colors line-clamp-2">
                    {news.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* GRID BAWAH (Small News) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {smallNewsItems.map((news) => (
            <Link href={`/news/${news.slug}`} key={news.id} className="group cursor-pointer">
              <div className="aspect-video rounded-lg overflow-hidden mb-3 shadow-sm">
                <img
                  src={getImageUrl(news.image)}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  alt="Small News"
                />
              </div>
              <h5 className="text-[13px] font-bold text-[#2A3955] leading-tight mb-1 group-hover:text-[#e67e22] transition-colors line-clamp-2">
                {news.title}
              </h5>
              <span className="text-[10px] text-[#0055aa] font-medium">{news.date}</span>
            </Link>
          ))}

          {/* Tombol Lihat Lainnya */}
          <Link
            href="/news"
            className="flex flex-col items-center justify-center border-2 border-gray-100 rounded-lg p-4 hover:border-[#e67e22]/30 hover:bg-orange-50 transition-all group min-h-[120px]"
          >
            <span className="text-[#2A3955] group-hover:text-[#e67e22] font-bold text-[11px] mb-2 transition-colors text-center uppercase tracking-tighter">
              Lihat Berita Lainnya
            </span>
            <div className="bg-[#2A3955] group-hover:bg-[#e67e22] text-white p-2.5 rounded-full transition-all group-hover:translate-x-1">
              <FaArrowRight size={12} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}