import React from 'react'
import BiayaKuliahView from './view/BiayaKuliahView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biaya Kuliah - Admisi UIB',
  description: 'Rincian biaya pendidikan Universitas Internasional Batam.',
}

export default function BiayaKuliahPage() {
  return <BiayaKuliahView />
}