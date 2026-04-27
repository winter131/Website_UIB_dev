import React from 'react'
import BantuanKeuanganView from './view/BantuanKeuanganView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bantuan Keuangan - Admisi UIB',
  description: 'Solusi bantuan finansial dan cicilan kuliah Universitas Internasional Batam.',
}

export default function BantuanKeuanganPage() {
  return <BantuanKeuanganView />
}