"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import { useUniversitasData } from "@/hooks/universitas/useUniversitasData";
import SelectSearch from "@/components/SelectSearch";
import { useDebounce } from "use-debounce";
import { KotaType } from "@/types/KotaTypes";
import { useCreateUniversitas } from "@/hooks/universitas/useCreateUniversitas";
import { UniversitasType } from "@/types/UniversitasTypes";
import { useEditUniversitas } from "@/hooks/universitas/useEditUniversitas";
import { useDeleteUniversitas } from "@/hooks/universitas/useDeleteUniversitas";

export default function AgamaView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchUniversitasQuery, setSearchUniversitasQuery] = useState("");
  const [debouncedSearchUniversitasQuery] = useDebounce(
    searchUniversitasQuery,
    500
  );
  const [isLoadingKotaOptions, setIsLoadingKotaOptions] = useState(false);
  const [searchKotaQuery, setSearchKotaQuery] = useState("");
  const [debouncedSearchKotaQuery] = useDebounce(searchKotaQuery, 500);
  const [kotaOptions, setKotaOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [universitas, setUniversitas] = useState({
    id_universitas: "", // String and Required
    nama_universitas: "", // String And Required
    kota_id: "", // String And Required
  });

  // Get data universitas dan referensi kota
  const { data, isLoading, refetch } = useUniversitasData(
    session.user?.accessToken,
    status,
    debouncedSearchUniversitasQuery
  );
  // Mutation create universitas
  const { mutate: createUniversitasMutation } = useCreateUniversitas(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan universitas",
      });
      refetch();
      setUniversitas({ id_universitas: "", nama_universitas: "", kota_id: "" });
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
  const { mutate: updateUniversitasMutation } = useEditUniversitas(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit universitas",
      });
      refetch();
      setUniversitas({ id_universitas: "", nama_universitas: "", kota_id: "" });
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
  const { mutate: deleteUniversitasMutation } = useDeleteUniversitas(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus universitas",
      });
      refetch();
      setUniversitas({ id_universitas: "", nama_universitas: "", kota_id: "" });
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
      const universitasCodeExists = (data?.univ_data || []).some(
        (item: UniversitasType) =>
          item.id_universitas === universitas.id_universitas
      );

      if (universitasCodeExists) {
        showNotification({
          status: "text-red-500",
          icon: "bx bx-error text-2xl",
          header: "Data Duplikat",
          message: `Kode universitas ${universitas.id_universitas} sudah ada`,
        });
        return;
      }
      createUniversitasMutation({
        token: session.user?.accessToken,
        universitas: {
          id_universitas: universitas.id_universitas,
          nama_universitas: universitas.nama_universitas,
          kota_id: universitas.kota_id,
        },
      });
    } else {
      updateUniversitasMutation({
        token: session.user?.accessToken,
        universitas: {
          id_universitas: universitas.id_universitas,
          nama_universitas: universitas.nama_universitas,
          kota_id: universitas.kota_id,
        },
      });
    }
  };
  // Open editing state
  const handleEdit = (data: UniversitasType) => {
    setIsEditing(true);
    setUniversitas({
      id_universitas: data.id_universitas,
      nama_universitas: data.nama_universitas,
      kota_id: data.kota_id,
    });
  };
  // Handle delete
  const handleDelete = (data: UniversitasType) => {
    showConfirmation({
      title: "Hapus universitas?",
      message:
        "Universitas ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteUniversitasMutation({
          token: session.user?.accessToken,
          universitasId: data.id_universitas,
        });
      },
    });
  };

  // Filter kota
  useEffect(() => {
    if (!data) return;

    setIsLoadingKotaOptions(true);

    const search = debouncedSearchKotaQuery.toLowerCase();

    const filtered = (data.all_kota || []).filter((per: KotaType) =>
      per.nama_kota.toLowerCase().includes(search)
    );

    setKotaOptions(
      filtered.map((per: KotaType) => ({
        value: per.id_kota,
        label: per.nama_kota,
      }))
    );
    setIsLoadingKotaOptions(false);
  }, [data, debouncedSearchKotaQuery]);

  useEffect(() => {
    refetch();
  }, [debouncedSearchUniversitasQuery]);

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Universitas</h1>

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
            <Link href={pathname}>Universitas</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen data universitas pada sistem.
        </span>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Cari universitas..."
          className="input w-full bg-white mb-4 input-md shadow"
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
          value={searchUniversitasQuery}
          onChange={(e) => setSearchUniversitasQuery(e.target.value)}
        />
      </div>

      {/* Main Content - Table universitas and form universitas */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table universitas */}
        <div className="col-span-2">
          <DataTable
            columns={columns}
            data={data?.univ_data || []}
            searchQuery={searchTerm}
            isLoading={isLoading}
            refetch={refetch}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>

        {/* Form universitas */}
        <div className="col-span-1">
          <div className="w-full card h-auto bg-white text-black p-4 shadow">
            <h2 className="text-l font-bold mb-4">
              {isEditing ? "Ubah" : "Tambah"} Universitas
            </h2>

            <form id="form" onSubmit={handleSubmit}>
              {/* Kode universitas */}
              <div className="form-control">
                <label className="label" htmlFor="kodeUniversitas">
                  <span className="label-text text-black font-medium text-sm">
                    Kode Universitas <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="kodeUniversitas"
                  id="kodeUniversitas"
                  minLength={1}
                  readOnly={isEditing}
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Cth: 012345"
                  value={universitas.id_universitas}
                  onChange={(e) =>
                    setUniversitas({
                      ...universitas,
                      id_universitas: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Nama universitas */}
              <div className="form-control">
                <label className="label" htmlFor="namaUniversitas">
                  <span className="label-text text-black font-medium text-sm">
                    Nama Universitas <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="namaUniversitas"
                  id="namaUniversitas"
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Cth: Universitas Indonesia"
                  value={universitas.nama_universitas}
                  onChange={(e) =>
                    setUniversitas({
                      ...universitas,
                      nama_universitas: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Kota */}
              <div className="form-control">
                <label className="label" htmlFor="periode">
                  <span className="label-text text-black font-medium text-sm">
                    Kota <span className="text-red-500">*</span>
                  </span>
                </label>
                <SelectSearch
                  data={kotaOptions || []}
                  fieldName="Kota"
                  placeholder="Pilih kota..."
                  defaultEmptyValue={{
                    value: "",
                    label: "Pilih kota...",
                  }}
                  value={universitas.kota_id}
                  setValue={(data) =>
                    setUniversitas((prev) => ({
                      ...prev,
                      kota_id: data,
                    }))
                  }
                  isLoading={isLoadingKotaOptions}
                  searchQuery={searchKotaQuery}
                  setSearchQuery={setSearchKotaQuery}
                />
              </div>

              {/* Tombol simpan dan reset */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setUniversitas({
                      id_universitas: "",
                      nama_universitas: "",
                      kota_id: "",
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
