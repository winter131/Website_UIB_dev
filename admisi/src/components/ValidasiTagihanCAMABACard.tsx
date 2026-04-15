import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";
import { ucFirst } from "@/utils/UcFirst";
import {
  GraduationCap,
  BookOpen,
  Clock,
  FileCheck,
  CreditCard,
  X,
  Loader2,
  TextSearch,
  PersonStanding,
  Banknote,
  Hash,
  Phone,
  PhoneCall,
  Mail,
  BookCheck,
  UserCheck,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ValidasiTagihanCAMABACardProps {
  data: CalonMahasiswaType;
  onTerima?: (data: CalonMahasiswaType) => Promise<void>;
  onTolak?: (id: string, alasan: string) => Promise<void>;
  handleTolak: (
    nomorDaftar: string,
    alasanTolak: string,
    data: CalonMahasiswaType,
  ) => void;
  isLoading?: boolean;
}

export default function ValidasiTagihanCAMABACard({
  data,
  onTerima,
  onTolak,
  handleTolak: externalHandleTolak,
  isLoading = false,
}: ValidasiTagihanCAMABACardProps) {
  const [showTolakModal, setShowTolakModal] = useState(false);
  const [alasanTolak, setAlasanTolak] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTolak = async () => {
    if (alasanTolak.trim() && !isProcessing) {
      setIsProcessing(true);
      try {
        await externalHandleTolak(data.NomorDaftar, alasanTolak, data);
        setShowTolakModal(false);
        setAlasanTolak("");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const alreadyValidated =
    data.ApprovalTagihanData.StatusValidasi === "y" ||
    data.ApprovalTagihanData.StatusValidasi === "n";

  const isMenunggu = data.ApprovalTagihanData.StatusValidasi === "w";

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
                  <div className="flex flex-row gap-4 items-center">
                    <p className="text-sm text-slate-300">
                      <Hash className="w-4 h-4 inline" />{" "}
                      {data.NomorDaftar || ""}
                    </p>
                    <p className="text-sm text-slate-300">
                      <PhoneCall className="w-4 h-4 inline" />{" "}
                      {data.NoHpCamhs || "No. HP belum diisi"}
                    </p>
                    <p className="text-sm text-slate-300">
                      <Mail className="w-4 h-4 inline" />{" "}
                      {data.EmailCamhs || "Email belum diisi"}
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

              {isMenunggu && (
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium bg-amber-500/20 text-amber-300`}
                >
                  Menunggu Validasi
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
            {/* Status Section */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <UserCheck className="w-5 h-5 text-slate-700" />
                  <div>
                    <p className="font-medium text-slate-900">
                      Divalidasi oleh
                    </p>
                    <p className="font-normal text-slate-900">
                      {alreadyValidated ? (
                        <>
                          {data.ApprovalTagihanData.UserApproval ||
                            "Nama User Tidak Ditemukan"}
                        </>
                      ) : (
                        "Validasi belum dilakukan"
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-slate-700" />
                  <div>
                    <p className="font-medium text-slate-900">
                      Tanggal Validasi
                    </p>
                    <p className="font-normal text-slate-900">
                      {alreadyValidated ? (
                        <>
                          {IndonesianDateFormat(
                            data.ApprovalTagihanData.TglApproval,
                          ) || "Tanggal Validasi Tidak Ditemukan"}
                        </>
                      ) : (
                        "Validasi belum dilakukan"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Link
              href={`/manajemen-daftar-ulang/validasi-tagihan-camaba/${data.NomorDaftar}/${data.NamaCamhs}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <TextSearch className="w-4 h-4" />
              Lihat Detail
            </Link>
          </div>
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
                onClick={handleTolak}
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
