'use client'
import React from 'react'


import AboutHeader from '@/components/landing/tentang/about-header'
import Akreditasi from '@/components/landing/tentang/akreditasi'

export default function AkreditasiView() {
    return (
        <main className="min-h-screen bg-white font-poppins relative">
            <AboutHeader title="Akreditasi" />

            <Akreditasi />

        </main>
    )
}