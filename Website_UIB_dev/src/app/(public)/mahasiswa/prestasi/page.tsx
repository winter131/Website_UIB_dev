import React from 'react'
import KumpulanPrestasi from '@/components/landing/prestasi/KumpulanPrestasi'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prestasi Mahasiswa | Universitas Internasional Batam',
  description: 'Daftar prestasi gemilang mahasiswa Universitas Internasional Batam di tingkat nasional maupun internasional.',
}

export default function PrestasiPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="h-24 md:h-28 bg-[#2A3955]"></div>
      <KumpulanPrestasi />
    </main>
  )
}
