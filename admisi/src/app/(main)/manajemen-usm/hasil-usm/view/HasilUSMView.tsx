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
import { PeriodeType } from "@/types/PeriodeTypes";
import { ucFirst } from "@/utils/UcFirst";
import { JenisGelombangType } from "@/types/JenisGelombangTypes";
import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import { X } from "lucide-react";
import { LokasiUjianType } from "@/types/LokasiUjianTypes";
import { DetailGelombangType } from "@/types/DetailGelombangTypes";
import { useEditPerubahanGelombang } from "@/hooks/calon-mahasiswa/useEditPerubahanGelombang";
import { useHasilUSMData } from "@/hooks/hasil-usm/useHasilUSMData";
import { HasilUjianSaringanMasukType } from "@/types/HasilUSMTypes";

export default function HasilUSMView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    gelombangId: "",
    periodeId: "",
    lokasiUjian: "",
    jenjang: "",
    statusWawancara: "",
  });
  const [dataCalonMahasiswa, setDataCalonMahasiswa] = useState<
    HasilUjianSaringanMasukType[]
  >([]);

  // Search periode options
  const [isLoadingPeriodeOptions, setIsLoadingPeriodeOptions] = useState(false);
  const [searchPeriodeQuery, setSearchPeriodeQuery] = useState("");
  const [debouncedSearchPeriodeQuery] = useDebounce(searchPeriodeQuery, 500);
  const [periodeOptions, setPeriodeOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Search gelombang options
  const [isLoadingGelombangOptions, setIsLoadingGelombangOptions] =
    useState(false);
  const [searchGelombangQuery, setSearchGelombangQuery] = useState("");
  const [debouncedSearchGelombangQuery] = useDebounce(
    searchGelombangQuery,
    500,
  );
  const [gelombangOptions, setGelombangOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Search lokasi ujian options
  const [isLoadingLokasiUjianOptions, setIsLoadingLokasiUjianOptions] =
    useState(false);
  const [searchLokasiUjianQuery, setSearchLokasiUjianQuery] = useState("");
  const [debouncedSearchLokasiUjianQuery] = useDebounce(
    searchLokasiUjianQuery,
    500,
  );
  const [lokasiUjianOptions, setLokasiUjianOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Get data calon mahasiswa
  const { data, isLoading, refetch } = useHasilUSMData(
    session.user?.accessToken,
    status,
    filter,
  );

  // Filter periode
  useEffect(() => {
    if (!data) return;

    setIsLoadingPeriodeOptions(true);
    const search = debouncedSearchPeriodeQuery.toLowerCase();

    const filtered = (data.periode_ref || []).filter(
      (per: PeriodeType) =>
        per.periode_jenis.toLowerCase().includes(search) ||
        per.tahun_periode.toString().includes(search),
    );

    setPeriodeOptions(
      filtered.map((per: PeriodeType) => ({
        value: per.periode_id,
        label: `${per.tahun_periode} - ${ucFirst(per.periode_jenis)}`,
      })),
    );
    setIsLoadingPeriodeOptions(false);
  }, [data, debouncedSearchPeriodeQuery]);

  // Filter jenis gelombang
  useEffect(() => {
    if (!data) return;

    setIsLoadingGelombangOptions(true);
    const search = debouncedSearchGelombangQuery.toLowerCase();

    const filtered = (data.gelombang_ref || []).filter(
      (jen: JenisGelombangType) =>
        jen.nama_gelombang.toLowerCase().includes(search),
    );

    setGelombangOptions(
      filtered
        .map((jen: JenisGelombangType) => ({
          value: jen.gelombang_id,
          label: jen.nama_gelombang,
        }))
        .sort((a: any, b: any) => (a.value > b.value ? 1 : -1)),
    );
    setIsLoadingGelombangOptions(false);
  }, [data, debouncedSearchGelombangQuery]);

  // Filter lokasi ujian
  useEffect(() => {
    if (!data) return;

    setIsLoadingLokasiUjianOptions(true);
    const search = debouncedSearchLokasiUjianQuery.toLowerCase();

    const filtered = (data.lokasi_ref || []).filter((lok: LokasiUjianType) =>
      lok.lokasi_nama.toLowerCase().includes(search),
    );

    setLokasiUjianOptions(
      filtered
        .map((lok: LokasiUjianType) => ({
          value: lok.lokasi_id,
          label: lok.lokasi_nama,
        }))
        .sort((a: any, b: any) => (a.value > b.value ? 1 : -1)),
    );
    setIsLoadingLokasiUjianOptions(false);
  }, [data, debouncedSearchLokasiUjianQuery]);

  // Refetch data when filter gelombang or jenjang changes
  useEffect(() => {
    const bothFilled = filter.gelombangId !== "" && filter.jenjang !== "";

    if (!bothFilled) return;

    refetch();
  }, [filter.jenjang, filter.gelombangId]);

  // Save filter to localStorage untuk persistensi data filter
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("appliedFilterHasilUSM");
    const search = localStorage.getItem("appliedSearchHasilUSM");
    if (saved) {
      setFilter(JSON.parse(saved));
      setSearchTerm(search || "");
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(
      "appliedFilterHasilUSM",
      JSON.stringify({
        gelombangId: String(filter.gelombangId),
        jenjang: String(filter.jenjang),
        periodeId: String(filter.periodeId),
        lokasiUjian: String(filter.lokasiUjian),
        statusWawancara: String(filter.statusWawancara),
      }),
    );
    localStorage.setItem("appliedSearchHasilUSM", searchTerm);
  }, [filter, searchTerm, isLoaded]);

  // Filter data calon mahasiswa berdasarkan status wawancara
  useEffect(() => {
    if (!data) return;

    if (filter.statusWawancara === "" || filter.statusWawancara === "") {
      setDataCalonMahasiswa(data.all_camhs || []);
    } else {
      const filteredData = (data.all_camhs || []).filter(
        (camhs: HasilUjianSaringanMasukType) => {
          const statusWawancara = camhs.IsWawancara?.trim() || "";

          if (filter.statusWawancara === "Sudah Wawancara") {
            return statusWawancara !== "";
          }

          if (filter.statusWawancara === "Belum Wawancara") {
            return statusWawancara === "" || statusWawancara === "n";
          }

          return false; // default fallback
        },
      );
      setDataCalonMahasiswa(filteredData);
    }
  }, [data, filter.statusWawancara]);

  // Handle reset filter
  const handleResetFilter = () => {
    setFilter({
      gelombangId: "",
      periodeId: "",
      jenjang: "",
      lokasiUjian: "",
      statusWawancara: "",
    });
    setSearchTerm("");
  };

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">
        Hasil Ujian Saringan Masuk
      </h1>

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
            <Link href={pathname}>Hasil Ujian Saringan Masuk</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen hasil ujian saringan masuk calon mahasiswa
        </span>
      </div>

      {/* Filter & Search Section */}
      <div className="bg-white rounded-xl shadow p-5 space-y-4 my-4">
        <div className="flex flex-row items-center justify-between">
          <div className="w-max">
            <span className="font-semibold">Filter dan pencarian</span>
            <hr />
            <span className="text-xs text-gray-500">
              Gunakan fitur pencarian untuk mencari data calon mahasiswa
              berdasarkan nama, nomor pendaftaran, periode, gelombang, jenjang
              dan lokasi ujian.
            </span>
          </div>
          {/* Reset filter button */}
          {filter.gelombangId !== "" ||
          filter.lokasiUjian !== "" ||
          filter.periodeId !== "" ? (
            <button
              onClick={handleResetFilter}
              className="btn btn-xs btn-ghost bg-red-600 text-white hover:bg-red-700 rounded-lg"
            >
              <X className="w-3 h-3" /> Bersihkan filter
            </button>
          ) : null}
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
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
                value={filter.periodeId || ""}
                setValue={(data) =>
                  setFilter((prev) => ({
                    ...prev,
                    periodeId: data,
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
                value={filter.gelombangId || ""}
                setValue={(data) =>
                  setFilter((prev) => ({
                    ...prev,
                    gelombangId: data,
                  }))
                }
                isLoading={isLoadingGelombangOptions}
                searchQuery={searchGelombangQuery}
                setSearchQuery={setSearchGelombangQuery}
              />
            </div>
            {/* Filter lokasi ujian */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Lokasi Ujian <small className="text-xs text-red-500">*</small>
              </label>
              <SelectSearch
                data={lokasiUjianOptions || []}
                fieldName="Lokasi Ujian"
                placeholder="Pilih lokasi ujian..."
                defaultEmptyValue={{
                  value: "",
                  label: "Pilih lokasi ujian...",
                }}
                value={filter.lokasiUjian || ""}
                setValue={(data) =>
                  setFilter((prev) => ({
                    ...prev,
                    lokasiUjian: data,
                  }))
                }
                isLoading={isLoadingLokasiUjianOptions}
                searchQuery={searchLokasiUjianQuery}
                setSearchQuery={setSearchLokasiUjianQuery}
              />
            </div>

            {/* Search */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Cari calon mahasiswa
              </label>
              <input
                type="text"
                placeholder="Ketik nama calon mahasiswa atau nomor pendaftaran..."
                className="input w-full bg-white mb-4 input-md shadow mt-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Filter jenjang */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Jenjang <small className="text-xs text-red-500">*</small>
              </label>
              <select
                id="statusVA"
                name="statusVA"
                className="select select-sm select-bordered bg-white text-black border border-gray-300 rounded-md w-full mt-1"
                required
                value={filter.jenjang || ""}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    jenjang: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Pilih Jenjang
                </option>
                <option value="">Semua Jenjang</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
              </select>
            </div>
            {/* Filter status wawancara */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Status Wawancara{" "}
                <small className="text-xs text-red-500">*</small>
              </label>
              <select
                id="statusWawancara"
                name="statusWawancara"
                className="select select-sm select-bordered bg-white text-black border border-gray-300 rounded-md w-full mt-1"
                required
                value={filter.statusWawancara || ""}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    statusWawancara: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Pilih Status Wawancara
                </option>
                <option value="">Semua Status</option>
                <option value="Sudah Wawancara">Sudah Wawancara</option>
                <option value="Belum Wawancara">Belum Wawancara</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Table virtual account */}
      <div className="w-full">
        {/* Table virtual account calon mahasiswa */}
        <DataTable
          columns={columns}
          data={dataCalonMahasiswa || []}
          searchQuery={searchTerm}
          isLoading={isLoading}
          refetch={refetch}
          selectGelombangData={data?.select_detail_gelombang || []}
        />
      </div>
    </div>
  );
}
