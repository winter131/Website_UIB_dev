"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import { X } from "lucide-react";
import SoalUSMSidePanel from "@/components/SoalUSMSidePanel";
import { InserUpdateSoalUSMType, SoalUSMType } from "@/types/SoalUSMTypes";
import { useImportSoalUSM } from "@/hooks/soal-usm/useImportSoalUSM";
import LoadingBox from "@/components/LoadingBox";
import { useGetImportBankData } from "@/hooks/import-data-bank/useGetImportBankData";
import {
  ImportDataBankDetailType,
  ImportDataBankType,
} from "@/types/ImportDataBankTypes";
import ImportDataBankModal from "@/components/ImportDataBankModal";
import ImportDataBankSidePanel from "@/components/ImportDataBankSidePanel";
import { useImportDaftarUlang } from "@/hooks/import-data-bank/useImportDaftarUlang";
import { useDeleteDaftarUlang } from "@/hooks/import-data-bank/useDeleteDaftarUlang";

export default function HapusImportDaftarUlangView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isImporting, setIsImporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    selBulan: "all",
    selTahun: "all",
  });
  const [detailData, setDetailData] = useState<ImportDataBankDetailType[]>([]);
  const [detailId, setDetailId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Get data import bank data
  const { data, isLoading, refetch } = useGetImportBankData(
    session?.user?.accessToken,
    status,
    filter,
  );

  const { mutate: importDaftarUlangMutation } = useImportDaftarUlang(
    () => {
      setIsImporting(false);
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengimpor data daftar ulang dari file Excel",
      });
      refetch();
    },
    (msg) => {
      setIsImporting(false);
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: msg,
      });
    },
  );

  const { mutate: deleteDaftarUlangMutation } = useDeleteDaftarUlang(
    () => {
      setIsDeleting(false);
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus daftar ulang",
      });
      refetch();
    },
    (msg) => {
      setIsDeleting(false);
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: msg,
      });
    },
  );

  const handleViewDetail = (data: ImportDataBankType) => {
    setDetailData(data.DetailData || []);
    setDetailId(data.UniqueCode);
    setIsModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalOpen(false);
    setDetailId("");
    setDetailData([]);
  };

  // Handle reset filter
  const handleResetFilter = () => {
    setFilter({
      selBulan: "all",
      selTahun: "all",
    });
    setSearchTerm("");
  };

  const handleImportExcel = (file: File) => {
    showConfirmation({
      title: "Mulai Impor Daftar Ulang?",
      message:
        "Data daftar ulang dari file Excel akan diimpor ke dalam sistem. Jangan menutup atau memuat ulang halaman ini sampai proses selesai. Lanjutkan proses impor?",
      icon: "bx bx-import text-4xl",
      confirmButtonText: "Impor",
      confirmButtonColor: "bg-green-600",
      onConfirm() {
        const formData = new FormData();
        formData.append("file", file);
        setIsImporting(true);
        importDaftarUlangMutation({
          token: session?.user?.accessToken,
          daftarUlang: formData,
        });
      },
      showCancelButton: true,
      cancelButtonText: "Batal",
      onCancel() {
        setIsImporting(false);
      },
    });
  };

  const handleDeleteDetail = (item: ImportDataBankDetailType) => {
    showConfirmation({
      title: "Hapus Daftar Ulang?",
      message: `Data daftar ulang ${item.NamaCamhs} - (${item.NomorDaftar}) ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?`,
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        setIsDeleting(true);
        deleteDaftarUlangMutation({
          token: session.user?.accessToken,
          daftarUlangId: item.NoReferensi,
        });
      },
    });
  };

  // Refetch data when filter kategori
  useEffect(() => {
    refetch();
  }, [filter]);

  // Save filter to localStorage untuk persistensi data filter
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("appliedFilterHapusImportDaftarUlang");
    const search = localStorage.getItem("appliedSearchHapusImportDaftarUlang");
    if (saved) {
      setFilter(JSON.parse(saved));
      setSearchTerm(search || "");
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(
      "appliedFilterHapusImportDaftarUlang",
      JSON.stringify({
        selBulan: String(filter.selBulan),
        selTahun: String(filter.selTahun),
      }),
    );
    localStorage.setItem("appliedSearchHapusImportDaftarUlang", searchTerm);
  }, [filter, searchTerm, isLoaded]);

  const bulan = [
    { value: "1", label: "Januari" },
    { value: "2", label: "Februari" },
    { value: "3", label: "Maret" },
    { value: "4", label: "April" },
    { value: "5", label: "Mei" },
    { value: "6", label: "Juni" },
    { value: "7", label: "Juli" },
    { value: "8", label: "Agustus" },
    { value: "9", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
  ];

  const tahunMulai = 2010;
  const tahunSekarang = new Date().getFullYear();
  const tahun = Array.from(
    { length: tahunSekarang - tahunMulai + 1 },
    (_, i) => {
      const year = tahunSekarang - i;
      return { value: String(year), label: String(year) };
    },
  );

  useEffect(() => {
    if (detailId) {
      const detailData = (data?.all_pembayaran || []).find(
        (item: ImportDataBankDetailType) => item.UniqueCode === detailId,
      )?.DetailData;
      setDetailData(detailData || []);
    }
  }, [data]);

  return (
    <div className="px-8 py-4">
      {isImporting && (
        <LoadingBox
          open={isImporting}
          icon="bx bx-import text-4xl"
          title="Mengimpor Data Daftar Ulang"
          message="Mohon tunggu, data daftar ulang sedang diimpor. Jangan menutup atau memuat ulang halaman ini"
        />
      )}
      <h1 className="w-full text-4xl font-bold text-black">
        Hapus Import Daftar Ulang
      </h1>

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
            <Link href={pathname}>Hapus Import Daftar Ulang</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen hapus import data daftar ulang calon mahasiswa
        </span>
        <hr className="my-4" />
      </div>

      {/* Filter & Search Section */}
      <div className="bg-white rounded-xl shadow p-5 space-y-4 my-4">
        <div className="flex flex-row items-center justify-between">
          <div className="w-max">
            <span className="font-semibold">Filter dan pencarian</span>
            <hr />
            <span className="text-xs text-gray-500">
              Gunakan fitur pencarian untuk mencari data pembayaran calon
              mahasiswa yang telah diimpor ke dalam sistem.
            </span>
          </div>
          <div className="flex flex-row items-center gap-4">
            {/* Reset filter button */}
            {filter.selBulan !== "all" || filter.selTahun !== "all" ? (
              <>
                <button
                  onClick={handleResetFilter}
                  className="btn btn-xs btn-ghost bg-red-600 text-white hover:bg-red-700 rounded-lg"
                >
                  <X className="w-3 h-3" /> Bersihkan filter
                </button>
              </>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* Filter bulan */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Bulan <small className="text-xs text-red-500">*</small>
              </label>
              <select
                id="bulan"
                name="bulan"
                className="select select-sm select-bordered bg-white text-black border border-gray-300 rounded-md w-full mt-1"
                required
                value={filter.selBulan || ""}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    selBulan: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Pilih Bulan
                </option>
                <option value="all">Semua Bulan</option>
                {bulan.map((bln) => (
                  <option key={bln.value} value={bln.value}>
                    {bln.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter tahun */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Tahun <small className="text-xs text-red-500">*</small>
              </label>
              <select
                id="tahun"
                name="tahun"
                className="select select-sm select-bordered bg-white text-black border border-gray-300 rounded-md w-full mt-1"
                required
                value={filter.selTahun || ""}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    selTahun: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Pilih Tahun
                </option>
                <option value="all">Semua Tahun</option>
                {tahun.map((thn) => (
                  <option key={thn.value} value={thn.value}>
                    {thn.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Cari Data Impor Pembayaran
              </label>
              <input
                type="text"
                placeholder="Cari berdasarkan tanggal atau nama peng-impor..."
                className="input w-full bg-white mb-4 input-md shadow "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table*/}
        <div className="col-span-2">
          <DataTable
            columns={columns}
            data={data?.all_pembayaran || []}
            searchQuery={searchTerm}
            isLoading={isLoading}
            refetch={refetch}
            handleViewDetail={handleViewDetail}
          />
        </div>

        {/* Side Panel*/}
        <div className="col-span-1">
          <ImportDataBankSidePanel
            isImporting={isImporting}
            onImportExcel={handleImportExcel}
          />
        </div>
      </div>

      <ImportDataBankModal
        isOpen={isModalOpen}
        onClose={handleCloseDetail}
        data={detailData || []}
        onDelete={handleDeleteDetail}
        isDeleting={isDeleting}
      />
    </div>
  );
}
