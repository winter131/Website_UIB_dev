'use server';

import prisma from '@/lib/prisma';

export async function getLatestNews() {
    try {
        const allNews = await prisma.news.findMany({
            orderBy: { createdAt: 'desc' },
            take: 10
        });
        return allNews;
    } catch (error) {
        console.error("Failed to fetch news directly via Prisma:", error);
        return [];
    }
}

export async function getNewsBySlug(slug: string) {
    try {
        const item = await prisma.news.findUnique({
            where: { slug }
        });
        return item;
    } catch (error) {
        console.error("Failed to fetch news by slug via Prisma:", error);
        return null;
    }
}

export async function getAllNews() {
    try {
        const allNews = await prisma.news.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return allNews;
    } catch (error) {
        console.error("Failed to fetch all news via Prisma:", error);
        return [];
    }
}
