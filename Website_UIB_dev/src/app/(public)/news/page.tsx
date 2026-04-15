'use client'
import React from 'react'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import NewsGridArchive from '@/components/landing/news/NewsGridArchive'

export default function NewsArchivePage() {
    return (
        <main className="min-h-screen bg-white">
            <NavbarLanding />

            {/* Hero Spacer */}
            <div className="h-24 md:h-28 bg-[#2A3955]"></div>

            {/* Archive Content */}
            <NewsGridArchive />

            <Footer />
        </main>
    )
}
