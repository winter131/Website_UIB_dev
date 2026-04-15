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
import { set } from "date-fns";
import { useKewarganegaraanData } from "@/hooks/kewarganegaraan/useKewarganegaraanData";
import { useCreateKewarganegaraan } from "@/hooks/kewarganegaraan/useCreateKewarganegaraan";
import { useEditKewarganegaraan } from "@/hooks/kewarganegaraan/useEditKewarganegaraan";
import { kewarganegaraanType } from "@/types/KewarganegaraanTypes";
import { useDeleteKewarganegaraan } from "@/hooks/kewarganegaraan/useDeleteKewarganegaraan";

export default function KewarganegaraanView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [kewarganegaraan, setKewarganegaraan] = useState({
    id_kewarganegaraan: "",
    nama_kewarganegaraan: "",
  });

  // Get data kewarganegaraan
  const { data, isLoading, refetch } = useKewarganegaraanData(
    session.user?.accessToken,
    status
  );
  // Mutation create kewarganegaraan, edit kewarganegaraan, delete kewarganegaraan
  const { mutate: createKewarganegaraanMutation } = useCreateKewarganegaraan(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan kewarganegaraan",
      });
      refetch();
      setKewarganegaraan({ nama_kewarganegaraan: "", id_kewarganegaraan: "" });
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
  const { mutate: updateKewarganegaraanMutation } = useEditKewarganegaraan(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit kewarganegaraan",
      });
      refetch();
      setKewarganegaraan({ nama_kewarganegaraan: "", id_kewarganegaraan: "" });
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
  const { mutate: deleteKewarganegaraanMutation } = useDeleteKewarganegaraan(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus kewarganegaraan",
      });
      refetch();
      setKewarganegaraan({ nama_kewarganegaraan: "", id_kewarganegaraan: "" });
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

  // Submit form tambah dan edit kewarganegaraan
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    !isEditing
      ? createKewarganegaraanMutation({
          token: session.user?.accessToken,
          kewarganegaraan: {
            nama_kewarganegaraan: kewarganegaraan.nama_kewarganegaraan,
          },
        })
      : updateKewarganegaraanMutation({
          token: session.user?.accessToken,
          kewarganegaraan: {
            id_kewarganegaraan: Number(kewarganegaraan.id_kewarganegaraan),
            nama_kewarganegaraan: kewarganegaraan.nama_kewarganegaraan,
          },
        });
  };
  // Open editing state
  const handleEdit = (data: kewarganegaraanType) => {
    setIsEditing(true);
    setKewarganegaraan({
      id_kewarganegaraan: String(data.id_kewarganegaraan),
      nama_kewarganegaraan: data.nama_kewarganegaraan,
    });
  };
  // Handle delete
  const handleDelete = (data: kewarganegaraanType) => {
    showConfirmation({
      title: "Hapus kewarganegaraan?",
      message:
        "Kewarganegaraan ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteKewarganegaraanMutation({
          token: session.user?.accessToken,
          kewarganegaraanId: data.id_kewarganegaraan,
        });
      },
    });
  };

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Kewarganegaraan</h1>

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
            <Link href={pathname}>Kewarganegaraan</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen kewarganegaraan
        </span>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Cari kewarganegaraan..."
          className="input w-full bg-white mb-4 input-md shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Content - Table kewarganegaraan dan form kewarganegaraan */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table kewarganegaraan */}
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

        {/* Form kewarganegaraan */}
        <div className="col-span-1">
          <div className="w-full card h-auto bg-white text-black p-4 shadow">
            <h2 className="text-l font-bold mb-4">
              {isEditing ? "Ubah" : "Tambah"} Kewarganegaraan
            </h2>

            <form id="form" onSubmit={handleSubmit}>
              {/* Nama kewarganegaraan */}
              <div className="form-control">
                <label className="label" htmlFor="namaKewarganegaraan">
                  <span className="label-text text-black font-medium text-sm">
                    Kewarganegaraan <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="namaKewarganegaraan"
                  id="namaKewarganegaraan"
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Cth: Indonesia, Singapura, Malaysia, dll..."
                  value={kewarganegaraan.nama_kewarganegaraan}
                  onChange={(e) =>
                    setKewarganegaraan({
                      ...kewarganegaraan,
                      nama_kewarganegaraan: e.target.value,
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
                    setKewarganegaraan({
                      nama_kewarganegaraan: "",
                      id_kewarganegaraan: "",
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
