"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import { useAgamaData } from "@/hooks/agama/useAgamaData";
import { useCreateAgama } from "@/hooks/agama/useCreateAgama";
import { useEditAgama } from "@/hooks/agama/useEditAgama";
import { AgamaType } from "@/types/AgamaTypes";
import { useDeleteAgama } from "@/hooks/agama/useDeleteAgama";

export default function AgamaView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [agama, setAgama] = useState({
    id_agama: "",
    nama_agama: "",
  });

  // Get data agama
  const { data, isLoading, refetch } = useAgamaData(
    session.user?.accessToken,
    status,
  );
  // Mutation create agama
  const { mutate: createAgamaMutation } = useCreateAgama(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan agama",
      });
      refetch();
      setAgama({
        id_agama: "",
        nama_agama: "",
      });
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
  const { mutate: updateAgamaMutation } = useEditAgama(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit provinsi",
      });
      refetch();
      setAgama({ id_agama: "", nama_agama: "" });
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
  const { mutate: deleteAgamaMutation } = useDeleteAgama(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus agama",
      });
      refetch();
      setAgama({ id_agama: "", nama_agama: "" });
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

  // Submit form tambah dan edit provinsi
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEditing) {
      createAgamaMutation({
        token: session.user?.accessToken,
        agama: {
          name: agama.nama_agama,
        },
      });
    } else {
      updateAgamaMutation({
        token: session.user?.accessToken,
        agama: {
          id: Number(agama.id_agama),
          name: agama.nama_agama,
        },
      });
    }
  };
  // Open editing state
  const handleEdit = (data: AgamaType) => {
    setIsEditing(true);
    setAgama({
      id_agama: String(data.id),
      nama_agama: data.name,
    });
  };
  // Handle delete
  const handleDelete = (data: AgamaType) => {
    showConfirmation({
      title: "Hapus agama?",
      message:
        "Agama ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteAgamaMutation({
          token: session.user?.accessToken,
          agamaId: data.id,
        });
      },
    });
  };

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Agama</h1>

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
            <Link href={pathname}>Agama</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen data agama.
        </span>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Cari agama..."
          className="input w-full bg-white mb-4 input-md shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Content - Table agama and form agama */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table agama */}
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

        {/* Form agama */}
        <div className="col-span-1">
          <div className="w-full card h-auto bg-white text-black p-4 shadow">
            <h2 className="text-l font-bold mb-4">
              {isEditing ? "Ubah" : "Tambah"} Agama
            </h2>

            <form id="form" onSubmit={handleSubmit}>
              {/* Nama agama */}
              <div className="form-control">
                <label className="label" htmlFor="namaAgama">
                  <span className="label-text text-black font-medium text-sm">
                    Agama <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="namaAgama"
                  id="namaAgama"
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Masukkan nama agama..."
                  value={agama.nama_agama}
                  onChange={(e) =>
                    setAgama({ ...agama, nama_agama: e.target.value })
                  }
                  required
                />
              </div>

              {/* Tombol simpan dan reset */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setAgama({
                      id_agama: "",
                      nama_agama: "",
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
