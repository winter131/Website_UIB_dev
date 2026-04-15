import { CalonMahasiswaRPLType } from "@/types/CalonMahasiswaTypes";
import { ucFirst } from "@/utils/UcFirst";
import { useConfirmation } from "@/store/useConfirmationBox";
import {
  GraduationCap,
  BookOpen,
  Clock,
  FileCheck,
  CreditCard,
  TextSearch,
  ExternalLink,
  Loader2,
  Check,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface ValidasiKeuanganCalonMahasiswaRPLCardProps {
  data: CalonMahasiswaRPLType;
  onTerima?: (data: CalonMahasiswaRPLType) => Promise<void>;
  onTolak?: (
    nomorDaftar: string,
    alasanTolak: string,
    data: CalonMahasiswaRPLType,
  ) => Promise<void>;
  isLoading?: boolean;
  isProcessing?: boolean;
}

export default function ValidasiKeuanganCalonMahasiswaRPLCard({
  data,
  isLoading = false,
  onTerima,
  onTolak,
  isProcessing = false,
}: ValidasiKeuanganCalonMahasiswaRPLCardProps) {
  const [showTolakModal, setShowTolakModal] = useState(false);
  const [alasanTolak, setAlasanTolak] = useState("");
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
        ? value !== "w" && value !== "n" && value !== "kep_humas"
        : value !== "belum" && value !== "tolak";

    return (
      <div className="flex items-center gap-3">
        <div
          className={`w-2 h-2 rounded-full ${
            isComplete ? "bg-emerald-500" : "bg-amber-500"
          }`}
        ></div>
        <span className="text-sm font-medium text-slate-700">
          {type === "dokumen"
            ? value === "w"
              ? "Menunggu"
              : value === "kep_humas"
                ? "Menunggu Verifikasi Kepala Humas"
                : value === "n"
                  ? "Ditolak"
                  : "Diterima"
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

  const handleTolak = async () => {
    if (alasanTolak.trim() && !isProcessing) {
      if (!onTolak) return;
      try {
        await onTolak(data.NomorDaftar!, alasanTolak!, data!);
        setShowTolakModal(false);
        setAlasanTolak("");
      } finally {
      }
    }
  };

  const canValidate = data.StatusKeuanganCamhs === "belum";

  const alreadyValidated =
    data.StatusKeuanganCamhs === "sudah" ||
    data.StatusKeuanganCamhs === "tolak";

  const isDitolak = data.StatusKeuanganCamhs === "tolak";

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
                    <img
                      src={
                        data.DokumenData.PasPhotoLink || "/img/user-default.png"
                      }
                    />
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
              {/* Status Validasi */}
              {alreadyValidated && (
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    alreadyValidated
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  {alreadyValidated ? "Sudah Divalidasi" : "Belum Divalidasi"}
                </div>
              )}
              {isDitolak && (
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isDitolak
                      ? "bg-red-500/20 text-red-300"
                      : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  Ditolak
                </div>
              )}
              {canValidate && (
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    canValidate
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  Menunggu Verifikasi
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    {ucFirst(data.BiodataCamhs.WaktuKuliah)}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <FileCheck className="w-5 h-5 text-slate-700" />
                  <div className="w-full whitespace-normal">
                    <p className="font-medium text-slate-900">Status Dokumen</p>
                    <StatusIndicator
                      type="dokumen"
                      value={data.StatusDokumenCamhs}
                    />
                    {isDitolak && (
                      <div className="bg-gray-300 w-full p-2 rounded-md mt-2 overflow-hidden">
                        <p className="font-medium text-red-700">
                          Alasan penolakan:
                        </p>
                        {/* <p className="text-sm whitespace-normal text-slate-900">
                          {data.KeteranganDokumen}
                        </p> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-slate-700" />
                  <div className="w-full">
                    <p className="font-medium text-slate-900">
                      Status Keuangan
                    </p>
                    <StatusIndicator
                      type="keuangan"
                      value={data.StatusKeuanganCamhs}
                      isUploadBukti={!!data.DokumenData.BuktiBayarLink}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-50">
                <p className="text-sm text-slate-600 mb-2">Pemilik Rekening</p>
                <p className="font-medium text-slate-900">
                  {data.DokumenData.PemilikRekening || "Belum diisi"}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50">
                <p className="text-sm text-slate-600 mb-2">Bank</p>
                <p className="font-medium text-slate-900">
                  {data.DokumenData.BankPembayaran || "Belum diisi"}
                </p>
              </div>
            </div>
          </div>

          {data.DokumenData?.BuktiBayarLink && (
            <div className="mt-6 p-4 rounded-lg border border-blue-200 bg-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-slate-900">
                      Bukti Pembayaran
                    </p>
                    <p className="text-sm text-slate-600 truncate max-w-md">
                      {data.DokumenData.BuktiBayarLink}
                    </p>
                  </div>
                </div>
                <a
                  href={data.DokumenData.BuktiBayarLink}
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

        {/* Action Buttons */}
        <div className="border-t border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={() => setShowTolakModal(true)}
              disabled={!canValidate || isProcessing || isLoading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <X className="w-4 h-4" />
              )}
              Tolak
            </button>
            <button
              onClick={() => onTerima && onTerima(data)}
              disabled={!canValidate || isProcessing || isLoading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Terima
            </button>
          </div>
          {!canValidate && (
            <>
              {!alreadyValidated && (
                <p className="text-sm text-amber-600 mt-3 text-center sm:text-right">
                  *Bukti pembayaran harus diupload untuk dapat melakukan
                  verifikasi
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal Tolak */}
      {showTolakModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Tolak Validasi</h3>
                <p className="text-sm text-slate-600">
                  {data.NamaCamhs} - {data.NomorDaftar}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Alasan Penolakan
              </label>
              <textarea
                value={alasanTolak}
                onChange={(e) => setAlasanTolak(e.target.value)}
                placeholder="Masukkan alasan penolakan..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none min-h-[100px]"
                rows={3}
              />
              <p className="text-xs text-slate-500 mt-1">Minimal 10 karakter</p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowTolakModal(false);
                  setAlasanTolak("");
                }}
                disabled={isProcessing}
                className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowTolakModal(false);
                  handleTolak();
                }}
                disabled={
                  !alasanTolak.trim() ||
                  alasanTolak.trim().length < 10 ||
                  isProcessing
                }
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" />
                    Konfirmasi Tolak
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
