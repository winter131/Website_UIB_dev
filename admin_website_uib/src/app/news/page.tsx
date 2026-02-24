import Link from 'next/link';
import prisma from '@/lib/prisma';
import type { News } from '@prisma/client';
import NewsActions from './components/NewsActions';

export default async function NewsManagement() {
    const newsList = await prisma.news.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
                <Link href="/news/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Add New Post
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                            <th className="p-4 font-semibold">Title</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold">Date</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {newsList.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">
                                    Belum ada berita. Silakan tekan "Add New Post".
                                </td>
                            </tr>
                        ) : (
                            newsList.map((news: News) => (
                                <tr key={news.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-gray-800 font-medium">{news.title}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">Published</span>
                                    </td>
                                    <td className="p-4 text-gray-500 text-sm">{news.date}</td>
                                    <NewsActions id={news.id} title={news.title} />
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
