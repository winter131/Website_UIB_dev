import Link from 'next/link';
import prisma from '@/lib/prisma';
import type { news as NewsType } from '@prisma/client';
import ArticleActions from './components/ArticleActions';
import Search from '@/components/Search';

export const dynamic = 'force-dynamic'

export default async function ArtikelManagement(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const articles = await prisma.news.findMany({
        where: {
            AND: [
                {
                    OR: [
                        { category: 'Artikel' },
                        { tag: 'Artikel' }
                    ]
                },
                query ? {
                    OR: [
                        { title: { contains: query } },
                        { description: { contains: query } }
                    ]
                } : {}
            ]
        },
        orderBy: { date: 'desc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-[#1A365D]">Manajemen Artikel</h1>
                    <p className="text-gray-500 text-sm">Kelola artikel terbaru yang akan tampil di landing page</p>
                </div>
                <Link href="/artikel/buat" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-md">
                    Tambah Artikel
                </Link>
            </div>
            <div className="flex w-full items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                        {articles.length} Artikel Ditemukan
                    </span>
                </div>
                <div className="flex-1 max-w-md">
                    <Search placeholder="Cari judul atau isi artikel..." />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                            <th className="p-4 font-semibold w-16 text-center">No</th>
                            <th className="p-4 font-semibold">Judul Artikel</th>
                            <th className="p-4 font-semibold">Kategori</th>
                            <th className="p-4 font-semibold">Tanggal</th>
                            <th className="p-4 font-semibold text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {articles.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-400 italic">
                                    Belum ada artikel. Klik "Tambah Artikel" untuk memulai.
                                </td>
                            </tr>
                        ) : (
                            articles.map((item: NewsType, idx) => (
                                <tr key={item.id.toString()} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 text-center text-gray-400 font-mono">{idx + 1}</td>
                                    <td className="p-4">
                                        <div className="font-bold text-[#1A365D]">{item.title}</div>
                                        <div className="text-[10px] text-gray-400 uppercase tracking-widest">{item.slug}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-black uppercase tracking-wider">
                                            {item.category || 'Artikel'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500">{item.date}</td>
                                    <td className="p-4 text-right">
                                        <ArticleActions id={item.id.toString()} title={item.title} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
