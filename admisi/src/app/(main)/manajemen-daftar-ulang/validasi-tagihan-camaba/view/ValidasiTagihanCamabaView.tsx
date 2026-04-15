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
import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import { useSaveValidasiKeuangan } from "@/hooks/calon-mahasiswa/useSaveValidasiKeuangan";
import { LokasiUjianType } from "@/types/LokasiUjianTypes";
import { X } from "lucide-react";

export default function ValidasiTagihanCamabaView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();
  const [dataCalonMahasiswa, setDataCalonMahasiswa] = useState<
    CalonMahasiswaType[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    gelombangId: "",
    periodeId: "",
    jenjang: "S1",
    statusDaftarUlang: "",
    lokasiUjian: "",
    justDiterima: "y",
  });
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

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
  const { data, isLoading, refetch } = useCalonMahasiswaData(
    session.user?.accessToken,
    status,
    filter,
  );

  const { mutate: validasiKeuanganMutation } = useSaveValidasiKeuangan(
    (data: any) => {
      console.log("onSuccess data:", data);
      const res = data.data;
      const validasi = data.validasi;

      if (validasi.status_validasi === "y") {
        showNotification({
          status: "text-green-500",
          icon: "bx bx-check text-2xl",
          header: "Berhasil",
          message: `Berhasil melakukan validasi keuangan ${res.NamaCamhs}`,
        });

        // Update status di tabel tanpa refetch semua data
        setDataCalonMahasiswa((prevData) =>
          prevData.map((camhs) => {
            if (camhs.NomorDaftar === res.NomorDaftar) {
              return {
                ...camhs,
                StatusKeuangan: "sudah",
              };
            }
            return camhs;
          }),
        );
      } else {
        showNotification({
          status: "text-red-500",
          icon: "bx bx-check text-2xl",
          header: "Berhasil",
          message: `Berhasil menolak data keuangan ${res.NamaCamhs}`,
        });

        // Update status di tabel tanpa refetch semua data
        setDataCalonMahasiswa((prevData) =>
          prevData.map((camhs) => {
            if (camhs.NomorDaftar === res.NomorDaftar) {
              return {
                ...camhs,
                StatusKeuangan: "tolak",
                KeteranganPembayaran: validasi.ket_tolak,
              };
            }
            return camhs;
          }),
        );
      }
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

  const handleTerima = (data: CalonMahasiswaType) => {
    showConfirmation({
      title: "Validasi Data Keuangan?",
      message: `Terima pembayaran dari calon mahasiswa ${data.NamaCamhs}? Data keuangan calon mahasiswa akan diverifikasi dan diubah menjadi LUNAS.`,
      icon: "check-circle",
      confirmButtonText: "Terima",
      confirmButtonColor: "bg-green-600",
      onConfirm() {
        validasiKeuanganMutation({
          token: session.user?.accessToken,
          validasi: {
            sel_camhs: data.NomorDaftar, // Nomor Daftar Calon Mahasiswa
            status_validasi: "y", // Validasi Dari Keuangannya y OR n
            jenjang_camhs: data.JenjangCamhs, // Jenjang Calon Mahasiswanya
          },
          data,
        });
      },
    });
  };

  const handleTolak = (
    nomorDaftar: string,
    alasanTolak: string,
    data: CalonMahasiswaType,
  ) => {
    // console.log("Tolak dipanggil:", nomorDaftar, alasanTolak, data);
    showConfirmation({
      title: "Tolak Data Keuangan?",
      message: `Tolak pembayaran dari calon mahasiswa ${data.NamaCamhs}? Data keuangan calon mahasiswa akan diverifikasi dan diubah menjadi TOLAK.`,
      icon: "x-circle",
      confirmButtonText: "Tolak",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        validasiKeuanganMutation({
          token: session.user?.accessToken,
          validasi: {
            sel_camhs: nomorDaftar, // Nomor Daftar Calon Mahasiswa
            status_validasi: "n", // Validasi Dari Keuangannya y OR n
            jenjang_camhs: data.JenjangCamhs, // Jenjang Calon Mahasiswanya
            ket_tolak: alasanTolak, // Alasan penolakan
          },
          data,
        });
      },
    });
  };

  // Handle reset filter
  const handleResetFilter = () => {
    setFilter({
      gelombangId: "",
      periodeId: "",
      jenjang: "S1",
      statusDaftarUlang: "",
      lokasiUjian: "",
      justDiterima: "y",
    });
    setSearchTerm("");
  };

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

  useEffect(() => {
    if (!data) return;

    if (filter.statusDaftarUlang === "" || filter.statusDaftarUlang === "all") {
      setDataCalonMahasiswa(data.all_camhs || []);
    } else {
      const filteredData = (data.all_camhs || []).filter(
        (camhs: CalonMahasiswaType) => {
          const status = camhs.ApprovalTagihanData.StatusValidasi;

          if (filter.statusDaftarUlang === "terima") {
            return status === "y";
          }

          if (filter.statusDaftarUlang === "menunggu") {
            return status === "w";
          }

          return false; // default fallback
        },
      );
      setDataCalonMahasiswa(filteredData);
    }
  }, [data, filter.statusDaftarUlang]);

  useEffect(() => {
    const bothFilled = filter.gelombangId !== "" && filter.jenjang !== "";

    if (!bothFilled) return;

    refetch();
  }, [filter.jenjang, filter.gelombangId]);

  // Save filter to localStorage untuk persistensi data filter
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("appliedFilterValidasiTagihanCamaba");
    const search = localStorage.getItem("appliedSearchValidasiTagihanCamaba");
    if (saved) {
      setFilter(JSON.parse(saved));
      setSearchTerm(search || "");
    }
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(
      "appliedFilterValidasiTagihanCamaba",
      JSON.stringify({
        gelombangId: String(filter.gelombangId),
        periodeId: String(filter.periodeId),
        jenjang: String(filter.jenjang),
        statusDaftarUlang: String(filter.statusDaftarUlang),
        lokasiUjian: String(filter.lokasiUjian),
        justDiterima: String(filter.justDiterima),
      }),
    );
    localStorage.setItem(
      "appliedSearchValidasiTagihanCamaba",
      debouncedSearchTerm,
    );
  }, [filter, debouncedSearchTerm, isLoaded]);

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">
        Validasi Tagihan Calon Mahasiswa Baru
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
            <Link href={pathname}>Validasi Tagihan Calon Mahasiswa Baru</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen validasi tagihan calon mahasiswa baru
        </span>
      </div>

      {/* Filter & Search Section */}
      <div className="bg-white rounded-xl shadow p-5 space-y-4 my-4">
        <div className="flex flex-row items-center justify-between">
          <div className="w-max">
            <span className="font-semibold">Filter dan pencarian</span>
            <hr />
            <span className="text-xs text-gray-500">
              Gunakan fitur pencarian untuk mencari data pendaftar berdasarkan
              nama, email dan status akun.
            </span>
          </div>
          {/* Reset filter button */}
          {filter.gelombangId !== "" ||
          filter.periodeId !== "" ||
          filter.lokasiUjian !== "" ||
          filter.statusDaftarUlang !== "" ? (
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

            {/* Search */}
            <div className="col-span-2">
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
            {/* Filter status */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Status Validasi Tagihan{" "}
                <small className="text-xs text-red-500">*</small>
              </label>
              <select
                id="statusDaftarUlang"
                name="statusDaftarUlang"
                className="select select-sm select-bordered bg-white text-black border border-gray-300 rounded-md w-full mt-1"
                required
                value={filter.statusDaftarUlang || ""}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    statusDaftarUlang: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Pilih status validasi tagihan
                </option>
                <option value="terima">Diterima</option>
                <option value="menunggu">Menunggu</option>
              </select>
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
          handleTerima={handleTerima}
          handleTolak={handleTolak}
        />
      </div>
    </div>
  );
}
