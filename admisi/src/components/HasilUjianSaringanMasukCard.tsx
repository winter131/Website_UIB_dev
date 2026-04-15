import { useState } from "react";
import {
  User,
  FileText,
  GraduationCap,
  TrendingUp,
  Users,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Mail,
  Phone,
  BookOpen,
  Award,
  CreditCard,
  FileCheck,
  DollarSign,
} from "lucide-react";
import { HasilUjianSaringanMasukType } from "@/types/HasilUSMTypes";
import { ucFirst } from "@/utils/UcFirst";
import { FaHandsPraying } from "react-icons/fa6";

interface HasilUjianSaringanMasukCardProps {
  data: HasilUjianSaringanMasukType;
}

export default function HasilUjianSaringanMasukCard({
  data,
}: HasilUjianSaringanMasukCardProps) {
  const [showDetailUsm, setShowDetailUsm] = useState(false);
  const [showDetailInfo, setShowDetailInfo] = useState(false);

  // Format nilai rata-rata
  const formatNilai = (nilai: number) => {
    return nilai.toFixed(2);
  };

  // Get color based on nilai
  const getNilaiColor = (nilai: number) => {
    if (nilai >= 70) return "text-emerald-600";
    if (nilai >= 50) return "text-amber-600";
    return "text-red-600";
  };

  // Get status wawancara
  const getWawancaraStatus = (isWawancara: string) => {
    if (isWawancara === data.NomorDaftar || isWawancara === "y")
      return {
        text: "Sudah Wawancara",
        color: "bg-emerald-100 text-emerald-800",
        icon: <CheckCircle className="h-4 w-4" />,
      };
    return {
      text: "Belum Wawancara",
      color: "bg-gray-100 text-gray-800",
      icon: <AlertCircle className="h-4 w-4" />,
    };
  };

  // Get status dokumen
  const getDokumenStatus = (status: string) => {
    if (status === "y")
      return {
        text: "Lengkap",
        color: "bg-emerald-100 text-emerald-800",
        icon: <CheckCircle className="h-4 w-4" />,
      };
    return {
      text: "Tidak Lengkap",
      color: "bg-red-100 text-red-800",
      icon: <XCircle className="h-4 w-4" />,
    };
  };

  // Get status keuangan
  const getKeuanganStatus = (status: string) => {
    if (status === "sudah")
      return {
        text: "Lunas",
        color: "bg-emerald-100 text-emerald-800",
        icon: <CheckCircle className="h-4 w-4" />,
      };
    return {
      text: "Belum Lunas",
      color: "bg-red-100 text-red-800",
      icon: <XCircle className="h-4 w-4" />,
    };
  };

  const wawancaraStatus = getWawancaraStatus(data.IsWawancara);
  const dokumenStatus = getDokumenStatus(data.StatusDokumen);
  const keuanganStatus = getKeuanganStatus(data.StatusKeuangan);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-slate-900 to-slate-800 px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{data.NamaCamhs}</h1>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-blue-200 text-sm">
                  <FileText className="w-4 h-4" />
                  <span>No. Daftar: {data.NomorDaftar}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-col gap-2 items-end">
            <div
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${wawancaraStatus.color}`}
            >
              {wawancaraStatus.icon}
              <span className="text-sm font-medium">
                {wawancaraStatus.text}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
              <TrendingUp className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Nilai Rata-rata: {formatNilai(data.AverageNilaiUsm)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Jenjang */}
          <div className="p-4 bg-linear-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-900 mb-1">Jenjang</p>
                <p className="text-lg font-bold text-gray-900">
                  {data.JenjangCamhs}
                </p>
              </div>
              <div
                className={`w-10 h-10 rounded-lg  bg-emerald-100 flex items-center justify-center`}
              >
                <GraduationCap className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Program Studi */}
          <div className="p-4 bg-linear-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-900 mb-1">Program Studi</p>
                <p className="text-lg font-bold text-gray-900">
                  {data.NamaProdi}
                </p>
              </div>
              <div
                className={`w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center`}
              >
                <BookOpen className="w-5 h-5 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Nilai USM */}
          <div className="p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-900 mb-1">Nilai USM</p>
                <p
                  className={`text-2xl font-bold ${getNilaiColor(data.AverageNilaiUsm)}`}
                >
                  {formatNilai(data.AverageNilaiUsm)}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Detail Info Toggle */}
        <button
          onClick={() => setShowDetailInfo(!showDetailInfo)}
          className="w-full mb-4 flex items-center justify-between p-4 bg-linear-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900 text-lg">
                {showDetailInfo ? "Sembunyikan" : "Tampilkan"} Detail Informasi
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Klik untuk {showDetailInfo ? "menyembunyikan" : "melihat"}{" "}
                informasi lengkap calon mahasiswa
              </p>
            </div>
          </div>
          {showDetailInfo ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Detail Information */}
        {showDetailInfo && (
          <div className="mb-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Agama */}
              <div className="p-4 bg-linear-to-r from-zinc-50 to-slate-50 rounded-lg border border-zinc-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center">
                    <FaHandsPraying className="w-5 h-5 text-zinc-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Agama
                    </p>
                    <p className="text-gray-700 capitalize">
                      {data.AgamaCamhs || "Belum diisi"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="p-4 bg-linear-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Email
                    </p>
                    <p className="text-gray-700">{data.EmailCamhs}</p>
                  </div>
                </div>
              </div>

              {/* No. HP */}
              <div className="p-4 bg-linear-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      No. HP
                    </p>
                    <p className="text-gray-700">{data.NoHpCamhs}</p>
                  </div>
                </div>
              </div>

              {/* Gelombang */}
              <div className="p-4 bg-linear-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Gelombang
                    </p>
                    <p className="text-gray-700">{data.GelombangCamhs}</p>
                  </div>
                </div>
              </div>

              {/* Periode */}
              <div className="p-4 bg-linear-to-r from-lime-50 to-green-50 rounded-lg border border-lime-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-lime-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-lime-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Periode
                    </p>
                    <p className="text-gray-700">
                      {ucFirst(data.PeriodeCamhs)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Jenis Ujian */}
              <div className="p-4 bg-linear-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Jenis Ujian
                    </p>
                    <p className="text-gray-700 capitalize">
                      {data.JenisUjian}
                    </p>
                  </div>
                </div>
              </div>

              {/* Beasiswa */}
              {data.IsBeasiswa === "y" && (
                <div className="p-4 bg-linear-to-r from-red-50 to-rose-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <Award className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        Beasiswa
                      </p>
                      <p className="text-gray-700">
                        {data.BeasiswaNama || "Nama beasiswa tidak ditemukan"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Virtual Account */}
              {data.VaCamhs && (
                <div className="p-4 bg-linear-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        Virtual Account
                      </p>
                      <p className="text-gray-700">{data.VaCamhs}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Detail USM Toggle */}
        <button
          onClick={() => setShowDetailUsm(!showDetailUsm)}
          className="w-full mb-4 flex items-center justify-between p-4 bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-gray-900 text-lg">
                {showDetailUsm ? "Sembunyikan" : "Tampilkan"} Detail USM
              </h3>
              <p className="text-sm text-indigo-700 mt-1">
                Klik untuk {showDetailUsm ? "menyembunyikan" : "melihat"} detail
                nilai per sesi USM
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-indigo-100 text-indigo-800 px-3 py-1.5 rounded-full">
              <span className="text-sm font-medium">
                {(data.DetailUsm || []).length} Sesi
              </span>
            </div>
            {showDetailUsm ? (
              <ChevronUp className="w-5 h-5 text-indigo-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-indigo-600" />
            )}
          </div>
        </button>

        {/* Detail USM */}
        {showDetailUsm && (
          <div className="mb-6 animate-fadeIn">
            <div className="space-y-3">
              {(data.DetailUsm || []).map((sesi, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    sesi.StatusMengikuti === "y"
                      ? "bg-white border-gray-200"
                      : "bg-gray-50 border-gray-200 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            sesi.StatusMengikuti === "y"
                              ? "bg-indigo-100 text-indigo-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <span className="font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {sesi.SesiUsm}
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <span
                              className={`text-sm font-bold ${getNilaiColor(
                                sesi.NilaiCamhs,
                              )}`}
                            >
                              Nilai: {sesi.NilaiCamhs}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                                sesi.StatusMengikuti === "y"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {sesi.StatusMengikuti === "y" ? (
                                <>
                                  <CheckCircle className="w-3 h-3" />
                                  Mengikuti
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3 h-3" />
                                  Tidak Mengikuti
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-4 p-4 bg-linear-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Total Sesi</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {(data.DetailUsm || []).length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Sesi Diikuti</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      (data.DetailUsm || []).filter(
                        (sesi) => sesi.StatusMengikuti === "y",
                      ).length
                    }
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Rata-rata Nilai</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatNilai(data.AverageNilaiUsm)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
