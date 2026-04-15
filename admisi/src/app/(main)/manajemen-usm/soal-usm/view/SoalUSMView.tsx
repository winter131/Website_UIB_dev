"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import { KategoriUSMType } from "@/types/KategoriUSMTypes";
import { useDeleteKategoriUSM } from "@/hooks/kategori-usm/useDeleteKategoriUSM";
import { X } from "lucide-react";
import { useDebounce } from "use-debounce";
import SelectSearch from "@/components/SelectSearch";
import { useSoalUSMData } from "@/hooks/soal-usm/useSoalUSMData";
import SoalUSMSidePanel from "@/components/SoalUSMSidePanel";
import { useCreateSoalUSM } from "@/hooks/soal-usm/useCreateSoalUSM";
import { InserUpdateSoalUSMType, SoalUSMType } from "@/types/SoalUSMTypes";
import { useEditSoalUSM } from "@/hooks/soal-usm/useEditSoalUSM";
import { useImportSoalUSM } from "@/hooks/soal-usm/useImportSoalUSM";
import LoadingBox from "@/components/LoadingBox";
import { useDeleteSoalUSM } from "@/hooks/soal-usm/useDeleteSoalUSM";

export default function SoalUSMView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isAddingSoal, setIsAddingSoal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    kategori: "",
  });
  const [formData, setFormData] = useState<InserUpdateSoalUSMType>({
    soal_id: "",
    kategori_id: "",
    bobot_soal: "1",
    pertanyaan_soal: "",
    jawaban_a: "",
    jawaban_b: "",
    jawaban_c: "",
    jawaban_d: "",
    jawaban_benar: "",
    file_soal: null as File | null,
    previewImage: "",
  });

  // Search kategori options
  const [isLoadingKategoriOptions, setIsLoadingKategoriOptions] =
    useState(false);
  const [searchKategoriQuery, setSearchKategoriQuery] = useState("");
  const [debouncedSearchKategoriQuery] = useDebounce<string>(
    searchKategoriQuery,
    500,
  );
  const [kategoriOptions, setKategoriOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Get data kategori soal USM
  const { data, isLoading, refetch } = useSoalUSMData(
    session?.user?.accessToken,
    status,
    filter,
  );

  // Mutation create soal USM, edit soal USM, delete soal USM
  const { mutate: createSoalUSMMutation } = useCreateSoalUSM(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menambahkan soal USM",
      });
      setIsAddingSoal(false);
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
  const { mutate: updateSoalUSMMutation } = useEditSoalUSM(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit soal USM",
      });
      refetch();
      setFormData({
        soal_id: "",
        kategori_id: "",
        bobot_soal: "1",
        pertanyaan_soal: "",
        jawaban_a: "",
        jawaban_b: "",
        jawaban_c: "",
        jawaban_d: "",
        jawaban_benar: "",
        file_soal: null,
        previewImage: "",
      });
      setIsEditing(false);
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
  const { mutate: deleteSoalUSMMutation } = useDeleteSoalUSM(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menghapus Soal USM",
      });
      refetch();
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
  const { mutate: importSoalUSMMutation } = useImportSoalUSM(
    () => {
      setIsImporting(false);
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengimpor soal USM dari file Excel",
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

  // Submit form tambah dan edit pekerjaan
  const handleSubmit = async (data: InserUpdateSoalUSMType) => {
    console.log("data submit soal USM:", data);
    if (!isEditing) {
      setIsAddingSoal(true);
      const formData = new FormData();
      formData.append("kategori_id", data.kategori_id);
      formData.append("jawaban_benar", data.jawaban_benar);
      formData.append("bobot_soal", data.bobot_soal);
      formData.append("pertanyaan_text", data.pertanyaan_soal);
      formData.append("soal_a_text", data.jawaban_a);
      formData.append("soal_b_text", data.jawaban_b);
      formData.append("soal_c_text", data.jawaban_c);
      formData.append("soal_d_text", data.jawaban_d);
      if (data.file_soal !== null) {
        formData.append("pertanyaan_gambar", data.file_soal);
      }
      createSoalUSMMutation({
        token: session.user?.accessToken,
        soalUSM: formData,
      });
    } else {
      const formData = new FormData();
      formData.append("soal_id", data.soal_id);
      formData.append("kategori_id", data.kategori_id);
      formData.append("jawaban_benar", data.jawaban_benar);
      formData.append("bobot_soal", data.bobot_soal);
      formData.append("pertanyaan_text", data.pertanyaan_soal);
      formData.append("soal_a_text", data.jawaban_a);
      formData.append("soal_b_text", data.jawaban_b);
      formData.append("soal_c_text", data.jawaban_c);
      formData.append("soal_d_text", data.jawaban_d);
      if (data.file_soal !== null) {
        formData.append("pertanyaan_gambar", data.file_soal);
      } else {
        formData.append("pertanyaan_gambar", data.previewImage);
      }
      updateSoalUSMMutation({
        token: session.user?.accessToken,
        soalUSM: formData,
      });
    }
  };
  // Open editing state
  const handleEdit = (data: SoalUSMType) => {
    setIsEditing(true);
    setFormData({
      soal_id: String(data.soal_id),
      kategori_id: String(data.kategori_id),
      bobot_soal: String(data.bobot_soal),
      pertanyaan_soal: data.pertanyaan_soal,
      jawaban_a: data.jawaban_a,
      jawaban_b: data.jawaban_b,
      jawaban_c: data.jawaban_c,
      jawaban_d: data.jawaban_d,
      file_soal: null,
      jawaban_benar: data.jawaban_benar,
      previewImage: data.LinkSoal,
    });
  };
  // Handle delete
  const handleDelete = (data: SoalUSMType) => {
    showConfirmation({
      title: "Hapus Soal USM?",
      message:
        "Soal USM ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteSoalUSMMutation({
          token: session.user?.accessToken,
          soalUSMId: data.soal_id,
        });
      },
    });
  };

  // Handle reset filter
  const handleResetFilter = () => {
    setFilter({
      kategori: "",
    });
    setSearchTerm("");
  };

  const handleImportExcel = (file: File, kategori: string) => {
    showConfirmation({
      title: "Mulai Impor Soal USM?",
      message:
        "Soal USM dari file Excel akan diimpor ke dalam sistem. Jangan menutup atau memuat ulang halaman ini sampai proses selesai. Lanjutkan proses impor?",
      icon: "bx bx-import text-4xl",
      confirmButtonText: "Impor",
      confirmButtonColor: "bg-green-600",
      onConfirm() {
        const formData = new FormData();
        formData.append("kategori_id", kategori);
        formData.append("file", file);
        setIsImporting(true);
        importSoalUSMMutation({
          token: session?.user?.accessToken,
          soalUSM: formData,
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
    const bothFilled = filter.kategori !== "";
    if (!bothFilled) return;
    refetch();
  }, [filter.kategori]);

  // Filter kategori options
  useEffect(() => {
    if (!data) return;

    setIsLoadingKategoriOptions(true);
    const search = debouncedSearchKategoriQuery.toLowerCase();

    const filtered = (data.all_kategori || []).filter((per: KategoriUSMType) =>
      per.nama_kategori.toLowerCase().includes(search),
    );

    setKategoriOptions(
      filtered.map((per: KategoriUSMType) => ({
        value: per.id_kategori,
        label: per.nama_kategori,
      })),
    );
    setIsLoadingKategoriOptions(false);
  }, [data, debouncedSearchKategoriQuery]);

  // Save filter to localStorage untuk persistensi data filter
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("appliedFilterSoalUSM");
    const search = localStorage.getItem("appliedSearchSoalUSM");
    if (saved) {
      setFilter(JSON.parse(saved));
      setSearchTerm(search || "");
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(
      "appliedFilterSoalUSM",
      JSON.stringify({
        kategori: String(filter.kategori),
      }),
    );
    localStorage.setItem("appliedSearchSoalUSM", searchTerm);
  }, [filter, searchTerm, isLoaded]);

  return (
    <div className="px-8 py-4">
      {isImporting && (
        <LoadingBox
          open={isImporting}
          icon="bx bx-import text-4xl"
          title="Mengimpor Soal USM"
          message="Mohon tunggu, soal USM sedang diimpor. Jangan menutup atau memuat ulang halaman ini"
        />
      )}
      <h1 className="w-full text-4xl font-bold text-black">Soal USM</h1>

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
            <Link href={pathname}>Soal USM</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen soal USM pada sistem.
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
              Gunakan fitur pencarian untuk mencari soal USM.
            </span>
          </div>
          <div className="flex flex-row items-center gap-4">
            {/* Reset filter button */}
            {filter.kategori !== "" ? (
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {/* Filter periode */}
            <div className="col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Kategori <small className="text-xs text-red-500">*</small>
              </label>
              <SelectSearch
                data={kategoriOptions || []}
                fieldName="Kategori"
                placeholder="Pilih kategori..."
                defaultEmptyValue={{
                  value: "",
                  label: "Pilih kategori...",
                }}
                value={filter.kategori || ""}
                setValue={(data) =>
                  setFilter((prev) => ({
                    ...prev,
                    kategori: data,
                  }))
                }
                isLoading={isLoadingKategoriOptions}
                searchQuery={searchKategoriQuery}
                setSearchQuery={setSearchKategoriQuery}
              />
            </div>

            {/* Search */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Cari Soal USM
              </label>
              <input
                type="text"
                placeholder="Ketik kata kunci soal USM..."
                className="input w-full bg-white mb-4 input-md shadow "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Table kategori USM dan form kategori USM */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table kategori USM */}
        <div className="col-span-2">
          <DataTable
            columns={columns}
            data={data?.all_soal || []}
            dataKategori={data?.all_kategori || []}
            searchQuery={searchTerm}
            isLoading={isLoading}
            refetch={refetch}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>

        {/* Form kategori USM */}
        <div className="col-span-1">
          <SoalUSMSidePanel
            dataKategori={data?.all_kategori || []}
            isAddingSoal={isAddingSoal}
            isEditingSoal={isEditing}
            editingSoalData={formData}
            onAddSoal={handleSubmit}
            onCancelEdit={() => setIsEditing(false)}
            isImporting={isImporting}
            onImportExcel={handleImportExcel}
          />
        </div>
      </div>
    </div>
  );
}
