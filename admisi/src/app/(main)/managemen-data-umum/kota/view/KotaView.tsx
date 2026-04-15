"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import { ProvinsiType } from "@/types/ProvinsiTypes";
import { useKotaData } from "@/hooks/kota/useKotaData";
import SelectSearch from "@/components/SelectSearch";
import { useDebounce } from "use-debounce";
import { useCreateKota } from "@/hooks/kota/useCreateKota";
import { useEditKota } from "@/hooks/kota/useEditKota";
import { KotaType } from "@/types/KotaTypes";
import { useDeleteKota } from "@/hooks/kota/useDeleteKota";

export default function KotaView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingProvinsiOptions, setIsLoadingProvinsiOptions] =
    useState(false);
  const [searchProvinsiQuery, setSearchProvinsiQuery] = useState("");
  const [debouncedSearchProvinsiQuery] = useDebounce(searchProvinsiQuery, 500);
  const [provinsiOptions, setProvinsiOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [kota, setKota] = useState({
    id_kota: "",
    nama_kota: "",
    id_provinsi: "",
  });

  // Get data kota
  const { data, isLoading, refetch } = useKotaData(
    session.user?.accessToken,
    status
  );
  // Mutation create provinsi
  const { mutate: createKotaMutation } = useCreateKota(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan kota",
      });
      refetch();
      setKota({ id_kota: "", nama_kota: "", id_provinsi: "" });
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
  const { mutate: updateKotaMutation } = useEditKota(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit kota",
      });
      refetch();
      setKota({ id_kota: "", nama_kota: "", id_provinsi: "" });
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
  const { mutate: deleteKotaMutation } = useDeleteKota(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus kota",
      });
      refetch();
      setKota({ id_kota: "", nama_kota: "", id_provinsi: "" });
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
      createKotaMutation({
        token: session.user?.accessToken,
        kota: {
          nama_kota: kota.nama_kota,
          id_provinsi: kota.id_provinsi,
        },
      });
    } else {
      updateKotaMutation({
        token: session.user?.accessToken,
        kota: {
          id_kota: kota.id_kota,
          nama_kota: kota.nama_kota,
          id_provinsi: kota.id_provinsi,
        },
      });
    }
  };
  // Open editing state
  const handleEdit = (data: KotaType) => {
    setIsEditing(true);
    setKota({
      id_kota: data.id_kota,
      nama_kota: data.nama_kota,
      id_provinsi: data.id_provinsi,
    });
  };
  // Handle delete
  const handleDelete = (data: KotaType) => {
    showConfirmation({
      title: "Hapus Kota?",
      message:
        "Kota ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteKotaMutation({
          token: session.user?.accessToken,
          kotaId: data.id_kota,
        });
      },
    });
  };

  // Filter provinsi
  useEffect(() => {
    if (!data) return;

    setIsLoadingProvinsiOptions(true);

    const search = debouncedSearchProvinsiQuery.toLowerCase();

    const filtered = (data.all_provinsi || []).filter((per: ProvinsiType) =>
      per.nama_provinsi.toLowerCase().includes(search)
    );

    setProvinsiOptions(
      filtered.map((per: ProvinsiType) => ({
        value: per.kode_provinsi,
        label: per.nama_provinsi,
      }))
    );
    setIsLoadingProvinsiOptions(false);
  }, [data, debouncedSearchProvinsiQuery]);

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Kota</h1>

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
            <Link href={pathname}>Kota</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen kota pada sistem admisi
        </span>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Cari kota..."
          className="input w-full bg-white mb-4 input-md shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Content - Table kota dan form kota */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table kota */}
        <div className="col-span-2">
          <DataTable
            columns={columns}
            data={data?.data || []}
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
              {isEditing ? "Ubah" : "Tambah"} Kota
            </h2>

            <form id="form" onSubmit={handleSubmit}>
              {/* Provinsi */}
              <div className="form-control">
                <label className="label" htmlFor="periode">
                  <span className="label-text text-black font-medium text-sm">
                    Provinsi <span className="text-red-500">*</span>
                  </span>
                </label>
                <SelectSearch
                  data={provinsiOptions || []}
                  fieldName="Provinsi"
                  placeholder="Pilih provinsi..."
                  defaultEmptyValue={{
                    value: "",
                    label: "Pilih provinsi...",
                  }}
                  value={kota.id_provinsi}
                  setValue={(data) =>
                    setKota((prev) => ({
                      ...prev,
                      id_provinsi: data,
                    }))
                  }
                  isLoading={isLoadingProvinsiOptions}
                  searchQuery={searchProvinsiQuery}
                  setSearchQuery={setSearchProvinsiQuery}
                />
              </div>

              {/* Nama kota */}
              <div className="form-control">
                <label className="label" htmlFor="namaKota">
                  <span className="label-text text-black font-medium text-sm">
                    Nama Kota <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="namaKota"
                  id="namaKota"
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Cth: Batam"
                  value={kota.nama_kota}
                  onChange={(e) =>
                    setKota({ ...kota, nama_kota: e.target.value })
                  }
                  required
                />
              </div>

              {/* Tombol simpan dan reset */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setKota({ id_kota: "", nama_kota: "", id_provinsi: "" });
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
