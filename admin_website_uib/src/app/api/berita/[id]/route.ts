import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const news = await prisma.news.findUnique({
            where: { id: BigInt(id) }
        });

        if (!news) {
            return NextResponse.json({ error: "News not found" }, { status: 404 });
        }

        // Properly serialize BigInt for JSON response
        const serializedNews = {
            ...news,
            id: news.id.toString()
        };

        return NextResponse.json(serializedNews);
    } catch (error) {
        console.error("Error fetching news:", error);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        await prisma.news.delete({
            where: { id: BigInt(id) }
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting news:", error);
        return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
    }
}



export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const formData = await request.formData();

        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const tag = formData.get('tag') as string;
        const date = formData.get('date') as string;
        const author = formData.get('author') as string;
        const description = formData.get('description') as string;
        const imageFile = formData.get('image') as File | null;
        const existingImage = formData.get('existingImage') as string;
        const metaTitle = formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;

        const category = formData.get('category') as string;
        const summary = formData.get('summary') as string;
        const source = formData.get('source') as string;

        if (!title || !slug || !tag) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        let imageUrl = existingImage;

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

            await fs.promises.writeFile(adminFilePath, buffer);
            try {
                await fs.promises.writeFile(mainFilePath, buffer);
            } catch (webErr) {
                console.warn('Failed to write to main website directory', webErr);
            }

            imageUrl = `/uploads/${fileName}`;
        }

        const updatedPost = await prisma.news.update({
            where: { id: BigInt(id) },
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
            ...updatedPost,
            id: updatedPost.id.toString()
        };

        return NextResponse.json(serializedPost, { status: 200 });
    } catch (error: any) {
        console.error("Error updating news post:", error);
        
        // Handle unique constraint error on slug
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
        }
        
        // Handle Prisma specific errors for better debugging
        if (error.code) {
            return NextResponse.json({ 
                error: `Database error (${error.code}): ${error.message || 'Operation failed'}` 
            }, { status: 500 });
        }

        return NextResponse.json({ error: `Internal Server Error: ${error.message || 'Failed to update news post'}` }, { status: 500 });
    }
}
