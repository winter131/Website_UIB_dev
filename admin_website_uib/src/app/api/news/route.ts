import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const news = await prisma.news.findMany({
            orderBy: { createdAt: 'desc' }
        });
        const serializedNews = news.map(item => ({
            ...item,
            id: item.id.toString()
        }));
        return NextResponse.json(serializedNews);
    } catch (error) {
        console.error("Error fetching news:", error);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const tag = formData.get('tag') as string;
        const date = formData.get('date') as string;
        const author = formData.get('author') as string;
        const description = formData.get('description') as string;
        const imageFile = formData.get('image') as File | null;
        const metaTitle = formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;

        const category = formData.get('category') as string;
        const summary = formData.get('summary') as string;
        const source = formData.get('source') as string;

        // Validate minimum required fields
        if (!title || !slug || !tag) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        let imageUrl = '';

        if (imageFile && imageFile.name) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const timestamp = Date.now();
            const fileName = `${timestamp}-${imageFile.name.replace(/\s+/g, '-')}`;

            const adminUploadDir = path.join(process.cwd(), 'public', 'uploads');
            const mainUploadDir = path.join(process.cwd(), '..', 'Website_UIB_dev', 'public', 'uploads');

            await fs.promises.mkdir(adminUploadDir, { recursive: true });
            await fs.promises.mkdir(mainUploadDir, { recursive: true });

            const adminFilePath = path.join(adminUploadDir, fileName);
            const mainFilePath = path.join(mainUploadDir, fileName);

            // Write to both
            await fs.promises.writeFile(adminFilePath, buffer);
            try {
                await fs.promises.writeFile(mainFilePath, buffer);
            } catch (webErr) {
                console.warn('Failed to write to main website directory', webErr);
            }

            imageUrl = `/uploads/${fileName}`;
        }

        const newPost = await prisma.news.create({
            data: {
                title,
                slug,
                tag,
                category,
                summary,
                source,
                date,
                author,
                image: imageUrl,
                description,
                metaTitle,
                metaDescription,
            }
        });

        const serializedPost = {
            ...newPost,
            id: newPost.id.toString()
        };

        return NextResponse.json(serializedPost, { status: 201 });
    } catch (error: any) {
        console.error("Error creating news post:", error);
        
        // Handle unique constraint error on slug
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
        }

        // Return detailed error for debugging
        return NextResponse.json({ 
            error: `Gagal membuat berita: ${error.message || 'Internal Server Error'}`,
            details: error.code ? `Prisma Error Code: ${error.code}` : undefined
        }, { status: 500 });
    }
}
