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
import { useSesiUSMData } from "@/hooks/sesi-usm/useSesiUSMData";
import { useResetTokenUSM } from "@/hooks/sesi-usm/useResetTokenUSM";
import { SesiUSMAlternateType, SesiUSMFormType } from "@/types/SesiUSMTypes";
import { useStatusSesiUSM } from "@/hooks/sesi-usm/useStatusSesiUSM";
import { useCreateSesiUSM } from "@/hooks/sesi-usm/useCreateSesiUSM";
import SesiUSMSidePanel from "@/components/SesiUSMSidePanel";
import SesiUSMFormModal from "@/components/SesiUSMFormModal";
import { useEditSesiUSM } from "@/hooks/sesi-usm/useEditSesiUSM";

export default function SesiUSMView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isAddingSesi, setIsAddingSesi] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isResettingToken, setIsResettingToken] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    tanggalAwal: "",
    tanggalAkhir: "",
  });
  const [formData, setFormData] = useState<SesiUSMFormType>({
    sesi_id: "",
    nama_ujian: "",
    kategori_id: "",
    tanggal_mulai: "",
    jam_mulai: "",
    jumlah_soal: "",
    durasi_ujian: "",
    pengacakan_soal: "",
    toleransi_terlambat: "",
    is_ujicoba: "",
  });

  // Get data kategori soal USM
  const { data, isLoading, refetch } = useSesiUSMData(
    session?.user?.accessToken,
    status,
    filter,
  );

  // Mutation create sesi USM, edit sesi USM, change status sesi USM
  const { mutate: createSesiUSMMutation } = useCreateSesiUSM(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan sesi USM",
      });
      setIsAddingSesi(false);
      refetch();
    },
    (msg) => {
      setIsAddingSesi(false);
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: msg,
      });
    },
  );

  const { mutate: statusSesiUSMMutation } = useStatusSesiUSM(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengubah status Sesi USM",
      });
      refetch();
    },
    (msg) => {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: msg,
      });
    },
  );

  const { mutate: resetTokenMutation } = useResetTokenUSM(
    () => {
      setIsResettingToken(false);
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mereset token USM",
      });
      setIsAddingSesi(false);
      refetch();
    },
    (msg) => {
      setIsResettingToken(false);
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: msg,
      });
    },
  );

  const { mutate: updateSesiUSMMutation } = useEditSesiUSM(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit sesi USM",
      });
      refetch();
      setFormData({
        sesi_id: "",
        nama_ujian: "",
        kategori_id: "",
        tanggal_mulai: "",
        jam_mulai: "",
        jumlah_soal: "",
        durasi_ujian: "",
        pengacakan_soal: "",
        toleransi_terlambat: "",
        is_ujicoba: "",
      });
      setIsEditing(false);
      setIsAddingSesi(false);
    },
    (msg) => {
      setIsEditing(false);
      setIsAddingSesi(false);
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: msg,
      });
    },
  );

  // Submit form tambah dan edit pekerjaan
  const handleSubmit = async (data: Partial<SesiUSMFormType>) => {
    if (!isEditing) {
      setIsAddingSesi(true);
      const tanggalMulai = data.tanggal_mulai + " " + data.jam_mulai;
      createSesiUSMMutation({
        token: session.user?.accessToken,
        sesiUSM: {
          nama_ujian: data.nama_ujian,
          kategori_id: Number(data.kategori_id),
          tanggal_mulai: tanggalMulai,
          jumlah_soal: Number(data.jumlah_soal),
          durasi_ujian: Number(data.durasi_ujian),
          pengacakan_soal: data.pengacakan_soal,
          toleransi_terlambat: Number(data.toleransi_terlambat),
          is_ujicoba: data.is_ujicoba,
        },
      });
    } else {
      setIsAddingSesi(true);
      const tanggalMulai = data.tanggal_mulai + " " + data.jam_mulai;
      updateSesiUSMMutation({
        token: session.user?.accessToken,
        sesiUSM: {
          sesi_id: Number(data.sesi_id),
          nama_ujian: data.nama_ujian,
          kategori_id: Number(data.kategori_id),
          tanggal_mulai: tanggalMulai,
          jumlah_soal: Number(data.jumlah_soal),
          durasi_ujian: Number(data.durasi_ujian),
          pengacakan_soal: data.pengacakan_soal,
          toleransi_terlambat: Number(data.toleransi_terlambat),
          is_ujicoba: data.is_ujicoba,
        },
      });
    }
  };
  // Open editing state
  const handleEdit = (data: SesiUSMAlternateType) => {
    setIsEditing(true);
    const tanggalMulai = data.tanggal_mulai.split(" ");
    const tanggal = tanggalMulai[0];
    const jam = tanggalMulai[1];
    setFormData({
      sesi_id: String(data.sesi_id),
      nama_ujian: data.nama_ujian,
      kategori_id: String(data.kategori_id),
      tanggal_mulai: tanggal,
      jam_mulai: jam,
      jumlah_soal: String(data.jumlah_soal),
      durasi_ujian: String(data.durasi_ujian),
      pengacakan_soal: data.pengacakan_soal,
      toleransi_terlambat: String(data.toleransi_terlambat),
      is_ujicoba: data.is_ujicoba,
    });
    setModalOpen(true);
  };
  // Handle delete
  const handleAction = (data: SesiUSMAlternateType, status: string) => {
    showConfirmation({
      title: `${status === "aktif" ? "Aktifkan" : "Nonaktifkan"} Sesi USM?`,
      message: `Sesi USM ini akan di${status === "aktif" ? "aktifkan" : "nonaktifkan"} dan peserta akan dapat mengakses sesi USM ini. Lanjut ${status === "aktif" ? "aktifkan" : "nonaktifkan"}?`,
      icon:
        status === "aktif"
          ? "bx bx-check text-green-500 text-2xl"
          : "bx bx-x text-red-500 text-2xl",
      confirmButtonText: status === "aktif" ? "Aktifkan" : "Nonaktifkan",
      confirmButtonColor:
        status === "aktif"
          ? "bg-green-500 hover:bg-green-600"
          : "bg-red-500 hover:bg-red-600",
      onConfirm() {
        statusSesiUSMMutation({
          token: session.user?.accessToken,
          sesiUSMId: {
            sesi_id: data.sesi_id,
            status_aktif: status,
          },
        });
      },
    });
  };

  const handleResetToken = (data: SesiUSMAlternateType) => {
    setIsResettingToken(true);
    resetTokenMutation({
      token: session.user?.accessToken,
      sesiUSM: {
        sesi_id: data.sesi_id,
      },
    });
  };

  const onAddSesi = () => {
    setModalOpen(true);
  };

  // Handle reset filter
  const handleResetFilter = () => {
    setFilter({
      tanggalAwal: "",
      tanggalAkhir: "",
    });
    setSearchTerm("");
  };

  // Refetch data when filter kategori
  useEffect(() => {
    const bothFilled = filter.tanggalAwal !== "" && filter.tanggalAkhir !== "";
    if (!bothFilled) return;
    refetch();
  }, [filter.tanggalAwal, filter.tanggalAkhir]);

  // Save filter to localStorage untuk persistensi data filter
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("appliedFilterSesiUSM");
    const search = localStorage.getItem("appliedSearchSesiUSM");
    if (saved) {
      setFilter(JSON.parse(saved));
      setSearchTerm(search || "");
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(
      "appliedFilterSesiUSM",
      JSON.stringify({
        tanggalAwal: String(filter.tanggalAwal),
        tanggalAkhir: String(filter.tanggalAkhir),
      }),
    );
    localStorage.setItem("appliedSearchSesiUSM", searchTerm);
  }, [filter, searchTerm, isLoaded]);

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Sesi USM</h1>

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
            <Link href={pathname}>Sesi USM</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen sesi USM pada sistem.
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
              Gunakan fitur pencarian untuk mencari soal USM.
            </span>
          </div>
          <div className="flex flex-row items-center gap-4">
            {/* Reset filter button */}
            {filter.tanggalAwal !== "" && filter.tanggalAkhir !== "" ? (
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
            {/* Tanggal Awal */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Tanggal Awal <small className="text-xs text-red-500">*</small>
              </label>
              <input
                type="date"
                value={filter.tanggalAwal}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    tanggalAwal: e.target.value,
                  }))
                }
                className="input input-bordered w-full bg-white mb-4 input-md shadow"
              />
            </div>
            {/* Tanggal Akhir */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Tanggal Akhir <small className="text-xs text-red-500">*</small>
              </label>
              <input
                type="date"
                value={filter.tanggalAkhir}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    tanggalAkhir: e.target.value,
                  }))
                }
                className="input input-bordered w-full bg-white mb-4 input-md shadow"
              />
            </div>

            {/* Search */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Cari Sesi USM
              </label>
              <input
                type="text"
                placeholder="Cari berdasarkan nama ujian atau tanggal ujian..."
                className="input w-full bg-white mb-4 input-md shadow "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Table kategori USM dan form kategori USM */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        {/* Table kategori USM */}
        <div className="col-span-3">
          <DataTable
            columns={columns}
            data={data?.all_sesi || []}
            searchQuery={searchTerm}
            isLoading={isLoading}
            refetch={refetch}
            handleEdit={handleEdit}
            handleAction={handleAction}
            isResettingToken={isResettingToken}
            handleResetToken={handleResetToken}
          />
        </div>

        {/* Form kategori USM */}
        <div className="col-span-1">
          <SesiUSMSidePanel isAddingSesi={isAddingSesi} onAddSesi={onAddSesi} />
        </div>
      </div>
      {/* Modal Form */}
      <SesiUSMFormModal
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) {
            setIsEditing(false);
          }
        }}
        onSubmit={handleSubmit}
        banksoalOptions={data?.kategori_usm || []}
        initialData={isEditing ? formData : undefined}
        isEditing={isEditing}
      />
    </div>
  );
}
