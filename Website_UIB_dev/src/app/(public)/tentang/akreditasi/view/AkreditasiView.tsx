'use client'
import React from 'react'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import AboutHeader from '@/components/landing/tentang/about-header'
import Akreditasi from '@/components/landing/tentang/akreditasi'

export default function AkreditasiView() {
    return (
        <main className="min-h-screen bg-white font-poppins relative">
            <NavbarLanding />
            <AboutHeader title="Akreditasi" />

            <Akreditasi />

            <Footer />
        </main>
    )
}
