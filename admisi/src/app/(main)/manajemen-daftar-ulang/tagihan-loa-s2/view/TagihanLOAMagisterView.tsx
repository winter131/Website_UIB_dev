"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import { X } from "lucide-react";
import { useDebounce } from "use-debounce";
import SelectSearch from "@/components/SelectSearch";
import LoadingBox from "@/components/LoadingBox";
import { useTagihanCalonMahasiswaData } from "@/hooks/tagihan-calon-mahasiswa/useTagihanCalonMahasiswaData";
import { ProgramStudiType } from "@/types/ProgramStudiTypes";
import { PeriodeType } from "@/types/PeriodeTypes";
import { ucFirst } from "@/utils/UcFirst";
import { DetailGelombangType } from "@/types/DetailGelombangTypes";
import { TagihanLOAMagisterType } from "@/types/TagihanLOATypes";
import { useEditTagihanLOAS2 } from "@/hooks/tagihan-calon-mahasiswa/useEditTagihanLOAS2";
import TagihanLOAMagisterSidePanel from "@/components/TagihanLOAMagisterSidePanel";
import { useCreateTagihanLOAS2 } from "@/hooks/tagihan-calon-mahasiswa/useCreateTagihanLOAS2";
import { useDeleteTagihanLOAS2 } from "@/hooks/tagihan-calon-mahasiswa/useDeleteTagihanLOAS2";
import { useImportTagihanLOAS2 } from "@/hooks/tagihan-calon-mahasiswa/useImportTagihanLOAS2";

export default function TagihanLOAMagisterView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [tagihanData, setTagihanData] = useState<TagihanLOAMagisterType[]>([]);
  const [isAddingTagihanLOA, setIsAddingTagihanLOA] = useState(false);
  const [isEditingTagihanLOA, setIsEditingTagihanLOA] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    selJenjang: "S2",
    selPeriode: "",
    selGelombang: "",
    selProdi: "",
    selPeringkat: "",
    selWaktuKuliah: "",
    selJalurDaftar: "",
  });
  const [formData, setFormData] = useState<Partial<TagihanLOAMagisterType>>({
    id_tagihan: "",
    detail_gelombang: 0,
    program_studi: 0,
    jalur_daftar: "",
    biaya_semester_1: 0,
    biaya_semester_2: 0,
    biaya_semester_3: 0,
    biaya_matrikulasi: 0,
  });

  // Search program studi options
  const [isLoadingProdiOptions, setIsLoadingProdiOptions] = useState(false);
  const [searchProdiQuery, setSearchProdiQuery] = useState("");
  const [debouncedSearchProdiQuery] = useDebounce<string>(
    searchProdiQuery,
    500,
  );
  const [prodiOptions, setProdiOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Search periode options
  const [isLoadingPeriodeOptions, setIsLoadingPeriodeOptions] = useState(false);
  const [searchPeriodeQuery, setSearchPeriodeQuery] = useState("");
  const [debouncedSearchPeriodeQuery] = useDebounce<string>(
    searchPeriodeQuery,
    500,
  );
  const [periodeOptions, setPeriodeOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Search gelombang options
  const [isLoadingGelombangOptions, setIsLoadingGelombangOptions] =
    useState(false);
  const [searchGelombangQuery, setSearchGelombangQuery] = useState("");
  const [debouncedSearchGelombangQuery] = useDebounce<string>(
    searchGelombangQuery,
    500,
  );
  const [gelombangOptions, setGelombangOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Get data tagihan LOA
  const { data, isLoading, refetch } = useTagihanCalonMahasiswaData(
    session?.user?.accessToken,
    status,
    filter,
  );
  // Mutation create  LOA, edit  LOA, delete  LOA
  const { mutate: createTagihanLOAS2Mutation } = useCreateTagihanLOAS2(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan tagihan LOA Magister",
      });
      setIsAddingTagihanLOA(false);
      refetch();
    },
    (msg) => {
      setIsAddingTagihanLOA(false);
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: msg,
      });
    },
  );

  const { mutate: updateTagihanLOAS2Mutation } = useEditTagihanLOAS2(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit tagihan LOA Magister",
      });
      refetch();
      setFormData({
        id_tagihan: "",
        detail_gelombang: 0,
        program_studi: 0,
        jalur_daftar: "",
        biaya_semester_1: 0,
        biaya_semester_2: 0,
        biaya_semester_3: 0,
        biaya_matrikulasi: 0,
      });
      setIsEditingTagihanLOA(false);
      setIsAddingTagihanLOA(false);
    },
    (msg) => {
      setIsAddingTagihanLOA(false);
      setIsEditingTagihanLOA(false);
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: msg,
      });
    },
  );

  const { mutate: importTagihanLOAMutation } = useImportTagihanLOAS2(
    () => {
      setIsImporting(false);
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengimpor tagihan LOA Magister dari file Excel",
      });
      refetch();
    },
    (msg) => {
      setIsImporting(false);
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: msg,
      });
    },
  );
  const { mutate: deleteTagihanLOAMutation } = useDeleteTagihanLOAS2(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus tagihan LOA Magister",
      });
      refetch();
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

  // Submit form tambah dan edit pekerjaan
  const handleSubmit = async (data: any) => {
    if (!isEditingTagihanLOA) {
      setIsAddingTagihanLOA(true);
      createTagihanLOAS2Mutation({
        token: session.user?.accessToken,
        tagihanLOAS2: {
          detail_gelombang: Number(data.detail_gelombang),
          program_studi: Number(data.program_studi),
          jalur_daftar: data.jalur_daftar,
          biaya_semester_1: Number(data.biaya_semester_1),
          biaya_semester_2: Number(data.biaya_semester_2),
          biaya_semester_3: Number(data.biaya_semester_3),
          biaya_matrikulasi: Number(data.biaya_matrikulasi),
        },
      });
    } else {
      setIsAddingTagihanLOA(true);
      updateTagihanLOAS2Mutation({
        token: session.user?.accessToken,
        tagihanLOAS2: {
          id_tagihan: String(formData.id_tagihan),
          biaya_semester_1: Number(data.biaya_semester_1),
          biaya_semester_2: Number(data.biaya_semester_2),
          biaya_semester_3: Number(data.biaya_semester_3),
          biaya_matrikulasi: Number(data.biaya_matrikulasi),
        },
      });
    }
  };

  // Open editing state
  const handleEdit = (data: TagihanLOAMagisterType) => {
    setIsEditingTagihanLOA(true);
    setFormData({
      id_tagihan: data.id_tagihan,
      detail_gelombang: Number(data.detail_gelombang),
      program_studi: Number(data.program_studi),
      jalur_daftar: data.jalur_daftar,
      biaya_semester_1: Number(data.biaya_semester_1),
      biaya_semester_2: Number(data.biaya_semester_2),
      biaya_semester_3: Number(data.biaya_semester_3),
      biaya_matrikulasi: Number(data.biaya_matrikulasi),
    });
  };
  // Handle delete
  const handleDelete = (data: TagihanLOAMagisterType) => {
    showConfirmation({
      title: "Hapus Tagihan LOA?",
      message:
        "Tagihan LOA ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteTagihanLOAMutation({
          token: session.user?.accessToken,
          tagihanLOAId: data.id_tagihan,
        });
      },
    });
  };

  // Handle reset filter
  const handleResetFilter = () => {
    setFilter({
      selJenjang: "S2",
      selPeriode: "",
      selGelombang: "",
      selProdi: "",
      selPeringkat: "",
      selWaktuKuliah: "",
      selJalurDaftar: "",
    });
    setSearchTerm("");
  };

  const handleImportExcel = (file: File, periode: string) => {
    showConfirmation({
      title: "Mulai Impor Tagihan LOA?",
      message:
        "Tagihan LOA dari file Excel akan diimpor ke dalam sistem. Jangan menutup atau memuat ulang halaman ini sampai proses selesai. Lanjutkan proses impor?",
      icon: "bx bx-import text-4xl",
      confirmButtonText: "Impor",
      confirmButtonColor: "bg-green-600",
      onConfirm() {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("selected_periode", periode);
        setIsImporting(true);
        importTagihanLOAMutation({
          token: session?.user?.accessToken,
          tagihanLOA: formData,
        });
      },
      showCancelButton: true,
      cancelButtonText: "Batal",
      onCancel() {
        setIsImporting(false);
      },
    });
  };

  // Refetch data when filter kategori
  useEffect(() => {
    refetch();
  }, [
    filter.selJenjang,
    filter.selPeriode,
    filter.selGelombang,
    filter.selProdi,
    filter.selPeringkat,
    filter.selWaktuKuliah,
  ]);

  // Filter program studi options berdasarkan search query
  useEffect(() => {
    if (!data) return;

    setIsLoadingProdiOptions(true);
    const search = debouncedSearchProdiQuery.toLowerCase();

    const filtered = (data.all_prodi || []).filter((per: ProgramStudiType) =>
      per.ProdiNama.toLowerCase().includes(search),
    );

    setProdiOptions(
      filtered.map((per: ProgramStudiType) => ({
        value: per.ProdiId,
        label: per.ProdiNama,
      })),
    );
    setIsLoadingProdiOptions(false);
  }, [data, debouncedSearchProdiQuery]);

  // Filter periode options berdasarkan search query
  useEffect(() => {
    if (!data) return;

    setIsLoadingPeriodeOptions(true);
    const search = debouncedSearchPeriodeQuery.toLowerCase();

    const filtered = (data.all_periode || []).filter(
      (per: PeriodeType) =>
        String(per.tahun_periode).toLowerCase().includes(search) ||
        String(per.periode_jenis).toLowerCase().includes(search),
    );

    setPeriodeOptions(
      filtered.map((per: PeriodeType) => ({
        value: per.periode_id,
        label: `${per.tahun_periode} - ${ucFirst(per.periode_jenis)}`,
      })),
    );
    setIsLoadingPeriodeOptions(false);
  }, [data, debouncedSearchPeriodeQuery]);

  // Filter gelombang options berdasarkan search query
  useEffect(() => {
    if (!data) return;

    setIsLoadingGelombangOptions(true);
    const search = debouncedSearchGelombangQuery.toLowerCase();

    const filtered = (data.all_detail_gelombang || []).filter(
      (per: DetailGelombangType) =>
        String(per.NamaGelombang).toLowerCase().includes(search),
    );

    setGelombangOptions(
      filtered.map((per: DetailGelombangType) => ({
        value: per.detail_gelombang_id,
        label: `${per.NamaGelombang}`,
      })),
    );
    setIsLoadingGelombangOptions(false);
  }, [data, debouncedSearchGelombangQuery]);

  // Save filter to localStorage untuk persistensi data filter
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("appliedFilterTagihanLOAS2");
    const search = localStorage.getItem("appliedSearchTagihanLOAS2");
    if (saved) {
      setFilter(JSON.parse(saved));
      setSearchTerm(search || "");
    }
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(
      "appliedFilterTagihanLOAS2",
      JSON.stringify({
        selJenjang: String(filter.selJenjang),
        selPeriode: String(filter.selPeriode),
        selGelombang: String(filter.selGelombang),
        selProdi: String(filter.selProdi),
        selPeringkat: String(filter.selPeringkat),
        selWaktuKuliah: String(filter.selWaktuKuliah),
        selJalurDaftar: String(filter.selJalurDaftar),
      }),
    );
    localStorage.setItem("appliedSearchTagihanLOAS2", searchTerm);
  }, [filter, searchTerm, isLoaded]);

  // Filter data calon mahasiswa berdasarkan filter change
  useEffect(() => {
    if (!data) return;

    const filtered = (data.all_tagihan || []).filter(
      (tagihan: TagihanLOAMagisterType) => {
        const matchGelombang =
          !filter.selGelombang ||
          String(tagihan.detail_gelombang) === String(filter.selGelombang);

        const matchProdi =
          !filter.selProdi ||
          String(tagihan.program_studi) === String(filter.selProdi);

        const matchJalurDaftar =
          !filter.selJalurDaftar ||
          filter.selJalurDaftar === "all" ||
          String(tagihan.jalur_daftar) === String(filter.selJalurDaftar);

        return matchGelombang && matchProdi && matchJalurDaftar;
      },
    );

    setTagihanData(filtered);
  }, [data, filter]);

  // Detect darimana user datang
  const searchParams = useSearchParams();
  const asalUrl = searchParams.get("from");
  const backUrl = asalUrl ? asalUrl : "/dashboard";

  return (
    <div className="px-8 py-4">
      {isImporting && (
        <LoadingBox
          open={isImporting}
          icon="bx bx-import text-4xl"
          title="Mengimpor Tagihan LOA Magister"
          message="Mohon tunggu, Tagihan LOA Magister sedang diimpor. Jangan menutup atau memuat ulang halaman ini"
        />
      )}
      <h1 className="w-full text-4xl font-bold text-black">
        Tagihan LOA Magister
      </h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm text-black">
        <ul>
          <li>
            <Link
              href={backUrl}
              className="btn bg-black btn-xs rounded-lg text-white font-normal no-underline"
            >
              <span className="bx bx-arrow-back"></span> Kembali
            </Link>
          </li>
          <li className="text-xs">
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="text-xs">
            <Link href={pathname}>Tagihan LOA Magister</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen tagihan LOA jenjang Magister pada sistem.
        </span>
        <hr className="my-4" />
      </div>

      {/* Filter & Search Section */}
      <div className="bg-white rounded-xl shadow p-5 space-y-4 my-4">
        <div className="flex flex-row items-center justify-between">
          <div className="w-max">
            <span className="font-semibold">Filter dan pencarian</span>
            <hr />
            <span className="text-xs text-gray-500">
              Gunakan fitur pencarian untuk mencari tagihan LOA Magister.
            </span>
          </div>
          <div className="flex flex-row items-center gap-4">
            {/* Reset filter button */}
            {filter.selPeriode !== "" ? (
              <>
                <button
                  onClick={handleResetFilter}
                  className="btn btn-xs btn-ghost bg-red-600 text-white hover:bg-red-700 rounded-lg"
                >
                  <X className="w-3 h-3" /> Bersihkan filter
                </button>
              </>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            {/* Filter periode */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Periode <small className="text-xs text-red-500">*</small>
              </label>
              <SelectSearch
                data={periodeOptions || []}
                fieldName="Periode"
                placeholder="Pilih periode..."
                defaultEmptyValue={{
                  value: "",
                  label: "Pilih periode...",
                }}
                value={filter.selPeriode || ""}
                setValue={(data) =>
                  setFilter((prev) => ({
                    ...prev,
                    selPeriode: data,
                  }))
                }
                isLoading={isLoadingPeriodeOptions}
                searchQuery={searchPeriodeQuery}
                setSearchQuery={setSearchPeriodeQuery}
              />
            </div>

            {/* Filter gelombang */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Gelombang <small className="text-xs text-red-500">*</small>
              </label>
              <SelectSearch
                data={gelombangOptions || []}
                fieldName="Gelombang"
                placeholder="Pilih gelombang..."
                defaultEmptyValue={{
                  value: "",
                  label: "Pilih gelombang...",
                }}
                value={filter.selGelombang || ""}
                setValue={(data) =>
                  setFilter((prev) => ({
                    ...prev,
                    selGelombang: data,
                  }))
                }
                isLoading={isLoadingGelombangOptions}
                searchQuery={searchGelombangQuery}
                setSearchQuery={setSearchGelombangQuery}
              />
            </div>

            {/* Filter program studi */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Program Studi <small className="text-xs text-red-500">*</small>
              </label>
              <SelectSearch
                data={prodiOptions || []}
                fieldName="Program Studi"
                placeholder="Pilih program studi..."
                defaultEmptyValue={{
                  value: "",
                  label: "Pilih program studi...",
                }}
                value={filter.selProdi || ""}
                setValue={(data) =>
                  setFilter((prev) => ({
                    ...prev,
                    selProdi: data,
                  }))
                }
                isLoading={isLoadingProdiOptions}
                searchQuery={searchProdiQuery}
                setSearchQuery={setSearchProdiQuery}
              />
            </div>

            {/* Filter jalur daftar */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Jalur Daftar <small className="text-xs text-red-500">*</small>
              </label>
              <select
                id="jalurDaftar"
                name="jalurDaftar"
                className="select select-sm select-bordered bg-white text-black border border-gray-300 rounded-md w-full mt-1"
                required
                value={filter.selJalurDaftar || ""}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    selJalurDaftar: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Pilih jalur daftar
                </option>
                <option value="all">Semua jalur daftar</option>
                <option value="Reguler">Reguler</option>
                <option value="Fast Track">Fast Track</option>
                <option value="Alumni">Alumni</option>
                <option value="Khusus">Khusus</option>
              </select>
            </div>

            {/* Search */}
            <div className="col-span-4">
              <label className="text-sm font-medium text-gray-700">
                Cari Tagihan LOA
              </label>
              <input
                type="text"
                placeholder="Cari tagihan LOA berdasarkan program studi, gelombang, periode dan jalur daftar..."
                className="input w-full bg-white mb-4 input-md shadow "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Table tagihan loa and form tagihan loa */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table tagihan loa */}
        <div className="col-span-2">
          <DataTable
            columns={columns}
            data={tagihanData || []}
            searchQuery={searchTerm}
            isLoading={isLoading}
            refetch={refetch}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>

        {/* Form tagihan loa */}
        <div className="col-span-1">
          <TagihanLOAMagisterSidePanel
            dataPeriode={data?.all_periode || []}
            dataDetailGelombang={data?.all_detail_gelombang || []}
            dataProdi={data?.all_prodi || []}
            isAddingTagihanLOA={isAddingTagihanLOA}
            isEditingTagihanLOA={isEditingTagihanLOA}
            editingSoalData={formData}
            onAddTagihanLOA={handleSubmit}
            onUpdateTagihanLOA={handleSubmit}
            onCancelEdit={() => setIsEditingTagihanLOA(false)}
            isImporting={isImporting}
            onImportExcel={handleImportExcel}
            selPeriode={filter.selPeriode}
          />
        </div>
      </div>
    </div>
  );
}
