import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import { ucFirst } from "@/utils/UcFirst";
import { is } from "date-fns/locale";
import {
  User,
  GraduationCap,
  BookOpen,
  Clock,
  FileCheck,
  CreditCard,
  Building,
  ExternalLink,
  CheckCircle2,
  Clock3,
  XCircle,
  AlertCircle,
  Check,
  X,
  Loader2,
  ClipboardClock,
  Eye,
  FolderUp,
  UserRoundPen,
  PersonStanding,
  Banknote,
  BookCheck,
  Mail,
  Phone,
} from "lucide-react";
import React, { useState } from "react";

interface CalonMahasiswaCardProps {
  data: CalonMahasiswaType;
}

export default function CalonMahasiswaCard({ data }: CalonMahasiswaCardProps) {
  const [showTolakModal, setShowTolakModal] = useState(false);
  const [alasanTolak, setAlasanTolak] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const StatusIndicator = ({
    type,
    value,
    isUploadBukti,
  }: {
    type: "dokumen" | "keuangan";
    value: string;
    isUploadBukti?: boolean;
  }) => {
    const isComplete =
      type === "dokumen"
        ? value !== "w"
        : value !== "belum" && value !== "tolak";

    return (
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isComplete ? "bg-emerald-500" : "bg-amber-500"
          }`}
        ></div>
        <span className="text-sm font-medium text-slate-700">
          {type === "dokumen"
            ? value === "w"
              ? "Menunggu"
              : "Lengkap"
            : value === "belum"
              ? isUploadBukti
                ? "Menunggu Verifikasi"
                : "Belum Bayar"
              : value === "tolak"
                ? "Ditolak"
                : "Sudah Bayar"}
        </span>
      </div>
    );
  };

  const canValidate = data.StatusKeuangan === "belum";

  const alreadyValidated =
    data.StatusKeuangan === "sudah" || data.StatusKeuangan === "tolak";

  const isDitolak = data.StatusKeuangan === "tolak";

  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-linear-to-r from-slate-900 to-slate-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="avatar">
                  <div className="w-20 rounded-full ring-2 ring-offset-2 ring-white/30">
                    <img src={data.PasPhotoLink || "/img/user-default.png"} />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {data.NamaCamhs}
                  </h1>
                  <p className="text-sm text-slate-300">
                    Nomor Pendaftaran: {data.NomorDaftar}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
                <GraduationCap className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">
                  {data.JenjangCamhs}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Program Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Program Studi</p>
                  <p className="font-semibold text-slate-900">
                    {data.NamaProdi}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Waktu Kuliah</p>
                  <p className="font-semibold text-slate-900">
                    {ucFirst(data.WaktuKuliah)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <PersonStanding className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Jenis Kelamin</p>
                  <p className="font-semibold text-slate-900">
                    {data.JkCamhs === "l" ? "Laki-laki" : "Perempuan"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center">
                  <Banknote className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Virtual Account</p>
                  <p className="font-semibold text-slate-900">
                    {data.VaCamhs || "Belum ada Virtual Account"}
                  </p>
                </div>
              </div>
            </div>
            {/* Program Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <BookCheck className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Jalur Ujian</p>
                  <p className="font-semibold text-slate-900">
                    {ucFirst(data.JenisUjian)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-lime-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-lime-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">NPM</p>
                  <p className="font-semibold text-slate-900">
                    {data.NpmCamhs || "Belum ada NPM"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p className="font-semibold text-slate-900">
                    {data.EmailCamhs || "Belum ada Email"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-stone-50 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-stone-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Nomor Telepon / WA</p>
                  <p className="font-semibold text-slate-900">
                    {data.NoHpCamhs || "Belum ada Nomor Telepon / WA"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informasi Pembayaran */}
        <div className="p-6">
          <div className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-4">
            {/* Informasi Rekening */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Pemilik Rekening</p>
                  <p className="text-sm font-medium text-gray-900">
                    {data.PemilikRekeningKeuangan || "Belum diisi"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Bank</p>
                  <p className="text-sm font-medium text-gray-900">
                    {data.BankBuktiBayar || "Belum diisi"}
                  </p>
                </div>
              </div>
            </div>

            {/* Bukti Bayar */}
            {data.LinkBuktiBayar && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ExternalLink className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Bukti Pembayaran
                      </p>
                      <p className="text-sm text-gray-600 truncate max-w-md">
                        {data.LinkBuktiBayar}
                      </p>
                    </div>
                  </div>
                  <a
                    href={data.LinkBuktiBayar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
                  >
                    Buka <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-slate-200 p-6">
          <div className="grid grid-cols-2 gap-3 items-center justify-end">
            <button
              onClick={() => {}}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
            >
              <ClipboardClock className="w-4 h-4" />
              Log Pendaftaran
            </button>
            <button
              onClick={() => {}}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-lg hover:bg-sky-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              Lihat Detail
            </button>
            <button
              onClick={() => {}}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-50 text-teal-700 border border-teal-200 rounded-lg hover:bg-teal-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
            >
              <FolderUp className="w-4 h-4" />
              Upload Dokumen Calon Mahasiswa
            </button>
            <button
              onClick={() => {}}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
            >
              <UserRoundPen className="w-4 h-4" />
              Ubah Biodata Calon Mahasiswa
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
