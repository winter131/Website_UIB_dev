"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import { AgamaType } from "@/types/AgamaTypes";
import { useDeleteAgama } from "@/hooks/agama/useDeleteAgama";
import { usePeringkatData } from "@/hooks/peringkat/usePeringkatData";
import { useCreatePeringkat } from "@/hooks/peringkat/useCreatePeringkat";
import { useEditPeringkat } from "@/hooks/peringkat/useEditPeringkat";
import { PeringkatType } from "@/types/PeringkatTypes";
import { useDeletePeringkat } from "@/hooks/peringkat/useDeletePeringkat";

export default function PeringkatView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [peringkat, setPeringkat] = useState({
    id_peringkat: "",
    nama_peringkat: "",
    skor_minimum: "",
    skor_maximum: "",
    tipe_pendaftaran: "",
  });

  // Get data peringkat
  const { data, isLoading, refetch } = usePeringkatData(
    session.user?.accessToken,
    status,
  );
  // Mutation create peringkat, edit peringkat, delete peringkat
  const { mutate: createPeringkatMutation } = useCreatePeringkat(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan peringkat",
      });
      refetch();
      setPeringkat({
        id_peringkat: "",
        nama_peringkat: "",
        skor_minimum: "",
        skor_maximum: "",
        tipe_pendaftaran: "",
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
  const { mutate: updatePeringkatMutation } = useEditPeringkat(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit peringkat",
      });
      refetch();
      setPeringkat({
        id_peringkat: "",
        nama_peringkat: "",
        skor_minimum: "",
        skor_maximum: "",
        tipe_pendaftaran: "",
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
    },
  );
  const { mutate: deletePeringkatMutation } = useDeletePeringkat(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus peringkat",
      });
      refetch();
      setPeringkat({
        id_peringkat: "",
        nama_peringkat: "",
        skor_minimum: "",
        skor_maximum: "",
        tipe_pendaftaran: "",
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
    },
  );

  // Submit form tambah dan edit provinsi
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEditing) {
      createPeringkatMutation({
        token: session.user?.accessToken,
        peringkat: {
          nama_peringkat: peringkat.nama_peringkat,
          skor_minimum: Number(peringkat.skor_minimum),
          skor_maximum: Number(peringkat.skor_maximum),
          tipe_pendaftaran: peringkat.tipe_pendaftaran,
        },
      });
    } else {
      updatePeringkatMutation({
        token: session.user?.accessToken,
        peringkat: {
          id_peringkat: Number(peringkat.id_peringkat),
          nama_peringkat: peringkat.nama_peringkat,
          skor_minimum: Number(peringkat.skor_minimum),
          skor_maximum: Number(peringkat.skor_maximum),
          tipe_pendaftaran: peringkat.tipe_pendaftaran,
        },
      });
    }
  };
  // Open editing state
  const handleEdit = (data: PeringkatType) => {
    setIsEditing(true);
    setPeringkat((prev) => ({
      ...prev,
      id_peringkat: String(data.id_peringkat),
      nama_peringkat: data.nama_peringkat,
      skor_minimum: String(data.skor_minimum),
      skor_maximum: String(data.skor_maximum),
      tipe_pendaftaran: data.tipe_pendaftaran,
    }));
  };
  // Handle delete
  const handleDelete = (data: PeringkatType) => {
    showConfirmation({
      title: "Hapus peringkat?",
      message:
        "Peringkat ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deletePeringkatMutation({
          token: session.user?.accessToken,
          peringkatId: data.id_peringkat,
        });
      },
    });
  };

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Peringkat</h1>

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
            <Link href={pathname}>Peringkat</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen data peringkat.
        </span>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Cari peringkat..."
          className="input w-full bg-white mb-4 input-md shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Content - Table peringkat and form peringkat */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table peringkat */}
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

        {/* Form peringkat */}
        <div className="col-span-1">
          <div className="w-full card h-auto bg-white text-black p-4 shadow">
            <h2 className="text-l font-bold mb-4">
              {isEditing ? "Ubah" : "Tambah"} Peringkat
            </h2>

            <form id="form" onSubmit={handleSubmit}>
              {/* Nama peringkat */}
              <div className="form-control">
                <label className="label" htmlFor="namaPeringkat">
                  <span className="label-text text-black font-medium text-sm">
                    Nama Peringkat <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="namaPeringkat"
                  id="namaPeringkat"
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Masukkan nama peringkat..."
                  value={peringkat.nama_peringkat}
                  onChange={(e) =>
                    setPeringkat({
                      ...peringkat,
                      nama_peringkat: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* Skor minimum */}
                <div className="form-control">
                  <label className="label" htmlFor="skorMinimum">
                    <span className="label-text text-black font-medium text-sm">
                      Skor Minimum <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="skorMinimum"
                    id="skorMinimum"
                    className="input input-bordered input-sm bg-white text-black"
                    placeholder="Masukkan skor minimum..."
                    value={peringkat.skor_minimum}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");

                      if (Number(value) > 100) {
                        showNotification({
                          status: "text-amber-500",
                          icon: "bx bx-error text-2xl",
                          header: "Peringatan",
                          message:
                            "Skor minimum tidak boleh kurang dari 0 dan lebih dari 100",
                        });
                        return;
                      }
                      setPeringkat({
                        ...peringkat,
                        skor_minimum: value,
                      });
                    }}
                    required
                  />
                </div>
                {/* Skor maksimum */}
                <div className="form-control">
                  <label className="label" htmlFor="skorMaksimum">
                    <span className="label-text text-black font-medium text-sm">
                      Skor Maksimum <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    name="skorMaksimum"
                    id="skorMaksimum"
                    className="input input-bordered input-sm bg-white text-black"
                    placeholder="Masukkan skor maksimum..."
                    value={peringkat.skor_maximum}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");

                      if (Number(value) > 100) {
                        showNotification({
                          status: "text-amber-500",
                          icon: "bx bx-error text-2xl",
                          header: "Peringatan",
                          message:
                            "Skor maksimum tidak boleh kurang dari 0 dan lebih dari 100",
                        });
                        return;
                      }
                      setPeringkat({
                        ...peringkat,
                        skor_maximum: value,
                      });
                    }}
                    required
                  />
                </div>
              </div>
              {/* Filter status */}
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Tipe Pendaftaran{" "}
                  <small className="text-xs text-red-500">*</small>
                </label>
                <select
                  id="tipePendaftaran"
                  name="tipePendaftaran"
                  className="select select-sm select-bordered bg-white text-black border border-gray-300 rounded-md w-full mt-1"
                  required
                  value={peringkat.tipe_pendaftaran || ""}
                  onChange={(e) =>
                    setPeringkat({
                      ...peringkat,
                      tipe_pendaftaran: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    Pilih tipe pendaftaran
                  </option>
                  <option value="reg">Reguler</option>
                  <option value="bsw">Beasiswa</option>
                  <option value="wna">Warga Negara Asing</option>
                  <option value="s2">S2</option>
                </select>
              </div>

              {/* Tombol simpan dan reset */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setPeringkat({
                      id_peringkat: "",
                      nama_peringkat: "",
                      skor_minimum: "",
                      skor_maximum: "",
                      tipe_pendaftaran: "",
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
