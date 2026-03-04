import React from 'react'
import NavbarLanding from '@/components/landing/navbar'
import Footer from '@/components/landing/footer'
import LatestNews from '@/components/news/LatestNews'

export default function NewsPage() {
    return (
        <main className="bg-[#F8F9FA] min-h-screen pt-[110px] font-poppins text-[#2A3955]">
            <NavbarLanding />
            <div className="container mx-auto px-4 md:px-20 py-10">
                <LatestNews />
            </div>
            <Footer />
        </main>
    )
}
