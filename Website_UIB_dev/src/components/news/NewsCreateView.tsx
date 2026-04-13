"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useConfirmation } from "@/store/useConfirmationBox";
import { NotionEditor, NotionEditorRef } from "@/components/tiptap-templates/notion-like/notion-like-editor";
import HeaderImageUpload from "@/components/HeaderImageUpload";
import { isTiptapEmpty } from "@/utils/isTiptapEmpty";
import { createNews } from "@/actions/newsActions";

export default function NewsCreateView() {
    const router = useRouter();
    const showNotification = useNotifikasi.getState().show;
    const showConfirmation = useConfirmation.getState().show;
    
    const [isLoading, setIsLoading] = useState(false);
    
    const [newsData, setNewsData] = useState({
        title: "",
        tag: "",
        author: "",
        slug: "",
        image: "",
        description: null as any,
        date: new Date().toISOString().split('T')[0],
        metaTitle: "",
        metaDescription: "",
    });

    const editorRef = useRef<NotionEditorRef>(null);

    // Auto-generate slug from title
    useEffect(() => {
        const generatedSlug = newsData.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
        setNewsData(prev => ({ ...prev, slug: generatedSlug }));
    }, [newsData.title]);

    const handleSubmit = async () => {
        if (!newsData.title.trim()) {
            showNotification({
                status: "text-red-500",
                icon: "bx bx-error text-2xl",
                header: "Validasi Gagal",
                message: "Judul berita tidak boleh kosong",
            });
            return;
        }

        if (isTiptapEmpty(newsData.description)) {
            showNotification({
                status: "text-red-500",
                icon: "bx bx-error text-2xl",
                header: "Validasi Gagal",
                message: "Isi berita tidak boleh kosong",
            });
            return;
        }

        setIsLoading(true);
        try {
            const result = await createNews({
                ...newsData,
                description: JSON.stringify(newsData.description)
            });

            if (result.success) {
                showNotification({
                    status: "text-green-500",
                    icon: "bx bx-check text-2xl",
                    header: "Berhasil",
                    message: "Berita baru berhasil dipublikasikan",
                });
                router.push("/news");
            } else {
                throw new Error(result.error);
            }
        } catch (error: any) {
            showNotification({
                status: "text-red-500",
                icon: "bx bx-error text-2xl",
                header: "Simpan Gagal",
                message: error.message || "Terjadi kesalahan saat menyimpan berita",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="px-8 py-4 font-poppins">
            <h1 className="w-full text-4xl font-bold text-slate-800">
                Tambah Berita Baru
            </h1>

            {/* Breadcrumbs */}
            <div className="text-sm text-slate-500 mt-2 mb-6">
                <ul className="flex items-center gap-2">
                    <li>
                        <Link
                            href="/news"
                            className="bg-slate-800 px-3 py-1 rounded text-white text-xs hover:bg-slate-700 transition flex items-center gap-1"
                        >
                            <span className="bx bx-arrow-back"></span> Kembali
                        </Link>
                    </li>
                    <li className="before:content-['/'] before:mr-2">
                        <Link href="/news" className="hover:text-blue-600">Berita</Link>
                    </li>
                    <li className="before:content-['/'] before:mr-2 text-blue-600 font-semibold">
                        Tambah Baru
                    </li>
                </ul>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* LEFT COL */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-slate-800 border-b pb-2">
                            Konten Berita
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Judul Berita <small className="text-red-500">*</small>
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none transition"
                                    placeholder="Masukkan judul berita mernarik..."
                                    value={newsData.title}
                                    onChange={(e) => setNewsData(prev => ({ ...prev, title: e.target.value }))}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Tag / Kategori
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none transition"
                                        placeholder="Contoh: Pengumuman, Kampus..."
                                        value={newsData.tag}
                                        onChange={(e) => setNewsData(prev => ({ ...prev, tag: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Penulis
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none transition"
                                        placeholder="Admin UIB"
                                        value={newsData.author}
                                        onChange={(e) => setNewsData(prev => ({ ...prev, author: e.target.value }))}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-slate-800 border-b pb-2">
                            Isi Berita <small className="text-red-500">*</small>
                        </h2>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 min-h-[400px]">
                            <NotionEditor
                                ref={editorRef}
                                content={newsData.description}
                                onChange={(content) => {
                                    setNewsData(prev => ({ ...prev, description: content }));
                                }}
                            />
                        </div>
                    </section>
                </div>

                {/* RIGHT COL */}
                <div className="space-y-6">
                    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                            Upload Gambar Header
                        </h2>
                        <HeaderImageUpload
                            value={newsData.image}
                            onChange={(file) => {
                                if (file) {
                                  setNewsData(prev => ({ ...prev, image: `/img/${file.name}` }));
                                } else {
                                  setNewsData(prev => ({ ...prev, image: "" }));
                                }
                            }}
                        />
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                            Metadata
                        </h2>
                        <div class="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1 uppercase">
                                    Slug (URL Otomatis)
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 focus:outline-none"
                                    value={newsData.slug}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1 uppercase">
                                    Tanggal Publikasi
                                </label>
                                <input
                                    type="date"
                                    className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-400 focus:outline-none"
                                    value={newsData.date}
                                    onChange={(e) => setNewsData(prev => ({ ...prev, date: e.target.value }))}
                                />
                            </div>
                        </div>
                    </section>

                    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                            SEO Metadata
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1 uppercase">
                                    Meta Title
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-400 focus:outline-none"
                                    placeholder="Judul untuk mesin pencari..."
                                    value={newsData.metaTitle}
                                    onChange={(e) => setNewsData(prev => ({ ...prev, metaTitle: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1 uppercase">
                                    Meta Description
                                </label>
                                <textarea
                                    className="w-full rounded border border-slate-200 px-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-400 focus:outline-none"
                                    rows={3}
                                    placeholder="Deskripsi singkat untuk Google..."
                                    value={newsData.metaDescription}
                                    onChange={(e) => setNewsData(prev => ({ ...prev, metaDescription: e.target.value }))}
                                />
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-col gap-3 pt-2">
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-700 shadow-md transition disabled:opacity-50"
                        >
                            {isLoading ? (
                                <span className="bx bx-loader-alt animate-spin text-xl"></span>
                            ) : (
                                <span className="bx bx-send text-xl"></span>
                            )}
                            Publikasikan Berita
                        </button>
                        
                        <button
                            onClick={() => {
                                showConfirmation({
                                    title: "Batalkan Pembuatan?",
                                    message: "Data yang sudah Anda masukkan akan hilang.",
                                    onConfirm: () => router.push("/news")
                                });
                            }}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-100 border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200 transition"
                        >
                            <span className="bx bx-x text-xl"></span> 
                            Batalkan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
