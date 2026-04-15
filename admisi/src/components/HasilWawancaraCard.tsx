import { useState } from "react";
import {
  User,
  FileText,
  GraduationCap,
  Clock,
  UserCheck,
  Award,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Edit,
  Trash2,
  BookOpen,
  Calendar,
  Briefcase,
  Star,
  MessageSquare,
  Users,
  Home,
  Shield,
  Target,
  Zap,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HasilWawancaraType } from "@/types/HasilWawancaraTypes";
import { ucFirst } from "@/utils/UcFirst";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CalonMahasiswaWawancaraCardProps {
  data: any;
  onEdit?: (data: HasilWawancaraType) => void;
  onDelete?: (data: HasilWawancaraType) => void;
  onDetail?: (data: HasilWawancaraType) => void;
}

export default function CalonMahasiswaWawancaraCard({
  data,
  onEdit,
  onDelete,
  onDetail,
}: CalonMahasiswaWawancaraCardProps) {
  const router = useRouter();
  const [showDetail, setShowDetail] = useState(false);

  // Get status penerimaan
  const getStatusPenerimaan = (status: string) => {
    switch (status?.toLowerCase()) {
      case "diterima":
        return {
          text: "Diterima",
          color: "bg-emerald-500 text-white",
          icon: <CheckCircle className="h-3.5 w-3.5" />,
          bgColor: "bg-emerald-50",
          borderColor: "border-emerald-200",
          iconColor: "text-emerald-600",
        };
      case "ditolak":
        return {
          text: "Ditolak",
          color: "bg-rose-500 text-white",
          icon: <XCircle className="h-3.5 w-3.5" />,
          bgColor: "bg-rose-50",
          borderColor: "border-rose-200",
          iconColor: "text-rose-600",
        };
      case "ragu-ragu":
        return {
          text: "Ragu-ragu",
          color: "bg-amber-500 text-white",
          icon: <AlertCircle className="h-3.5 w-3.5" />,
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          iconColor: "text-amber-600",
        };
      default:
        return {
          text: "Belum Diputuskan",
          color: "bg-slate-500 text-white",
          icon: <AlertCircle className="h-3.5 w-3.5" />,
          bgColor: "bg-slate-100",
          borderColor: "border-slate-200",
          iconColor: "text-slate-600",
        };
    }
  };

  // Get beasiswa status
  const getBeasiswaStatus = (beasiswa: string, rekomendasi?: string) => {
    if (beasiswa === "y" || rekomendasi) {
      const isPrestasi = rekomendasi?.includes("Prestasi");
      return {
        text: rekomendasi || "Beasiswa",
        color: isPrestasi
          ? "bg-purple-500 text-white"
          : "bg-blue-500 text-white",
        icon: <Award className="h-3.5 w-3.5" />,
        bgColor: isPrestasi ? "bg-purple-50" : "bg-blue-50",
        borderColor: isPrestasi ? "border-purple-200" : "border-blue-200",
        iconColor: isPrestasi ? "text-purple-600" : "text-blue-600",
      };
    }
    return {
      text: "Reguler",
      color: "bg-slate-500 text-white",
      icon: <Shield className="h-3.5 w-3.5" />,
      bgColor: "bg-slate-100",
      borderColor: "border-slate-200",
      iconColor: "text-slate-600",
    };
  };

  const isCamhsFK = data?.ProdiId === 81;

  // Get waktu kuliah warna
  const getWaktuKuliahColor = (waktu: string) => {
    switch (waktu?.toLowerCase()) {
      case "pagi":
        return "bg-sky-50 text-sky-600";
      case "siang":
        return "bg-amber-50 text-amber-600";
      case "malam":
        return "bg-indigo-50 text-indigo-600";
      default:
        return "bg-slate-50 text-slate-500";
    }
  };

  const DetailItem = ({ icon, title, badge, content }: any) => {
    return (
      <div className="py-3 border-b border-slate-100 last:border-0">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <div className="text-slate-400">{icon}</div>
            <p className="text-sm font-semibold text-slate-800">{title}</p>
          </div>
          {badge && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-500 uppercase tracking-widest">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm text-slate-600 leading-relaxed pl-6 whitespace-pre-line">
          {content || "Tidak diisi."}
        </p>
      </div>
    );
  };

  const CompactStat = ({
    icon,
    label,
    value,
    colorClass = "bg-slate-50 text-slate-500",
  }: any) => {
    return (
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${colorClass}`}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide truncate">
            {label}
          </p>
          <p className="text-sm font-semibold text-slate-900 truncate">
            {value || "-"}
          </p>
        </div>
      </div>
    );
  };

  const statusPenerimaan = getStatusPenerimaan(
    data.WawancaraData?.RekomendasiPenerimaan || data.StatusPenerimaan,
  );

  const beasiswaStatus = getBeasiswaStatus(
    data.IsBeasiswa || "",
    data.WawancaraData?.RekomendasiBeasiswaText,
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      {/* Header Compact */}
      <div className="px-5 py-4 border-b border-slate-800 flex items-start justify-between bg-linear-to-r from-slate-900 to-slate-800">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-linear-to-r from-emerald-500 to-green-500 flex items-center justify-center border-2 border-slate-900">
              <Target className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold text-white truncate mb-0.5">
              {data.NamaCamhs}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-blue-200 font-medium">
              <span className="flex items-center gap-1 shrink-0">
                <FileText className="w-3.5 h-3.5" /> {data.NomorDaftar}
              </span>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-600 shrink-0" />
              <span className="flex items-center gap-1 shrink-0 truncate max-w-[150px] sm:max-w-[200px]">
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />{" "}
                <span className="truncate">{data.NamaProdi}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Absolute Badges on right scale */}
        <div className="hidden sm:flex flex-col items-end gap-1.5 shrink-0 ml-4">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${statusPenerimaan.bgColor} ${statusPenerimaan.iconColor} border ${statusPenerimaan.borderColor}`}
          >
            {statusPenerimaan.icon}
            {statusPenerimaan.text}
          </div>
        </div>
      </div>

      {/* Mobile badges that wraps below title if very small */}
      <div className="sm:hidden px-5 pt-3 pb-2 flex gap-2 border-b border-slate-100 bg-white">
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold ${statusPenerimaan.bgColor} ${statusPenerimaan.iconColor} border ${statusPenerimaan.borderColor}`}
        >
          {statusPenerimaan.icon}
          {statusPenerimaan.text}
        </div>
      </div>

      {/* Core Grid Info */}
      <div className="p-5 flex-1">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-4 mb-5">
          <CompactStat
            icon={<UserCheck className="w-4 h-4" />}
            label="Pewawancara"
            value={data.WawancaraData?.NamaPewawancara}
            colorClass="bg-emerald-50 text-emerald-600"
          />
          <CompactStat
            icon={<Clock className="w-4 h-4" />}
            label="Waktu Kuliah"
            value={
              data?.WawancaraData?.WaktuKuliah
                ? ucFirst(data?.WawancaraData?.WaktuKuliah)
                : ""
            }
            colorClass={getWaktuKuliahColor(data?.WawancaraData?.WaktuKuliah)}
          />
          <CompactStat
            icon={<Calendar className="w-4 h-4" />}
            label="Thn Lulusan"
            value={data?.WawancaraData?.TahunLulusan}
            colorClass="bg-blue-50 text-blue-600"
          />
          <CompactStat
            icon={<BookOpen className="w-4 h-4" />}
            label="Peringkat"
            value={data?.WawancaraData?.RekomendasiPeringkatText}
            colorClass="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Note: if Beasiswa is prominent we can show a special row for it */}
        {data?.WawancaraData?.RekomendasiBeasiswaText && (
          <div className="bg-slate-50 rounded-lg p-3 flex justify-between items-center mb-5 border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Rekomendasi Beasiswa
            </span>
            <span className="text-sm font-bold text-slate-900">
              {data?.WawancaraData?.RekomendasiBeasiswaText}
            </span>
          </div>
        )}

        {/* Dense Detail Section */}
        {data.WawancaraData && (
          <div className="rounded-lg border border-slate-200 mt-2">
            <button
              onClick={() => setShowDetail(!showDetail)}
              className="w-full flex items-center justify-between p-3 bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-semibold text-slate-800">
                  {showDetail
                    ? "Tutup Catatan Penilaian"
                    : "Lihat Catatan Penilaian"}
                </span>
              </div>
              {showDetail ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {showDetail && (
              <div className="p-4 border-t border-slate-200 animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="mb-4">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Catatan Utama Pewawancara
                  </h4>
                  <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-md border border-slate-100 whitespace-pre-line leading-relaxed">
                    {data.WawancaraData.CatatanPewawancara ||
                      "Tidak ada catatan."}
                  </p>
                </div>

                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 mt-5">
                  Rincian Observasi
                </h4>
                <div className="flex flex-col">
                  {isCamhsFK ? (
                    <>
                      <DetailItem
                        icon={<Star className="w-4 h-4" />}
                        title="Etika & Komunikasi"
                        content={data.WawancaraData.motivasi_camhs}
                      />
                      <DetailItem
                        icon={<Users className="w-4 h-4" />}
                        title="Kemampuan Analisa"
                        content={data.WawancaraData.pengetahuan_dasar}
                      />
                      <DetailItem
                        icon={<Briefcase className="w-4 h-4" />}
                        title="Problem Solving"
                        content={data.WawancaraData.kemampuan_tim}
                      />
                      <DetailItem
                        icon={<Shield className="w-4 h-4" />}
                        title="Profesionalisme"
                        content={data.WawancaraData.kesiapan_mental}
                      />
                    </>
                  ) : (
                    <>
                      <DetailItem
                        icon={<Star className="w-4 h-4" />}
                        title="Prestasi Dicapai"
                        content={data.WawancaraData.PrestasiDicapai}
                      />
                      <DetailItem
                        icon={<Users className="w-4 h-4" />}
                        title="Perilaku Saat Wawancara"
                        content={data.WawancaraData.PerilakuCamhs}
                      />
                      <DetailItem
                        icon={<Briefcase className="w-4 h-4" />}
                        title="Keperluan Kerja"
                        content={data.WawancaraData.KeperluanKerja}
                      />
                      <DetailItem
                        icon={<Home className="w-4 h-4" />}
                        title="Sumber Informasi"
                        content={data.WawancaraData.SumberInformasi}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="text-[12px] text-slate-500 font-medium">
          Terakhir ubah:{" "}
          {new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDetail && onDetail(data)}
              className="h-8 text-xs font-semibold border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <Eye className="h-3.5 w-3.5 mr-1.5" /> Lihat Detail
            </Button>
            <Link
              href={`/manajemen-usm/hasil-wawancara/ubah-wawancara/${data.NomorDaftar}/${data.NamaCamhs}`}
              onClick={() => onEdit && onEdit(data)}
              className="h-8 text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors btn btn-sm rounded-lg bg-white shadow-none"
            >
              <Edit className="h-3.5 w-3.5 mr-1.5 text-slate-500" /> Ubah
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete && onDelete(data)}
              className="h-8 text-xs font-semibold border-rose-100 text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Hapus
            </Button>
          </div>

          {/* Mobile Actions Dropdown */}
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-slate-500"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 rounded-lg">
                <DropdownMenuItem
                  onClick={() => onDetail && onDetail(data)}
                  className="text-xs"
                >
                  <Eye className="h-3.5 w-3.5 mr-2 text-blue-500" /> Lihat
                  Detail
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(
                      `/manajemen-usm/hasil-wawancara/ubah-wawancara/${data.NomorDaftar}/${data.NamaCamhs}`,
                    )
                  }
                  className="text-xs"
                >
                  <Edit className="h-3.5 w-3.5 mr-2 text-slate-500" /> Ubah
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete && onDelete(data)}
                  className="text-xs text-rose-600 focus:text-rose-600 focus:bg-rose-50"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-2" /> Hapus Data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
