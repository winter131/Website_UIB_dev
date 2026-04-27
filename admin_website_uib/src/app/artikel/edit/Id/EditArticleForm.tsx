'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NotionEditor } from '@/components/tiptap-templates/notion-like/notion-like-editor';

export default function EditArticleForm({ id }: { id: string }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        tag: 'Artikel',
        date: '',
        rawDate: '',
        author: '',
        description: '',
        category: 'Teknologi',
        summary: '',
        image: ''
    });

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await fetch(`/api/artikel/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        ...data,
                        rawDate: '', // Akan diisi jika perlu konversi
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        const newSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        setFormData({ ...formData, title: newTitle, slug: newSlug });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formPayload = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null) formPayload.append(key, value as string);
            });

            if (imageFile) formPayload.append('image', imageFile);

            const response = await fetch(`/api/artikel/${id}`, {
                method: 'PUT',
                body: formPayload
            });

            if (response.ok) {
                alert('Artikel berhasil diperbarui!');
                router.push('/artikel');
                router.refresh();
            }
        } catch (error) {
            alert("Terjadi kesalahan sistem");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center text-gray-400">Memuat data artikel...</div>;

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-8">
            <div className="border-b border-gray-100 pb-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#1A365D]">Edit Artikel</h2>
                <span className="text-[10px] bg-slate-100 px-3 py-1 rounded-full font-bold text-slate-400 uppercase">ID: {id}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Judul Artikel</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleTitleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Slug URL</label>
                    <input
                        type="text"
                        name="slug"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({...formData, slug: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 bg-gray-50 rounded-lg outline-none"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none bg-white"
                    >
                        <option value="Teknologi">Teknologi</option>
                        <option value="Akademik">Akademik</option>
                        <option value="Event">Event</option>
                        <option value="Riset">Riset</option>
                        <option value="Mahasiswa">Mahasiswa</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tanggal</label>
                    <input
                        type="text"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Penulis</label>
                    <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gambar Saat Ini</label>
                {formData.image && <img src={formData.image} alt="Preview" className="w-40 h-24 object-cover rounded-lg border" />}
                <input
                    type="file"
                    onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Isi Artikel</label>
                <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50/30">
                    <NotionEditor
                        initialContent={formData.description}
                        onChange={(html) => setFormData({ ...formData, description: html })}
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                <Link href="/artikel" className="px-6 py-2.5 text-gray-500 font-bold hover:bg-gray-50 rounded-lg">
                    Batal
                </Link>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-2.5 bg-[#1A365D] text-white font-bold rounded-lg shadow-lg disabled:bg-gray-300"
                >
                    {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
            </div>
        </form>
    );
}
