"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useConfirmation } from "@/store/useConfirmationBox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMulaiWawancaraData } from "@/hooks/mulai-wawancara/useMulaiWawancaraData";
import { columns } from "../columns";
import { DataTable } from "../data-table";

export default function MulaiWawancaraView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();
  const [searchTerm, setSearchTerm] = useState("");

  // Get data calon mahasiswa
  const { data, isLoading, refetch } = useMulaiWawancaraData(
    session.user?.accessToken,
    status,
  );

  // Save filter to localStorage untuk persistensi data filter
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const search = localStorage.getItem("appliedSearchMulaiWawancara");
    if (search) {
      setSearchTerm(search || "");
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("appliedSearchMulaiWawancara", searchTerm);
  }, [searchTerm, isLoaded]);

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Mulai Wawancara</h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm text-black">
        <ul>
          <li>
            <Link
              href={`/dashboard`}
              className="btn bg-black btn-xs rounded-lg text-white font-normal no-underline"
            >
              <span className="bx bx-arrow-back"></span> Kembali
            </Link>
          </li>
          <li className="text-xs">
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="text-xs">
            <Link href={pathname}>Mulai Wawancara</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#171717] p-5 rounded-xl shadow-sm border border-slate-100 dark:border-zinc-800">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-black dark:text-white">
            Pencarian Calon Mahasiswa
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Cari berdasarkan nama, nomor daftar, email, atau program studi
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau nomor daftar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-zinc-900 border-none rounded-lg text-sm focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-black dark:text-white"
          />
        </div>
      </div>
      {/* List Calon Mahasiswa */}
      <Tabs defaultValue="pesananHariIni" className="w-full max-w-full mt-6">
        <TabsList className="flex w-full overflow-x-auto justify-center items-center">
          <TabsTrigger
            className=" dark:data-[state=active]:bg-[#171717] w-full"
            value="pesananHariIni"
          >
            Sarjana (S1)
          </TabsTrigger>
          <TabsTrigger
            className=" dark:data-[state=active]:bg-[#171717] w-full"
            value="perluPerbaikan"
          >
            Magister (S2)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pesananHariIni" className="w-full max-w-full">
          <DataTable
            columns={columns}
            data={data?.all_camhs_s1 || []}
            isLoading={isLoading}
            searchQuery={searchTerm}
          />
        </TabsContent>
        <TabsContent value="perluPerbaikan" className="w-full max-w-full">
          <DataTable
            columns={columns}
            data={data?.all_camhs_s2 || []}
            isLoading={isLoading}
            searchQuery={searchTerm}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
