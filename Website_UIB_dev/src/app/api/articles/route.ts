import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const articles = await prisma.news.findMany({
            where: {
                category: 'Artikel'
            },
            orderBy: { date: 'desc' },
            take: 5
        });

        const serialized = articles.map((item) => ({
            ...item,
            id: item.id.toString(),
            date: item.date || '',
            category: item.category || 'Artikel',
            title: item.title,
            slug: item.slug,
        }));

        return NextResponse.json(serialized);
    } catch (error) {
        console.error("Error fetching articles API:", error);
        return NextResponse.json([], { status: 200 }); 
    }
}