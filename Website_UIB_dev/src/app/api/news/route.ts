import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const allNews = await prisma.news.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10 // Limiting to latest 10 for the landing page
        });
        return NextResponse.json(allNews);
    } catch (error) {
        console.error("Error fetching news:", error);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}
