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
import { useImportSoalUSM } from "@/hooks/soal-usm/useImportSoalUSM";
import LoadingBox from "@/components/LoadingBox";
import { useTagihanCalonMahasiswaData } from "@/hooks/tagihan-calon-mahasiswa/useTagihanCalonMahasiswaData";
import { ProgramStudiType } from "@/types/ProgramStudiTypes";
import { PeriodeType } from "@/types/PeriodeTypes";
import { ucFirst } from "@/utils/UcFirst";
import { PeringkatType } from "@/types/PeringkatTypes";
import { DetailGelombangType } from "@/types/DetailGelombangTypes";
import { TagihanLOASarjanaType } from "@/types/TagihanLOATypes";
import { useDeleteTagihanLOAS1 } from "@/hooks/tagihan-calon-mahasiswa/useDeleteTagihanLOAS1";
import { useCreateTagihanLOAS1 } from "@/hooks/tagihan-calon-mahasiswa/useCreateTagihanLOAS1";
import { useEditTagihanLOAS1 } from "@/hooks/tagihan-calon-mahasiswa/useEditTagihanLOAS1";
import TagihanLOASarjanaSidePanel from "@/components/TagihanLOASarjanaSidePanel";
import { useImportTagihanLOAS1 } from "@/hooks/tagihan-calon-mahasiswa/useImportTagihanLOAS1";

export default function TagihanLOAView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [tagihanData, setTagihanData] = useState<TagihanLOASarjanaType[]>([]);
  const [isAddingTagihanLOA, setIsAddingTagihanLOA] = useState(false);
  const [isEditingTagihanLOA, setIsEditingTagihanLOA] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    selJenjang: "S1",
    selPeriode: "",
    selGelombang: "",
    selProdi: "",
    selPeringkat: "",
    selWaktuKuliah: "",
  });
  const [formData, setFormData] = useState<Partial<TagihanLOASarjanaType>>({
    id_tagihan: "",
    detail_gelombang: 0,
    id_peringkat: 0,
    program_studi: 0,
    waktu_kuliah: "",
    biaya_spp: 0,
    biaya_ppl: 0,
    biaya_bpp: 0,
    biaya_sks: 0,
    biaya_toeic: 0,
    biaya_praktikum: 0,
    potongan_spp: 0,
    potongan_bpp: 0,
    potongan_sks: 0,
    potongan_praktikum: 0,
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

  // Search peringkat options
  const [isLoadingPeringkatOptions, setIsLoadingPeringkatOptions] =
    useState(false);
  const [searchPeringkatQuery, setSearchPeringkatQuery] = useState("");
  const [debouncedSearchPeringkatQuery] = useDebounce<string>(
    searchPeringkatQuery,
    500,
  );
  const [peringkatOptions, setPeringkatOptions] = useState<
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
  const { mutate: createTagihanLOAS1Mutation } = useCreateTagihanLOAS1(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan tagihan LOA Sarjana",
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

  const { mutate: updateTagihanLOAS1Mutation } = useEditTagihanLOAS1(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit tagihan LOA Sarjana",
      });
      refetch();
      setFormData({
        id_tagihan: "",
        detail_gelombang: 0,
        id_peringkat: 0,
        program_studi: 0,
        waktu_kuliah: "",
        biaya_spp: 0,
        biaya_ppl: 0,
        biaya_bpp: 0,
        biaya_sks: 0,
        biaya_toeic: 0,
        biaya_praktikum: 0,
        potongan_spp: 0,
        potongan_bpp: 0,
        potongan_sks: 0,
        potongan_praktikum: 0,
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

  const { mutate: importTagihanLOAMutation } = useImportTagihanLOAS1(
    () => {
      setIsImporting(false);
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengimpor tagihan LOA Sarjana dari file Excel",
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
  const { mutate: deleteTagihanLOAMutation } = useDeleteTagihanLOAS1(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus tagihan LOA",
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
      createTagihanLOAS1Mutation({
        token: session.user?.accessToken,
        tagihanLOAS1: {
          detail_gelombang: Number(data.detail_gelombang),
          id_peringkat: Number(data.id_peringkat),
          program_studi: Number(data.program_studi),
          waktu_kuliah: data.waktu_kuliah,
          biaya_spp: Number(data.biaya_spp),
          biaya_ppl: Number(data.biaya_ppl),
          biaya_bpp: Number(data.biaya_bpp),
          biaya_sks: Number(data.biaya_sks),
          biaya_toeic: Number(data.biaya_toeic),
          biaya_praktikum: Number(data.biaya_praktikum),
          potongan_spp: Number(data.potongan_spp),
          potongan_bpp: Number(data.potongan_bpp),
          potongan_sks: Number(data.potongan_sks),
          potongan_praktikum: Number(data.potongan_praktikum),
        },
      });
    } else {
      setIsAddingTagihanLOA(true);
      updateTagihanLOAS1Mutation({
        token: session.user?.accessToken,
        tagihanLOAS1: {
          id_tagihan: String(formData.id_tagihan), // Ensure we use the ID from state if not passed in data
          detail_gelombang: Number(data.detail_gelombang),
          id_peringkat: Number(data.id_peringkat),
          program_studi: Number(data.program_studi),
          waktu_kuliah: data.waktu_kuliah,
          biaya_spp: Number(data.biaya_spp),
          biaya_ppl: Number(data.biaya_ppl),
          biaya_bpp: Number(data.biaya_bpp),
          biaya_sks: Number(data.biaya_sks),
          biaya_toeic: Number(data.biaya_toeic),
          biaya_praktikum: Number(data.biaya_praktikum),
          potongan_spp: Number(data.potongan_spp),
          potongan_bpp: Number(data.potongan_bpp),
          potongan_sks: Number(data.potongan_sks),
          potongan_praktikum: Number(data.potongan_praktikum),
        },
      });
    }
  };

  // Open editing state
  const handleEdit = (data: TagihanLOASarjanaType) => {
    setIsEditingTagihanLOA(true);
    setFormData({
      id_tagihan: data.id_tagihan,
      detail_gelombang: Number(data.detail_gelombang),
      id_peringkat: Number(data.id_peringkat),
      program_studi: Number(data.program_studi),
      waktu_kuliah: data.waktu_kuliah,
      biaya_spp: data.biaya_spp,
      biaya_ppl: data.biaya_ppl,
      biaya_bpp: data.biaya_bpp,
      biaya_sks: data.biaya_sks,
      biaya_toeic: data.biaya_toeic,
      biaya_praktikum: data.biaya_praktikum,
      potongan_spp: data.potongan_spp,
      potongan_bpp: data.potongan_bpp,
      potongan_sks: data.potongan_sks,
      potongan_praktikum: data.potongan_praktikum,
    });
  };
  // Handle delete
  const handleDelete = (data: TagihanLOASarjanaType) => {
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
      selJenjang: "S1",
      selPeriode: "",
      selGelombang: "",
      selProdi: "",
      selPeringkat: "",
      selWaktuKuliah: "",
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

  // Filter peringkat options berdasarkan search query
  useEffect(() => {
    if (!data) return;

    setIsLoadingPeringkatOptions(true);
    const search = debouncedSearchPeringkatQuery.toLowerCase();

    const filtered = (data.all_peringkat || []).filter((per: PeringkatType) =>
      String(per.nama_peringkat).toLowerCase().includes(search),
    );

    setPeringkatOptions(
      filtered.map((per: PeringkatType) => ({
        value: per.id_peringkat,
        label: `${per.nama_peringkat}`,
      })),
    );
    setIsLoadingPeringkatOptions(false);
  }, [data, debouncedSearchPeringkatQuery]);

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
    const saved = localStorage.getItem("appliedFilterTagihanLOAS1");
    const search = localStorage.getItem("appliedSearchTagihanLOAS1");
    if (saved) {
      setFilter(JSON.parse(saved));
      setSearchTerm(search || "");
    }
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(
      "appliedFilterTagihanLOAS1",
      JSON.stringify({
        selJenjang: String(filter.selJenjang),
        selPeriode: String(filter.selPeriode),
        selGelombang: String(filter.selGelombang),
        selProdi: String(filter.selProdi),
        selPeringkat: String(filter.selPeringkat),
        selWaktuKuliah: String(filter.selWaktuKuliah),
      }),
    );
    localStorage.setItem("appliedSearchTagihanLOAS1", searchTerm);
  }, [filter, searchTerm, isLoaded]);

  // Filter data calon mahasiswa berdasarkan filter change
  useEffect(() => {
    if (!data) return;

    const filtered = (data.all_tagihan || []).filter(
      (tagihan: TagihanLOASarjanaType) => {
        const matchGelombang =
          !filter.selGelombang ||
          String(tagihan.detail_gelombang) === String(filter.selGelombang);

        const matchProdi =
          !filter.selProdi ||
          String(tagihan.program_studi) === String(filter.selProdi);

        const matchPeringkat =
          !filter.selPeringkat ||
          String(tagihan.id_peringkat) === String(filter.selPeringkat);

        return matchGelombang && matchProdi && matchPeringkat;
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
          title="Mengimpor Tagihan LOA"
          message="Mohon tunggu, Tagihan LOA sedang diimpor. Jangan menutup atau memuat ulang halaman ini"
        />
      )}
      <h1 className="w-full text-4xl font-bold text-black">Tagihan LOA</h1>

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
            <Link href={pathname}>Tagihan LOA</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen tagihan LOA jenjang Sarjana pada sistem.
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
              Gunakan fitur pencarian untuk mencari tagihan LOA.
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

            {/* Filter peringkat */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Peringkat <small className="text-xs text-red-500">*</small>
              </label>
              <SelectSearch
                data={peringkatOptions || []}
                fieldName="Peringkat"
                placeholder="Pilih peringkat..."
                defaultEmptyValue={{
                  value: "",
                  label: "Pilih peringkat...",
                }}
                value={filter.selPeringkat || ""}
                setValue={(data) =>
                  setFilter((prev) => ({
                    ...prev,
                    selPeringkat: data,
                  }))
                }
                isLoading={isLoadingPeringkatOptions}
                searchQuery={searchPeringkatQuery}
                setSearchQuery={setSearchPeringkatQuery}
              />
            </div>

            {/* Search */}
            <div className="col-span-4">
              <label className="text-sm font-medium text-gray-700">
                Cari Tagihan LOA
              </label>
              <input
                type="text"
                placeholder="Cari tagihan LOA berdasarkan prodi, gelombang, periode dan peringkat..."
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
          <TagihanLOASarjanaSidePanel
            dataPeriode={data?.all_periode || []}
            dataDetailGelombang={data?.all_detail_gelombang || []}
            dataPeringkat={data?.all_peringkat || []}
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
