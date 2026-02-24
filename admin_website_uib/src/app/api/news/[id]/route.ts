import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;

        // Optionally, fetch the news to delete its image file from disk if desired
        // For now, we'll just delete the DB record.
        await prisma.news.delete({
            where: { id: parseInt(id) }
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

        // Validate minimum required fields
        if (!title || !slug || !tag) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        let imageUrl = existingImage || '';

        // If a new image was uploaded
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
            where: { id: parseInt(id) },
            data: {
                title,
                slug,
                tag,
                date,
                author,
                image: imageUrl,
                description,
            }
        });

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error: any) {
        console.error("Error updating news post:", error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: "A post with this slug already exists" }, { status: 409 });
        }
        return NextResponse.json({ error: "Failed to update news post" }, { status: 500 });
    }
}
