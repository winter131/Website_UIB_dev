"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import { usePeriodeData } from "@/hooks/periode/usePeriodeData";
import { useCreatePeriode } from "@/hooks/periode/useCreatePeriode";
import { useDeletePeriode } from "@/hooks/periode/useDeletePeriode";
import { useEditPeriode } from "@/hooks/periode/useEditPeriode";

export default function PeriodeView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [periode, setPeriode] = useState({
    id: "",
    semester: "",
    tahun: "",
    status: "",
  });

  // Get data periode
  const { data, isLoading, refetch } = usePeriodeData(
    session.user?.accessToken,
    status,
  );
  // Mutation create periode
  const { mutate: createPeriodeMutation } = useCreatePeriode(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan periode",
      });
      refetch();
      setPeriode({ id: "", semester: "", tahun: "", status: "" });
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
  // Mutation edit periode
  const { mutate: editPeriodeMutation } = useEditPeriode(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit periode",
      });
      refetch();
      setPeriode({ id: "", semester: "", tahun: "", status: "" });
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
  const { mutate: deletePeriodeMutation } = useDeletePeriode(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus periode",
      });
      refetch();
      setPeriode({ id: "", semester: "", tahun: "", status: "" });
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

  // Submit form tambah dan edit periode
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createPeriodeMutation({
      token: session.user?.accessToken,
      periode: {
        // ALL Required
        periode_jenis: periode.semester, // (Harus dari Sini 'ganjil','genap','sisipan ganjil','sisipan genap')
        tahun_periode: Number(periode.tahun), // Ini Integer ya
        status_periode: periode.status, // ('aktif','tidak aktif')
      },
    });
  };
  // Handle status change (aktif/tidak aktif)
  const onStatusChange = (
    id: number,
    periodeJenis: string,
    tahunPeriode: number,
    status: string,
  ) => {
    if (status === "aktif") {
      showConfirmation({
        title: "Aktifkan periode?",
        message: "Periode ini akan diaktifkan. Lanjut aktifkan?",
        icon: "trash",
        confirmButtonText: "Aktifkan",
        confirmButtonColor: "bg-green-600",
        onConfirm() {
          editPeriodeMutation({
            token: session.user?.accessToken,
            periode: {
              periode_id: id,
              periode_jenis: periodeJenis,
              tahun_periode: Number(tahunPeriode),
              status_periode: status,
            },
          });
        },
      });
    } else {
      showConfirmation({
        title: "Nonaktifkan periode?",
        message:
          "Periode ini akan di-nonaktifkan dari  sistem dan tidak dapat dikembalikan. Lanjut nonaktifkan?",
        icon: "trash",
        confirmButtonText: "Nonaktifkan",
        confirmButtonColor: "bg-red-600",
        onConfirm() {
          editPeriodeMutation({
            token: session.user?.accessToken,
            periode: {
              periode_id: id,
              periode_jenis: periodeJenis,
              tahun_periode: Number(tahunPeriode),
              status_periode: status,
            },
          });
        },
      });
    }
  };

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Periode</h1>

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
            <Link href={pathname}>Periode</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen periode gelombang penerimaan mahasiswa baru
        </span>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Cari periode..."
          className="input w-full bg-white mb-4 input-md shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Content - Table periode dan form periode */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table periode */}
        <div className="col-span-2">
          <DataTable
            columns={columns}
            data={data || []}
            searchQuery={searchTerm}
            isLoading={isLoading}
            refetch={refetch}
            // handleEdit={handleEdit}
            // handleDelete={handleDelete}
            onStatusChange={onStatusChange}
          />
        </div>

        {/* Form periode */}
        <div className="col-span-1">
          <div className="w-full card h-auto bg-white text-black p-4 shadow">
            <h2 className="text-l font-bold mb-4">
              {isEditing ? "Ubah" : "Tambah"} Periode
            </h2>

            <form id="form" onSubmit={handleSubmit}>
              {/* Semester */}
              <div className="form-control">
                <label className="label" htmlFor="semester">
                  <span className="label-text text-black font-medium text-sm">
                    Semester <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  name="semester"
                  id="semester"
                  className="select select-sm select-bordered bg-white text-black"
                  required
                  value={periode.semester || ""}
                  onChange={(e) =>
                    setPeriode({
                      ...periode,
                      semester: e.target.value,
                    })
                  }
                >
                  <option disabled value="">
                    Pilih semester
                  </option>
                  <option value="ganjil">Ganjil</option>
                  <option value="genap">Genap</option>
                  <option value="sisipan ganjil">Sisipan Ganjil</option>
                  <option value="sisipan genap">Sisipan Genap</option>
                </select>
              </div>

              {/* Tahun */}
              <div className="form-control">
                <label className="label" htmlFor="tahun">
                  <span className="label-text text-black font-medium text-sm">
                    Tahun <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  name="tahun"
                  id="tahun"
                  className="select select-sm select-bordered bg-white text-black"
                  required
                  value={periode.tahun || ""}
                  onChange={(e) =>
                    setPeriode({
                      ...periode,
                      tahun: e.target.value,
                    })
                  }
                >
                  <option disabled value="">
                    Pilih tahun
                  </option>
                  {Array.from({ length: 5 }, (_, index) => (
                    <option
                      key={index}
                      value={(new Date().getFullYear() + index).toString()}
                    >
                      {(new Date().getFullYear() + index).toString()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status periode */}
              <div className="form-control">
                <label className="label" htmlFor="statusPeriode">
                  <span className="label-text text-black font-medium text-sm">
                    Status Periode <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  name="statusPeriode"
                  id="statusPeriode"
                  className="select select-sm select-bordered bg-white text-black"
                  required
                  value={periode.status || ""}
                  onChange={(e) =>
                    setPeriode({
                      ...periode,
                      status: e.target.value,
                    })
                  }
                >
                  <option disabled value="">
                    Pilih status
                  </option>
                  <option value="aktif">Aktif</option>
                  <option value="tidak aktif">Tidak Aktif</option>
                </select>
              </div>

              {/* Tombol simpan dan reset */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setPeriode({ id: "", semester: "", tahun: "", status: "" });
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
