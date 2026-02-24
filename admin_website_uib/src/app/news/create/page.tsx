'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateNews() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        tag: '',
        date: '',
        author: '',
        description: ''
    });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        // Auto-generate slug from title
        const newSlug = newTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with dashes
            .replace(/(^-|-$)+/g, ''); // remove leading and trailing dashes

        setFormData({ ...formData, title: newTitle, slug: newSlug });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formPayload = new FormData();
            formPayload.append('title', formData.title);
            formPayload.append('slug', formData.slug);
            formPayload.append('tag', formData.tag);
            formPayload.append('date', formData.date);
            formPayload.append('author', formData.author);
            formPayload.append('description', formData.description);
            if (imageFile) {
                formPayload.append('image', imageFile);
            }

            const response = await fetch('/api/news', {
                method: 'POST',
                body: formPayload
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Terjadi kesalahan saat menyimpan data');
            }

            alert('Berita berhasil dipublikasikan!');
            router.push('/news');
            router.refresh();
        } catch (error: any) {
            console.error('Error submitting form:', error);
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/news" className="text-gray-500 hover:text-gray-900 transition-colors">
                    &larr; Kembali
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Buat Berita Baru</h1>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-8">

                {/* Title & Slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Judul Berita (Title) *</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleTitleChange}
                            placeholder="Contoh: UIB Meraih Penghargaan Nasional"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">URL Slug *</label>
                        <input
                            type="text"
                            name="slug"
                            required
                            value={formData.slug}
                            onChange={handleChange}
                            placeholder="otomatis-dari-judul"
                            className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                        <p className="text-xs text-gray-500">Slug untuk URL, misalnya: /news/prestasi-unggul</p>
                    </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Kategori (Tag) *</label>
                        <select
                            name="tag"
                            required
                            value={formData.tag}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                        >
                            <option value="">Pilih Kategori...</option>
                            <option value="Liputan Utama">Liputan Utama</option>
                            <option value="Prestasi">Prestasi</option>
                            <option value="Akademik">Akademik</option>
                            <option value="Kemahasiswaan">Kemahasiswaan</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Tanggal Publikasi *</label>
                        <input
                            type="date"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Penulis (Author) *</label>
                        <input
                            type="text"
                            name="author"
                            required
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="Contoh: Humas UIB"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Image Input */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Unggah Gambar Utama *</label>
                    <input
                        type="file"
                        name="image"
                        required
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                setImageFile(e.target.files[0]);
                            }
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>

                {/* Full Description */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Isi Berita Lengkap (Description) *</label>
                    <textarea
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        rows={10}
                        placeholder="Tuliskan detail lengkap berita di sini..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                    <Link href="/news" className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:bg-blue-300"
                    >
                        {isSubmitting ? 'Menyimpan...' : 'Simpan & Publikasikan'}
                    </button>
                </div>

            </form>
        </div>
    );
}
