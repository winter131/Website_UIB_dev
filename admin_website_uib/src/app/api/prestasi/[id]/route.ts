import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const item = await prisma.news.findUnique({ where: { id: BigInt(id) } });
        if (!item) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
        return NextResponse.json({ ...item, id: item.id.toString() });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        await prisma.news.delete({ where: { id: BigInt(id) } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const formData = await request.formData();

        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const date = formData.get('date') as string;
        const author = formData.get('author') as string;
        const description = formData.get('description') as string;
        const imageFile = formData.get('image') as File | null;
        const existingImage = formData.get('existingImage') as string;
        const category = (formData.get('category') as string) || 'Prestasi';
        const summary = formData.get('summary') as string;
        const source = (formData.get('source') as string) || 'UIB.AC.ID';
        const metaTitle = formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;

        if (!title || !slug) {
            return NextResponse.json({ error: "Judul dan Slug wajib diisi" }, { status: 400 });
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

            await fs.promises.writeFile(path.join(adminUploadDir, fileName), buffer);
            try { await fs.promises.writeFile(path.join(mainUploadDir, fileName), buffer); } catch {}

            imageUrl = `/uploads/${fileName}`;
        }

        const updated = await prisma.news.update({
            where: { id: BigInt(id) },
            data: { title, slug, tag: category, category, summary, source, date, author, image: imageUrl, description, metaTitle, metaDescription }
        });

        return NextResponse.json({ ...updated, id: updated.id.toString() });
    } catch (error: any) {
        if (error.code === 'P2002') return NextResponse.json({ error: "Slug sudah digunakan" }, { status: 409 });
        return NextResponse.json({ error: `Gagal memperbarui: ${error.message}` }, { status: 500 });
    }
}
