import { KategoriUSMType } from "@/types/KategoriUSMTypes";
import { SoalUSMType } from "@/types/SoalUSMTypes";
import { IndonesianDateTimeFormat } from "@/utils/IndonesianDateTimeFormat";
import {
  FileText,
  Scale,
  User,
  Calendar,
  CheckCircle,
  BookOpen,
  Layers,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Link,
  EllipsisVertical,
  Edit2,
  Trash,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface SoalUjianCardProps {
  data: SoalUSMType;
  dataKategori: KategoriUSMType[];
  handleEdit?: (data: SoalUSMType) => void;
  handleDelete?: (data: SoalUSMType) => void;
}

export default function SoalUSMCard({
  data,
  dataKategori,
  handleEdit,
  handleDelete,
}: SoalUjianCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if there's an image
  const hasImage = data.FileSoal !== null && data.FileSoal !== "";

  const isImageUrl = data.LinkSoal !== null && data.LinkSoal !== "";

  const namaKategori =
    dataKategori.find(
      (kategori: KategoriUSMType) => kategori.id_kategori === data.kategori_id,
    )?.nama_kategori || "Tidak Diketahui";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-slate-900 to-slate-800 px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Soal Ujian</h1>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-blue-200 text-sm">
                    <Layers className="w-4 h-4" />
                    <span>Kategori: {namaKategori}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bobot Soal Badge */}
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
              <Scale className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Bobot: {data.bobot_soal} Poin
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="hover:bg-slate-600 cursor-pointer"
                  size={"sm"}
                >
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Pengaturan Soal</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => handleEdit && handleEdit(data)}
                  >
                    Ubah
                    <Edit2 className="w-4 h-4 ml-auto text-amber-400" />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete && handleDelete(data)}
                  >
                    Hapus
                    <Trash className="w-4 h-4 ml-auto text-red-400" />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Pertanyaan */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900 text-lg">Pertanyaan</h3>
          </div>

          <div className="p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="whitespace-pre-line text-gray-800">
              {data.pertanyaan_soal}
            </div>
          </div>
        </div>

        {/* Gambar/Image Section */}
        {(hasImage || isImageUrl) && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-gray-900 text-lg">Gambar Soal</h3>
            </div>

            <div className="p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="space-y-4">
                {isImageUrl && (
                  <div>
                    <div className="relative overflow-hidden rounded-lg border border-gray-300 max-w-2xl">
                      <img
                        src={data.LinkSoal!}
                        alt="Gambar Soal"
                        className="w-full h-60 object-contain max-h-96"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.parentElement!.innerHTML = `
                            <div class="p-8 text-center">
                              <Link class="w-12 h-12 text-gray-400 mx-auto mb-2" />
                              <p class="text-gray-500">Gagal memuat gambar dari link</p>
                              <a href="${data.LinkSoal}" target="_blank" rel="noopener noreferrer" 
                                 class="text-blue-600 hover:text-blue-800 text-sm underline mt-2 inline-block">
                                Buka link
                              </a>
                            </div>
                          `;
                        }}
                      />
                    </div>
                    <a
                      href={data.LinkSoal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                    >
                      <Link className="w-4 h-4" />
                      <span>Buka gambar di tab baru</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Expand/Collapse Button for Jawaban */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mb-4 flex items-center justify-between p-4 bg-linear-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900 text-lg">
                {isExpanded ? "Sembunyikan" : "Tampilkan"} Pilihan Jawaban
              </h3>
              <p className="text-sm text-emerald-700 mt-1">
                Klik untuk {isExpanded ? "menyembunyikan" : "melihat"} pilihan
                A, B, C, D dan jawaban yang benar
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full">
              <span className="text-sm font-medium">
                Jawaban Benar: {data.jawaban_benar}
              </span>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-emerald-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-emerald-600" />
            )}
          </div>
        </button>

        {/* Pilihan Jawaban (Expandable) */}
        {isExpanded && (
          <div className="mb-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Jawaban A */}
              <div
                className={`p-4 rounded-lg border ${
                  data.jawaban_benar === "A"
                    ? "bg-emerald-50 border-emerald-300"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      data.jawaban_benar === "A"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="font-bold">A</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{data.jawaban_a}</p>
                    {data.jawaban_benar === "A" && (
                      <div className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-700">
                        <CheckCircle className="w-3 h-3" />
                        <span className="font-medium">Jawaban Benar</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Jawaban B */}
              <div
                className={`p-4 rounded-lg border ${
                  data.jawaban_benar === "B"
                    ? "bg-emerald-50 border-emerald-300"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      data.jawaban_benar === "B"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="font-bold">B</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{data.jawaban_b}</p>
                    {data.jawaban_benar === "B" && (
                      <div className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-700">
                        <CheckCircle className="w-3 h-3" />
                        <span className="font-medium">Jawaban Benar</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Jawaban C */}
              <div
                className={`p-4 rounded-lg border ${
                  data.jawaban_benar === "C"
                    ? "bg-emerald-50 border-emerald-300"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      data.jawaban_benar === "C"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="font-bold">C</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{data.jawaban_c}</p>
                    {data.jawaban_benar === "C" && (
                      <div className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-700">
                        <CheckCircle className="w-3 h-3" />
                        <span className="font-medium">Jawaban Benar</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Jawaban D */}
              <div
                className={`p-4 rounded-lg border ${
                  data.jawaban_benar === "D"
                    ? "bg-emerald-50 border-emerald-300"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      data.jawaban_benar === "D"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span className="font-bold">D</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{data.jawaban_d}</p>
                    {data.jawaban_benar === "D" && (
                      <div className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-700">
                        <CheckCircle className="w-3 h-3" />
                        <span className="font-medium">Jawaban Benar</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* User Update */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">
                  Terakhir Diperbarui Oleh
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {data.UserUpdate || "Belum ada update"}
                </p>
              </div>
            </div>

            {/* Last Update */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-gray-600" />
              </div>
              <div className="whitespace-normal">
                <p className="text-xs text-gray-500 mb-1">
                  Waktu Update Terakhir
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {IndonesianDateTimeFormat(data.LastUpdate) ||
                    "Belum pernah diupdate"}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-900 mb-1">Status Soal</p>
                  <p className="text-sm font-medium text-gray-900">
                    {data.jawaban_benar ? "Aktif" : "Belum lengkap"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Jawaban Valid</p>
                  <div className="flex items-center justify-end gap-1">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        data.jawaban_benar ? "bg-emerald-500" : "bg-yellow-500"
                      }`}
                    ></div>
                    <span className="text-xs font-medium">
                      {data.jawaban_benar ? "✓" : "⚠"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
