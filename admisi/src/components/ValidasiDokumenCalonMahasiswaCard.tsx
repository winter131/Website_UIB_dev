import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import { ucFirst } from "@/utils/UcFirst";
import {
  GraduationCap,
  BookOpen,
  Clock,
  FileCheck,
  CreditCard,
  TextSearch,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface ValidasiDokumenCalonMahasiswaCardProps {
  data: CalonMahasiswaType;
  onTerima?: (data: CalonMahasiswaType) => Promise<void>;
  onTolak?: (id: string, alasan: string) => Promise<void>;
  isLoading?: boolean;
}

export default function ValidasiDokumenCalonMahasiswaCard({
  data,
  isLoading = false,
}: ValidasiDokumenCalonMahasiswaCardProps) {
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

  const canValidate = data.StatusDokumen === "w";

  const alreadyValidated =
    data.StatusDokumen === "y" ||
    data.StatusDokumen === "n" ||
    data.StatusDokumen === "kep_humas";

  const isDitolak = data.StatusDokumen === "n";

  const isMenungguKepHumas = data.StatusDokumen === "kep_humas";

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
              {/* Status Validasi */}
              {alreadyValidated && (
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    alreadyValidated
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  {/* {alreadyValidated ? "Sudah Divalidasi" : "Belum Divalidasi"} */}
                  {isMenungguKepHumas
                    ? "Menunggu Verifikasi Kepala Humas"
                    : "Sudah Divalidasi"}
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
                    {ucFirst(data.WaktuKuliah)}
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
                      value={data.StatusDokumen}
                    />
                    {isDitolak && (
                      <div className="bg-gray-300 w-full p-2 rounded-md mt-2 overflow-hidden">
                        <p className="font-medium text-red-700">
                          Alasan penolakan:
                        </p>
                        <p className="text-sm whitespace-normal text-slate-900">
                          {data.KeteranganDokumen}
                        </p>
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
                      value={data.StatusKeuangan}
                      isUploadBukti={!!data.LinkBuktiBayar}
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
                  {data.PemilikRekeningKeuangan || "Belum diisi"}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-slate-50">
                <p className="text-sm text-slate-600 mb-2">Bank</p>
                <p className="font-medium text-slate-900">
                  {data.BankBuktiBayar || "Belum diisi"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Link
              href={`/data-calon-mahasiswa/validasi-dokumen/${data.NomorDaftar}/${data.NamaCamhs}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <TextSearch className="w-4 h-4" />
              Lihat Detail
            </Link>
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
    </>
  );
}
