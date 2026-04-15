"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import { useDeleteInformasiUmum } from "@/hooks/informasi-umum/useDeleteInformasiUmum";
import { InformasiUmumType } from "@/types/InformasiUmumTypes";
import { useInformasiUmumData } from "@/hooks/informasi-umum/useInformasiUmumData";
import InformasiUmumSidePanel from "@/components/InformasiUmumSidePanel";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";
import useInformasiUmum from "@/store/useEditInformasiUmum";
import useDetailInformasiUmum from "@/store/useDetailInformasiUmum";

export default function InformasiUmumView() {
  const pathname = usePathname();
  const router = useRouter();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { setEditInformasiUmum }: any = useInformasiUmum();
  const { setDetailInformasiUmum }: any = useDetailInformasiUmum();
  const { data: session, status }: { data: any; status: string } = useSession();

  const [searchTerm, setSearchTerm] = useState("");
  const [ringkasan, setRingkasan] = useState({
    totalInformasi: 0,
    aktif: 0,
    nonaktif: 0,
    updateTerakhir: "",
  });

  // Get data informasi umum
  const { data, isLoading, refetch } = useInformasiUmumData(
    session.user?.accessToken,
    status
  );
  // Mutation delete informasi umum
  const { mutate: deleteInformasiUmumMutation } = useDeleteInformasiUmum(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus informasi umum",
      });
      refetch();
      setSearchTerm("");
    },
    (msg) => {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: msg,
      });
    }
  );
  // Handle delete
  const handleDelete = (data: InformasiUmumType) => {
    showConfirmation({
      title: "Hapus informasi umum?",
      message:
        "Informasi umum ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteInformasiUmumMutation({
          token: session.user?.accessToken,
          informasiId: data.id_informasi,
        });
      },
    });
  };
  const handleEdit = (data: InformasiUmumType) => {
    setEditInformasiUmum(data);
    router.push(`/managemen-data-umum/informasi-umum/ubah-informasi`);
  };

  const handleView = (data: InformasiUmumType) => {
    console.log("view", data);
    setDetailInformasiUmum(data);
    router.push(`/managemen-data-umum/informasi-umum/detail-informasi`);
  };

  useEffect(() => {
    if (!data) return;

    const totalInformasi = data.length;
    const aktif = data.filter(
      (item: InformasiUmumType) => item.is_aktif === "y"
    ).length;
    const nonaktif = totalInformasi - aktif;
    const updateTerakhir = data
      .map((item: InformasiUmumType) => new Date(item.TanggalUpload))
      .sort((a: Date, b: Date) => b.getTime() - a.getTime())[0];

    setRingkasan({
      totalInformasi,
      aktif,
      nonaktif,
      updateTerakhir,
    });
  }, [data]);

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Informasi Umum</h1>

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
            <Link href={pathname}>Informasi Umum</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen informasi umum yang akan ditampilkan pada
          website pendaftaran mahasiswa baru.
        </span>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Cari informasi umum..."
          className="input w-full bg-white mb-4 input-md shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Content - Table jurusan dan form jurusan */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table jurusan */}
        <div className="col-span-2">
          <DataTable
            columns={columns}
            data={data || []}
            searchQuery={searchTerm}
            isLoading={isLoading}
            refetch={refetch}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleView={handleView}
          />
        </div>
        <div className="col-span-1">
          <InformasiUmumSidePanel
            active={ringkasan.aktif}
            inactive={ringkasan.nonaktif}
            total={ringkasan.totalInformasi}
            lastUpdate={IndonesianDateFormat(ringkasan.updateTerakhir)}
          />
        </div>
      </div>
    </div>
  );
}
