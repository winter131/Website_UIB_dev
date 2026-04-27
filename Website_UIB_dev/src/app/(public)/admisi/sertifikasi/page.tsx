import React from 'react'
import SertifikasiView from './view/SertifikasiView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pusat Sertifikasi - Admisi UIB',
  description: 'Lembaga sertifikasi kompetensi dan internasional Universitas Internasional Batam.',
}

export default function SertifikasiPage() {
  return <SertifikasiView />
}