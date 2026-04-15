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
import { usePesertaData } from "@/hooks/hapus-ujicoba/usePesertaData";
import { useDebounce } from "use-debounce";
import { SesiUSMType } from "@/types/SesiUSMTypes";
import { IndonesianDateTimeFormat } from "@/utils/IndonesianDateTimeFormat";
import { RotateCcw } from "lucide-react";
import { useResetUSM } from "@/hooks/hapus-ujicoba/useResetUSM";

export default function HapusUjicobaView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSesi, setSelectedSesi] = useState({
    sesiId: "",
  });

  const [isLoadingSesiOptions, setIsLoadingSesiOptions] = useState(false);
  const [searchSesiQuery, setSearchSesiQuery] = useState("");
  const [debouncedSearchSesiQuery] = useDebounce(searchSesiQuery, 500);
  const [sesiOptions, setSesiOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Get data peserta dan sesi ujian ujicoba
  const { data, isLoading, refetch } = usePesertaData(
    session.user?.accessToken,
    status,
    selectedSesi.sesiId,
  );
  // Mutation reset usm
  const { mutate: resetUSMMutation } = useResetUSM(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mereset peserta ujicoba USM",
      });
      refetch();
      setSelectedSesi({ sesiId: "" });

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

  // Handle delete
  const handleReset = () => {
    showConfirmation({
      title: "Reset Peserta?",
      message:
        "Seluruh sesi peserta akan dihapus dan tidak dapat dikembalikan. Lanjut reset?",
      icon: "reset",
      confirmButtonText: "Reset",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        resetUSMMutation({
          token: session.user?.accessToken,
          sesi: {
            sel_sesi: String(selectedSesi.sesiId),
          },
        });
      },
    });
  };

  // Filter sesi usm
  useEffect(() => {
    if (!data) return;

    setIsLoadingSesiOptions(true);

    const search = debouncedSearchSesiQuery.toLowerCase();

    const filtered = (data.allSesiUsm || []).filter(
      (sesi: SesiUSMType) =>
        sesi.NamaUjian.toLowerCase().includes(search) ||
        sesi.NamaKategori.toLowerCase().includes(search) ||
        sesi.TanggalMulai.toLowerCase().includes(search) ||
        IndonesianDateTimeFormat(sesi.TanggalMulai)
          .toLowerCase()
          .includes(search) ||
        sesi.UrutanSoal.toLowerCase().includes(search) ||
        sesi.TokenUjian.toLowerCase().includes(search) ||
        sesi.StatusAktif.toLowerCase().includes(search) ||
        String(sesi.SesiId).toLowerCase().includes(search),
    );

    setSesiOptions(
      filtered.map((sesi: SesiUSMType) => ({
        value: sesi.SesiId,
        label: `${sesi.NamaUjian} - ${IndonesianDateTimeFormat(
          sesi.TanggalMulai,
        )}`,
      })),
    );
    setIsLoadingSesiOptions(false);
  }, [data, debouncedSearchSesiQuery]);

  useEffect(() => {
    refetch();
  }, [selectedSesi.sesiId]);

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">Hapus Ujicoba</h1>

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
            <Link href={pathname}>Hapus Ujicoba</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen reset ujicoba USM.
        </span>
      </div>

      {/* Filter & Search Section */}
      <div className="bg-white rounded-xl shadow p-5 space-y-4 my-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Filter Sesi */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700">
              Filter sesi USM
            </label>
            <SelectSearch
              data={sesiOptions || []}
              fieldName="Sesi"
              placeholder="Pilih sesi..."
              defaultEmptyValue={{
                value: "",
                label: "Pilih sesi...",
              }}
              value={selectedSesi.sesiId}
              setValue={(data) =>
                setSelectedSesi((prev) => ({
                  ...prev,
                  sesiId: data,
                }))
              }
              isLoading={isLoadingSesiOptions}
              searchQuery={searchSesiQuery}
              setSearchQuery={setSearchSesiQuery}
            />
          </div>

          {/* Search */}
          <div className="w-full lg:w-1/3">
            <label className="text-sm font-medium text-gray-700">
              Cari peserta
            </label>
            <input
              type="text"
              placeholder="Ketik nama peserta..."
              className="input w-full bg-white mb-4 input-md shadow mt-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Reset Ujian Button */}
        {selectedSesi.sesiId && (
          <button
            className="w-full py-3.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0 shadow-md flex items-center justify-center gap-2 group"
            onClick={() => handleReset()}
          >
            <RotateCcw size={18} />
            <span>Reset Peserta</span>
          </button>
        )}
      </div>

      {/* Main Content - Table lokasi ujian dan form lokasi ujian */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table lokasi ujian */}
        <div className="col-span-3">
          <DataTable
            columns={columns}
            data={data?.hasilUsmCalonmhs || []}
            searchQuery={searchTerm}
            isLoading={isLoading}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  );
}
