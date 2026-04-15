"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import { LokasiUjianType } from "@/types/LokasiUjianTypes";
import { useLokasiUjianData } from "@/hooks/lokasi-ujian/useLokasiUjianData";
import { useCreateLokasiUjian } from "@/hooks/lokasi-ujian/useCreateLokasiUjian";
import { useEditLokasiUjian } from "@/hooks/lokasi-ujian/useEditLokasiUjian";
import { useDeleteLokasiUjian } from "@/hooks/lokasi-ujian/useDeleteLokasiUjian";

export default function LokasiUjianView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [lokasiUjian, setLokasiUjian] = useState({
    id: "",
    nama: "",
    kodeDaftar: "",
    alamatUjian: "",
  });

  // Get data lokasi
  const { data, isLoading, refetch } = useLokasiUjianData(
    session.user?.accessToken,
    status
  );
  // Mutation create lokasi ujian
  const { mutate: createLokasiUjianMutation } = useCreateLokasiUjian(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan lokasi ujian",
      });
      refetch();
      setLokasiUjian({ nama: "", kodeDaftar: "", alamatUjian: "", id: "" });
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
  const { mutate: updateLokasiUjianMutation } = useEditLokasiUjian(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit lokasi ujian",
      });
      refetch();
      setLokasiUjian({ nama: "", kodeDaftar: "", alamatUjian: "", id: "" });
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
  const { mutate: deleteLokasiUjianMutation } = useDeleteLokasiUjian(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus lokasi ujian",
      });
      refetch();
      setLokasiUjian({ nama: "", kodeDaftar: "", alamatUjian: "", id: "" });
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

  // Submit form tambah dan edit lokasi ujian
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    !isEditing
      ? createLokasiUjianMutation({
          token: session.user?.accessToken,
          lokasiUjian: {
            lokasi_nama: lokasiUjian.nama,
            kode_lokasi: lokasiUjian.kodeDaftar,
            alamat_ujian: lokasiUjian.alamatUjian,
          },
        })
      : updateLokasiUjianMutation({
          token: session.user?.accessToken,
          lokasiUjian: {
            lokasi_id: String(lokasiUjian.id),
            lokasi_nama: lokasiUjian.nama,
            kode_lokasi: lokasiUjian.kodeDaftar,
            alamat_ujian: lokasiUjian.alamatUjian,
          },
        });
  };
  // Open editing state
  const handleEdit = (data: LokasiUjianType) => {
    setIsEditing(true);
    setLokasiUjian({
      id: String(data.lokasi_id),
      nama: data.lokasi_nama,
      kodeDaftar: data.kode_lokasi,
      alamatUjian: data.alamat_ujian,
    });
  };
  // Handle delete
  const handleDelete = (data: LokasiUjianType) => {
    showConfirmation({
      title: "Hapus lokasi ujian?",
      message:
        "Lokasi ujian ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteLokasiUjianMutation({
          token: session.user?.accessToken,
          lokasiUjianId: data.lokasi_id,
        });
      },
    });
  };

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Lokasi Ujian</h1>

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
            <Link href={pathname}>Lokasi Ujian</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen lokasi ujian
        </span>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Cari lokasi..."
          className="input w-full bg-white mb-4 input-md shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Content - Table lokasi ujian dan form lokasi ujian */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table lokasi ujian */}
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

        {/* Form user */}
        <div className="col-span-1">
          <div className="w-full card h-auto bg-white text-black p-4 shadow">
            <h2 className="text-l font-bold mb-4">
              {isEditing ? "Ubah" : "Tambah"} Lokasi
            </h2>

            <form id="form" onSubmit={handleSubmit}>
              {/* Nama lokasi */}
              <div className="form-control">
                <label className="label" htmlFor="namaLokasi">
                  <span className="label-text text-black font-medium text-sm">
                    Nama Lokasi <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="namaLokasi"
                  id="namaLokasi"
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Cth: Batam"
                  value={lokasiUjian.nama}
                  onChange={(e) =>
                    setLokasiUjian({ ...lokasiUjian, nama: e.target.value })
                  }
                  required
                />
              </div>

              {/* Kode daftar */}
              <div className="form-control">
                <label className="label" htmlFor="kodeDaftar">
                  <span className="label-text text-black font-medium text-sm">
                    Kode Daftar <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="kodeDaftar"
                  id="kodeDaftar"
                  minLength={2}
                  maxLength={2}
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Cth: BM"
                  value={lokasiUjian.kodeDaftar}
                  onChange={(e) =>
                    setLokasiUjian({
                      ...lokasiUjian,
                      kodeDaftar: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Alamat Ujian */}
              <div className="form-control">
                <label className="label" htmlFor="alamatUjian">
                  <span className="label-text text-black font-medium text-sm">
                    Alamat Ujian <span className="text-red-500">*</span>
                  </span>
                </label>
                <textarea
                  name="alamatUjian"
                  id="alamatUjian"
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Cth: Kampus UIB"
                  value={lokasiUjian.alamatUjian}
                  onChange={(e) =>
                    setLokasiUjian({
                      ...lokasiUjian,
                      alamatUjian: e.target.value,
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
                    setLokasiUjian({
                      nama: "",
                      kodeDaftar: "",
                      alamatUjian: "",
                      id: "",
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
