"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useConfirmation } from "@/store/useConfirmationBox";
import { NotionEditor, NotionEditorRef } from "@/components/tiptap-templates/notion-like/notion-like-editor";
import HeaderImageUpload from "@/components/HeaderImageUpload";
import { isTiptapEmpty } from "@/utils/isTiptapEmpty";
import { decodeHtmlEntities } from "@/utils/decodeHTMLEntities";
import { updateNews, getNewsById } from "@/actions/newsActions";

interface NewsEditViewProps {
    id: number;
}

export default function NewsEditView({ id }: NewsEditViewProps) {
    const router = useRouter();
    const showNotification = useNotifikasi.getState().show;
    const showConfirmation = useConfirmation.getState().show;
    
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    
    const [newsData, setNewsData] = useState({
        id: 0,
        title: "",
        tag: "",
        author: "",
        slug: "",
        image: "",
        description: null as any,
        date: "",
        metaTitle: "",
        metaDescription: "",
    });

    const editorRef = useRef<NotionEditorRef>(null);

    useEffect(() => {
        const fetchExistingNews = async () => {
            setIsFetching(true);
            try {
                const data = await getNewsById(id);
                if (data) {
                    const decodedDescription = typeof data.description === 'string' 
                        ? JSON.parse(decodeHtmlEntities(data.description)) 
                        : data.description;

                    setNewsData({
                        id: data.id,
                        title: data.title || "",
                        tag: data.tag || "",
                        author: data.author || "",
                        slug: data.slug || "",
                        image: data.image || "",
                        description: decodedDescription,
                        date: data.date || new Date().toISOString().split('T')[0],
                        metaTitle: data.metaTitle || "",
                        metaDescription: data.metaDescription || "",
                    });
                } else {
                    showNotification({
                        status: "text-red-500",
                        icon: "bx bx-error text-2xl",
                        header: "Berita Tidak Ditemukan",
                        message: "Data berita tidak ditemukan di database.",
                    });
                    router.push("/news");
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchExistingNews();
    }, [id]);

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
            // Note: In a real app, if newsData.image is a File, we would upload it first.
            // For now, we assume it's a string path as per existing model.
            const result = await updateNews(id, {
                ...newsData,
                description: JSON.stringify(newsData.description)
            });

            if (result.success) {
                showNotification({
                    status: "text-green-500",
                    icon: "bx bx-check text-2xl",
                    header: "Berhasil",
                    message: "Berita berhasil diperbarui",
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

    if (isFetching) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <div className="bx bx-loader-alt animate-spin text-4xl text-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="px-8 py-4 font-poppins">
            <h1 className="w-full text-4xl font-bold text-slate-800">
                Edit Berita
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
                        Edit
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
                                    placeholder="Masukkan judul berita..."
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
                                        placeholder="Contoh: Kampus, Beasiswa..."
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
                                // Normally upload file here, for now we keep it simple
                                if (file) {
                                  // Mocking a path
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
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 mb-1 uppercase">
                                    Slug (URL)
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 focus:outline-none"
                                    value={newsData.slug}
                                    readOnly
                                />
                                <p className="mt-1 text-[10px] text-slate-400 italic">Slug bersifat permanen untuk SEO.</p>
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
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 shadow-md transition disabled:opacity-50"
                        >
                            {isLoading ? (
                                <span className="bx bx-loader-alt animate-spin text-xl"></span>
                            ) : (
                                <span className="bx bx-save text-xl"></span>
                            )}
                            Simpan Perubahan
                        </button>
                        
                        <button
                            onClick={() => {
                                showConfirmation({
                                    title: "Batalkan Perubahan?",
                                    message: "Data yang Anda ubah akan hilang dan kembali ke data asli.",
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
