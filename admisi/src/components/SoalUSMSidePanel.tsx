"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PlusCircle,
  FileUp,
  Download,
  Upload,
  FileSpreadsheet,
  X,
  FilePlus,
  FolderInput,
  File,
  CheckCircle,
  Edit,
} from "lucide-react";
import { useNotifikasi } from "@/store/useNotifikasi";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { KategoriUSMType } from "@/types/KategoriUSMTypes";
import { InserUpdateSoalUSMType } from "@/types/SoalUSMTypes";

interface SoalUSMSidebarToolsProps {
  onImportExcel?: (file: File, kategori: string) => void;
  onDownloadTemplate?: () => void;
  onAddSoal?: (soal: any) => void;
  onUpdateSoal?: (soal: any) => void;
  isImporting: boolean;
  isAddingSoal?: boolean;
  isEditingSoal?: boolean;
  editingSoalData?: InserUpdateSoalUSMType;
  dataKategori?: KategoriUSMType[];
  onCancelEdit?: () => void;
}

export default function SoalUSMSidebarTools({
  onImportExcel,
  onDownloadTemplate,
  onAddSoal,
  onUpdateSoal,
  isImporting,
  isAddingSoal = false,
  isEditingSoal = false,
  editingSoalData,
  dataKategori,
  onCancelEdit,
}: SoalUSMSidebarToolsProps) {
  const showNotification = useNotifikasi.getState().show;
  const [importFile, setImportFile] = useState<File | null>(null);
  const [kategori, setKategori] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // State untuk form tambah dan edit soal
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

  // Load editing data when editingSoalData changes
  useEffect(() => {
    if (isEditingSoal && editingSoalData) {
      setFormData({
        soal_id: editingSoalData.soal_id || "",
        kategori_id: editingSoalData.kategori_id || "",
        bobot_soal: editingSoalData.bobot_soal?.toString() || "1",
        pertanyaan_soal: editingSoalData.pertanyaan_soal || "",
        jawaban_a: editingSoalData.jawaban_a || "",
        jawaban_b: editingSoalData.jawaban_b || "",
        jawaban_c: editingSoalData.jawaban_c || "",
        jawaban_d: editingSoalData.jawaban_d || "",
        jawaban_benar: editingSoalData.jawaban_benar || "",
        file_soal: null,
        previewImage: editingSoalData.previewImage || "",
      });
      setShowAddModal(true); // Automatically open modal when editing
    }
  }, [isEditingSoal, editingSoalData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFile(file);
    }
  };

  const handleImport = () => {
    if (importFile && onImportExcel) {
      if (kategori === "") {
        showNotification({
          status: "text-yellow-500",
          icon: "bx bx-error text-2xl",
          header: "Peringatan",
          message: "Kategori harus dipilih sebelum mengimpor soal USM",
        });
        return;
      }
      onImportExcel(importFile, kategori);
      setImportFile(null);
      setShowImportModal(false);
      const fileInput = document.getElementById(
        "excel-import",
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  const handleBatalImport = () => {
    setImportFile(null);
    const fileInput = document.getElementById(
      "excel-import",
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  // Handle file upload for soal image
  const handleFileSoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        file_soal: file,
      });

      // Create preview URL for image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData((prev) => ({
            ...prev,
            previewImage: e.target?.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Handle form submit for tambah soal
  const handleAddSoal = () => {
    if (
      !formData.kategori_id ||
      !formData.pertanyaan_soal ||
      !formData.jawaban_a ||
      !formData.jawaban_b ||
      !formData.jawaban_c ||
      !formData.jawaban_d ||
      !formData.jawaban_benar
    ) {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Harap lengkapi semua field yang wajib diisi",
      });
      return;
    }

    if (isEditingSoal && onUpdateSoal) {
      // Handle update
      const soalData = {
        ...formData,
        bobot_soal: parseFloat(formData.bobot_soal),
      };
      onUpdateSoal(soalData);
      resetForm();
      setShowAddModal(false);
    } else if (onAddSoal) {
      // Handle add
      const soalData = {
        ...formData,
        bobot_soal: parseFloat(formData.bobot_soal),
      };
      onAddSoal(soalData);
      resetForm();
      setShowAddModal(false);
    }
  };

  // Reset form
  const resetForm = () => {
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
  };

  const handleBatalAdd = () => {
    resetForm();
    setShowAddModal(false);
    if (isEditingSoal && onCancelEdit) {
      onCancelEdit();
    }
  };

  useEffect(() => {
    setKategori("");
    setImportFile(null);
  }, [isImporting]);

  const handleDownloadFormat = () => {
    const link = document.createElement("a");
    link.href = "/format/format-import-soal-usm.xlsx";
    link.download = "format-import-soal-usm.xlsx";
    link.click();
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
            {/* Tambah Soal USM */}
            <div className="space-y-2">
              <Button
                onClick={() => {
                  if (isEditingSoal && onCancelEdit) {
                    onCancelEdit();
                  }
                  setShowAddModal(true);
                }}
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                {isEditingSoal ? (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Soal USM
                  </>
                ) : (
                  <>
                    <FilePlus className="h-4 w-4 mr-2" />
                    Tambah Soal USM
                  </>
                )}
              </Button>
            </div>

            {/* Download format import soal excel */}
            <Button
              onClick={() => handleDownloadFormat()}
              variant="outline"
              className="w-full justify-start"
              size="sm"
            >
              <FolderInput className="h-4 w-4 mr-2" />
              Download Format Import Soal Excel
            </Button>

            {/* Import soal excel */}
            <Button
              onClick={() => setShowImportModal(true)}
              variant="outline"
              className="w-full justify-start"
              size="sm"
            >
              <FolderInput className="h-4 w-4 mr-2" />
              Import Soal Excel
            </Button>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="border-dashed">
          <CardContent>
            <div className="text-xs text-gray-500 space-y-1">
              <p className="font-medium text-gray-600">Tips:</p>
              <p>
                • Gunakan tombol <strong>"Tambah Soal USM"</strong> untuk
                menambahkan data soal USM secara manual.
              </p>
              <p>
                • Gunakan tombol <strong>"Import Soal Excel"</strong> untuk
                mengimpor data soal USM dari file Excel (.xlsx).
              </p>
              <p>
                • Klik tombol <strong>Edit</strong> pada soal untuk mengubah
                data yang sudah ada.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Tambah/Edit Soal USM */}
      {(showAddModal || isEditingSoal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {isEditingSoal ? (
                      <Edit className="h-5 w-5 text-slate-600" />
                    ) : (
                      <FilePlus className="h-5 w-5 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {isEditingSoal ? "Edit Soal USM" : "Tambah Soal USM"}
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      {isEditingSoal
                        ? "Edit soal ujian saringan masuk."
                        : "Tambah soal ujian saringan masuk."}
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
              <div className="space-y-2 grid grid-cols-2 gap-4">
                {/* Kategori Soal */}
                <div className="space-y-2">
                  <Label htmlFor="kategori" className="text-sm font-medium">
                    Kategori Soal <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.kategori_id}
                    onValueChange={(value) =>
                      setFormData({ ...formData, kategori_id: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Kategori Soal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tpa">
                        TPA (Tes Potensi Akademik)
                      </SelectItem>
                      {(dataKategori || []).map((kategori) => (
                        <SelectItem
                          key={kategori.id_kategori}
                          value={kategori.id_kategori}
                        >
                          {kategori.nama_kategori}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Bobot Soal */}
                <div className="space-y-2">
                  <Label htmlFor="bobot" className="text-sm font-medium">
                    Bobot Soal
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      id="bobot"
                      min="1"
                      max="10"
                      step="0.1"
                      value={formData.bobot_soal}
                      onChange={(e) =>
                        setFormData({ ...formData, bobot_soal: e.target.value })
                      }
                      className="pr-12"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                      Poin
                    </div>
                  </div>
                </div>
              </div>

              {/* Soal File Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Soal (Gambar)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  {formData.previewImage ? (
                    <div className="space-y-3">
                      <div className="relative">
                        <img
                          src={formData.previewImage}
                          alt="Preview soal"
                          className="max-h-48 mx-auto rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              file_soal: null,
                              previewImage: "",
                            })
                          }
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        {formData.file_soal?.name || "Gambar dari data soal"}
                      </p>
                    </div>
                  ) : (
                    <>
                      <File className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Seret & lepas file gambar atau klik untuk upload
                      </p>
                      <label className="cursor-pointer">
                        <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          <FileUp className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            Pilih File
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSoalChange}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Format: JPG, PNG, GIF (maks. 2MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Pertanyaan Soal */}
              <div className="space-y-2">
                <Label htmlFor="pertanyaan" className="text-sm font-medium">
                  Pertanyaan Soal <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="pertanyaan"
                  placeholder="Masukkan pertanyaan soal..."
                  className="min-h-[120px]"
                  value={formData.pertanyaan_soal}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pertanyaan_soal: e.target.value,
                    })
                  }
                  required
                />
              </div>

              {/* Opsi Jawaban */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">
                  Opsi Jawaban <span className="text-red-500">*</span>
                </Label>

                <div className="grid grid-cols-2 gap-4">
                  {/* Opsi A */}
                  <div
                    className={`space-y-2 ${formData.jawaban_benar === "A" ? "bg-green-50 p-3 rounded-lg border border-green-200" : ""}`}
                  >
                    <Label htmlFor="opsi_a" className="text-sm font-medium">
                      Opsi A
                    </Label>
                    <Input
                      id="opsi_a"
                      placeholder="Masukkan opsi A"
                      value={formData.jawaban_a}
                      onChange={(e) =>
                        setFormData({ ...formData, jawaban_a: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Opsi B */}
                  <div
                    className={`space-y-2 ${formData.jawaban_benar === "B" ? "bg-green-50 p-3 rounded-lg border border-green-200" : ""}`}
                  >
                    <Label htmlFor="opsi_b" className="text-sm font-medium">
                      Opsi B
                    </Label>
                    <Input
                      id="opsi_b"
                      placeholder="Masukkan opsi B"
                      value={formData.jawaban_b}
                      onChange={(e) =>
                        setFormData({ ...formData, jawaban_b: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Opsi C */}
                  <div
                    className={`space-y-2 ${formData.jawaban_benar === "C" ? "bg-green-50 p-3 rounded-lg border border-green-200" : ""}`}
                  >
                    <Label htmlFor="opsi_c" className="text-sm font-medium">
                      Opsi C
                    </Label>
                    <Input
                      id="opsi_c"
                      placeholder="Masukkan opsi C"
                      value={formData.jawaban_c}
                      onChange={(e) =>
                        setFormData({ ...formData, jawaban_c: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Opsi D */}
                  <div
                    className={`space-y-2 ${formData.jawaban_benar === "D" ? "bg-green-50 p-3 rounded-lg border border-green-200" : ""}`}
                  >
                    <Label htmlFor="opsi_d" className="text-sm font-medium">
                      Opsi D
                    </Label>
                    <Input
                      id="opsi_d"
                      placeholder="Masukkan opsi D"
                      value={formData.jawaban_d}
                      onChange={(e) =>
                        setFormData({ ...formData, jawaban_d: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Kunci Jawaban */}
              <div className="space-y-2">
                <Label htmlFor="kunci_jawaban" className="text-sm font-medium">
                  Jawaban Benar <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-4 gap-3">
                  {["A", "B", "C", "D"].map((opsi) => (
                    <button
                      key={opsi}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, jawaban_benar: opsi })
                      }
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-all ${
                        formData.jawaban_benar === opsi
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {formData.jawaban_benar === opsi && (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      <span className="font-medium">Opsi {opsi}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t px-6 py-4">
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={handleBatalAdd}
                  disabled={isAddingSoal}
                >
                  Batal
                </Button>
                <Button
                  onClick={handleAddSoal}
                  disabled={isAddingSoal}
                  className={`${isEditingSoal ? "bg-amber-600 hover:bg-amber-700" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  {isAddingSoal ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isEditingSoal ? "Mengupdate..." : "Menambahkan..."}
                    </>
                  ) : (
                    <>
                      {isEditingSoal ? (
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

              {/* Kategori Soal */}
              <div className="space-y-2">
                <Label htmlFor="kategori" className="text-sm font-medium">
                  Kategori Soal <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.kategori_id}
                  onValueChange={(value) => setKategori(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Kategori Soal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tpa">
                      TPA (Tes Potensi Akademik)
                    </SelectItem>
                    {(dataKategori || []).map((kategori) => (
                      <SelectItem
                        key={kategori.id_kategori}
                        value={kategori.id_kategori}
                      >
                        {kategori.nama_kategori}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  disabled={!importFile || isImporting}
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
