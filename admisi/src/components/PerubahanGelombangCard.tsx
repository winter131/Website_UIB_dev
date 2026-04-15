import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import { DetailGelombangType } from "@/types/DetailGelombangTypes";
import { ucFirst } from "@/utils/UcFirst";
import {
  GraduationCap,
  BookOpen,
  Clock,
  Hash,
  PhoneCall,
  Mail,
  PersonStanding,
  ArrowRightLeft,
  CalendarRange,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface PerubahanGelombangCardProps {
  data: CalonMahasiswaType;
  handleUbahGelombang?: (
    data: CalonMahasiswaType,
    selectedGelombang: DetailGelombangType,
  ) => void;
  selectGelombangData?: DetailGelombangType[];
}

export default function PerubahanGelombangCard({
  data,
  handleUbahGelombang,
  selectGelombangData,
}: PerubahanGelombangCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGelombang, setSelectedGelombang] = useState<string>(
    String(data.DetailgelombangId) || "",
  );

  useEffect(() => {
    setSelectedGelombang(String(data.DetailgelombangId) || "");
    setIsLoading(false);
  }, [data]);

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
                  <div className="flex flex-row items-center gap-3">
                    <p className="text-sm text-slate-300 flex items-center gap-1">
                      <Hash className="w-4 h-4 text-slate-300" />{" "}
                      {data.NomorDaftar}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Program Info */}
            <div className="space-y-4 col-span-1">
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
            </div>
            <div className="flex flex-row items-center justify-center gap-4 col-span-2 w-full">
              {/* Kontak */}
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <PhoneCall className="w-5 h-5 text-slate-700" />
                  <div>
                    <p className="font-medium text-slate-900">Kontak</p>
                    <div className="text-sm text-slate-700">
                      <p>{data.NoHpCamhs}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-slate-700" />
                  <div className="w-full">
                    <p className="font-medium text-slate-900">Email</p>
                    <div className="text-sm text-slate-700">
                      <p>{data.EmailCamhs}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <div className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-linear-to-r from-emerald-100 to-teal-100 flex items-center justify-center">
                <ArrowRightLeft className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">
                  Gelombang Baru
                </h4>
                <p className="text-sm text-gray-600">
                  Pilih gelombang untuk calon mahasiswa
                </p>
              </div>
            </div>

            {/* Gelombang Options Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {(selectGelombangData || []).map((option) => (
                <button
                  key={option.detail_gelombang_id}
                  onClick={() =>
                    handleUbahGelombang && handleUbahGelombang(data, option)
                  }
                  disabled={isLoading}
                  className={`p-4 rounded-lg border transition-all duration-200 flex flex-col items-center justify-center gap-2 ${selectedGelombang === String(option.detail_gelombang_id) ? "bg-linear-to-r from-blue-500 to-indigo-500 text-white border-blue-600 shadow-lg scale-[1.02]" : "bg-white hover:bg-gray-50 border-gray-300 hover:border-blue-300 hover:shadow"}
                } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <CalendarRange className={`w-6 h-6 text-amber-500`} />

                  <span
                    className={`font-medium text-sm whitespace-normal ${
                      selectedGelombang === String(option.detail_gelombang_id)
                        ? "text-white"
                        : "text-gray-900"
                    }`}
                  >
                    {option.NamaGelombang} - {ucFirst(option.NamaPeriode)}
                  </span>
                  {selectedGelombang === String(option.detail_gelombang_id) && (
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
                <span>Mengubah gelombang pendaftaran...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
