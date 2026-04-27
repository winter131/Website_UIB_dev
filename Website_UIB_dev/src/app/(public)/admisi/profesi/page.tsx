import React from 'react'
import ProfesiView from './view/ProfesiView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Program Profesi - Admisi UIB',
  description: 'Informasi pendidikan profesi Universitas Internasional Batam.',
}

export default function ProfesiPage() {
  return <ProfesiView />
}