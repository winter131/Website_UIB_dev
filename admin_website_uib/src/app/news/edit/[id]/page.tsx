import Link from 'next/link';
import prisma from '@/lib/prisma';
import EditNewsForm from './EditForm';
import { notFound } from 'next/navigation';

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const news = await prisma.news.findUnique({
        where: { id: parseInt(id) }
    });

    if (!news) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/news" className="text-gray-500 hover:text-gray-900 transition-colors">
                    &larr; Kembali
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Edit Berita</h1>
            </div>

            <EditNewsForm initialData={news} />
        </div>
    );
}
