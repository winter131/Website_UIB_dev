'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NotionEditor } from '@/components/tiptap-templates/notion-like/notion-like-editor';

export default function EditNewsForm({ initialData }: { initialData: any }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        slug: initialData.slug || '',
        tag: initialData.tag || '',
        date: initialData.date || '',
        author: initialData.author || '',
        description: initialData.description || '',
        category: initialData.category || 'Berita Kampus',
        summary: initialData.summary || '',
        source: initialData.source || 'UIB.AC.ID',
        metaTitle: initialData.metaTitle || '',
        metaDescription: initialData.metaDescription || ''
    });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        const newSlug = newTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');

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
            formPayload.append('category', formData.category);
            formPayload.append('summary', formData.summary);
            formPayload.append('source', formData.source);
            formPayload.append('metaTitle', formData.metaTitle || '');
            formPayload.append('metaDescription', formData.metaDescription || '');
            // Append existing image URL so the API can retain it if no new file is uploaded
            formPayload.append('existingImage', initialData.image || '');

            if (imageFile) {
                formPayload.append('image', imageFile);
            }

            const response = await fetch(`/api/berita/${initialData.id}`, {
                method: 'PUT',
                body: formPayload
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Terjadi kesalahan saat menyimpan data');
            }

            alert('Berita berhasil diperbarui!');
            router.push('/berita');
            router.refresh();
        } catch (error: any) {
            console.error('Error submitting form:', error);
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Judul Berita (Title) *</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleTitleChange}
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
                        className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Sub-Kategori / Website (Category) *</label>
                    <select
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                    >
                        <option value="Pengumuman">Pengumuman</option>
                        <option value="Ilmu Hukum">Ilmu Hukum</option>
                        <option value="Manajemen">Manajemen</option>
                        <option value="Sistem Informasi">Sistem Informasi</option>
                        <option value="Teknologi Informasi">Teknologi Informasi</option>
                        <option value="Artikel">Artikel</option>
                        <option value="Akuntansi">Akuntansi</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Sumber (Source) *</label>
                    <input
                        type="text"
                        name="source"
                        required
                        value={formData.source}
                        onChange={handleChange}
                        placeholder="Cth: UIB.AC.ID"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Jenis Berita (Tag) *</label>
                    <select
                        name="tag"
                        required
                        value={formData.tag}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                    >
                        <option value="">Pilih...</option>
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Ringkasan Singkat (Summary) *</label>
                <textarea
                    name="summary"
                    required
                    value={formData.summary}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
                    placeholder="Penjelasan singkat untuk kartu berita..."
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Ganti Gambar (Kosongkan jika tidak ingin mengubah)</label>
                {initialData.image && (
                    <div className="mb-2">
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Gambar saat ini: {initialData.image}</span>
                    </div>
                )}
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setImageFile(e.target.files[0]);
                        }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Isi Berita Lengkap (Description) *</label>
                <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all bg-gray-50/30">
                    <NotionEditor
                        content={formData.description}
                        onChange={(html) => setFormData({ ...formData, description: html })}
                        placeholder="Mulai menulis berita di sini... Gunakan '/' untuk perintah cepat."
                    />
                </div>
                <p className="text-[10px] text-gray-400">Gunakan toolbar melayang atau ketik "/" untuk menambahkan gambar, tabel, atau pemformatan lainnya.</p>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                <Link href="/berita" className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:bg-blue-300"
                >
                    {isSubmitting ? 'Menyimpan...' : 'Perbarui Berita'}
                </button>
            </div>
        </form>
    );
}
