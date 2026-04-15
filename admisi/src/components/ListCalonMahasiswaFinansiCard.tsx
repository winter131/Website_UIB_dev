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
  Hash,
  PhoneCall,
  Mail,
  PersonStanding,
  Banknote,
} from "lucide-react";
import React, { useState } from "react";

interface ValidasiKeuanganCalonMahasiswaCardProps {
  data: CalonMahasiswaType;
}

export default function ValidasiKeuanganCalonMahasiswaCard({
  data,
}: ValidasiKeuanganCalonMahasiswaCardProps) {
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
                  <div className="flex flex-row items-center gap-3">
                    <p className="text-sm text-slate-300 flex items-center gap-1">
                      <Hash className="w-4 h-4 text-slate-300" />{" "}
                      {data.NomorDaftar}
                    </p>
                    <p className="text-sm text-slate-300 flex flex-row items-center gap-1">
                      <PhoneCall className="w-4 h-4 text-slate-300" />
                      {data.NoHpCamhs}
                    </p>
                    <p className="text-sm text-slate-300 flex flex-row items-center gap-1">
                      <Mail className="w-4 h-4 text-slate-300" />
                      {data.EmailCamhs}
                    </p>
                  </div>
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
            {/* Status Section */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <FileCheck className="w-5 h-5 text-slate-700" />
                  <div>
                    <p className="font-medium text-slate-900">Status Dokumen</p>
                    <StatusIndicator
                      type="dokumen"
                      value={data.StatusDokumen}
                    />
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
                    {isDitolak && (
                      <div className="bg-gray-300 w-full p-2 rounded-md mt-2 overflow-hidden">
                        <p className="font-medium text-red-700">
                          Alasan penolakan:
                        </p>
                        <p className="text-sm whitespace-normal text-slate-900">
                          {data.KeteranganPembayaran}
                        </p>
                      </div>
                    )}
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

          <hr className="my-4" />
          {/* Formulir Cicilan */}
          {data.FormulirCicilan ? (
            <div className="p-4 rounded-lg border border-stone-200 bg-stone-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-5 h-5 text-stone-600" />
                  <div>
                    <p className="font-medium text-slate-900">
                      Formulir Cicilan
                    </p>
                    <p className="text-sm text-slate-600 truncate max-w-md">
                      {data.FormulirCicilan}
                    </p>
                  </div>
                </div>
                <a
                  href={data.FormulirCicilan}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 hover:text-stone-800 font-medium text-sm flex items-center gap-1"
                >
                  Buka <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg border border-stone-200 bg-stone-50">
              <p className="text-sm text-stone-600">
                Calon mahasiswa tidak mengunggah formulir cicilan.
              </p>
            </div>
          )}

          {/* Bukti Bayar */}
          {data.LinkBuktiBayar ? (
            <div className="mt-2 p-4 rounded-lg border border-slate-200 bg-slate-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-5 h-5 text-slate-600" />
                  <div>
                    <p className="font-medium text-slate-900">
                      Bukti Pembayaran
                    </p>
                    <p className="text-sm text-slate-600 truncate max-w-md">
                      {data.LinkBuktiBayar}
                    </p>
                  </div>
                </div>
                <a
                  href={data.LinkBuktiBayar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-800 font-medium text-sm flex items-center gap-1"
                >
                  Buka <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="mt-2 p-4 rounded-lg border border-slate-200 bg-slate-50">
              <p className="text-sm text-slate-600">
                Calon mahasiswa belum mengunggah bukti pembayaran.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
