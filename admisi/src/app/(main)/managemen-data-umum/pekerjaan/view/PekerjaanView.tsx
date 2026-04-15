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
import { usePekerjaanData } from "@/hooks/pekerjaan/usePekerjaanData";
import { useCreatePekerjaan } from "@/hooks/pekerjaan/useCreatePekerjaan";
import { useEditPekerjaan } from "@/hooks/pekerjaan/useEditPekerjaan";
import { PekerjaanType } from "@/types/PekerjaanTypes";
import { useDeletePekerjaan } from "@/hooks/pekerjaan/useDeletePekerjaan";

export default function PekerjaanView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pekerjaan, setPekerjaan] = useState({
    id_pekerjaan: "",
    nama_pekerjaan: "",
  });

  // Get data pekerjaan
  const { data, isLoading, refetch } = usePekerjaanData(
    session.user?.accessToken,
    status
  );
  // Mutation create pekerjaan, edit pekerjaan, delete pekerjaan
  const { mutate: createPekerjaanMutation } = useCreatePekerjaan(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan pekerjaan",
      });
      refetch();
      setPekerjaan({ nama_pekerjaan: "", id_pekerjaan: "" });
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
  const { mutate: updatePekerjaanMutation } = useEditPekerjaan(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit pekerjaan",
      });
      refetch();
      setPekerjaan({ nama_pekerjaan: "", id_pekerjaan: "" });
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
  const { mutate: deletePekerjaanMutation } = useDeletePekerjaan(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus pekerjaan",
      });
      refetch();
      setPekerjaan({ nama_pekerjaan: "", id_pekerjaan: "" });
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

  // Submit form tambah dan edit pekerjaan
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    !isEditing
      ? createPekerjaanMutation({
          token: session.user?.accessToken,
          pekerjaan: {
            nama_pekerjaan: pekerjaan.nama_pekerjaan,
          },
        })
      : updatePekerjaanMutation({
          token: session.user?.accessToken,
          pekerjaan: {
            id_pekerjaan: Number(pekerjaan.id_pekerjaan),
            nama_pekerjaan: pekerjaan.nama_pekerjaan,
          },
        });
  };
  // Open editing state
  const handleEdit = (data: PekerjaanType) => {
    setIsEditing(true);
    setPekerjaan({
      id_pekerjaan: String(data.id_pekerjaan),
      nama_pekerjaan: data.nama_pekerjaan,
    });
  };
  // Handle delete
  const handleDelete = (data: PekerjaanType) => {
    showConfirmation({
      title: "Hapus pekerjaan?",
      message:
        "Pekerjaan ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deletePekerjaanMutation({
          token: session.user?.accessToken,
          pekerjaanId: data.id_pekerjaan,
        });
      },
    });
  };

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Pekerjaan</h1>

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
            <Link href={pathname}>Pekerjaan</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen pekerjaan calon mahasiswa
        </span>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Cari pekerjaan..."
          className="input w-full bg-white mb-4 input-md shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Content - Table pekerjaan dan form pekerjaan */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table pekerjaan */}
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

        {/* Form pekerjaan */}
        <div className="col-span-1">
          <div className="w-full card h-auto bg-white text-black p-4 shadow">
            <h2 className="text-l font-bold mb-4">
              {isEditing ? "Ubah" : "Tambah"} Pekerjaan
            </h2>

            <form id="form" onSubmit={handleSubmit}>
              {/* Nama pekerjaan */}
              <div className="form-control">
                <label className="label" htmlFor="namaPekerjaan">
                  <span className="label-text text-black font-medium text-sm">
                    Nama Pekerjaan <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="namaPekerjaan"
                  id="namaPekerjaan"
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Cth: Wiraswasta"
                  value={pekerjaan.nama_pekerjaan}
                  onChange={(e) =>
                    setPekerjaan({
                      ...pekerjaan,
                      nama_pekerjaan: e.target.value,
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
                    setPekerjaan({
                      id_pekerjaan: "",
                      nama_pekerjaan: "",
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
