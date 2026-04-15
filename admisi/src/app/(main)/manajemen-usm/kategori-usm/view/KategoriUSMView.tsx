"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import { useKategoriUSMData } from "@/hooks/kategori-usm/useKategoriUSMData";
import { useCreateKategoriUSM } from "@/hooks/kategori-usm/useCreateKategoriUSM";
import { KategoriUSMType } from "@/types/KategoriUSMTypes";
import { useEditKategoriUSM } from "@/hooks/kategori-usm/useEditKategoriUSM";
import { useDeleteKategoriUSM } from "@/hooks/kategori-usm/useDeleteKategoriUSM";

export default function KategoriUSMView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [kategori, setKategori] = useState({
    id_kategori: "",
    nama_kategori: "",
  });

  // Get data kategori soal USM
  const { data, isLoading, refetch } = useKategoriUSMData(
    session?.user?.accessToken,
    status,
  );
  // Mutation create kategori soal USM, edit kategori soal USM, delete kategori soal USM
  const { mutate: createKategoriUSMMutation } = useCreateKategoriUSM(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan kategori soal USM",
      });
      refetch();
      setKategori({ nama_kategori: "", id_kategori: "" });
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
  const { mutate: updateKategoriUSMMutation } = useEditKategoriUSM(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit kategori soal USM",
      });
      refetch();
      setKategori({ nama_kategori: "", id_kategori: "" });
      setIsEditing(false);
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
  const { mutate: deleteKategoriUSMMutation } = useDeleteKategoriUSM(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus kategori Soal USM",
      });
      refetch();
      setKategori({ nama_kategori: "", id_kategori: "" });
      setSearchTerm("");
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

  // Submit form tambah dan edit pekerjaan
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    !isEditing
      ? createKategoriUSMMutation({
          token: session.user?.accessToken,
          kategoriUSM: {
            nama_kategori: kategori.nama_kategori,
          },
        })
      : updateKategoriUSMMutation({
          token: session.user?.accessToken,
          kategoriUSM: {
            id_kategori: kategori.id_kategori,
            nama_kategori: kategori.nama_kategori,
          },
        });
  };
  // Open editing state
  const handleEdit = (data: KategoriUSMType) => {
    setIsEditing(true);
    setKategori({
      id_kategori: String(data.id_kategori),
      nama_kategori: data.nama_kategori,
    });
  };
  // Handle delete
  const handleDelete = (data: KategoriUSMType) => {
    showConfirmation({
      title: "Hapus kategori Soal USM?",
      message:
        "Kategori Soal USM ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteKategoriUSMMutation({
          token: session.user?.accessToken,
          kategoriUSMId: data.id_kategori,
        });
      },
    });
  };

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">
        Kategori Soal USM
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
            <Link href={pathname}>Kategori Soal USM</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen kategori USM pada sistem.
        </span>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Cari kategori atau jumlah soal..."
          className="input w-full bg-white mb-4 input-md shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Content - Table kategori USM dan form kategori USM */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table kategori USM */}
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

        {/* Form kategori USM */}
        <div className="col-span-1">
          <div className="w-full card h-auto bg-white text-black p-4 shadow">
            <h2 className="text-l font-bold mb-4">
              {isEditing ? "Ubah" : "Tambah"} Kategori USM
            </h2>

            <form id="form" onSubmit={handleSubmit}>
              {/* Kategori Soal */}
              <div className="form-control">
                <label className="label" htmlFor="namaKategori">
                  <span className="label-text text-black font-medium text-sm">
                    Kategori Soal <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="namaKategori"
                  id="namaKategori"
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Cth: Bahasa Indonesia"
                  value={kategori.nama_kategori}
                  onChange={(e) =>
                    setKategori({
                      ...kategori,
                      nama_kategori: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Tombol simpan dan reset */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setKategori({
                      id_kategori: "",
                      nama_kategori: "",
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
