"use client";

import { useState, useEffect, useCallback } from "react";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Calendar,
  Clock,
  Hash,
  FileText,
  Timer,
  AlertCircle,
  Check,
  BookOpen,
  Info,
  Shield,
  ShieldCheck,
  TestTube,
  TestTubes,
} from "lucide-react";
import { SesiUSMFormType } from "@/types/SesiUSMTypes";
import { KategoriUSMType } from "@/types/KategoriUSMTypes";
import { cn } from "@/lib/tiptap-utils";

interface SesiUSMFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Partial<SesiUSMFormType>) => Promise<void> | void;
  initialData?: Partial<SesiUSMFormType>;
  isEditing?: boolean;
  onSuccess?: () => void;
  banksoalOptions?: KategoriUSMType[];
}

export default function SesiUSMFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isEditing = false,
  onSuccess,
  banksoalOptions = [],
}: SesiUSMFormModalProps) {
  const defaultFormData: SesiUSMFormType = {
    sesi_id: "",
    nama_ujian: "",
    kategori_id: "",
    tanggal_mulai: "",
    jam_mulai: "",
    jumlah_soal: "",
    durasi_ujian: "",
    pengacakan_soal: "acak",
    toleransi_terlambat: "",
    is_ujicoba: "",
  };
  const [formData, setFormData] = useState<SesiUSMFormType>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBankSoal, setSelectedBankSoal] =
    useState<KategoriUSMType | null>(null);

  // Fungsi reset form
  const resetForm = useCallback(() => {
    setFormData({
      ...defaultFormData,
    });
    setSelectedBankSoal(null);
  }, []);

  // Set form data ketika initialData berubah (edit mode)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData as SesiUSMFormType);

      if (initialData.kategori_id) {
        const bank = banksoalOptions.find(
          (b) => b.id_kategori === initialData.kategori_id,
        );
        if (bank) {
          setSelectedBankSoal(bank);
        }
      }
    } else {
      resetForm();
    }
  }, [initialData, banksoalOptions]);

  // Update jumlah soal saat bank soal berubah
  useEffect(() => {
    if (selectedBankSoal && !isEditing) {
      // Set jumlah soal default ke semua soal yang tersedia
      setFormData((prev) => ({
        ...prev,
        jumlah_soal: String(selectedBankSoal.TotalSoal),
        NamaBankSoal: selectedBankSoal.nama_kategori,
      }));
    }
  }, [selectedBankSoal, isEditing]);

  // console.log('formData: ', formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    if (!formData.nama_ujian?.trim()) {
      alert("Nama ujian harus diisi");
      return;
    }

    if (!formData.kategori_id) {
      alert("Bank soal harus dipilih");
      return;
    }

    if (!formData.tanggal_mulai) {
      alert("Tanggal dan waktu mulai harus diisi");
      return;
    }

    if (!formData.durasi_ujian || Number(formData.durasi_ujian) <= 0) {
      alert("Durasi ujian harus diisi dan lebih dari 0 menit");
      return;
    }

    if (!formData.jumlah_soal || Number(formData.jumlah_soal) <= 0) {
      alert("Jumlah soal harus diisi dan lebih dari 0");
      return;
    }

    if (
      selectedBankSoal &&
      Number(formData.jumlah_soal) > selectedBankSoal.TotalSoal
    ) {
      alert(
        `Jumlah soal tidak boleh melebihi ${selectedBankSoal.TotalSoal} soal yang tersedia`,
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Siapkan data untuk dikirim
      const dataToSubmit: Partial<SesiUSMFormType> = {
        ...formData,
      };

      // Panggil fungsi submit dari parent
      await onSubmit(dataToSubmit);

      // Jika berhasil, reset form dan close modal
      resetForm();
      onOpenChange(false);

      // Callback success jika ada
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat menyimpan jadwal. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBankSoalChange = (bankId: number) => {
    // console.log('Selected bankId: ', bankId);
    const bank = banksoalOptions.find((b) => Number(b.id_kategori) === bankId);
    setSelectedBankSoal(bank || null);
    setFormData((prev) => ({
      ...prev,
      kategori_id: String(bankId),
      NamaBankSoal: bank?.nama_kategori || "",
    }));
  };

  // Komponen untuk menampilkan info bank soal
  const BankSoalInfo = () => {
    if (!selectedBankSoal) return null;

    return (
      <Card className="border border-blue-100 bg-blue-50/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-blue-800 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Informasi Kategori Soal Terpilih
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Nama Kategori:
              </span>
              <span className="text-sm font-semibold text-blue-700">
                {selectedBankSoal.nama_kategori}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Jumlah Soal Tersedia:
              </span>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                <Hash className="h-3 w-3 mr-1" />
                {selectedBankSoal.TotalSoal} soal
              </Badge>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              <Info className="h-3 w-3 inline mr-1" />
              Anda dapat mengatur jumlah soal yang akan diujikan di bawah ini.
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-0">
          <div className="w-[95vw] max-w-6xl h-[90vh] bg-white mt-10 rounded-xl shadow-lg overflow-y-auto relative">
            {/* Tombol Close */}
            <button
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
              className="absolute top-4 right-4 z-50 bg-white/70 backdrop-blur px-2 py-1 rounded-full border shadow-sm cursor-pointer hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="p-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-linear-to-br from-blue-100 to-blue-200 text-blue-700">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-lg font-semibold">
                    {isEditing ? "Edit" : "Buat"} Jadwal Ujian
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className="border-blue-200 text-blue-700 bg-blue-50"
                    >
                      {isEditing ? "Mengubah Jadwal" : "Jadwal Baru"}
                    </Badge>
                    {isEditing && (
                      <Badge variant="outline" className="font-mono">
                        ID:{" "}
                        {initialData?.sesi_id?.toString().padStart(3, "0") ||
                          "000"}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-600 mt-2 block">
                {isEditing
                  ? "Ubah detail jadwal ujian yang sudah ada"
                  : "Lengkapi form di bawah untuk membuat jadwal ujian baru"}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              {/* Info Banner */}
              <div className="bg-linear-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-800 mb-2">
                      Informasi Penting
                    </p>
                    <ul className="text-xs text-blue-700 space-y-2">
                      <li className="flex items-start gap-1.5">
                        <Check className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
                        <span>
                          <span className="font-medium">Token ujian</span> akan
                          digunakan oleh peserta untuk mengakses ujian
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
                        <span>
                          <span className="font-medium">Durasi ujian</span>{" "}
                          dihitung dalam menit (contoh: 120 menit = 2 jam)
                        </span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <Check className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
                        <span>
                          <span className="font-medium">
                            Toleransi terlambat
                          </span>{" "}
                          adalah waktu maksimal peserta dapat bergabung setelah
                          ujian dimulai
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Nama Jadwal */}
              <div className="space-y-2">
                <Label htmlFor="nama_jadwal" className="text-sm font-medium">
                  Nama Jadwal Ujian <span className="text-red-500">*</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {formData.nama_ujian?.length || 0}/100 karakter
                  </Badge>
                </Label>
                <Input
                  id="nama_jadwal"
                  placeholder="Contoh: USM Reguler Gelombang 1 - 2026"
                  value={formData.nama_ujian || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      nama_ujian: e.target.value,
                    }))
                  }
                  maxLength={100}
                  required
                  className="text-sm"
                />
                <p className="text-xs text-gray-500">
                  Berikan nama untuk mengidentifikasi jadwal ujian ini
                </p>
              </div>

              {/* Grid: Bank Soal & Konfigurasi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kolom 1: Bank Soal */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="kategori_id"
                      className="text-sm font-medium"
                    >
                      Kategori Soal <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={
                        formData.kategori_id !== undefined &&
                        formData.kategori_id !== null
                          ? formData.kategori_id.toString()
                          : undefined
                      }
                      onValueChange={(value) => {
                        if (!value) return;

                        handleBankSoalChange(Number(value));
                      }}
                    >
                      <SelectTrigger id="kategori_id" className="w-full">
                        <SelectValue placeholder="Pilih Kategori Soal" />
                      </SelectTrigger>
                      <SelectContent>
                        {banksoalOptions.map((bank) => (
                          <SelectItem
                            key={bank.id_kategori}
                            value={bank.id_kategori.toString()}
                          >
                            <div className="flex items-center justify-between">
                              <span>{bank.nama_kategori}</span>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {bank.TotalSoal} soal
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      Pilih kategori soal yang akan digunakan untuk ujian
                    </p>
                  </div>

                  {/* Info Kategori Soal Terpilih */}
                  {selectedBankSoal && <BankSoalInfo />}

                  {/* Jumlah Soal */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="jumlah_soal"
                      className="text-sm font-medium"
                    >
                      Jumlah Soal yang Diujikan{" "}
                      <span className="text-red-500">*</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        Maks: {selectedBankSoal?.TotalSoal || 0} soal
                      </Badge>
                    </Label>
                    <Input
                      id="jumlah_soal"
                      type="number"
                      min={1}
                      max={selectedBankSoal?.TotalSoal || 100}
                      value={formData.jumlah_soal || ""}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          jumlah_soal: e.target.value,
                        }))
                      }
                      required
                      className="text-sm"
                    />
                    <p className="text-xs text-gray-500">
                      Tentukan berapa soal yang akan dikerjakan oleh peserta
                    </p>
                  </div>

                  {/* Jenis Soal */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="pengacakan_soal"
                      className="text-sm font-medium"
                    >
                      Jenis Penampilan Soal{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.pengacakan_soal || "acak"}
                      onValueChange={(value: "acak" | "urut") =>
                        setFormData((prev) => ({
                          ...prev,
                          pengacakan_soal: value,
                        }))
                      }
                    >
                      <SelectTrigger id="pengacakan_soal" className="w-full">
                        <SelectValue placeholder="Pilih Jenis Penampilan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="acak">
                          <div className="flex items-center gap-2">
                            <Hash className="h-4 w-4" />
                            <span>Soal Diacak</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="urut">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>Soal Urut</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-xs text-gray-500">
                      {formData.pengacakan_soal === "acak" ? (
                        <div className="flex items-center gap-1.5 text-purple-600">
                          <Info className="h-3 w-3" />
                          Soal akan diacak untuk setiap peserta
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-blue-600">
                          <Info className="h-3 w-3" />
                          Soal akan ditampilkan sesuai urutan
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Kolom 2: Waktu & Token */}
                <div className="space-y-4">
                  {/* Tanggal & Jam */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="tanggal_mulai"
                        className="text-sm font-medium"
                      >
                        Tanggal Mulai <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="tanggal_mulai"
                          type="date"
                          value={formData.tanggal_mulai || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              tanggal_mulai: e.target.value,
                            }))
                          }
                          required
                          className="pl-10 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="jam_mulai"
                        className="text-sm font-medium"
                      >
                        Jam Mulai <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="jam_mulai"
                          type="time"
                          value={formData.jam_mulai || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              jam_mulai: e.target.value,
                            }))
                          }
                          required
                          className="pl-10 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Durasi & Toleransi */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="durasi_ujian"
                        className="text-sm font-medium"
                      >
                        Durasi Ujian (menit){" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Timer className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="durasi_ujian"
                          type="number"
                          min={1}
                          max={1440} // 24 jam
                          value={formData.durasi_ujian || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              durasi_ujian: e.target.value,
                            }))
                          }
                          required
                          className="pl-10 text-sm"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Durasi dalam menit (120 = 2 jam)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="toleransi_terlambat"
                        className="text-sm font-medium"
                      >
                        Toleransi Terlambat (menit){" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <AlertCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="toleransi_terlambat"
                          type="number"
                          min={0}
                          max={3600} // 1 jam
                          value={formData.toleransi_terlambat || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              toleransi_terlambat: e.target.value,
                            }))
                          }
                          required
                          className="pl-10 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ketentuan Waktu */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">
                  Jenis Ujian <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <Card
                    className={cn(
                      "border-2 cursor-pointer transition-all hover:shadow-md",
                      formData.is_ujicoba === "n"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-200",
                    )}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        is_ujicoba: "n",
                      }))
                    }
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center",
                              formData.is_ujicoba === "n"
                                ? "bg-green-500 text-white"
                                : "bg-green-100 text-green-700",
                            )}
                          >
                            <ShieldCheck className="h-3 w-3" />
                          </div>
                          <span>Ujian Normal</span>
                        </div>
                        {formData.is_ujicoba === "n" && (
                          <Badge className="bg-green-500">Terpilih</Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-600">
                        Pilih jenis ujian ini untuk ujian yang akan dilaksanakan
                        secara resmi.
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={cn(
                      "border-2 cursor-pointer transition-all hover:shadow-md",
                      formData.is_ujicoba === "y"
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-amber-200",
                    )}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        is_ujicoba: "y",
                      }))
                    }
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center",
                              formData.is_ujicoba === "y"
                                ? "bg-amber-500 text-white"
                                : "bg-amber-100 text-amber-700",
                            )}
                          >
                            <TestTubes className="h-3 w-3" />
                          </div>
                          <span>Ujian Uji Coba</span>
                        </div>
                        {formData.is_ujicoba === "y" && (
                          <Badge className="bg-amber-500">Terpilih</Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-gray-600">
                        Pilih jenis ujian ini untuk ujian yang bersifat uji coba
                        atau latihan.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <DialogFooter className="gap-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    onOpenChange(false);
                  }}
                  disabled={isSubmitting}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-100"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      {isEditing ? "Menyimpan..." : "Membuat..."}
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4 mr-2" />
                      {isEditing ? "Update Jadwal" : "Buat Jadwal"}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
