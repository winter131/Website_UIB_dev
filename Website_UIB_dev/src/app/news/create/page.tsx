import React from 'react';
import NewsCreateView from '@/components/news/NewsCreateView';
import NavbarLanding from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

export default function CreateNewsPage() {
    return (
        <main className="bg-[#F8F9FA] min-h-screen pt-[110px]">
            <NavbarLanding />
            <div className="container mx-auto py-10">
                <NewsCreateView />
            </div>
            <Footer />
        </main>
    );
}
