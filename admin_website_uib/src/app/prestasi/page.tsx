import Link from 'next/link';
import prisma from '@/lib/prisma';
import type { news as NewsType } from '@prisma/client';
import PrestasiActions from './components/PrestasiActions';
import Search from '@/components/Search';
export const dynamic = 'force-dynamic'

export default async function PrestasiManagement(props: {
    searchParams?: Promise<{ query?: string }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    const prestasiData = await prisma.news.findMany({
        where: {
            AND: [
                { category: 'Prestasi' },
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
                    <h1 className="text-3xl font-bold text-[#1A365D]">Manajemen Prestasi</h1>
                    <p className="text-gray-500 text-sm">Kelola prestasi mahasiswa yang tampil di website</p>
                </div>
                <Link href="/prestasi/buat" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-md">
                    Tambah Prestasi
                </Link>
            </div>

            <div className="flex w-full items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                        {prestasiData.length} Prestasi Ditemukan
                    </span>
                </div>
                <div className="flex-1 max-w-md">
                    <Search placeholder="Cari judul prestasi..." />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                            <th className="p-4 font-semibold w-16 text-center">No</th>
                            <th className="p-4 font-semibold">Judul Prestasi</th>
                            <th className="p-4 font-semibold">Kategori</th>
                            <th className="p-4 font-semibold">Tanggal</th>
                            <th className="p-4 font-semibold text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {prestasiData.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-400 italic">
                                    Belum ada prestasi. Klik &quot;Tambah Prestasi&quot; untuk memulai.
                                </td>
                            </tr>
                        ) : (
                            prestasiData.map((item: NewsType, idx) => (
                                <tr key={item.id.toString()} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 text-center text-gray-400 font-mono">{idx + 1}</td>
                                    <td className="p-4">
                                        <div className="font-bold text-[#1A365D]">{item.title}</div>
                                        <div className="text-[10px] text-gray-400 uppercase tracking-widest">{item.slug}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-orange-50 text-orange-600 rounded text-[10px] font-black uppercase tracking-wider">
                                            {item.category || 'Prestasi'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500">{item.date}</td>
                                    <PrestasiActions id={item.id.toString()} title={item.title} />
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
