'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useNotifikasi } from '@/store/useNotifikasi';
import { useConfirmation } from '@/store/useConfirmationBox';

export default function ArticleActions({ id, title }: { id: string, title: string }) {
    const router = useRouter();
    const showNotification = useNotifikasi.getState().show || ((notif: any) => console.log(notif));
    const showConfirmation = useConfirmation.getState().show || ((conf: any) => { if (confirm(conf.message)) conf.onConfirm(); });

    const handleDelete = async () => {
        showConfirmation({
            title: "Hapus Artikel?",
            message: `Apakah Anda yakin ingin menghapus artikel "${title}"? Tindakan ini tidak dapat dibatalkan.`,
            confirmButtonText: "Hapus",
            confirmButtonColor: "bg-red-600",
            onConfirm: async () => {
                try {
                    const res = await fetch(`/api/artikel/${id}`, {
                        method: 'DELETE',
                    });
                    if (res.ok) {
                        showNotification({
                            status: "text-green-500",
                            icon: "bx bx-check text-2xl",
                            header: "Berhasil",
                            message: "Artikel telah dihapus",
                        });
                        router.refresh();
                    } else {
                        const data = await res.json();
                        showNotification({
                            status: "text-red-500",
                            icon: "bx bx-error text-2xl",
                            header: "Gagal",
                            message: data.error || "Gagal menghapus artikel",
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
    };

    return (
        <div className="flex justify-end gap-3">
            <Link 
                href={`/artikel/edit/${id}`} 
                className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg font-bold text-xs transition-all border border-blue-100"
            >
                Edit
            </Link>
            <button
                onClick={handleDelete}
                className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg font-bold text-xs transition-all border border-red-100"
            >
                Hapus
            </button>
        </div>
    );
}
