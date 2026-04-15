import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import { ucAll } from "@/utils/UcAll";
import { ucFirst } from "@/utils/UcFirst";
import {
  User,
  Hash,
  BookOpen,
  CalendarDays,
  Waves,
  BookHeart,
  Shirt,
  GraduationCap,
  Badge,
} from "lucide-react";

interface ListDaftarUlangCardProps {
  data: CalonMahasiswaType;
}

export default function ListDaftarUlangCard({
  data,
}: ListDaftarUlangCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 bg-linear-to-r from-slate-900 to-slate-800 p-3 rounded-t-lg text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">{data.NamaCamhs}</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-gray-300">
                <Badge className="w-4 h-4" />
                <span className="font-mono">
                  {data.NpmCamhs || "Belum ada NPM"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-300">
                <Hash className="w-4 h-4" />
                <span className="font-mono">{data.NomorDaftar}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
          {data.JenjangCamhs}
        </div>
      </div>

      {/* Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4 p-5">
        {/* Program Studi */}
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-500 whitespace-normal">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium text-blue-900">
              Program Studi
            </span>
          </div>
          <p className="font-medium text-gray-900">{data.NamaProdi}</p>
        </div>

        {/* Periode Daftar */}
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-500 whitespace-normal">
          <div className="flex items-center gap-2 mb-1">
            <CalendarDays className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-medium text-amber-900">
              Periode Daftar
            </span>
          </div>
          <p className="font-medium text-gray-900">
            {ucFirst(data.PeriodeCamhs)}
          </p>
        </div>

        {/* Gelombang */}
        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-500 whitespace-normal">
          <div className="flex items-center gap-2 mb-1">
            <Waves className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-900">
              Gelombang
            </span>
          </div>
          <p className="font-medium text-gray-900">{data.GelombangCamhs}</p>
        </div>

        {/* Agama */}
        <div className="p-3 bg-purple-50 rounded-lg border border-purple-500 whitespace-normal">
          <div className="flex items-center gap-2 mb-1">
            <BookHeart className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-medium text-purple-900">Agama</span>
          </div>
          <p className="font-medium text-gray-900">
            {data.AgamaCamhs || "Agama belum diisi"}
          </p>
        </div>

        {/* MK Agama */}
        <div className="p-3 bg-rose-50 rounded-lg border border-rose-500 whitespace-normal">
          <div className="flex items-center gap-2 mb-1">
            <BookHeart className="w-4 h-4 text-rose-600" />
            <span className="text-xs font-medium text-rose-900">MK Agama</span>
          </div>
          <p className="font-medium text-gray-900">
            {data.MkAgama || "Belum diisi"}
          </p>
        </div>

        {/* Size Almamater */}
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-500 whitespace-normal">
          <div className="flex items-center gap-2 mb-1">
            <Shirt className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-medium text-gray-900">
              Size Almamater
            </span>
          </div>
          <p className="font-medium text-gray-900">
            {ucAll(data.SizeAlmamater) || "Belum diisi"}
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <GraduationCap className="w-4 h-4" />
            <span>
              Jenis:{" "}
              {data.JenisDaftar === "baru"
                ? "Baru"
                : data.JenisDaftar === "transfer"
                  ? "Transfer"
                  : data.JenisDaftar === "alihjenjang"
                    ? "Alih Jenjang"
                    : "-"}
            </span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>Waktu: {ucFirst(data.WaktuKuliah)}</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>
              Gender: {data.JkCamhs === "l" ? "Laki-laki" : "Perempuan"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
