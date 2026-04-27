'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'


function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  if (dateStr.includes(' ') && !dateStr.includes('T')) return dateStr;
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}



export default function LatestArticles() {
  const [displayArticles, setDisplayArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.ok ? res.json() : [])
      .then((data: any[]) => {
        if (data && data.length > 0) {
          const dbArticles = data.map(a => ({ ...a, date: formatDate(a.date) }));
          setDisplayArticles(dbArticles.slice(0, 5));
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  if (!isLoading && displayArticles.length === 0) return null;

  return (
    <section className="relative py-16 bg-[#2A3955] text-white font-poppins overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/img/batik-new.jpg')] bg-repeat bg-[length:250px_250px]"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="bg-white px-8 py-2.5 rounded-sm">
            <h2 className="text-[#2A3955] text-2xl font-black uppercase tracking-tight">Artikel Terbaru</h2>
          </div>
          <Link
            href="/artikel"
            className="group flex items-center gap-2 border border-white px-6 py-2.5 rounded-md text-[13px] font-bold hover:bg-white hover:text-[#2A3955] transition-all duration-300"
          >
            Lihat Semua Artikel <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {displayArticles.map((item: any, idx: number) => (
            <Link
              key={idx}
              href={item.slug && item.slug !== '#' ? `/artikel/${item.slug}` : '#'}
              className="group flex flex-col h-full border-l border-white/20 pl-6 first:border-l-0 first:pl-0"
            >
              <div className="flex flex-col flex-grow">
                <h2 className="text-[15px] font-bold leading-snug group-hover:underline mb-4 min-h-[60px] line-clamp-3 transition-all">
                  {item.title}
                </h2>
                <div className="flex flex-col gap-1 mt-auto">
                  <span className="text-[10px] font-medium text-white/70 uppercase tracking-widest">
                    {item.date}
                  </span>
                  <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">
                    {item.category || 'Artikel'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}