import { HasilUSMType } from "@/types/HasilUSMTypes";
import {
  Clock,
  CheckCircle,
  PlayCircle,
  AlertCircle,
  RotateCcw,
  Trash2,
  MoreVertical,
} from "lucide-react";

interface HasilUSMCardProps {
  mahasiswa: HasilUSMType;
  onResetTime?: (data: HasilUSMType) => void;
  onDeleteData?: (data: HasilUSMType) => void;
}

export default function ResetUSMCard({
  mahasiswa,
  onResetTime,
  onDeleteData,
}: HasilUSMCardProps) {
  // Status ujian
  const statusUjian = mahasiswa.WaktuSelesai ? "Sudah Selesai" : "Sedang Ujian";
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

  // Format waktu menjadi hanya jam
  const formatJam = (waktu: string) => {
    if (!waktu) return null;
    const date = new Date(waktu);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format tanggal lengkap
  const formatWaktuLengkap = (waktu: string) => {
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
      <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden">
        {/* Header Card */}
        <div className="px-6 pt-6 pb-4 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className={`relative ${getAvatarColor(
                  mahasiswa.NamaMaba
                )} w-14 h-14 rounded-xl flex items-center justify-center shadow-lg`}
              >
                <span className="text-white font-bold text-xl">
                  {getInitials(mahasiswa.NamaMaba)}
                </span>
              </div>

              {/* Nomor Daftar dan Nama */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700 bg-blue-50 px-3 py-1 rounded-lg">
                    {mahasiswa.NomorDaftar}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      statusUjian === "Sudah Selesai"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-blue-100 text-blue-800 border border-blue-200"
                    }`}
                  >
                    {statusUjian}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 mt-2">
                  {mahasiswa.NamaMaba}
                </h2>
              </div>
            </div>

            {/* Jam Mulai */}
            <div className="text-right">
              <span className="text-xs font-medium text-gray-500 block mb-1">
                Jam Mulai
              </span>
              <div className="flex items-center justify-end gap-2">
                <Clock size={16} className="text-blue-500" />
                <span className="text-lg font-bold text-gray-900">
                  {formatJam(mahasiswa.WaktuMulai) || "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Informasi Detail */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Mulai Ujian */}
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <PlayCircle size={16} className="text-blue-500" />
                <span className="text-xs font-medium text-gray-600">
                  Mulai Ujian
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {formatWaktuLengkap(mahasiswa.WaktuMulai) || "-"}
              </p>
            </div>

            {/* Selesai Ujian */}
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={16} className="text-emerald-500" />
                <span className="text-xs font-medium text-gray-600">
                  Selesai Ujian
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {mahasiswa.WaktuSelesai
                  ? formatWaktuLengkap(mahasiswa.WaktuSelesai)
                  : "Masih berlangsung"}
              </p>
            </div>

            {/* Durasi Ujian */}
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Clock size={16} className="text-purple-500" />
                <span className="text-xs font-medium text-gray-600">
                  Durasi Ujian
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {hitungDurasi() || (
                  <span className="text-blue-600">Sedang berlangsung</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Reset Waktu Selesai Button */}
            <button
              onClick={() => onResetTime && onResetTime(mahasiswa)}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 flex items-center justify-center gap-2 group"
            >
              <RotateCcw
                size={18}
                className="group-hover:rotate-180 transition-transform"
              />
              <span>Reset Waktu Selesai</span>
            </button>

            {/* Hapus Data Mengikuti Button */}
            <button
              onClick={() => onDeleteData && onDeleteData(mahasiswa)}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 flex items-center justify-center gap-2 group"
            >
              <Trash2
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              <span>Hapus Data Mengikuti</span>
            </button>

            {/* More Options (Optional) */}
            <button className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Warning Message */}
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle
                size={16}
                className="text-red-500 mt-0.5 flex-shrink-0"
              />
              <div>
                <p className="text-sm text-red-700 font-medium">
                  Perhatian: Tindakan ini tidak dapat dibatalkan
                </p>
                <p className="text-xs text-red-600 mt-1">
                  Reset waktu akan mengatur ulang waktu selesai ujian. Hapus
                  data akan menghapus seluruh data keikutsertaan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  mahasiswa.WaktuSelesai
                    ? "bg-emerald-500"
                    : "bg-blue-500 animate-pulse"
                }`}
              ></div>
              <span className="text-xs font-medium text-gray-700">
                {canReset ? "Dapat di-reset" : "Terkunci"}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {/* Terakhir diupdate: {new Date().toLocaleDateString("id-ID")} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
