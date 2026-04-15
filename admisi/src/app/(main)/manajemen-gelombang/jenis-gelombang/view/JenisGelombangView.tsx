"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useJenisGelombangData } from "@/hooks/jenis-gelombang/useJenisGelombangData";
import { JenisGelombangType } from "@/types/JenisGelombangTypes";
import { useCreateJenisGelombang } from "@/hooks/jenis-gelombang/useCreateJenisGelombang";
import { useEditJenisGelombang } from "@/hooks/jenis-gelombang/useEditJenisGelombang";
import { useDeleteJenisGelombang } from "@/hooks/jenis-gelombang/useDeleteJenisGelombang";

export default function JenisGelombangView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [jenisGelombang, setJenisGelombang] = useState({
    id: "",
    namaGelombang: "",
    isBeasiswa: false,
    isCanPilihLokasiUjian: false,
  });

  // Get data jenis gelombang
  const { data, isLoading, refetch } = useJenisGelombangData(
    session.user?.accessToken,
    status
  );
  // Mutation create jenis gelombang
  const { mutate: createJenisGelombangMutation } = useCreateJenisGelombang(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan jenis gelombang",
      });
      refetch();
      setJenisGelombang({
        namaGelombang: "",
        isBeasiswa: false,
        isCanPilihLokasiUjian: false,
        id: "",
      });
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
  const { mutate: updateJenisGelombangMutation } = useEditJenisGelombang(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit jenis gelombang",
      });
      refetch();
      setJenisGelombang({
        namaGelombang: "",
        isBeasiswa: false,
        isCanPilihLokasiUjian: false,
        id: "",
      });
      setIsEditing(false);
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
  const { mutate: deleteJenisGelombangMutation } = useDeleteJenisGelombang(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus jenis gelombang",
      });
      refetch();
      setJenisGelombang({
        namaGelombang: "",
        isBeasiswa: false,
        isCanPilihLokasiUjian: false,
        id: "",
      });
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

  // Submit form tambah dan edit jenis gelombang
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    !isEditing
      ? createJenisGelombangMutation({
          token: session.user?.accessToken,
          jenisGelombang: {
            nama_gelombang: jenisGelombang.namaGelombang, // Just Ini Yang Required
            is_beasiswa: jenisGelombang.isBeasiswa ? "y" : "n", // y or n default n
            can_pilih_ujian: jenisGelombang.isCanPilihLokasiUjian ? "y" : "n", // y or n default n
          },
        })
      : updateJenisGelombangMutation({
          token: session.user?.accessToken,
          jenisGelombang: {
            gelombang_id: Number(jenisGelombang.id),
            nama_gelombang: jenisGelombang.namaGelombang,
            is_beasiswa: jenisGelombang.isBeasiswa ? "y" : "n",
            can_pilih_ujian: jenisGelombang.isCanPilihLokasiUjian ? "y" : "n",
          },
        });
  };
  // Open editing state
  const handleEdit = (data: JenisGelombangType) => {
    setIsEditing(true);
    setJenisGelombang({
      id: String(data.gelombang_id),
      namaGelombang: data.nama_gelombang,
      isBeasiswa: data.is_beasiswa === "y" ? true : false,
      isCanPilihLokasiUjian: data.can_pilih_ujian === "y" ? true : false,
    });
  };
  // Handle delete
  const handleDelete = (data: JenisGelombangType) => {
    showConfirmation({
      title: "Hapus jenis gelombang?",
      message:
        "Jenis gelombang ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteJenisGelombangMutation({
          token: session.user?.accessToken,
          jenisGelombangId: data.gelombang_id,
        });
      },
    });
  };

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Jenis Gelombang</h1>

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
            <Link href={pathname}>Jenis Gelombang</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen jenis gelombang pendaftaran mahasiswa baru.
        </span>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Cari jenis gelombang..."
          className="input w-full bg-white mb-4 input-md shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Content - Table jenis gelombang and form jenis gelombang */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table jenis gelombang */}
        <div className="col-span-2">
          <DataTable
            columns={columns}
            data={data || []}
            searchQuery={searchTerm}
            isLoading={isLoading}
            refetch={refetch}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>

        {/* Form jenis gelombang */}
        <div className="col-span-1">
          <div className="w-full card h-auto bg-white text-black p-4 shadow">
            <h2 className="text-l font-bold mb-4">
              {isEditing ? "Ubah" : "Tambah"} Jenis Gelombang
            </h2>

            <form id="form" onSubmit={handleSubmit}>
              {/* Nama gelombang */}
              <div className="form-control">
                <label className="label" htmlFor="namaGelombang">
                  <span className="label-text text-black font-medium text-sm">
                    Nama Gelombang <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="namaGelombang"
                  id="namaGelombang"
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Cth: Gelombang Beasiswa 1"
                  value={jenisGelombang.namaGelombang}
                  onChange={(e) =>
                    setJenisGelombang({
                      ...jenisGelombang,
                      namaGelombang: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Is beasiswa */}
              <div className="form-control mt-2">
                <label className="label" htmlFor="isBeasiswa">
                  <span className="label-text text-black font-medium text-sm">
                    Jenis <span className="text-red-500">*</span>
                  </span>
                </label>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="isBeasiswa" className="text-xs font-normal">
                    Reguler
                  </Label>
                  <Switch
                    id="isBeasiswa"
                    checked={jenisGelombang.isBeasiswa}
                    onCheckedChange={(e) => {
                      setJenisGelombang({
                        ...jenisGelombang,
                        isBeasiswa: e,
                      });
                    }}
                  />
                  <Label htmlFor="isBeasiswa" className="text-xs font-normal">
                    Beasiswa
                  </Label>
                </div>
              </div>

              {/* Is can pilih lokasi ujian */}
              <div className="form-control mt-2">
                <label className="label" htmlFor="isCanPilihLokasiUjian">
                  <span className="label-text text-black font-medium text-sm">
                    Camhs dapat memilih lokasi ujian{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor="isCanPilihLokasiUjian"
                    className="text-xs font-normal"
                  >
                    Tidak
                  </Label>
                  <Switch
                    id="isCanPilihLokasiUjian"
                    checked={jenisGelombang.isCanPilihLokasiUjian}
                    onCheckedChange={(e) => {
                      setJenisGelombang({
                        ...jenisGelombang,
                        isCanPilihLokasiUjian: e,
                      });
                    }}
                  />
                  <Label
                    htmlFor="isCanPilihLokasiUjian"
                    className="text-xs font-normal"
                  >
                    Ya
                  </Label>
                </div>
              </div>

              {/* Tombol simpan dan reset */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setJenisGelombang({
                      id: "",
                      namaGelombang: "",
                      isBeasiswa: false,
                      isCanPilihLokasiUjian: false,
                    });
                  }}
                  className="btn btn-error btn-sm text-white"
                  type="reset"
                  disabled={isLoading}
                >
                  <span className="bx bx-refresh" />
                  Reset
                </button>
                <button
                  className="btn btn-success btn-sm text-white"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="bx bx-loader bx-spin"></span> Loading...
                    </>
                  ) : (
                    <>
                      <span className="bx bx-save" />
                      Simpan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
