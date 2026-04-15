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
import { useCalonMahasiswaData } from "@/hooks/calon-mahasiswa/useCalonMahasiswaData";
import { PeriodeType } from "@/types/PeriodeTypes";
import { ucFirst } from "@/utils/UcFirst";
import { JenisGelombangType } from "@/types/JenisGelombangTypes";
import {
  CalonMahasiswaRPLType,
  CalonMahasiswaType,
} from "@/types/CalonMahasiswaTypes";
import { useSaveValidasiKeuangan } from "@/hooks/calon-mahasiswa/useSaveValidasiKeuangan";
import { X } from "lucide-react";
import { LokasiUjianType } from "@/types/LokasiUjianTypes";
import { useCalonMahasiswaRPLData } from "@/hooks/calon-mahasiswa/useCalonMahasiswaRPLData";
import { ProgramStudiType } from "@/types/ProgramStudiTypes";

export default function ValidasiDokumenView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();
  const [dataCalonMahasiswa, setDataCalonMahasiswa] = useState<
    CalonMahasiswaRPLType[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    periodeId: "",
    prodiId: "",
    jenjang: "S1",
    keteranganDokumen: "",
  });

  // Search periode options
  const [isLoadingPeriodeOptions, setIsLoadingPeriodeOptions] = useState(false);
  const [searchPeriodeQuery, setSearchPeriodeQuery] = useState("");
  const [debouncedSearchPeriodeQuery] = useDebounce(searchPeriodeQuery, 500);
  const [periodeOptions, setPeriodeOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Search prodi options
  const [isLoadingProdiOptions, setIsLoadingProdiOptions] = useState(false);
  const [searchProdiQuery, setSearchProdiQuery] = useState("");
  const [debouncedSearchProdiQuery] = useDebounce(searchProdiQuery, 500);
  const [prodiOptions, setProdiOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Get data calon mahasiswa
  const { data, isLoading, refetch } = useCalonMahasiswaRPLData(
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

  // Filter prodi
  useEffect(() => {
    if (!data) return;

    setIsLoadingProdiOptions(true);
    const search = debouncedSearchProdiQuery.toLowerCase();

    const filtered = (data.prodi_ref || []).filter((per: ProgramStudiType) =>
      per.ProdiNama.toLowerCase().includes(search),
    );

    setProdiOptions(
      filtered.map((per: ProgramStudiType) => ({
        value: per.ProdiId,
        label: `${per.ProdiNama}`,
      })),
    );
    setIsLoadingProdiOptions(false);
  }, [data, debouncedSearchProdiQuery]);

  // Filter data calon mahasiswa berdasarkan status dokumen
  useEffect(() => {
    if (!data) return;

    if (filter.keteranganDokumen === "" || filter.keteranganDokumen === "all") {
      setDataCalonMahasiswa(data.all_camhs || []);
    } else {
      const filteredData = (data.all_camhs || []).filter(
        (camhs: CalonMahasiswaRPLType) => {
          const status = camhs.StatusDokumenCamhs;

          if (filter.keteranganDokumen === "setuju") {
            return status === "y";
          }

          if (filter.keteranganDokumen === "menunggu") {
            return status === "w";
          }

          if (filter.keteranganDokumen === "menunggu_kep_humas") {
            return status === "kep_humas";
          }

          if (filter.keteranganDokumen === "tolak") {
            return status === "n";
          }

          return false; // default fallback
        },
      );
      setDataCalonMahasiswa(filteredData);
    }
  }, [data, filter.keteranganDokumen]);

  // Refetch data when filter gelombang or jenjang changes
  useEffect(() => {
    const bothFilled = filter.periodeId !== "" && filter.jenjang !== "";

    if (!bothFilled) return;

    refetch();
  }, [filter.jenjang]);

  // Save filter to localStorage untuk persistensi data filter
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("appliedFilter");
    const search = localStorage.getItem("appliedSearch");
    if (saved) {
      setFilter(JSON.parse(saved));
      setSearchTerm(search || "");
    }
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(
      "appliedFilter",
      JSON.stringify({
        periodeId: String(filter.periodeId),
        prodiId: String(filter.prodiId),
        jenjang: filter.jenjang,
        keteranganDokumen: filter.keteranganDokumen,
      }),
    );
    localStorage.setItem("appliedSearch", searchTerm);
  }, [filter, searchTerm, isLoaded]);

  // Handle reset filter
  const handleResetFilter = () => {
    setFilter({
      periodeId: "",
      prodiId: "",
      jenjang: "S1",
      keteranganDokumen: "",
    });
    setSearchTerm("");
  };

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">
        Validasi Dokumen Calon Mahasiswa RPL
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
            <Link href={pathname}>Validasi Dokumen Calon Mahasiswa RPL</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen validasi dokumen pendaftaran calon mahasiswa RPL
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
              berdasarkan nama, nomor pendaftaran, periode, gelombang, jenjang,
              dan status dokumen.
            </span>
          </div>
          {/* Reset filter button */}
          {filter.periodeId !== "" || filter.prodiId !== "" ? (
            <button
              onClick={handleResetFilter}
              className="btn btn-xs btn-ghost bg-red-600 text-white hover:bg-red-700 rounded-lg"
            >
              <X className="w-3 h-3" /> Bersihkan filter
            </button>
          ) : null}
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

            {/* Filter Program Studi */}
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
                value={filter.prodiId || ""}
                setValue={(data) =>
                  setFilter((prev) => ({
                    ...prev,
                    prodiId: data,
                  }))
                }
                isLoading={isLoadingProdiOptions}
                searchQuery={searchProdiQuery}
                setSearchQuery={setSearchProdiQuery}
              />
            </div>

            {/* Filter jenjang */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Jenjang <small className="text-xs text-red-500">*</small>
              </label>
              <select
                id="jenjang"
                name="jenjang"
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
                  Pilih jenjang
                </option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
              </select>
            </div>

            {/* Filter status */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Status Dokumen <small className="text-xs text-red-500">*</small>
              </label>
              <select
                id="statusDokumen"
                name="statusDokumen"
                className="select select-sm select-bordered bg-white text-black border border-gray-300 rounded-md w-full mt-1"
                required
                value={filter.keteranganDokumen || ""}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    keteranganDokumen: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Pilih status dokumen
                </option>
                <option value="all">Semua Status</option>
                <option value="setuju">Disetujui</option>
                <option value="menunggu">Menunggu Verifikasi</option>
                <option value="menunggu_kep_humas">
                  Menunggu Verifikasi Kepala Humas
                </option>
                <option value="tolak">Ditolak</option>
              </select>
            </div>

            {/* Search */}
            <div className="col-span-4">
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
          </div>
        </div>
      </div>

      {/* Main Content - Table lokasi ujian dan form lokasi ujian */}
      <div className="w-full">
        {/* Table lokasi ujian */}
        <DataTable
          columns={columns}
          data={dataCalonMahasiswa || []}
          searchQuery={searchTerm}
          isLoading={isLoading}
          refetch={refetch}
        />
      </div>
    </div>
  );
}
