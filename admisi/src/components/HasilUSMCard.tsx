import { HasilUSMType } from "@/types/HasilUSMTypes";
import {
  Clock,
  CheckCircle,
  PlayCircle,
  User,
  Calendar,
  AlertCircle,
} from "lucide-react";

interface HasilUSMCardProps {
  mahasiswa: HasilUSMType;
}

export default function HasilUSMCard({ mahasiswa }: HasilUSMCardProps) {
  // Status ujian
  const statusUjian = mahasiswa.WaktuSelesai ? "Selesai" : "Sedang Ujian";
  const canReset = mahasiswa.CanReset === "y";

  // Generate warna avatar berdasarkan inisial
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "bg-gradient-to-br from-purple-500 to-purple-600",
      "bg-gradient-to-br from-pink-500 to-pink-600",
      "bg-gradient-to-br from-emerald-500 to-emerald-600",
      "bg-gradient-to-br from-orange-500 to-orange-600",
      "bg-gradient-to-br from-indigo-500 to-indigo-600",
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  // Format waktu
  const formatWaktu = (waktu: string) => {
    if (!waktu) return null;
    return new Date(waktu).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Hitung durasi
  const hitungDurasi = () => {
    if (!mahasiswa.WaktuSelesai) return null;
    const start = new Date(mahasiswa.WaktuMulai);
    const end = new Date(mahasiswa.WaktuSelesai);
    const diffInMinutes = Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes} menit`;
    } else {
      const jam = Math.floor(diffInMinutes / 60);
      const menit = diffInMinutes % 60;
      return `${jam} jam ${menit} menit`;
    }
  };

  return (
    <div className="group relative">
      {/* Gradient Border Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition duration-500"></div>

      <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
        {/* Header dengan background gradient */}
        <div
          className={`px-6 pt-6 pb-4 ${
            statusUjian === "Selesai"
              ? "bg-gradient-to-r from-emerald-50 to-green-50"
              : "bg-gradient-to-r from-blue-50 to-indigo-50"
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className={`relative ${getAvatarColor(
                  mahasiswa.NamaMaba
                )} w-12 h-12 rounded-xl flex items-center justify-center shadow-md`}
              >
                <span className="text-white font-bold text-lg">
                  {getInitials(mahasiswa.NamaMaba)}
                </span>
                {canReset && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">!</span>
                  </div>
                )}
              </div>

              {/* Nomor Daftar dan Nama */}
              <div>
                <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Nomor Daftar
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-0.5">
                  {mahasiswa.NomorDaftar}
                </h3>
              </div>
            </div>

            {/* Status dan Waktu */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                    statusUjian === "Selesai"
                      ? "bg-emerald-500 text-white"
                      : "bg-blue-500 text-white"
                  } flex items-center gap-1.5`}
                >
                  {statusUjian === "Selesai" ? (
                    <CheckCircle size={12} />
                  ) : (
                    <PlayCircle size={12} />
                  )}
                  {statusUjian}
                </span>
              </div>

              {/* Waktu Mulai */}
              {mahasiswa.WaktuMulai && (
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Calendar size={14} className="text-blue-500" />
                  <span className="font-medium">
                    {formatWaktu(mahasiswa.WaktuMulai)?.split(",")[0]}
                  </span>
                  <Clock size={14} className="text-blue-500 ml-1" />
                  <span className="font-medium">
                    {formatWaktu(mahasiswa.WaktuMulai)?.split(",")[1]}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Nama Mahasiswa */}
          <div className="flex items-center gap-3 mb-6">
            <User size={18} className="text-gray-400" />
            <div>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Mahasiswa
              </span>
              <h2 className="text-lg font-bold text-gray-900 mt-1">
                {mahasiswa.NamaMaba}
              </h2>
            </div>
          </div>

          {/* Informasi Ujian dalam Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Mulai Ujian Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <PlayCircle className="text-blue-600" size={20} />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">
                    Mulai Ujian
                  </span>
                  {mahasiswa.WaktuMulai ? (
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      {formatWaktu(mahasiswa.WaktuMulai)}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 font-medium">-</p>
                  )}
                </div>
              </div>
            </div>

            {/* Selesai Ujian Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="text-emerald-600" size={20} />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">
                    Selesai Ujian
                  </span>
                  {mahasiswa.WaktuSelesai ? (
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      {formatWaktu(mahasiswa.WaktuSelesai)}
                    </p>
                  ) : (
                    <p className="text-sm font-medium text-blue-600">
                      Masih berlangsung
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Durasi Card */}
            <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-xl border border-purple-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="text-purple-600" size={20} />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">
                    Durasi Ujian
                  </span>
                  {mahasiswa.WaktuSelesai ? (
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      {hitungDurasi()}
                    </p>
                  ) : (
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                      <p className="text-sm font-medium text-blue-600">
                        Sedang berlangsung
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {canReset ? (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button className="w-full py-3.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0 shadow-md flex items-center justify-center gap-2 group">
                <AlertCircle size={18} />
                <span>Reset Ujian</span>
                <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full">
                  ⚠️ PERHATIAN
                </span>
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Tombol ini akan mengulang ujian dari awal
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <CheckCircle size={14} className="text-emerald-500" />
                <span>Ujian telah selesai dan terkunci</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Status */}
        <div
          className={`px-6 py-3 ${
            canReset ? "bg-red-50" : "bg-emerald-50"
          } border-t border-gray-100`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {canReset ? (
                <>
                  <AlertCircle size={14} className="text-red-500" />
                  <span className="text-xs font-medium text-red-700">
                    Ujian dapat direset
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle size={14} className="text-emerald-500" />
                  <span className="text-xs font-medium text-emerald-700">
                    Ujian terkunci
                  </span>
                </>
              )}
            </div>
            <div className="text-xs text-gray-500">
              ID: {mahasiswa.NomorDaftar}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
