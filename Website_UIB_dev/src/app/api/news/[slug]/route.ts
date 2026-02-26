import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const resolvedParams = await params;
        const slug = resolvedParams.slug;
        const newsItem = await prisma.news.findUnique({
            where: { slug: slug }
        });

        if (!newsItem) {
            return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
        }

        return NextResponse.json(newsItem);
    } catch (error) {
        console.error("Error fetching single news:", error);
        return NextResponse.json({ error: "Gagal mengambil data berita" }, { status: 500 });
    }
}
