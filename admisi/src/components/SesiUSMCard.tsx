// components/SesiUSMCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash2,
  Eye,
  Clock,
  Calendar,
  Hash,
  FileText,
  Key,
  CheckCircle,
  Play,
  CheckCheck,
  Info,
  CalendarClock,
  Timer,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  PenOff,
  TestTubes,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IndonesianDateTimeFormat } from "@/utils/IndonesianDateTimeFormat";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { SesiUSMAlternateType } from "@/types/SesiUSMTypes";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";

interface SesiUSMCardProps {
  data: SesiUSMAlternateType;
  onEdit: (data: SesiUSMAlternateType) => void;
  onAction: (data: SesiUSMAlternateType, status: string) => void;
  onView?: (data: SesiUSMAlternateType) => void;
  onResetToken?: (data: SesiUSMAlternateType) => void;
  isResettingToken?: boolean;
}

export default function SesiUSMCard({
  data,
  onEdit,
  onAction,
  onView,
  onResetToken,
  isResettingToken,
}: SesiUSMCardProps) {
  const [copied, setCopied] = useState(false);
  const [confirmResetToken, setConfirmResetToken] = useState(false);

  // Fungsi untuk copy token
  const handleCopyToken = () => {
    navigator.clipboard
      .writeText(data.TokenUjian)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset setelah 2 detik
      })
      .catch((err) => {
        console.error("Gagal menyalin token:", err);
      });
  };

  const tanggalMulai = !!data.tanggal_mulai
    ? IndonesianDateFormat(data.tanggal_mulai.split(" ")[0])
    : "Tanggal belum diatur";
  const jamMulai = !!data.tanggal_mulai
    ? data.tanggal_mulai.split(" ")[1]
    : "Jam belum diatur";

  // Format durasi
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} menit`;
    if (mins === 0) return `${hours} jam`;
    return `${hours} jam ${mins} menit`;
  };

  // Status ujian berdasarkan waktu
  const getUjianStatus = () => {
    const now = new Date();
    const ujianStart = new Date(`${data.tanggal_mulai}`);
    const ujianEnd = new Date(ujianStart.getTime() + data.durasi_ujian * 60000);

    if (now < ujianStart) {
      // Belum dimulai
      const timeDiff = ujianStart.getTime() - now.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      if (daysDiff > 7) {
        return {
          label: "Terjadwal",
          color: "bg-blue-500/10 text-blue-600 border-blue-200",
          icon: CalendarClock,
          desc: `Dimulai dalam ${daysDiff} hari`,
        };
      } else if (daysDiff > 0) {
        return {
          label: "Segera",
          color: "bg-purple-500/10 text-purple-600 border-purple-200",
          icon: Calendar,
          desc: `Dimulai dalam ${daysDiff} hari`,
        };
      } else {
        const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
        if (hoursDiff > 0) {
          return {
            label: "Segera",
            color: "bg-amber-500/10 text-amber-600 border-amber-200",
            icon: Clock,
            desc: `Dimulai dalam ${hoursDiff} jam`,
          };
        } else {
          return {
            label: "Segera",
            color: "bg-amber-500/10 text-amber-600 border-amber-200",
            icon: Clock,
            desc: "Akan dimulai hari ini",
          };
        }
      }
    } else if (now <= ujianEnd) {
      // Sedang berlangsung
      const timeLeft = ujianEnd.getTime() - now.getTime();
      const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutesLeft = Math.floor(
        (timeLeft % (1000 * 60 * 60)) / (1000 * 60),
      );

      let desc = "";
      if (hoursLeft > 0) {
        desc = `${hoursLeft} jam ${minutesLeft} menit tersisa`;
      } else {
        desc = `${minutesLeft} menit tersisa`;
      }

      return {
        label: "Sedang Berlangsung",
        color: "bg-green-500/10 text-green-600 border-green-200",
        icon: Play,
        desc,
      };
    } else {
      // Selesai
      const timePassed = now.getTime() - ujianEnd.getTime();
      const daysPassed = Math.floor(timePassed / (1000 * 60 * 60 * 24));

      if (daysPassed === 0) {
        return {
          label: "Baru Selesai",
          color: "bg-gray-500/10 text-gray-600 border-gray-200",
          icon: CheckCheck,
          desc: "Selesai hari ini",
        };
      } else if (daysPassed <= 7) {
        return {
          label: "Selesai",
          color: "bg-gray-500/10 text-gray-600 border-gray-200",
          icon: CheckCircle,
          desc: `${daysPassed} hari yang lalu`,
        };
      } else {
        return {
          label: "Selesai",
          color: "bg-gray-500/10 text-gray-600 border-gray-200",
          icon: CheckCircle,
          desc: "Ujian telah berlalu",
        };
      }
    }
  };

  const getJenisSoalConfig = () => {
    return {
      acak: {
        label: "Soal Acak",
        icon: Hash,
        desc: "Soal diacak untuk setiap peserta",
      },
      urut: {
        label: "Soal Urut",
        icon: FileText,
        desc: "Soal ditampilkan sesuai urutan",
      },
    };
  };

  const jenisConfig =
    getJenisSoalConfig()[
      data.pengacakan_soal as keyof ReturnType<typeof getJenisSoalConfig>
    ];

  const status = getUjianStatus();

  const getStatusAktifConfig = () => {
    return {
      aktif: {
        label: "Aktif",
        icon: CheckCircle,
        desc: "Sesi USM aktif dan dapat diakses peserta",
        color: "bg-green-500/10 text-green-600 border-green-200",
      },
      tidak: {
        label: "Tidak Aktif",
        icon: AlertTriangle,
        desc: "Sesi USM tidak aktif dan tidak dapat diakses peserta",
        color: "bg-red-500/10 text-red-600 border-red-200",
      },
    };
  };

  const statusAktif = data.StatusAktif === "aktif" ? "aktif" : "tidak";
  const statusAktifConfig =
    getStatusAktifConfig()[
      statusAktif as keyof ReturnType<typeof getStatusAktifConfig>
    ];

  const getJenisUjianConfig = () => {
    return {
      normal: {
        label: "Sesi Normal",
        icon: ShieldCheck,
        color: "bg-green-500/10 text-green-600 border-green-200",
      },
      ujicoba: {
        label: "Sesi Uji Coba",
        icon: TestTubes,
        desc: "Sesi USM tidak aktif dan tidak dapat diakses peserta",
        color: "bg-amber-500/10 text-amber-600 border-amber-200",
      },
    };
  };

  const jenisUjian = data.is_ujicoba === "y" ? "ujicoba" : "normal";
  const jenisUjianConfig =
    getJenisUjianConfig()[
      jenisUjian as keyof ReturnType<typeof getJenisUjianConfig>
    ];

  useEffect(() => {
    if (!isResettingToken) {
      setConfirmResetToken(false);
    }
  }, [isResettingToken]);

  return (
    <TooltipProvider>
      <Card className="w-full hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 group">
        {/* Header dengan status dan judul */}
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 justify-between">
                <div className="flex flex-row items-center gap-2">
                  <Badge
                    className={`${status.color} border flex items-center gap-1.5 px-3 py-1.5`}
                  >
                    <status.icon className="h-3.5 w-3.5" />
                    <span className="font-semibold">{status.label}</span>
                  </Badge>
                  <div className="text-sm text-gray-500">{status.desc}</div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Badge
                    className={`${statusAktifConfig.color} border flex items-center gap-1.5 px-3 py-1.5`}
                  >
                    <statusAktifConfig.icon className="h-3.5 w-3.5" />
                    <span className="font-semibold">
                      {statusAktifConfig.label}
                    </span>
                  </Badge>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        {statusAktifConfig.desc}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                {data.nama_ujian} -{" "}
                <Badge
                  className={`${jenisUjianConfig.color} border flex items-center gap-1.5 px-3 py-1.5`}
                >
                  <jenisUjianConfig.icon className="h-3.5 w-3.5" />
                  <span className="font-semibold">
                    {jenisUjianConfig.label}
                  </span>
                </Badge>
              </CardTitle>
              <div className="text-sm text-gray-500 mt-1">
                Bank Soal:{" "}
                <span className="font-medium">{data.NamaKategori}</span>
              </div>
            </div>

            {onView && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onView(data)}
                className="h-9 w-9 p-0 hover:bg-blue-50 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Preview Jadwal"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Timeline Visual */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>
                  Dimulai:{" "}
                  {data.tanggal_mulai
                    ? tanggalMulai + " pukul " + jamMulai
                    : "Tanggal dan jam belum diatur"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="h-3 w-3" />
                <span>Durasi: {formatDuration(data.durasi_ujian)}</span>
              </div>
            </div>

            {/* Progress bar visual */}
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  status.label === "Sedang Berlangsung"
                    ? "bg-green-500"
                    : status.label === "Selesai"
                      ? "bg-gray-400"
                      : "bg-blue-500",
                )}
                style={{
                  width:
                    status.label === "Selesai"
                      ? "100%"
                      : status.label === "Sedang Berlangsung"
                        ? "50%"
                        : "0%",
                }}
              />
            </div>
          </div>

          {/* Grid informasi */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Kolom 1: Waktu & Durasi */}
            <div className="space-y-4 p-4 bg-gray-50/50 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Waktu
                  </span>
                </div>
              </div>
              <div className="space-y-3 whitespace-normal">
                <div>
                  <div className="text-xs text-gray-500">Mulai Ujian</div>
                  <div className="text-sm font-medium text-gray-900">
                    {!!data.tanggal_mulai ? (
                      <>
                        {tanggalMulai} pukul {jamMulai}
                      </>
                    ) : (
                      "Tanggal dan jam belum diatur"
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Durasi</div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatDuration(data.durasi_ujian)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">
                    Toleransi Terlambat
                  </div>
                  <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                    {data.toleransi_terlambat} menit
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-gray-400 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs max-w-xs">
                          Waktu maksimal peserta dapat bergabung setelah ujian
                          dimulai
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom 2: Konfigurasi Soal */}
            <div className="space-y-4 p-4 bg-gray-50/50 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Konfigurasi
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-white"
                >
                  <jenisConfig.icon className="h-3 w-3" />
                  {jenisConfig.label}
                </Badge>
              </div>
              <div className="space-y-3 whitespace-normal">
                <div>
                  <div className="text-xs text-gray-500">Jumlah Soal</div>
                  <div className="text-sm font-medium text-gray-900">
                    {data.jumlah_soal} soal
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Jenis Penampilan</div>
                  <div className="text-sm font-medium text-gray-900">
                    {jenisConfig.desc}
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom 3: Token & Info */}
            <div className="space-y-4 p-4 bg-gray-50/50 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Token & Akses
                  </span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setConfirmResetToken(true)}
                      // disabled={isRegenerating}
                      className="h-7 px-2 text-xs text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                    >
                      <>
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Reset
                      </>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      Reset token ujian dan buat yang baru
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500">Token Ujian</div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-mono font-bold text-gray-900 bg-white px-3 py-1.5 rounded border-2 border-dashed border-gray-300 flex-1">
                      {data.TokenUjian ? data.TokenUjian : "Token tidak ada"}
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant={copied ? "default" : "outline"}
                          onClick={handleCopyToken}
                          className={cn(
                            "h-9 px-3 min-w-20 transition-all",
                            copied
                              ? "bg-green-500 hover:bg-green-600 border-green-500 text-white"
                              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600",
                          )}
                        >
                          {copied ? (
                            <>
                              <Check className="h-3.5 w-3.5 mr-1.5" />
                              <span className="text-xs">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5 mr-1.5" />
                              <span className="text-xs">Copy</span>
                            </>
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          {copied
                            ? "Token berhasil disalin!"
                            : "Klik untuk menyalin token ke clipboard"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                {confirmResetToken && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg animate-in fade-in slide-in-from-top-2 whitespace-normal">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs font-medium text-amber-800 mb-2">
                          Reset Token Ujian?
                        </p>
                        <p className="text-xs text-amber-700 mb-3">
                          Token baru akan dibuat. Peserta yang sudah memiliki
                          token lama tidak bisa mengakses ujian.
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            disabled={isResettingToken}
                            variant="outline"
                            onClick={() => onResetToken && onResetToken(data)}
                            className="h-7 px-3 text-xs bg-amber-500 text-white hover:bg-amber-600 hover:text-white border-amber-500"
                          >
                            Ya, Reset Token
                          </Button>
                          <Button
                            size="sm"
                            disabled={isResettingToken}
                            variant="ghost"
                            onClick={() => setConfirmResetToken(false)}
                            className="h-7 px-3 text-xs text-gray-600 hover:text-gray-800"
                          >
                            Batal
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer dengan actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(data)}
                className="h-9 px-4 border-amber-200 text-amber-600 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300"
              >
                <Edit className="h-3.5 w-3.5 mr-1.5" />
                Ubah Sesi
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  data.StatusAktif === "aktif"
                    ? onAction(data, "tidak")
                    : onAction(data, "aktif")
                }
                className={`h-9 px-4 ${data.StatusAktif === "aktif" ? "border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300" : "border-green-200 text-green-600 hover:bg-green-50 hover:text-green-700 hover:border-green-300"}`}
              >
                {data.StatusAktif === "aktif" ? (
                  <PenOff className="h-3.5 w-3.5 mr-1.5" />
                ) : (
                  <Check className="h-3.5 w-3.5 mr-1.5" />
                )}
                {data.StatusAktif === "aktif" ? "Nonaktifkan" : "Aktifkan"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
