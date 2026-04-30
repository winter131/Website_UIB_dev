import React from 'react'
import { notFound } from 'next/navigation'
import { getNewsBySlug, getAllNews } from '@/actions/newsActions'
import DetailPrestasiView from '@/components/landing/prestasi/DetailPrestasiView'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const prestasi = await getNewsBySlug(slug)
  return {
    title: prestasi ? `${prestasi.title} | UIB` : 'Prestasi Mahasiswa | UIB',
    description: prestasi?.summary || prestasi?.metaDescription || 'Detail prestasi mahasiswa Universitas Internasional Batam.',
  }
}

export default async function DetailPrestasiPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const prestasi = await getNewsBySlug(slug)

  if (!prestasi || prestasi.category !== 'Prestasi') {
    notFound()
  }

  const allPrestasi = await getAllNews('Prestasi')

  return (
    <main className="min-h-screen bg-white font-poppins text-[#2A3955] selection:bg-[#e67e22] selection:text-white">
      <DetailPrestasiView
        prestasi={prestasi}
        relatedPrestasi={allPrestasi}
        slug={slug}
      />
    </main>
  )
}
