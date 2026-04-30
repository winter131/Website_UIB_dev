'use server';

import prisma from '@/lib/prisma';

export async function getLatestNews() {
    try {
        const allNews = await prisma.news.findMany({
            where: {
                NOT: [
                    { category: 'Artikel' },
                    { category: 'Prestasi' }
                ]
            },
            orderBy: { date: 'desc' },
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

export async function getAllNews(category?: string) {
    try {
        let whereClause: any = {};
        if (category === 'Berita') {
            whereClause = {
                NOT: { category: 'Artikel' }
            };
        } else if (category && category !== 'Semua') {
            whereClause = { category };
        }

        const allNews = await prisma.news.findMany({
            where: whereClause,
            orderBy: { date: 'desc' }
        });
        return allNews;
    } catch (error) {
        console.error("Failed to fetch all news via Prisma:", error);
        return [];
    }
}
export async function getNewsById(id: number | string) {
    try {
        const item = await prisma.news.findUnique({
            where: { id: BigInt(id) }
        });
        if (!item) return null;

        return {
            ...item,
            id: Number(item.id) 
        };
    } catch (error) {
        console.error("Failed to fetch news by ID via Prisma:", error);
        return null;
    }
}

export async function updateNews(id: number | string, data: any) {
    try {
        const updated = await prisma.news.update({
            where: { id: BigInt(id) },
            data: {
                title: data.title,
                tag: data.tag,
                category: data.category,
                summary: data.summary,
                source: data.source,
                author: data.author,
                slug: data.slug,
                image: data.image,
                description: data.description,
                date: data.date,
                metaTitle: data.metaTitle,
                metaDescription: data.metaDescription,
                updatedAt: new Date()
            }
        });
        return { 
            success: true, 
            data: { ...updated, id: Number(updated.id) } 
        };
    } catch (error: any) {
        console.error("Failed to update news via Prisma:", error);
        return { success: false, error: error.message };
    }
}

export async function createNews(data: any) {
    try {
        const created = await prisma.news.create({
            data: {
                title: data.title,
                tag: data.tag,
                category: data.category,
                summary: data.summary,
                source: data.source,
                author: data.author,
                slug: data.slug,
                image: data.image,
                description: data.description,
                date: data.date,
                metaTitle: data.metaTitle,
                metaDescription: data.metaDescription,
            }
        });
        return { 
            success: true, 
            data: { ...created, id: Number(created.id) } 
        };
    } catch (error: any) {
        console.error("Failed to create news via Prisma:", error);
        return { success: false, error: error.message };
    }
}