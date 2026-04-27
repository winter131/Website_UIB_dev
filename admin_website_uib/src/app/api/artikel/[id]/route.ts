import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const article = await prisma.news.findUnique({
            where: { id: BigInt(params.id) }
        });
        if (!article) return NextResponse.json({ error: "Artikel tidak ditemukan" }, { status: 404 });
        
        return NextResponse.json({ ...article, id: article.id.toString() });
    } catch (error) {
        return NextResponse.json({ error: "Gagal mengambil data artikel" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = BigInt(params.id);
        
        // Cek data untuk hapus gambar jika ada
        const article = await prisma.news.findUnique({ where: { id } });
        
        if (article?.image) {
            const imagePath = path.join(process.cwd(), 'public', article.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await prisma.news.delete({ where: { id } });
        return NextResponse.json({ message: "Artikel berhasil dihapus" });
    } catch (error) {
        return NextResponse.json({ error: "Gagal menghapus artikel" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = BigInt(params.id);
        const formData = await request.formData();
        
        const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
        const category = formData.get('category') as string;
        const date = formData.get('date') as string;
        const author = formData.get('author') as string;
        const description = formData.get('description') as string;
        const summary = formData.get('summary') as string;
        const imageFile = formData.get('image') as File | null;

        let dataToUpdate: any = {
            title, slug, category, date, author, description, summary,
            updatedAt: new Date()
        };

        if (imageFile && imageFile.name) {
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
            
            const adminUploadDir = path.join(process.cwd(), 'public', 'uploads');
            const mainUploadDir = path.join(process.cwd(), '..', 'Website_UIB_dev', 'public', 'uploads');

            await fs.promises.mkdir(adminUploadDir, { recursive: true });
            await fs.promises.mkdir(mainUploadDir, { recursive: true });

            await fs.promises.writeFile(path.join(adminUploadDir, fileName), buffer);
            try {
                await fs.promises.writeFile(path.join(mainUploadDir, fileName), buffer);
            } catch(e) {}

            dataToUpdate.image = `/uploads/${fileName}`;
        }

        const updated = await prisma.news.update({
            where: { id },
            data: dataToUpdate
        });

        return NextResponse.json({ ...updated, id: updated.id.toString() });
    } catch (error) {
        return NextResponse.json({ error: "Gagal memperbarui artikel" }, { status: 500 });
    }
}
