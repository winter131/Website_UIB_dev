'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useNotifikasi } from '@/store/useNotifikasi';
import { useConfirmation } from '@/store/useConfirmationBox';

export default function PrestasiActions({ id, title }: { id: string, title: string }) {
    const router = useRouter();
    const showNotification = useNotifikasi.getState().show || ((notif: any) => console.log(notif));
    const showConfirmation = useConfirmation.getState().show || ((conf: any) => { if (confirm(conf.message)) conf.onConfirm(); });

    const handleDelete = async () => {
        showConfirmation({
            title: "Hapus Prestasi?",
            message: `Apakah Anda yakin ingin menghapus "${title}"? Tindakan ini tidak dapat dibatalkan.`,
            confirmButtonText: "Hapus",
            confirmButtonColor: "bg-red-600",
            onConfirm: async () => {
                try {
                    const res = await fetch(`/api/prestasi/${id}`, { method: 'DELETE' });
                    if (res.ok) {
                        showNotification({ status: "text-green-500", icon: "bx bx-check text-2xl", header: "Berhasil", message: "Prestasi telah dihapus" });
                        router.refresh();
                    } else {
                        const data = await res.json();
                        showNotification({ status: "text-red-500", icon: "bx bx-error text-2xl", header: "Gagal", message: data.error || "Gagal menghapus" });
                    }
                } catch (error) {
                    showNotification({ status: "text-red-500", icon: "bx bx-error text-2xl", header: "Error", message: "Sistem mengalami kendala" });
                }
            }
        });
    };

    return (
        <td className="p-4 text-right space-x-2">
            <Link href={`/prestasi/edit/${id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-block">
                Edit
            </Link>
            <button onClick={handleDelete} className="text-red-500 hover:text-red-700 font-medium text-sm">
                Hapus
            </button>
        </td>
    );
}
