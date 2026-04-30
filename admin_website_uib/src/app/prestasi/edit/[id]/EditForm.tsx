'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NotionEditor } from '@/components/tiptap-templates/notion-like/notion-like-editor';

export default function EditPrestasiForm({ initialData }: { initialData: any }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        slug: initialData.slug || '',
        date: initialData.date || '',
        author: initialData.author || '',
        description: initialData.description || '',
        category: initialData.category || 'Prestasi',
        summary: initialData.summary || '',
        source: initialData.source || 'UIB.AC.ID',
        metaTitle: initialData.metaTitle || '',
        metaDescription: initialData.metaDescription || ''
    });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        const newSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
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
            formPayload.append('date', formData.date);
            formPayload.append('author', formData.author);
            formPayload.append('description', formData.description);
            formPayload.append('category', formData.category);
            formPayload.append('summary', formData.summary);
            formPayload.append('source', formData.source);
            formPayload.append('metaTitle', formData.metaTitle || '');
            formPayload.append('metaDescription', formData.metaDescription || '');
            formPayload.append('existingImage', initialData.image || '');
            if (imageFile) formPayload.append('image', imageFile);

            const response = await fetch(`/api/prestasi/${initialData.id}`, { method: 'PUT', body: formPayload });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Terjadi kesalahan');
            }
            alert('Prestasi berhasil diperbarui!');
            router.push('/prestasi');
            router.refresh();
        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Judul Prestasi *</label>
                    <input type="text" name="title" required value={formData.title} onChange={handleTitleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">URL Slug *</label>
                    <input type="text" name="slug" required value={formData.slug} onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Kategori *</label>
                    <select name="category" required value={formData.category} onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white">
                        <option value="Prestasi">Prestasi</option>
                        <option value="Internasional">Internasional</option>
                        <option value="Nasional">Nasional</option>
                        <option value="Regional">Regional</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Sumber (Source)</label>
                    <input type="text" name="source" value={formData.source} onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Tanggal Publikasi *</label>
                    <input type="date" name="date" required value={formData.date} onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Penulis / Unit *</label>
                    <input type="text" name="author" required value={formData.author} onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Ringkasan Singkat *</label>
                <textarea name="summary" required value={formData.summary} onChange={handleChange} rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-y" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Ganti Gambar (kosongkan jika tidak ingin mengubah)</label>
                {initialData.image && (
                    <div className="mb-2">
                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Gambar saat ini: {initialData.image}</span>
                    </div>
                )}
                <input type="file" name="image" accept="image/*"
                    onChange={(e) => { if (e.target.files?.[0]) setImageFile(e.target.files[0]); }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Isi Konten Lengkap *</label>
                <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 transition-all bg-gray-50/30">
                    <NotionEditor
                        content={formData.description}
                        onChange={(html) => setFormData({ ...formData, description: html })}
                        placeholder="Mulai menulis detail prestasi..."
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                <Link href="/prestasi" className="px-6 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">
                    Batal
                </Link>
                <button type="submit" disabled={isSubmitting}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:bg-blue-300">
                    {isSubmitting ? 'Menyimpan...' : 'Perbarui Prestasi'}
                </button>
            </div>
        </form>
    );
}
