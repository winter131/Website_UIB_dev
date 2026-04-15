import { RekapPerubahanProdiType } from "@/types/RekapPerubahanProdiTypes";
import {
  User,
  School,
  Clock,
  CalendarDays,
  UserCircle,
  FileText,
  CheckCircle,
  ClockIcon,
  Hash,
} from "lucide-react";

type Props = {
  data: RekapPerubahanProdiType;
};

export default function SejarahPerubahanProdiCard({ data }: Props) {
  const isApproved = data.StatusValidasi === "y";
  const hasChanges =
    data.ProgramStudiLama !== data.ProgramStudiBaru ||
    data.ShiftKuliahLama !== data.ShiftKuliahBaru;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-slate-900 to-slate-800 px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white truncate">
                  {data.NamaCamhs}
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-slate-300 text-sm">
                    <Hash className="w-4 h-4" />
                    <span className="font-mono">{data.NomorDaftar}</span>
                  </div>
                  <div
                    className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                      isApproved
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {isApproved ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <ClockIcon className="w-3 h-3" />
                    )}
                    <span>{isApproved ? "Diterima" : "Menunggu"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5">
        {/* Status Badge */}
        <div className="mb-6 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">
                Status Validasi
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isApproved ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></div>
                <span
                  className={`font-semibold ${
                    isApproved ? "text-green-700" : "text-yellow-700"
                  }`}
                >
                  {isApproved ? "PERUBAHAN DITERIMA" : "MENUNGGU VALIDASI"}
                </span>
              </div>
            </div>
            {data.UserValidasi && (
              <div className="text-right">
                <p className="text-xs text-blue-700 mb-1">Divalidasi oleh</p>
                <p className="text-sm font-medium text-gray-900">
                  {data.UserValidasi}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Perubahan Data */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <School className="w-5 h-5 text-blue-600" />
            Detail Perubahan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sebelum */}
            <div className="p-4 bg-linear-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <School className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Data Sebelumnya
                  </h4>
                  <p className="text-xs text-gray-500">Kondisi awal</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Program Studi</p>
                  <p className="font-medium text-gray-900">
                    {data.ProgramStudiLama}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Shift Kuliah</p>
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
                    <span
                      className={`font-semibold ${
                        data.ShiftKuliahLama === "pagi"
                          ? "text-yellow-700"
                          : "text-blue-700"
                      }`}
                    >
                      {data.ShiftKuliahLama === "pagi" ? "PAGI" : "MALAM"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sesudah */}
            <div
              className={`p-4 rounded-xl border ${
                hasChanges
                  ? "bg-linear-to-br from-emerald-50 to-green-50 border-emerald-200"
                  : "bg-linear-to-br from-gray-50 to-slate-50 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    hasChanges
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <School className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Data Baru</h4>
                  <p className="text-xs text-gray-500">Setelah perubahan</p>
                </div>
                {hasChanges && (
                  <span className="ml-auto text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                    PERUBAHAN
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Program Studi</p>
                  <p
                    className={`font-medium ${
                      data.ProgramStudiLama !== data.ProgramStudiBaru
                        ? "text-emerald-700"
                        : "text-gray-900"
                    }`}
                  >
                    {data.ProgramStudiBaru}
                    {data.ProgramStudiLama !== data.ProgramStudiBaru && (
                      <span className="text-xs text-emerald-600 ml-2">
                        (berubah)
                      </span>
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Shift Kuliah</p>
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
                    <span
                      className={`font-semibold ${
                        data.ShiftKuliahBaru === "pagi"
                          ? "text-yellow-700"
                          : "text-blue-700"
                      }`}
                    >
                      {data.ShiftKuliahBaru === "pagi" ? "PAGI" : "MALAM"}
                      {data.ShiftKuliahLama !== data.ShiftKuliahBaru && (
                        <span className="text-xs text-emerald-600 ml-2">
                          (berubah)
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Arrow Indicator jika ada perubahan */}
          {hasChanges && (
            <div className="flex items-center justify-center my-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                <div className="w-10 h-[2px] bg-linear-to-r from-gray-400 to-emerald-400"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-200"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-300"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              </div>
            </div>
          )}
        </div>

        {/* Informasi Validasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-linear-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-amber-900 mb-1">
                  Waktu Validasi
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {formatDate(data.WaktuValidasi)}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-linear-to-r from-purple-50 to-violet-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <UserCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-purple-900 mb-1">
                  Petugas Validasi
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {data.UserValidasi || "Belum divalidasi"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Catatan Validasi */}
        {data.CatatanValidasi && (
          <div className="bg-linear-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <FileText className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  Catatan Validasi
                </h4>
                <p className="text-xs text-gray-500">Keterangan tambahan</p>
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700">{data.CatatanValidasi}</p>
            </div>
          </div>
        )}

        {/* Footer Summary */}
        <div className="mt-6 pt-5 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isApproved ? "bg-green-500" : "bg-yellow-500"
                }`}
              ></div>
              <span className="text-gray-700">
                {isApproved
                  ? "Perubahan telah divalidasi dan diterima"
                  : "Perubahan sedang menunggu validasi"}
              </span>
            </div>
            {/* <span className="text-gray-500 text-xs">
              0 ID: {data.Id || "N/A"}
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
