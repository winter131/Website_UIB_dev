'use client';

import React, { use, useEffect, useState } from 'react';
import EditForm from './EditForm';
import { useNotifikasi } from '@/store/useNotifikasi';

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [initialData, setInitialData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const showNotification = useNotifikasi.getState().show || ((notif: any) => console.log(notif));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/berita/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setInitialData(data);
                } else {
                    showNotification({
                        status: "text-red-500",
                        icon: "bx-error-circle",
                        header: "Error",
                        message: "Gagal mengambil data berita"
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (isLoading) return <div className="p-8">Memuat data...</div>;
    if (!initialData) return <div className="p-8 text-red-500">Data tidak ditemukan.</div>;

    return (
        <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
            <EditForm initialData={initialData} />
        </div>
    );
}
