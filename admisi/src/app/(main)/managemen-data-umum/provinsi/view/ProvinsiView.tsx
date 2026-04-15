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
import { useDeleteLokasiUjian } from "@/hooks/lokasi-ujian/useDeleteLokasiUjian";
import { useProvinsiData } from "@/hooks/provinsi/useProvinsiData";
import { useCreateProvinsi } from "@/hooks/provinsi/useCreateProvinsi";
import { useEditProvinsi } from "@/hooks/provinsi/useEditProvinsi";
import { ProvinsiType } from "@/types/ProvinsiTypes";
import { useDeleteProvinsi } from "@/hooks/provinsi/useDeleteProvinsi";

export default function ProvinsiView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [provinsi, setProvinsi] = useState({
    kode_provinsi: "",
    nama_provinsi: "",
  });

  // Get data provinsi
  const { data, isLoading, refetch } = useProvinsiData(
    session.user?.accessToken,
    status
  );
  // Mutation create provinsi
  const { mutate: createProvinsiMutation } = useCreateProvinsi(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan provinsi",
      });
      refetch();
      setProvinsi({ nama_provinsi: "", kode_provinsi: "" });
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
  const { mutate: updateProvinsiMutation } = useEditProvinsi(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit provinsi",
      });
      refetch();
      setProvinsi({ nama_provinsi: "", kode_provinsi: "" });
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
  const { mutate: deleteProvinsiMutation } = useDeleteProvinsi(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus provinsi",
      });
      refetch();
      setProvinsi({ nama_provinsi: "", kode_provinsi: "" });
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

  // Submit form tambah dan edit provinsi
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEditing) {
      const provinceCodeExists = data?.some(
        (item: ProvinsiType) => item.kode_provinsi === provinsi.kode_provinsi
      );
      if (provinceCodeExists) {
        showNotification({
          status: "text-red-500",
          icon: "bx bx-error text-2xl",
          header: "Data Duplikat",
          message: `Kode provinsi ${provinsi.kode_provinsi} sudah ada`,
        });
        return;
      }
      createProvinsiMutation({
        token: session.user?.accessToken,
        provinsi: {
          nama_provinsi: provinsi.nama_provinsi,
          kode_provinsi: provinsi.kode_provinsi,
        },
      });
    } else {
      updateProvinsiMutation({
        token: session.user?.accessToken,
        provinsi: {
          kode_provinsi: provinsi.kode_provinsi,
          nama_provinsi: provinsi.nama_provinsi,
        },
      });
    }
  };
  // Open editing state
  const handleEdit = (data: ProvinsiType) => {
    setIsEditing(true);
    setProvinsi({
      kode_provinsi: data.kode_provinsi,
      nama_provinsi: data.nama_provinsi,
    });
  };
  // Handle delete
  const handleDelete = (data: ProvinsiType) => {
    showConfirmation({
      title: "Hapus provinsi?",
      message:
        "Provinsi ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteProvinsiMutation({
          token: session.user?.accessToken,
          provinsiId: data.kode_provinsi,
        });
      },
    });
  };

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Provinsi</h1>

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
            <Link href={pathname}>Provinsi</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen provinsi
        </span>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Cari provinsi..."
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

        {/* Form provinsi */}
        <div className="col-span-1">
          <div className="w-full card h-auto bg-white text-black p-4 shadow">
            <h2 className="text-l font-bold mb-4">
              {isEditing ? "Ubah" : "Tambah"} Provinsi
            </h2>

            <form id="form" onSubmit={handleSubmit}>
              {/* Nama provinsi */}
              <div className="form-control">
                <label className="label" htmlFor="namaProvinsi">
                  <span className="label-text text-black font-medium text-sm">
                    Nama Provinsi <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="namaProvinsi"
                  id="namaProvinsi"
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Cth: Kepulauan Riau"
                  value={provinsi.nama_provinsi}
                  onChange={(e) =>
                    setProvinsi({ ...provinsi, nama_provinsi: e.target.value })
                  }
                  required
                />
              </div>

              {/* Kode provinsi */}
              <div className="form-control">
                <label className="label" htmlFor="kodeProvinsi">
                  <span className="label-text text-black font-medium text-sm">
                    Kode Provinsi <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="kodeProvinsi"
                  id="kodeProvinsi"
                  minLength={2}
                  maxLength={2}
                  readOnly={isEditing}
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Cth: 01"
                  value={provinsi.kode_provinsi}
                  onChange={(e) =>
                    setProvinsi({
                      ...provinsi,
                      kode_provinsi: e.target.value,
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
                    setProvinsi({
                      nama_provinsi: "",
                      kode_provinsi: "",
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
