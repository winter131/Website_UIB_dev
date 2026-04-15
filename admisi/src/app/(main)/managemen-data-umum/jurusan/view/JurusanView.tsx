"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import { useJurusanData } from "@/hooks/jurusan/useJurusanData";
import { useCreateJurusan } from "@/hooks/jurusan/useCreateJurusan";
import { useEditJurusan } from "@/hooks/jurusan/useEditJurusan";
import { JurusanSMTAType } from "@/types/JurusanSMTATypes";
import { useDeleteJurusan } from "@/hooks/jurusan/useDeleteJurusan";

export default function JurusanView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [jurusan, setJurusan] = useState({
    jurusan_id: "",
    jurusan_nama: "",
  });

  // Get data jurusan
  const { data, isLoading, refetch } = useJurusanData(
    session.user?.accessToken,
    status
  );
  // Mutation create jurusan, edit jurusan, delete jurusan
  const { mutate: createJurusanMutation } = useCreateJurusan(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan jurusan",
      });
      refetch();
      setJurusan({ jurusan_nama: "", jurusan_id: "" });
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
  const { mutate: updateJurusanMutation } = useEditJurusan(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit jurusan",
      });
      refetch();
      setJurusan({ jurusan_nama: "", jurusan_id: "" });
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
  const { mutate: deleteJurusanMutation } = useDeleteJurusan(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus jurusan",
      });
      refetch();
      setJurusan({ jurusan_nama: "", jurusan_id: "" });
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

  // Submit form tambah dan edit jurusan
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    !isEditing
      ? createJurusanMutation({
          token: session.user?.accessToken,
          jurusan: {
            jurusan_nama: jurusan.jurusan_nama,
          },
        })
      : updateJurusanMutation({
          token: session.user?.accessToken,
          jurusan: {
            jurusan_id: Number(jurusan.jurusan_id),
            jurusan_nama: jurusan.jurusan_nama,
          },
        });
  };
  // Open editing state
  const handleEdit = (data: JurusanSMTAType) => {
    setIsEditing(true);
    setJurusan({
      jurusan_id: String(data.jurusan_id),
      jurusan_nama: data.jurusan_nama,
    });
  };
  // Handle delete
  const handleDelete = (data: JurusanSMTAType) => {
    showConfirmation({
      title: "Hapus jurusan?",
      message:
        "Jurusan ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteJurusanMutation({
          token: session.user?.accessToken,
          jurusanId: data.jurusan_id,
        });
      },
    });
  };

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Jurusan</h1>

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
            <Link href={pathname}>Jurusan</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen jurusan
        </span>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Cari jurusan..."
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
          />
        </div>

        {/* Form jurusan */}
        <div className="col-span-1">
          <div className="w-full card h-auto bg-white text-black p-4 shadow">
            <h2 className="text-l font-bold mb-4">
              {isEditing ? "Ubah" : "Tambah"} Jurusan
            </h2>

            <form id="form" onSubmit={handleSubmit}>
              {/* Nama jurusan */}
              <div className="form-control">
                <label className="label" htmlFor="namaJurusan">
                  <span className="label-text text-black font-medium text-sm">
                    Nama Jurusan <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="namaJurusan"
                  id="namaJurusan"
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Cth: Rekayasa Perangkat Lunak"
                  value={jurusan.jurusan_nama}
                  onChange={(e) =>
                    setJurusan({ ...jurusan, jurusan_nama: e.target.value })
                  }
                  required
                />
              </div>

              {/* Tombol simpan dan reset */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setJurusan({
                      jurusan_nama: "",
                      jurusan_id: "",
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
