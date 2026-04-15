"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  FileUp,
  Download,
  Upload,
  FileSpreadsheet,
  X,
  FilePlus,
  FolderInput,
  Edit,
  Info,
  Percent,
} from "lucide-react";
import { useNotifikasi } from "@/store/useNotifikasi";
import { Label } from "@/components/ui/label";
import { TagihanLOASarjanaType } from "@/types/TagihanLOATypes";
import { DetailGelombangType } from "@/types/DetailGelombangTypes";
import { PeringkatType } from "@/types/PeringkatTypes";
import { ProgramStudiType } from "@/types/ProgramStudiTypes";
import SelectSearch from "./SelectSearch";
import { useDebounce } from "use-debounce";
import { ucFirst } from "@/utils/UcFirst";
import { IconCurrencyDollar } from "@tabler/icons-react";
import { downloadExcelTagihanLOAS1 } from "@/service/tagihanCalonMahasiswa.service";
import { useSession } from "next-auth/react";
import { PeriodeType } from "@/types/PeriodeTypes";

interface TagihanLOASarjanaSidePanelProps {
  onImportExcel?: (file: File, periode: string) => void;
  onDownloadTemplate?: () => void;
  onAddTagihanLOA?: (soal: any) => void;
  onUpdateTagihanLOA?: (soal: any) => void;
  isImporting: boolean;
  isAddingTagihanLOA?: boolean;
  isEditingTagihanLOA?: boolean;
  editingSoalData?: Partial<TagihanLOASarjanaType>;
  dataPeriode?: PeriodeType[];
  dataDetailGelombang?: DetailGelombangType[];
  dataPeringkat?: PeringkatType[];
  dataProdi?: ProgramStudiType[];
  onCancelEdit?: () => void;
  selPeriode?: string;
}

export default function TagihanLOASarjanaSidePanel({
  onImportExcel,
  onDownloadTemplate,
  onAddTagihanLOA,
  onUpdateTagihanLOA,
  isImporting,
  isAddingTagihanLOA = false,
  isEditingTagihanLOA = false,
  editingSoalData,
  dataPeriode,
  dataDetailGelombang,
  dataPeringkat,
  dataProdi,
  onCancelEdit,
  selPeriode,
}: TagihanLOASarjanaSidePanelProps) {
  const showNotification = useNotifikasi.getState().show;
  const { data: session }: { data: any } = useSession();
  const [importFile, setImportFile] = useState<File | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedPeriodeForImport, setSelectedPeriodeForImport] = useState("");

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

  // State untuk form tambah dan edit soal
  const [formData, setFormData] = useState({
    id_tagihan: "",
    detail_gelombang: "",
    id_peringkat: "",
    program_studi: "",
    waktu_kuliah: "",
    biaya_spp: "",
    biaya_ppl: "",
    biaya_bpp: "",
    biaya_sks: "",
    biaya_toeic: "",
    biaya_praktikum: "",
    potongan_spp: "",
    potongan_bpp: "",
    potongan_sks: "",
    potongan_praktikum: "",
  });

  // Load editing data when editingSoalData changes
  useEffect(() => {
    if (isEditingTagihanLOA && editingSoalData) {
      setFormData({
        id_tagihan: editingSoalData.id_tagihan || "",
        detail_gelombang: editingSoalData.detail_gelombang?.toString() || "",
        id_peringkat: editingSoalData.id_peringkat?.toString() || "",
        program_studi: editingSoalData.program_studi?.toString() || "",
        waktu_kuliah: editingSoalData.waktu_kuliah || "",
        biaya_spp: editingSoalData.biaya_spp?.toString() || "",
        biaya_ppl: editingSoalData.biaya_ppl?.toString() || "",
        biaya_bpp: editingSoalData.biaya_bpp?.toString() || "",
        biaya_sks: editingSoalData.biaya_sks?.toString() || "",
        biaya_toeic: editingSoalData.biaya_toeic?.toString() || "",
        biaya_praktikum: editingSoalData.biaya_praktikum?.toString() || "",
        potongan_spp: editingSoalData.potongan_spp?.toString() || "",
        potongan_bpp: editingSoalData.potongan_bpp?.toString() || "",
        potongan_sks: editingSoalData.potongan_sks?.toString() || "",
        potongan_praktikum:
          editingSoalData.potongan_praktikum?.toString() || "",
      });
      setShowAddModal(true); // Automatically open modal when editing
    }
  }, [isEditingTagihanLOA, editingSoalData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFile(file);
    }
  };

  const handleImport = () => {
    if (!selectedPeriodeForImport) {
      showNotification({
        status: "text-amber-500",
        icon: "bx bx-error text-2xl",
        header: "Peringatan",
        message: "Silakan pilih periode terlebih dahulu",
      });
      return;
    }
    if (importFile && onImportExcel) {
      onImportExcel(importFile, selectedPeriodeForImport);
      setImportFile(null);
      setShowImportModal(false);
      const fileInput = document.getElementById(
        "excel-import",
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  const handleBatalImport = () => {
    setSelectedPeriodeForImport("");
    setImportFile(null);
    const fileInput = document.getElementById(
      "excel-import",
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  // Handle form submit for tambah soal
  const handleAddTagihanLOA = () => {
    if (
      !formData.detail_gelombang ||
      !formData.id_peringkat ||
      !formData.program_studi
    ) {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Harap lengkapi semua field yang wajib diisi",
      });
      return;
    }

    if (isEditingTagihanLOA && onUpdateTagihanLOA) {
      // Handle update
      const tagihanLOAData = {
        ...formData,
      };
      onUpdateTagihanLOA(tagihanLOAData);
      resetForm();
      setShowAddModal(false);
    } else if (onAddTagihanLOA) {
      // Handle add
      const tagihanLOAData = {
        ...formData,
      };
      onAddTagihanLOA(tagihanLOAData);
      resetForm();
      setShowAddModal(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id_tagihan: "",
      detail_gelombang: "",
      id_peringkat: "",
      program_studi: "",
      waktu_kuliah: "",
      biaya_spp: "",
      biaya_ppl: "",
      biaya_bpp: "",
      biaya_sks: "",
      biaya_toeic: "",
      biaya_praktikum: "",
      potongan_spp: "",
      potongan_bpp: "",
      potongan_sks: "",
      potongan_praktikum: "",
    });
  };

  const handleBatalAdd = () => {
    resetForm();
    setShowAddModal(false);
    if (isEditingTagihanLOA && onCancelEdit) {
      onCancelEdit();
    }
  };

  useEffect(() => {
    setImportFile(null);
  }, [isImporting]);

  // Filter periode options berdasarkan search query
  useEffect(() => {
    if (!dataPeriode) return;

    setIsLoadingPeriodeOptions(true);
    const search = debouncedSearchPeriodeQuery.toLowerCase();

    const filtered = (dataPeriode || []).filter(
      (per: PeriodeType) =>
        String(per.tahun_periode).toLowerCase().includes(search) ||
        String(per.periode_jenis).toLowerCase().includes(search),
    );

    setPeriodeOptions(
      filtered.map((per: PeriodeType) => ({
        value: String(per.periode_id),
        label: `${per.tahun_periode} - ${ucFirst(per.periode_jenis)}`,
      })),
    );
    setIsLoadingPeriodeOptions(false);
  }, [dataPeriode, debouncedSearchPeriodeQuery]);
  // Filter gelombang options berdasarkan search query
  useEffect(() => {
    if (!dataDetailGelombang) return;

    setIsLoadingGelombangOptions(true);
    const search = debouncedSearchGelombangQuery.toLowerCase();

    const filtered = (dataDetailGelombang || []).filter(
      (per: DetailGelombangType) =>
        String(per.NamaGelombang).toLowerCase().includes(search),
    );

    setGelombangOptions(
      filtered.map((per: DetailGelombangType) => ({
        value: String(per.detail_gelombang_id),
        label: `(${ucFirst(per.NamaPeriode)}) - ${per.NamaGelombang} - ${per.LokasiNama}`,
      })),
    );
    setIsLoadingGelombangOptions(false);
  }, [dataDetailGelombang, debouncedSearchGelombangQuery]);
  // Filter peringkat options berdasarkan search query
  useEffect(() => {
    if (!dataPeringkat) return;

    setIsLoadingPeringkatOptions(true);
    const search = debouncedSearchPeringkatQuery.toLowerCase();

    const filtered = (dataPeringkat || []).filter((per: PeringkatType) =>
      String(per.nama_peringkat).toLowerCase().includes(search),
    );

    setPeringkatOptions(
      filtered.map((per: PeringkatType) => ({
        value: String(per.id_peringkat),
        label: `${per.nama_peringkat}`,
      })),
    );
    setIsLoadingPeringkatOptions(false);
  }, [dataPeringkat, debouncedSearchPeringkatQuery]);
  // Filter program studi options berdasarkan search query
  useEffect(() => {
    if (!dataProdi) return;

    setIsLoadingProdiOptions(true);
    const search = debouncedSearchProdiQuery.toLowerCase();

    const filtered = (dataProdi || []).filter((per: ProgramStudiType) =>
      per.ProdiNama.toLowerCase().includes(search),
    );

    setProdiOptions(
      filtered.map((per: ProgramStudiType) => ({
        value: String(per.ProdiId),
        label: per.ProdiNama,
      })),
    );
    setIsLoadingProdiOptions(false);
  }, [dataProdi, debouncedSearchProdiQuery]);

  const handleDownloadFormat = async () => {
    if (!selPeriode) {
      showNotification({
        status: "text-amber-500",
        icon: "bx bx-error text-2xl",
        header: "Peringatan",
        message: "Silakan pilih periode filter terlebih dahulu",
      });
      return;
    }

    try {
      const blob = await downloadExcelTagihanLOAS1(
        session?.user?.accessToken,
        selPeriode,
      );
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `format-tagihan-loa-s1.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Gagal mengunduh file format excel",
      });
    }
  };

  return (
    <>
      <div className="space-y-4">
        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Alat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Tambah Tagihan LOA Sarjana */}
            <div className="space-y-2">
              <Button
                onClick={() => {
                  if (isEditingTagihanLOA && onCancelEdit) {
                    onCancelEdit();
                  }
                  setShowAddModal(true);
                }}
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                {isEditingTagihanLOA ? (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Tagihan LOA Sarjana
                  </>
                ) : (
                  <>
                    <FilePlus className="h-4 w-4 mr-2" />
                    Tambah Tagihan LOA Sarjana
                  </>
                )}
              </Button>
            </div>

            {/* Download format import tagihan LOA sarjana excel */}
            <Button
              onClick={() => handleDownloadFormat()}
              variant="outline"
              className="w-full justify-start"
              size="sm"
            >
              <FolderInput className="h-4 w-4 mr-2" />
              Download Format Excel
            </Button>

            {/* Import tagihan LOA sarjana excel */}
            <Button
              onClick={() => setShowImportModal(true)}
              variant="outline"
              className="w-full justify-start"
              size="sm"
            >
              <FolderInput className="h-4 w-4 mr-2" />
              Import Tagihan LOA Sarjana Excel
            </Button>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="border-dashed">
          <CardContent>
            <div className="text-xs text-gray-500 space-y-1">
              <p className="font-medium text-gray-600">Tips:</p>
              <p>
                • Gunakan tombol <strong>"Tambah Tagihan LOA Sarjana"</strong>{" "}
                untuk menambahkan data Tagihan LOA secara manual.
              </p>
              <p>
                • Gunakan tombol{" "}
                <strong>"Import Tagihan LOA Sarjana Excel"</strong> untuk
                mengimpor data Tagihan LOA dari file Excel (.xlsx).
              </p>
              <p>
                • Klik tombol <strong>Edit</strong> pada Tagihan LOA untuk
                mengubah data yang sudah ada.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Tambah/Edit Tagihan LOA Sarjana */}
      {(showAddModal || isEditingTagihanLOA) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {isEditingTagihanLOA ? (
                      <Edit className="h-5 w-5 text-slate-600" />
                    ) : (
                      <FilePlus className="h-5 w-5 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {isEditingTagihanLOA
                        ? "Edit Tagihan LOA"
                        : "Tambah Tagihan LOA"}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {isEditingTagihanLOA
                        ? "Edit tagihan LOA sarjana."
                        : "Tambah tagihan LOA sarjana."}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBatalAdd}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <span className="text-lg font-semibold text-black flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                  <Info className="h-5 w-5 text-blue-600" />
                </div>{" "}
                Informasi Tagihan
              </span>
              <div className="space-y-2 grid grid-cols-2 gap-4">
                {/* Detail Gelombang */}
                <div className="space-y-2">
                  <Label htmlFor="kategori" className="text-sm font-medium">
                    Detail Gelombang <span className="text-red-500">*</span>
                  </Label>
                  <SelectSearch
                    data={gelombangOptions || []}
                    fieldName="Gelombang"
                    placeholder="Pilih gelombang..."
                    defaultEmptyValue={{
                      value: "",
                      label: "Pilih gelombang...",
                    }}
                    value={formData.detail_gelombang || ""}
                    setValue={(data) =>
                      setFormData((prev) => ({
                        ...prev,
                        detail_gelombang: data,
                      }))
                    }
                    isLoading={isLoadingGelombangOptions}
                    searchQuery={searchGelombangQuery}
                    setSearchQuery={setSearchGelombangQuery}
                  />
                </div>

                {/* Peringkat */}
                <div className="space-y-2">
                  <Label htmlFor="kategori" className="text-sm font-medium">
                    Peringkat <span className="text-red-500">*</span>
                  </Label>
                  <SelectSearch
                    data={peringkatOptions || []}
                    fieldName="Peringkat"
                    placeholder="Pilih peringkat..."
                    defaultEmptyValue={{
                      value: "",
                      label: "Pilih peringkat...",
                    }}
                    value={formData.id_peringkat || ""}
                    setValue={(data) =>
                      setFormData((prev) => ({
                        ...prev,
                        id_peringkat: data,
                      }))
                    }
                    isLoading={isLoadingPeringkatOptions}
                    searchQuery={searchPeringkatQuery}
                    setSearchQuery={setSearchPeringkatQuery}
                  />
                </div>

                {/* Prodi */}
                <div className="space-y-2">
                  <Label htmlFor="kategori" className="text-sm font-medium">
                    Program Studi <span className="text-red-500">*</span>
                  </Label>
                  <SelectSearch
                    data={prodiOptions || []}
                    fieldName="Program Studi"
                    placeholder="Pilih program studi..."
                    defaultEmptyValue={{
                      value: "",
                      label: "Pilih program studi...",
                    }}
                    value={formData.program_studi || ""}
                    setValue={(data) =>
                      setFormData((prev) => ({
                        ...prev,
                        program_studi: data,
                      }))
                    }
                    isLoading={isLoadingProdiOptions}
                    searchQuery={searchProdiQuery}
                    setSearchQuery={setSearchProdiQuery}
                  />
                </div>

                {/* Waktu Kuliah */}
                <div className="space-y-2">
                  <Label htmlFor="kategori" className="text-sm font-medium">
                    Waktu Kuliah <span className="text-red-500">*</span>
                  </Label>
                  <select
                    name="waktuKuliah"
                    id="waktuKuliah"
                    className="select select-sm select-bordered border border-gray-200 rounded-md bg-white text-black w-full"
                    required
                    value={formData.waktu_kuliah || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, waktu_kuliah: e.target.value })
                    }
                  >
                    <option disabled value="">
                      Pilih waktu kuliah...
                    </option>
                    <option value="pagi">Pagi</option>
                    <option value="malam">Malam</option>
                  </select>
                </div>
              </div>

              <span className="text-lg font-semibold text-black flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                  <IconCurrencyDollar className="h-5 w-5 text-green-600" />
                </div>{" "}
                Biaya
              </span>

              <div className="space-y-2 grid grid-cols-3 gap-4">
                {/* Biaya SPP */}
                <div className="space-y-2">
                  <Label htmlFor="biayaSPP" className="text-sm font-medium">
                    Biaya SPP <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 font-medium text-sm">
                        Rp
                      </span>
                    </div>
                    <input
                      type="text"
                      name="biayaSPP"
                      id="biayaSPP"
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none transition-all bg-white text-black"
                      placeholder="0"
                      value={
                        formData.biaya_spp
                          ? new Intl.NumberFormat("id-ID").format(
                              Number(formData.biaya_spp.replace(/[^0-9]/g, "")),
                            )
                          : ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, biaya_spp: rawValue });
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Biaya PPL */}
                <div className="space-y-2">
                  <Label htmlFor="biayaPPL" className="text-sm font-medium">
                    Biaya PPL <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 font-medium text-sm">
                        Rp
                      </span>
                    </div>
                    <input
                      type="text"
                      name="biayaPPL"
                      id="biayaPPL"
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none transition-all bg-white text-black"
                      placeholder="0"
                      value={
                        formData.biaya_ppl
                          ? new Intl.NumberFormat("id-ID").format(
                              Number(formData.biaya_ppl.replace(/[^0-9]/g, "")),
                            )
                          : ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, biaya_ppl: rawValue });
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Biaya BPP Pokok */}
                <div className="space-y-2">
                  <Label
                    htmlFor="biayaBPPPokok"
                    className="text-sm font-medium"
                  >
                    Biaya BPP Pokok <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 font-medium text-sm">
                        Rp
                      </span>
                    </div>
                    <input
                      type="text"
                      name="biayaBPPPokok"
                      id="biayaBPPPokok"
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none transition-all bg-white text-black"
                      placeholder="0"
                      value={
                        formData.biaya_bpp
                          ? new Intl.NumberFormat("id-ID").format(
                              Number(formData.biaya_bpp.replace(/[^0-9]/g, "")),
                            )
                          : ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, biaya_bpp: rawValue });
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Biaya SKS Semester 1 */}
                <div className="space-y-2">
                  <Label htmlFor="biayaSKS" className="text-sm font-medium">
                    Biaya SKS Semester 1 <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 font-medium text-sm">
                        Rp
                      </span>
                    </div>
                    <input
                      type="text"
                      name="biayaSKS"
                      id="biayaSKS"
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none transition-all bg-white text-black"
                      placeholder="0"
                      value={
                        formData.biaya_sks
                          ? new Intl.NumberFormat("id-ID").format(
                              Number(formData.biaya_sks.replace(/[^0-9]/g, "")),
                            )
                          : ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, biaya_sks: rawValue });
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Biaya TOEIC */}
                <div className="space-y-2">
                  <Label htmlFor="biayaTOEIC" className="text-sm font-medium">
                    Biaya TOEIC <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 font-medium text-sm">
                        Rp
                      </span>
                    </div>
                    <input
                      type="text"
                      name="biayaTOEIC"
                      id="biayaTOEIC"
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none transition-all bg-white text-black"
                      placeholder="0"
                      value={
                        formData.biaya_toeic
                          ? new Intl.NumberFormat("id-ID").format(
                              Number(
                                formData.biaya_toeic.replace(/[^0-9]/g, ""),
                              ),
                            )
                          : ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, biaya_toeic: rawValue });
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Biaya BPP Praktikum */}
                <div className="space-y-2">
                  <Label
                    htmlFor="biayaBPPPraktikum"
                    className="text-sm font-medium"
                  >
                    Biaya BPP Praktikum <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 font-medium text-sm">
                        Rp
                      </span>
                    </div>
                    <input
                      type="text"
                      name="biayaBPPPraktikum"
                      id="biayaBPPPraktikum"
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none transition-all bg-white text-black"
                      placeholder="0"
                      value={
                        formData.biaya_praktikum
                          ? new Intl.NumberFormat("id-ID").format(
                              Number(
                                formData.biaya_praktikum.replace(/[^0-9]/g, ""),
                              ),
                            )
                          : ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, biaya_praktikum: rawValue });
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              <span className="text-lg font-semibold text-black flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-2">
                  <Percent className="h-5 w-5 text-red-600" />
                </div>{" "}
                Potongan
              </span>

              <div className="space-y-2 grid grid-cols-4 gap-4">
                {/* Potongan Biaya SPP */}
                <div className="space-y-2">
                  <Label
                    htmlFor="potonganBiayaSPP"
                    className="text-sm font-medium"
                  >
                    Potongan Biaya SPP <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 font-medium text-sm">
                        Rp
                      </span>
                    </div>
                    <input
                      type="text"
                      name="potonganBiayaSPP"
                      id="potonganBiayaSPP"
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none transition-all bg-white text-black"
                      placeholder="0"
                      value={
                        formData.potongan_spp
                          ? new Intl.NumberFormat("id-ID").format(
                              Number(
                                formData.potongan_spp.replace(/[^0-9]/g, ""),
                              ),
                            )
                          : ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, potongan_spp: rawValue });
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Potongan Biaya BPP Pokok */}
                <div className="space-y-2">
                  <Label
                    htmlFor="potonganBiayaBPPPokok"
                    className="text-sm font-medium"
                  >
                    Potongan Biaya BPP Pokok{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 font-medium text-sm">
                        Rp
                      </span>
                    </div>
                    <input
                      type="text"
                      name="potonganBiayaBPPPokok"
                      id="potonganBiayaBPPPokok"
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none transition-all bg-white text-black"
                      placeholder="0"
                      value={
                        formData.potongan_bpp
                          ? new Intl.NumberFormat("id-ID").format(
                              Number(
                                formData.potongan_bpp.replace(/[^0-9]/g, ""),
                              ),
                            )
                          : ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, potongan_bpp: rawValue });
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Potongan Biaya SKS */}
                <div className="space-y-2">
                  <Label
                    htmlFor="potonganBiayaSKS"
                    className="text-sm font-medium"
                  >
                    Potongan Biaya SKS <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 font-medium text-sm">
                        Rp
                      </span>
                    </div>
                    <input
                      type="text"
                      name="potonganBiayaSKS"
                      id="potonganBiayaSKS"
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none transition-all bg-white text-black"
                      placeholder="0"
                      value={
                        formData.potongan_sks
                          ? new Intl.NumberFormat("id-ID").format(
                              Number(
                                formData.potongan_sks.replace(/[^0-9]/g, ""),
                              ),
                            )
                          : ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({ ...formData, potongan_sks: rawValue });
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Potongan Biaya Praktikum */}
                <div className="space-y-2">
                  <Label
                    htmlFor="potonganBiayaPraktikum"
                    className="text-sm font-medium"
                  >
                    Potongan Biaya Praktikum{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500 font-medium text-sm">
                        Rp
                      </span>
                    </div>
                    <input
                      type="text"
                      name="potonganBiayaPraktikum"
                      id="potonganBiayaPraktikum"
                      className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg outline-none transition-all bg-white text-black"
                      placeholder="0"
                      value={
                        formData.potongan_praktikum
                          ? new Intl.NumberFormat("id-ID").format(
                              Number(
                                formData.potongan_praktikum.replace(
                                  /[^0-9]/g,
                                  "",
                                ),
                              ),
                            )
                          : ""
                      }
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^0-9]/g, "");
                        setFormData({
                          ...formData,
                          potongan_praktikum: rawValue,
                        });
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t px-6 py-4">
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={handleBatalAdd}
                  disabled={isAddingTagihanLOA}
                >
                  Batal
                </Button>
                <Button
                  onClick={handleAddTagihanLOA}
                  disabled={isAddingTagihanLOA}
                  className={`${isEditingTagihanLOA ? "bg-amber-600 hover:bg-amber-700" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  {isAddingTagihanLOA ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isEditingTagihanLOA ? "Mengupdate..." : "Menambahkan..."}
                    </>
                  ) : (
                    <>
                      {isEditingTagihanLOA ? (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Update
                        </>
                      ) : (
                        <>
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Tambah
                        </>
                      )}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Import Excel */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 space-y-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Import Soal Excel
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Import data soal USM dari file Excel
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowImportModal(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Download Template */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Download className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      Download Template Excel
                    </h4>
                    <p className="text-sm text-gray-600">
                      Gunakan template ini untuk format yang benar
                    </p>
                  </div>
                  <Button
                    onClick={handleDownloadFormat}
                    variant="outline"
                    size="sm"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              {/* Periode */}
              <div className="space-y-2">
                <Label htmlFor="kategori" className="text-sm font-medium">
                  Periode <span className="text-red-500">*</span>
                </Label>
                <SelectSearch
                  data={periodeOptions || []}
                  fieldName="Periode"
                  placeholder="Pilih periode..."
                  defaultEmptyValue={{
                    value: "",
                    label: "Pilih periode...",
                  }}
                  value={formData.detail_gelombang || ""}
                  setValue={(data) => setSelectedPeriodeForImport(data)}
                  isLoading={isLoadingPeriodeOptions}
                  searchQuery={searchPeriodeQuery}
                  setSearchQuery={setSearchPeriodeQuery}
                />
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <div className="mb-4">
                  <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">
                    Upload File Excel
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Format .xlsx atau .xls (maks. 5MB)
                  </p>
                </div>

                <label className="cursor-pointer">
                  <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <FileUp className="h-4 w-4" />
                    <span className="text-sm font-medium">Pilih File</span>
                  </div>
                  <input
                    id="excel-import"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                {importFile && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">
                        {importFile.name}
                      </span>
                      <span className="text-sm text-emerald-600 ml-auto">
                        {(importFile.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowImportModal(false);
                    handleBatalImport();
                  }}
                  disabled={isImporting}
                >
                  Batal
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={
                    !importFile || isImporting || !selectedPeriodeForImport
                  }
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {isImporting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Mengimport...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
