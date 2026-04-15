import { SejarahTagihanYangDihapusType } from "@/types/RekapPerubahanProdiTypes";
import { ucFirst } from "@/utils/UcFirst";
import {
  School,
  Clock,
  CalendarDays,
  Award,
  Waves,
  Calendar,
  UserCircle,
  FileText,
  CheckCircle,
  GraduationCap,
} from "lucide-react";

interface SejarahPerubahanProdiCardProps {
  data: SejarahTagihanYangDihapusType;
}

export default function SejarahTagihanYangDihapusCard({
  data,
}: SejarahPerubahanProdiCardProps) {
  const isApproved = data.TanggalRekap && data.TanggalRekap.trim() !== "";

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Main Content */}
      <div className="p-5">
        {/* Program Studi dan Waktu Kuliah */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            Program Studi
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Program Studi */}
            <div className="p-4 bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <School className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Program Studi</h4>
                  <p className="text-xs text-gray-500">Program yang diambil</p>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Nama Program</p>
                  <p className="text-lg font-bold text-gray-900">
                    {data.NamaProdi}
                  </p>
                </div>
              </div>
            </div>

            {/* Waktu Kuliah */}
            <div className="p-4 bg-linear-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Waktu Kuliah</h4>
                  <p className="text-xs text-gray-500">Jadwal pembelajaran</p>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Sesi</p>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        data.WaktuKuliah === "pagi"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">
                        {data.WaktuKuliah === "pagi" ? "PAGI" : "MALAM"}
                      </p>
                      <p className="text-xs text-gray-500">Shift kuliah</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informasi Pendaftaran */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            Informasi Pendaftaran
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Gelombang */}
            <div className="p-4 bg-linear-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-emerald-900 mb-1">
                    Gelombang Pendaftaran
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {data.GelombangNama}
                  </p>
                </div>
              </div>
            </div>

            {/* Periode */}
            <div className="p-4 bg-linear-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-amber-900 mb-1">
                    Periode Akademik
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {ucFirst(data.PeriodeNama)}
                  </p>
                </div>
              </div>
            </div>

            {/* Peringkat */}
            <div className="p-4 bg-linear-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-purple-900 mb-1">
                    Peringkat Kelulusan
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {data.PeringkatNama}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tanggal Rekap dan Validator */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Tanggal Rekap */}
          <div className="p-4 bg-linear-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900 mb-1">
                  Tanggal Rekap
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {formatDate(data.TanggalRekap)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Data direkap pada tanggal ini
                </p>
              </div>
            </div>
          </div>

          {/* Petugas Validasi */}
          <div className="p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <UserCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-900 mb-1">
                  Petugas Validasi
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {data.UserValidasi || "Belum divalidasi"}
                </p>
                <p className="text-xs text-blue-500 mt-1">
                  {data.UserValidasi ? "Terverifikasi" : "Menunggu verifikasi"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Summary */}
        <div className="mt-6 pt-5 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isApproved ? "bg-green-500" : "bg-yellow-500"
                }`}
              ></div>
              <span className="text-gray-700">
                {isApproved
                  ? "Semua data telah tervalidasi dan siap digunakan"
                  : "Beberapa data masih menunggu validasi"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              <div className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                <span>{data.NamaProdi}</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-1">
                <Waves className="w-4 h-4" />
                <span>{data.GelombangNama}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
