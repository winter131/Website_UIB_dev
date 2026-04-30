import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  try {
    if (slug) {
      const prestasi = await prisma.news.findUnique({
        where: { slug }
      });
      
      if (prestasi) {
        return NextResponse.json({
          ...prestasi,
          id: prestasi.id.toString(),
        });
      }
      return NextResponse.json({ message: 'Prestasi tidak ditemukan' }, { status: 404 });
    }

    const allPrestasi = await prisma.news.findMany({
      where: {
        category: 'Prestasi'
      },
      orderBy: { date: 'desc' }
    });

    const serialized = allPrestasi.map((item) => ({
      ...item,
      id: item.id.toString(),
    }));

    return NextResponse.json(serialized);
  } catch (error) {
    console.error("Error fetching prestasi API:", error);
    return NextResponse.json([], { status: 500 });
  }
}
