import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const data = await prisma.news.findMany({
            where: { category: 'Prestasi' },
            orderBy: { date: 'desc' }
        });
        return NextResponse.json(data.map(item => ({ ...item, id: item.id.toString() })));
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch prestasi" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const date = formData.get('date') as string;
        const author = formData.get('author') as string;
        const description = formData.get('description') as string;
        const imageFile = formData.get('image') as File | null;
        const category = (formData.get('category') as string) || 'Prestasi';
        const summary = formData.get('summary') as string;
        const source = (formData.get('source') as string) || 'UIB.AC.ID';
        const metaTitle = formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;

        if (!title || !slug) {
            return NextResponse.json({ error: "Judul dan Slug wajib diisi" }, { status: 400 });
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

            await fs.promises.writeFile(path.join(adminUploadDir, fileName), buffer);
            try { await fs.promises.writeFile(path.join(mainUploadDir, fileName), buffer); } catch {}

            imageUrl = `/uploads/${fileName}`;
        }

        const newPost = await prisma.news.create({
            data: { title, slug, tag: category, category, summary, source, date, author, image: imageUrl, description, metaTitle, metaDescription }
        });

        return NextResponse.json({ ...newPost, id: newPost.id.toString() }, { status: 201 });
    } catch (error: any) {
        if (error.code === 'P2002') return NextResponse.json({ error: "Slug sudah digunakan" }, { status: 409 });
        return NextResponse.json({ error: `Gagal membuat prestasi: ${error.message}` }, { status: 500 });
    }
}
