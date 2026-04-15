'use client'
import React from 'react'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import BatamdanSekitarnya from '@/components/landing/informasi/batamdansekitarnya'

export default function BatamSekitarnyaView() {
    return (
        <main className="min-h-screen bg-white">
            <NavbarLanding />
            <BatamdanSekitarnya />
            <Footer />
        </main>
    )
}
