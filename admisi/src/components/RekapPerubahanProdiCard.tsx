import { RekapPerubahanProdiType } from "@/types/RekapPerubahanProdiTypes";
import {
  User,
  School,
  Clock,
  RefreshCw,
  CheckCircle,
  XCircle,
  Hash,
  Eye,
} from "lucide-react";
import Link from "next/link";

interface RekapPerubahanProdiCardProps {
  data: RekapPerubahanProdiType;
  onApprove?: () => void;
  onReject?: () => void;
  onViewDetail?: () => void;
  isLoading?: boolean;
}

export default function RekapPerubahanProdiCard({
  data,
  onApprove,
  onReject,
  onViewDetail,
  isLoading = false,
}: RekapPerubahanProdiCardProps) {
  const hasProdiChange = data.ProgramStudiLama !== data.ProgramStudiBaru;
  const hasShiftChange = data.ShiftKuliahLama !== data.ShiftKuliahBaru;
  const hasAnyChange = hasProdiChange || hasShiftChange;

  const changeType =
    hasProdiChange && hasShiftChange
      ? "Perubahan Program Studi dan Shift Kuliah"
      : hasProdiChange
        ? "Pindah Program Studi"
        : hasShiftChange
          ? "Pindah Shift Kuliah"
          : "Tidak Ada Perubahan";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="avatar">
                <div className="w-20 rounded-full ring-2 ring-offset-2 ring-white/30">
                  <img src={"/img/user-default.png"} />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  {data.NamaCamhs}
                </h1>
                <div className="flex flex-row items-center gap-3">
                  <p className="text-sm text-slate-300 flex items-center gap-1">
                    <Hash className="w-4 h-4 text-slate-300" />{" "}
                    {data.NomorDaftar}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Status Badge */}
          <div
            className={`px-3 py-1.5 rounded-full flex items-center gap-2 ${
              hasAnyChange
                ? "bg-amber-100 text-amber-800 border border-amber-200"
                : "bg-gray-100 text-gray-800 border border-gray-200"
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">{changeType}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5">
        {/* Perubahan Program Studi */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <School className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Program Studi</h4>
            {hasProdiChange && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                ADA PERUBAHAN
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lama */}
            <div
              className={`p-4 rounded-lg border ${
                hasProdiChange
                  ? "bg-red-50 border-red-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    hasProdiChange ? "bg-red-500" : "bg-gray-400"
                  }`}
                ></div>
                <span className="text-xs font-medium text-gray-700">
                  {hasProdiChange ? "SEBELUMNYA" : "PROGRAM STUDI"}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {data.ProgramStudiLama}
              </p>
              {hasProdiChange && (
                <p className="text-xs text-red-600 mt-1">Akan diganti</p>
              )}
            </div>

            {/* Baru - Hanya tampilkan jika ada perubahan */}
            {hasProdiChange ? (
              <div className="p-4 rounded-lg border bg-green-50 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs font-medium text-gray-700">
                    PERMOHONAN BARU
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {data.ProgramStudiBaru}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Permohonan perubahan
                </p>
              </div>
            ) : (
              // Jika tidak ada perubahan, tampilkan info tidak ada perubahan
              <div className="p-4 rounded-lg border bg-gray-50 border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Tidak Ada Perubahan
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Program studi tetap sama
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Arrow Indicator untuk perubahan - hanya tampilkan jika ada perubahan */}
          {hasProdiChange && (
            <div className="flex items-center justify-center my-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-100 to-green-100 flex items-center justify-center">
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          )}
        </div>

        {/* Perubahan Shift Kuliah */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Shift Kuliah</h4>
            {hasShiftChange && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                ADA PERUBAHAN
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lama */}
            <div
              className={`p-4 rounded-lg border ${
                hasShiftChange
                  ? "bg-red-50 border-red-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    hasShiftChange ? "bg-red-500" : "bg-gray-400"
                  }`}
                ></div>
                <span className="text-xs font-medium text-gray-700">
                  {hasShiftChange ? "SEBELUMNYA" : "SHIFT KULIAH"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    data.ShiftKuliahLama === "pagi"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {data.ShiftKuliahLama === "pagi" ? "PAGI" : "MALAM"}
                  </p>
                  <p className="text-xs text-gray-500">Shift kuliah</p>
                </div>
              </div>
            </div>

            {/* Baru - Hanya tampilkan jika ada perubahan */}
            {hasShiftChange ? (
              <div className="p-4 rounded-lg border bg-green-50 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs font-medium text-gray-700">
                    PERMOHONAN BARU
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      data.ShiftKuliahBaru === "pagi"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {data.ShiftKuliahBaru === "pagi" ? "PAGI" : "MALAM"}
                    </p>
                    <p className="text-xs text-gray-500">Permohonan baru</p>
                  </div>
                </div>
              </div>
            ) : (
              // Jika tidak ada perubahan, tampilkan info tidak ada perubahan
              <div className="p-4 rounded-lg border bg-gray-50 border-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-5 h-5 text-gray-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Tidak Ada Perubahan
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Shift kuliah tetap sama
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Status Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    hasAnyChange ? "bg-amber-500" : "bg-gray-400"
                  }`}
                ></div>
                <span className="text-gray-700">
                  {hasAnyChange
                    ? "Ada permohonan perubahan"
                    : "Tidak ada perubahan"}
                </span>
              </div>
              <span
                className={`font-medium ${
                  hasAnyChange ? "text-amber-700" : "text-gray-600"
                }`}
              >
                {hasProdiChange && hasShiftChange
                  ? "Perubahan Prodi dan Shift"
                  : hasProdiChange
                    ? "Pindah Prodi"
                    : hasShiftChange
                      ? "Pindah Shift"
                      : "Status Tetap"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-gray-200 p-5 bg-gray-50">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Tombol Lihat Detail - selalu tampilkan */}
          <Link
            href={`/data-calon-mahasiswa/rekap-perubahan-prodi/${data.NomorDaftar}/${data.NamaCamhs}`}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors font-medium"
          >
            <Eye className="w-5 h-5" />
            <span>Lihat Detail</span>
          </Link>

          {/* Tombol Tolak dan Setujui - hanya tampilkan jika ada perubahan */}
          {/* {hasAnyChange && (
            <>
              {onReject && (
                <button
                  onClick={onReject}
                  disabled={isLoading}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-red-700 hover:bg-red-50 border border-red-300 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Tolak Permohonan</span>
                </button>
              )}

              {onApprove && (
                <button
                  onClick={onApprove}
                  disabled={isLoading}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 border border-green-600 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Setujui Perubahan</span>
                </button>
              )}
            </>
          )} */}
        </div>

        {/* Loading Indicator - hanya untuk approve/reject */}
        {isLoading && hasAnyChange && (
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <span>Memproses permohonan...</span>
          </div>
        )}
      </div>
    </div>
  );
}
