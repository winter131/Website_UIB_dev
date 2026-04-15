import { useConfirmation } from "@/store/useConfirmationBox";
import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import {
  User,
  School,
  Clock,
  GraduationCap,
  PersonStanding,
  Phone,
  Shield,
  ArrowRightLeft,
  Hash,
  Route,
  Zap,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

interface JalurOption {
  value: string;
  label: string;
}

interface ManajemenJalurS2CardProps {
  data: CalonMahasiswaType;
  handleUbahJalur?: (data: CalonMahasiswaType, jalurBaru: string) => void;
  jalurOptions?: JalurOption[];
}

export default function ManajemenJalurS2Card({
  data,
  handleUbahJalur,
  jalurOptions = [
    { value: "Reguler", label: "Reguler" },
    { value: "Fast Track", label: "Fast Track" },
    { value: "Khusus", label: "Khusus" },
    { value: "Alumni", label: "Alumni" },
  ],
}: ManajemenJalurS2CardProps) {
  const [selectedJalur, setSelectedJalur] = useState<string>(
    data.JalurDaftar || "",
  );
  const [isLoading, setIsLoading] = useState(false);
  const showConfirmation = useConfirmation.getState().show;

  useEffect(() => {
    setSelectedJalur(data.JalurDaftar || "");
    setIsLoading(false);
  }, [data]);

  const handleJalurChange = (value: string) => {
    showConfirmation({
      title: `Ubah Jalur Pendaftaran?`,
      message: `Apakah Anda yakin ingin mengubah jalur pendaftaran calon mahasiswa ${data.NamaCamhs} (${data.NomorDaftar}) menjadi "${value}"?`,
      icon: "bx bx-question-mark text-4xl",
      confirmButtonText: "Ubah Jalur",
      confirmButtonColor: "bg-green-600",
      onConfirm() {
        handleUbahJalur && handleUbahJalur(data, value);
        setSelectedJalur(value);
        setIsLoading(true);
      },
      showCancelButton: true,
      cancelButtonText: "Batal",
      onCancel() {},
    });
    // handleUbahJalur && handleUbahJalur(data, value);
    // setSelectedJalur(value);
    // setIsLoading(true);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 bg-linear-to-r from-blue-50 to-indigo-50">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-18 h-18 rounded-full bg-linear-to-r from-white to-blue-100 flex items-center justify-center ring-2 ring-white shadow-sm">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-900 truncate text-lg">
                {data.NamaCamhs}
              </h3>
              <p className="text-sm text-gray-600 font-mono px-2 py-0.5 rounded flex flex-row gap-1 items-center just">
                <Hash className="w-4 h-4" /> {data.NomorDaftar}
              </p>
              <p className="text-sm text-gray-600 font-mono px-2 py-0.5 rounded flex flex-row gap-1 items-center just">
                <Phone className="w-4 h-4" /> {data.NoHpCamhs}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 rounded-full flex items-center gap-2 ${
                selectedJalur === "beasiswa"
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  : "bg-blue-100 text-blue-800 border border-blue-200"
              }`}
            >
              {selectedJalur === "Reguler" ? (
                <Route className="w-4 h-4" />
              ) : selectedJalur === "Fast Track" ? (
                <Zap className="w-4 h-4" />
              ) : selectedJalur === "Khusus" ? (
                <Star className="w-4 h-4" />
              ) : selectedJalur === "Alumni" ? (
                <GraduationCap className="w-4 h-4" />
              ) : null}
              <span className="text-sm font-medium">
                {jalurOptions.find((j) => j.value === selectedJalur)?.label ||
                  "-"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5">
        {/* Informasi Dasar Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-100">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-semibold text-amber-900 uppercase">
                Jenjang
              </span>
            </div>
            <p className="text-sm font-bold text-gray-900">
              {data.JenjangCamhs}
            </p>
          </div>

          <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <School className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold text-blue-900 uppercase">
                Prodi
              </span>
            </div>
            <p className="text-sm font-bold text-gray-900 truncate">
              {data.NamaProdi}
            </p>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-violet-50 rounded-lg p-3 border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-semibold text-purple-900 uppercase">
                Waktu
              </span>
            </div>
            <p className="text-sm font-bold text-gray-900">
              {data.WaktuKuliah === "malam" ? "Malam" : "Siang"}
            </p>
          </div>

          <div className="bg-linear-to-br from-gray-50 to-slate-50 rounded-lg p-3 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <PersonStanding className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-900 uppercase">
                Gender
              </span>
            </div>
            <p className="text-sm font-bold text-gray-900">
              {data.JkCamhs === "l" ? "Laki-laki" : "Perempuan"}
            </p>
          </div>
        </div>

        {/* Jalur Pendaftaran Section */}
        <div className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-linear-to-r from-emerald-100 to-teal-100 flex items-center justify-center">
              <ArrowRightLeft className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">
                Jalur Pendaftaran
              </h4>
              <p className="text-sm text-gray-600">
                Pilih jalur pendaftaran untuk calon mahasiswa
              </p>
            </div>
          </div>

          {/* Jalur Options Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {jalurOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleJalurChange(option.value)}
                disabled={isLoading}
                className={`p-4 rounded-lg border transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                  selectedJalur === option.value
                    ? option.value === "beasiswa"
                      ? "bg-linear-to-r from-emerald-500 to-teal-500 text-white border-emerald-600 shadow-lg scale-[1.02]"
                      : "bg-linear-to-r from-blue-500 to-indigo-500 text-white border-blue-600 shadow-lg scale-[1.02]"
                    : "bg-white hover:bg-gray-50 border-gray-300 hover:border-blue-300 hover:shadow"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {option.value === "Reguler" ? (
                  <Route className={`w-6 h-6 text-amber-500`} />
                ) : option.value === "Fast Track" ? (
                  <Zap className={`w-6 h-6 text-amber-500`} />
                ) : option.value === "Khusus" ? (
                  <Star className={`w-6 h-6 text-amber-500`} />
                ) : option.value === "Alumni" ? (
                  <GraduationCap className={`w-6 h-6 text-amber-500`} />
                ) : null}
                <span
                  className={`font-medium text-sm ${
                    selectedJalur === option.value
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  {option.label}
                </span>
                {selectedJalur === option.value && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
              <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Mengubah jalur pendaftaran...</span>
            </div>
          )}

          {/* Current Selection Info */}
          <div className="mt-4 pt-4 border-t border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Jalur saat ini:</p>
                <p className="font-bold text-gray-900 text-lg">
                  {jalurOptions.find((j) => j.value === data.JalurDaftar)
                    ?.label || "Reguler"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
