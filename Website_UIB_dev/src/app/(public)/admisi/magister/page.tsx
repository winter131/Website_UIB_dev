import React from 'react'
import MagisterView from './view/MagisterView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Program Magister (S2) - Admisi UIB',
  description: 'Informasi pendaftaran program pascasarjana Universitas Internasional Batam.',
}

export default function MagisterPage() {
  return <MagisterView />
}