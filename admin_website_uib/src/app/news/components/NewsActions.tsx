'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewsActions({ id, title }: { id: number, title: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm(`Apakah Anda yakin ingin menghapus berita: "${title}"?`)) {
            return;
        }

        try {
            const res = await fetch(`/api/news/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                alert('Berita berhasil dihapus!');
                router.refresh();
            } else {
                const data = await res.json();
                alert(data.error || 'Gagal menghapus berita');
            }
        } catch (error) {
            console.error(error);
            alert('Gagal menghapus berita');
        }
    };

    return (
        <td className="p-4 text-right space-x-2">
            <Link href={`/news/edit/${id}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-block">
                Edit
            </Link>
            <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700 font-medium text-sm"
            >
                Delete
            </button>
        </td>
    );
}
