import React from 'react'
import BeasiswaView from './view/BeasiswaView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Beasiswa - Admisi UIB',
  description: 'Program beasiswa pendidikan Universitas Internasional Batam.',
}

export default function BeasiswaPage() {
  return <BeasiswaView />
}