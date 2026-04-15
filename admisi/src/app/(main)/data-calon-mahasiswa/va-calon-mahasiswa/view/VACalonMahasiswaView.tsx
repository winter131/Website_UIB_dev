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
import { X } from "lucide-react";
import { LokasiUjianType } from "@/types/LokasiUjianTypes";
import { useEditVirtualAccount } from "@/hooks/virtual-account/useEditVirtualAccount";
import VirtualAccountSidebarTools from "@/components/VirtualAccountSidebarTools";
import { useImportVirtualAccount } from "@/hooks/virtual-account/useImportVirtualAccount";
import LoadingBox from "@/components/LoadingBox";
import { useGenerateExcelVirtualAccount } from "@/hooks/virtual-account/useGenerateExcelVirtualAccount";

export default function VACalonMahasiswaView() {
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
    statusVA: "",
    lokasiUjian: "",
  });

  // Search periode options
  const [isLoadingPeriodeOptions, setIsLoadingPeriodeOptions] = useState(false);
  const [isImportingVirtualAccount, setIsImportingVirtualAccount] =
    useState(false);
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

  const [generateExcelParams, setGenerateExcelParams] = useState({
    gelombangId: "",
    periodeId: "",
    jenjang: "",
    tujuanFile: "",
  });

  const {
    data: excelData,
    isLoading: isLoadingExcel,
    refetch: refetchExcel,
  } = useGenerateExcelVirtualAccount(
    session.user?.accessToken,
    generateExcelParams,
  );

  //Update VA Calon mahasiswa
  const { mutate: updateVirtualAccountMutation } = useEditVirtualAccount(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit virtual account calon mahasiswa",
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

  const { mutate: importVirtualAccountMutation } = useImportVirtualAccount(
    () => {
      setIsImportingVirtualAccount(false);
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengimpor soal",
      });
      refetch();
    },
    (msg) => {
      setIsImportingVirtualAccount(false);
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: msg,
      });
    },
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

  // Filter data calon mahasiswa berdasarkan status va
  useEffect(() => {
    if (!data) return;

    if (filter.statusVA === "" || filter.statusVA === "all") {
      setDataCalonMahasiswa(data.all_camhs || []);
    } else {
      const filteredData = (data.all_camhs || []).filter(
        (camhs: CalonMahasiswaType) => {
          const va = camhs.VaCamhs;

          if (filter.statusVA === "sudah") {
            return va !== "";
          }

          if (filter.statusVA === "belum") {
            return va === "";
          }

          return false; // default fallback
        },
      );
      setDataCalonMahasiswa(filteredData);
    }
  }, [data, filter.statusVA]);

  // Refetch data when filter gelombang or jenjang changes
  useEffect(() => {
    const bothFilled = filter.gelombangId !== "" && filter.jenjang !== "";

    if (!bothFilled) return;

    refetch();
  }, [filter.jenjang, filter.gelombangId]);

  // Save filter to localStorage untuk persistensi data filter
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("appliedFilterVACalonMahasiswa");
    const search = localStorage.getItem("appliedSearchVACalonMahasiswa");
    if (saved) {
      setFilter(JSON.parse(saved));
      setSearchTerm(search || "");
    }
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(
      "appliedFilterVACalonMahasiswa",
      JSON.stringify({
        gelombangId: String(filter.gelombangId),
        jenjang: filter.jenjang,
        statusVA: filter.statusVA,
        lokasiUjian: String(filter.lokasiUjian),
        periodeId: String(filter.periodeId),
      }),
    );
    localStorage.setItem("appliedSearchVACalonMahasiswa", searchTerm);
  }, [filter, searchTerm, isLoaded]);

  // Handle reset filter
  const handleResetFilter = () => {
    setFilter({
      gelombangId: "",
      periodeId: "",
      jenjang: "S1",
      statusVA: "",
      lokasiUjian: "",
    });
    setSearchTerm("");
  };

  const handleSubmit = (data: CalonMahasiswaType) => {
    // console.log("handle submit di view", data);
    updateVirtualAccountMutation({
      token: session.user?.accessToken,
      virtualAccount: {
        sel_camhs: data.NomorDaftar, // Nomor Pendaftaran Calon Mahasiswa
        jenjang_camhs: data.JenjangCamhs,
        nomor_va: data.VaCamhs,
      },
    });
  };

  const handleImportExcel = (file: File, jenjang: string) => {
    showConfirmation({
      title: "Mulai Impor Virtual Account?",
      message:
        "Virtual account dari file Excel akan diimpor ke dalam sistem. Jangan menutup atau memuat ulang halaman ini sampai proses selesai. Lanjutkan proses impor?",
      icon: "bx bx-import text-4xl",
      confirmButtonText: "Impor",
      confirmButtonColor: "bg-green-600",
      onConfirm() {
        const formData = new FormData();
        formData.append("jenjang_camhs", jenjang);
        formData.append("file", file);
        setIsImportingVirtualAccount(true);
        importVirtualAccountMutation({
          token: session?.user?.accessToken,
          virtualAccount: formData,
        });
      },
      showCancelButton: true,
      cancelButtonText: "Batal",
      onCancel() {
        setIsImportingVirtualAccount(false);
      },
    });
  };

  const handleGenerateExcelFormat = async () => {
    setGenerateExcelParams({
      gelombangId: "999",
      periodeId: "999",
      jenjang: "S5",
      tujuanFile: "format",
    });
    try {
      const res = await refetchExcel();

      if (!res.isError) {
        showNotification({
          status: "text-green-500",
          icon: "bx bx-check text-2xl",
          header: "Berhasil",
          message: "Berhasil mengunduh format excel virtual account",
        });
        const data = res.data;
        const link = data.generatedFile;

        // Create a temporary anchor element to trigger the download
        const anchor = document.createElement("a");
        anchor.href = link;
        anchor.download = "format_va_camhs.xlsx";
        anchor.click();
        anchor.remove();
      } else {
        showNotification({
          status: "text-red-500",
          icon: "bx bx-error text-2xl",
          header: "Gagal",
          message: "Gagal mengunduh format excel virtual account",
        });
      }
    } catch (error) {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Gagal",
        message: "Gagal mengunduh format excel virtual account",
      });
    }
  };

  const handleExportExcel = async () => {
    showConfirmation({
      title: "Mulai Ekspor Virtual Account?",
      message:
        "Virtual account akan diekspor ke dalam file Excel. Data yang diekspor sesuai dengan filter yang diterapkan (Tidak termasuk search calon mahasiswa dan status virtual account). Jangan menutup atau memuat ulang halaman ini sampai proses selesai. Lanjutkan proses ekspor?",
      icon: "bx bx-export text-4xl",
      confirmButtonText: "Ekspor",
      confirmButtonColor: "bg-green-600",
      onConfirm: async () => {
        setGenerateExcelParams({
          gelombangId: filter.gelombangId,
          periodeId: filter.periodeId,
          jenjang: filter.jenjang,
          tujuanFile: "export",
        });
        try {
          const res = await refetchExcel();

          if (res.data && !res.isError) {
            showNotification({
              status: "text-green-500",
              icon: "bx bx-check text-2xl",
              header: "Berhasil",
              message: "Berhasil expor data virtual account ke excel",
            });
            const data = res.data;
            const link = data.generatedFile;

            // Create a temporary anchor element to trigger the download
            const anchor = document.createElement("a");
            anchor.href = link;
            anchor.download = "format_va_camhs.xlsx";
            anchor.click();
            anchor.remove();
          } else {
            showNotification({
              status: "text-red-500",
              icon: "bx bx-error text-2xl",
              header: "Gagal",
              message:
                "Gagal ekspor data virtual account ke excel, silahkan coba sekali lagi",
            });
          }
        } catch (error) {
          showNotification({
            status: "text-red-500",
            icon: "bx bx-error text-2xl",
            header: "Gagal",
            message:
              "Gagal ekspor data virtual account ke excel, silahkan coba sekali lagi",
          });
        }
      },
      showCancelButton: true,
      cancelButtonText: "Batal",
      onCancel() {
        setIsImportingVirtualAccount(false);
      },
    });
  };

  return (
    <div className="px-8 py-4">
      {isImportingVirtualAccount && (
        <LoadingBox
          open={isImportingVirtualAccount}
          icon="bx bx-import text-4xl"
          title="Mengimpor Virtual Account"
          message="Mohon tunggu, virtual account sedang diimpor. Jangan menutup atau memuat ulang halaman ini"
        />
      )}
      <h1 className="w-full text-4xl font-bold text-black">
        Virtual Account Calon Mahasiswa
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
            <Link href={pathname}>Virtual Account Calon Mahasiswa</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen virtual account calon mahasiswa
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
              dan status VA.
            </span>
          </div>
          {/* Reset filter button */}
          {filter.gelombangId !== "" ||
          filter.jenjang !== "S1" ||
          filter.statusVA !== "" ||
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
                Status Virtual Account{" "}
                <small className="text-xs text-red-500">*</small>
              </label>
              <select
                id="statusVA"
                name="statusVA"
                className="select select-sm select-bordered bg-white text-black border border-gray-300 rounded-md w-full mt-1"
                required
                value={filter.statusVA || ""}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    statusVA: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Pilih status virtual account
                </option>
                <option value="all">Semua Status</option>
                <option value="sudah">Sudah memiliki VA</option>
                <option value="belum">Belum memiliki VA</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Table virtual account */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-4">
        <div className="rounded lg:col-span-2">
          <div className="w-full">
            {/* Table virtual account calon mahasiswa */}
            <DataTable
              columns={columns}
              data={dataCalonMahasiswa || []}
              searchQuery={searchTerm}
              isLoading={isLoading}
              refetch={refetch}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
        <div className="rounded">
          <VirtualAccountSidebarTools
            onImportExcel={handleImportExcel}
            isImporting={isImportingVirtualAccount}
            onDownloadTemplate={handleGenerateExcelFormat}
            onExportExcel={handleExportExcel}
          />
        </div>
      </div>
    </div>
  );
}
