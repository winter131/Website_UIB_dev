import React from 'react';
import NewsEditView from '@/components/news/NewsEditView';
import NavbarLanding from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const newsId = parseInt(id);

    return (
        <main className="bg-[#F8F9FA] min-h-screen pt-[110px]">
            <NavbarLanding />
            <div className="container mx-auto py-10">
                <NewsEditView id={newsId} />
            </div>
            <Footer />
        </main>
    );
}
