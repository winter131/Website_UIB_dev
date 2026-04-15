"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import SelectSearch from "@/components/SelectSearch";
import { useDebounce } from "use-debounce";
import { KotaType } from "@/types/KotaTypes";
import { useSekolahData } from "@/hooks/sekolah/useSekolahData";
import { useCreateSekolah } from "@/hooks/sekolah/useCreateSekolah";
import { SekolahType } from "@/types/SekolahTypes";
import { useEditSekolah } from "@/hooks/sekolah/useEditSekolah";
import { useDeleteSekolah } from "@/hooks/sekolah/useDeleteSekolah";

export default function SekolahView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSekolahQuery, setSearchSekolahQuery] = useState("");
  const [debouncedSearchSekolahQuery] = useDebounce(searchSekolahQuery, 500);
  const [isLoadingKotaOptions, setIsLoadingKotaOptions] = useState(false);
  const [searchKotaQuery, setSearchKotaQuery] = useState("");
  const [debouncedSearchKotaQuery] = useDebounce(searchKotaQuery, 500);
  const [kotaOptions, setKotaOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [sekolah, setSekolah] = useState({
    id_sekolah: "", // String and Required
    nama_sekolah: "", // String And Required
    kota_id: "", // String And Required
  });

  // Get data sekolah dan referensi kota
  const { data, isLoading, refetch } = useSekolahData(
    session.user?.accessToken,
    status,
    debouncedSearchSekolahQuery
  );
  // Mutation create sekolah, edit sekolah, delete sekolah
  const { mutate: createSekolahMutation } = useCreateSekolah(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan sekolah",
      });
      refetch();
      setSekolah({ id_sekolah: "", nama_sekolah: "", kota_id: "" });
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
  const { mutate: updateSekolahMutation } = useEditSekolah(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit sekolah",
      });
      refetch();
      setSekolah({ id_sekolah: "", nama_sekolah: "", kota_id: "" });
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
  const { mutate: deleteSekolahMutation } = useDeleteSekolah(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus sekolah",
      });
      refetch();
      setSekolah({ id_sekolah: "", nama_sekolah: "", kota_id: "" });
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

  // Submit form tambah dan edit sekolah
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEditing) {
      const sekolahCodeExists = (data?.sekolah_data || []).some(
        (item: SekolahType) => item.id_sekolah === sekolah.id_sekolah
      );

      if (sekolahCodeExists) {
        showNotification({
          status: "text-red-500",
          icon: "bx bx-error text-2xl",
          header: "Data Duplikat",
          message: `Kode sekolah ${sekolah.id_sekolah} sudah ada`,
        });
        return;
      }
      createSekolahMutation({
        token: session.user?.accessToken,
        sekolah: {
          id_sekolah: sekolah.id_sekolah,
          nama_sekolah: sekolah.nama_sekolah,
          kota_id: sekolah.kota_id,
        },
      });
    } else {
      updateSekolahMutation({
        token: session.user?.accessToken,
        sekolah: {
          id_sekolah: sekolah.id_sekolah,
          nama_sekolah: sekolah.nama_sekolah,
          kota_id: sekolah.kota_id,
        },
      });
    }
  };
  // Open editing state
  const handleEdit = (data: SekolahType) => {
    setIsEditing(true);
    setSekolah({
      id_sekolah: data.id_sekolah,
      nama_sekolah: data.nama_sekolah,
      kota_id: data.kota_id,
    });
  };
  // Handle delete
  const handleDelete = (data: SekolahType) => {
    showConfirmation({
      title: "Hapus sekolah?",
      message:
        "Sekolah ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteSekolahMutation({
          token: session.user?.accessToken,
          sekolahId: data.id_sekolah,
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
  }, [debouncedSearchSekolahQuery]);

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Sekolah</h1>

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
            <Link href={pathname}>Sekolah</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen data sekolah pada sistem.
        </span>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Cari sekolah..."
          className="input w-full bg-white mb-4 input-md shadow"
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
          value={searchSekolahQuery}
          onChange={(e) => setSearchSekolahQuery(e.target.value)}
        />
      </div>

      {/* Main Content - Table sekolah and form sekolah */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table sekolah */}
        <div className="col-span-2">
          <DataTable
            columns={columns}
            data={data?.sekolah_data || []}
            searchQuery={searchTerm}
            isLoading={isLoading}
            refetch={refetch}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>

        {/* Form sekolah */}
        <div className="col-span-1">
          <div className="w-full card h-auto bg-white text-black p-4 shadow">
            <h2 className="text-l font-bold mb-4">
              {isEditing ? "Ubah" : "Tambah"} Sekolah
            </h2>

            <form id="form" onSubmit={handleSubmit}>
              {/* Kode NPSN */}
              <div className="form-control">
                <label className="label" htmlFor="kodeNPSN">
                  <span className="label-text text-black font-medium text-sm">
                    Kode NPSN <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="kodeNPSN"
                  id="kodeNPSN"
                  minLength={1}
                  maxLength={10}
                  readOnly={isEditing}
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Cth: 012345"
                  value={sekolah.id_sekolah}
                  onChange={(e) =>
                    setSekolah({
                      ...sekolah,
                      id_sekolah: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Nama sekolah */}
              <div className="form-control">
                <label className="label" htmlFor="namaSekolah">
                  <span className="label-text text-black font-medium text-sm">
                    Nama Sekolah <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="namaSekolah"
                  id="namaSekolah"
                  className="input input-bordered input-sm bg-white text-black"
                  placeholder="Cth: SMKS Multistudi High School"
                  value={sekolah.nama_sekolah}
                  onChange={(e) =>
                    setSekolah({
                      ...sekolah,
                      nama_sekolah: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Kota */}
              <div className="form-control">
                <label className="label" htmlFor="kota">
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
                  value={sekolah.kota_id}
                  setValue={(data) =>
                    setSekolah((prev) => ({
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
                    setSekolah({
                      id_sekolah: "",
                      nama_sekolah: "",
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
