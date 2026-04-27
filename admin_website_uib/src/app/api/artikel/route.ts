import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const articles = await prisma.news.findMany({
            where: {
                OR: [
                    { category: 'Artikel' },
                    { tag: 'Artikel' }
                ]
            },
            orderBy: { date: 'desc' }
        });
        const serializedArticles = articles.map(item => ({
            ...item,
            id: item.id.toString()
        }));
        return NextResponse.json(serializedArticles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const tag = 'Artikel'; // Force tag as Artikel
        const category = formData.get('category') as string || 'Artikel'; 
        const date = formData.get('date') as string;
        const author = formData.get('author') as string;
        const description = formData.get('description') as string;
        const summary = formData.get('summary') as string;
        const imageFile = formData.get('image') as File | null;

        if (!title || !slug) {
            return NextResponse.json({ error: "Judul dan Slug wajib diisi" }, { status: 400 });
        }

        let imageUrl = '';

        if (imageFile && imageFile.name) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;

            // Path untuk upload ke admin dan website utama
            const adminUploadDir = path.join(process.cwd(), 'public', 'uploads');
            const mainUploadDir = path.join(process.cwd(), '..', 'Website_UIB_dev', 'public', 'uploads');

            await fs.promises.mkdir(adminUploadDir, { recursive: true });
            await fs.promises.mkdir(mainUploadDir, { recursive: true });

            await fs.promises.writeFile(path.join(adminUploadDir, fileName), buffer);
            try {
                await fs.promises.writeFile(path.join(mainUploadDir, fileName), buffer);
            } catch (err) {
                console.warn('Gagal copy ke main website', err);
            }

            imageUrl = `/uploads/${fileName}`;
        }

        const newArticle = await prisma.news.create({
            data: {
                title,
                slug,
                tag,
                category,
                date,
                author,
                description,
                summary,
                image: imageUrl,
            }
        });

        return NextResponse.json({ ...newArticle, id: newArticle.id.toString() }, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "Slug sudah digunakan" }, { status: 409 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
