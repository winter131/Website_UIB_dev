import React from 'react'
import RPLView from './view/RPLView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Program RPL - Admisi UIB',
  description: 'Rekognisi Pembelajaran Lampau Universitas Internasional Batam.',
}

export default function RPLPage() {
  return <RPLView />
}