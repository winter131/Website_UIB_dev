import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import { ucFirst } from "@/utils/UcFirst";
import {
  GraduationCap,
  BookOpen,
  Clock,
  PersonStanding,
  Banknote,
  Hash,
  Phone,
  PhoneCall,
  Mail,
  BookCheck,
  Printer,
  Trash,
} from "lucide-react";

interface LOACardProps {
  data: CalonMahasiswaType;
  onCetak?: (data: CalonMahasiswaType) => Promise<void>;
  onDelete?: (data: CalonMahasiswaType) => Promise<void>;
  isLoadingCetak?: boolean;
  isLoadingDeleteLOA?: boolean;
}

export default function LOACard({
  data,
  onCetak,
  onDelete,
  isLoadingCetak = false,
  isLoadingDeleteLOA = false,
}: LOACardProps) {
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
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              disabled={isLoadingCetak}
              onClick={() => onCetak && onCetak(data)}
              className="inline-flex items-center justify-center gap-2 p-2 bg-green-50 text-green-700 border border-green-400 rounded-lg hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <Printer className="w-4 h-4" />
              {isLoadingCetak ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-700"></div>
                  Mencetak LOA...
                </>
              ) : (
                "Cetak LOA"
              )}
            </button>

            <button
              disabled={isLoadingDeleteLOA}
              onClick={() => onDelete && onDelete(data)}
              className="inline-flex items-center justify-center gap-2 p-2 bg-red-50 text-red-700 border border-red-400 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <Trash className="w-4 h-4" />
              {isLoadingDeleteLOA ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-700"></div>
                  Menghapus LOA...
                </>
              ) : (
                "Hapus LOA"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
