import prisma from "@/lib/prisma";
import { Newspaper, FileText, Globe, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {

  const allData = await prisma.news.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  const totalAll = await prisma.news.count();
  const totalArticle = await prisma.news.count({ where: { category: 'Artikel' } });
  const totalBerita = totalAll - totalArticle;

  // Statistik dummy untuk visualisasi tren (bisa diganti data asli nantinya)
  const stats = [
    {
      label: "Total Konten",
      value: totalAll,
      icon: Globe,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      description: "Semua berita & artikel"
    },
    {
      label: "Berita Publikasi",
      value: totalBerita,
      icon: Newspaper,
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
      description: "Pengumuman & berita kampus"
    },
    {
      label: "Total Artikel",
      value: totalArticle,
      icon: FileText,
      color: "bg-orange-500",
      textColor: "text-orange-600",
      description: "Opini & tulisan ilmiah"
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 font-medium">Selamat datang kembali! Berikut ringkasan konten Anda hari ini.</p>
        </div>
        <Link
          href="/admin/news/create"
          className="inline-flex items-center gap-2 bg-[#1A365D] hover:bg-[#2a4a7d] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95"
        >
          <Plus size={20} />
          Buat Konten Baru
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.color} bg-opacity-10 ${stat.textColor}`}>
                <stat.icon size={26} />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                <ArrowUpRight size={14} /> +2.5%
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider">{stat.label}</h3>
              <p className="text-4xl font-black text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-400 font-medium pt-2">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}