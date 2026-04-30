'use client';

import React from 'react';
import CreateForm from './CreateForm';

export default function CreatePrestasi() {
    return (
        <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto mb-6">
                <h1 className="text-2xl font-bold text-[#1A365D]">Tambah Prestasi Baru</h1>
                <p className="text-gray-500 text-sm">Isi semua field untuk mempublikasikan prestasi mahasiswa.</p>
            </div>
            <CreateForm />
        </div>
    );
}
