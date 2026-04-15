"use client";
import {
  TagihanLOAMagisterType,
  TagihanLOASarjanaType,
} from "@/types/TagihanLOATypes";
import { IndonesianCurrency } from "@/utils/IndonesianCurrency";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";
import { ucFirst } from "@/utils/UcFirst";
import {
  Award,
  Calendar,
  ChevronRight,
  Edit,
  FileText,
  GraduationCap,
  Moon,
  Trash2,
  Sun,
  X,
  Waypoints,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";

interface TagihanLOAMagisterCardProps {
  data: TagihanLOAMagisterType;
  handleEdit?: (data: TagihanLOAMagisterType) => void;
  handleDelete?: (data: TagihanLOAMagisterType) => void;
}

export default function TagihanLOAMagisterCard({
  data,
  handleEdit,
  handleDelete,
}: TagihanLOAMagisterCardProps) {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const getWaktuKuliahColor = (waktu: string) => {
    switch (waktu.toLowerCase()) {
      case "pagi":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "malam":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Calculate total biaya
  const totalBiayaMahasiswaBaru = data.biaya_matrikulasi;
  const totalBiayaKuliahSemester =
    data.biaya_semester_1 + data.biaya_semester_2 + data.biaya_semester_3;
  const totalUangMasuk = totalBiayaMahasiswaBaru + totalBiayaKuliahSemester;

  return (
    <>
      <div className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-blue-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        {/* linear Border Effect */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl p-px -m-px">
          <div className="absolute inset-0 bg-white rounded-2xl" />
        </div>

        {/* Header with Deep Blue linear */}
        <div className="relative bg-linear-to-r from-slate-900 to-slate-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/15 p-2 rounded-xl backdrop-blur-sm ring-1 ring-white/20">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/70 text-xs font-medium tracking-wide">
                  PROGRAM STUDI
                </p>
                <p className="text-white font-bold text-xl tracking-tight">
                  {data.ProgramStudiTagihan}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Gelombang & Waktu Kuliah */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1.5 bg-linear-to-r from-[#0B2F6C] to-[#1B4A8B] text-white text-xs font-medium rounded-lg shadow-sm">
                {data.GelombangTagihan}
              </span>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Periode */}
            <div className="flex items-center gap-3 p-3 bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-200 group">
              <div className="p-2.5 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Periode Akademik
                </p>
                <p className="text-sm font-semibold text-black">
                  {ucFirst(data.PeriodeTagihan)}
                </p>
              </div>
            </div>

            {/* Jalur daftar */}
            {data.jalur_daftar && (
              <div className="flex items-center gap-3 p-3 bg-linear-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 hover:border-amber-200 transition-all duration-200 group">
                <div className="p-2.5 bg-linear-to-br from-amber-500 to-orange-500 rounded-lg shadow-sm">
                  <Waypoints className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-amber-600 font-medium">
                    Jalur Daftar
                  </p>
                  <p className="text-sm font-semibold text-amber-800">
                    {data.jalur_daftar}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Detail Button - Opens Invoice Modal */}
            <button
              onClick={() => setShowInvoiceModal(true)}
              className="w-full cursor-pointer flex items-center justify-between p-3.5 bg-linear-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-white/15 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-white">
                  Detail Tagihan
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/80 transition-all duration-300 group-hover:translate-x-1" />
            </button>

            {/* Edit & Delete Buttons */}
            <div className="flex gap-3">
              {handleEdit && (
                <button
                  onClick={() => handleEdit(data)}
                  className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-[#0B2F6C] text-[#0B2F6C] font-semibold rounded-xl hover:bg-[#0B2F6C] hover:text-white transition-all duration-300 group"
                >
                  <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Edit</span>
                </button>
              )}

              {handleDelete && (
                <button
                  onClick={() => handleDelete(data)}
                  className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-red-500 text-red-500 font-semibold rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 group"
                >
                  <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Hapus</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LOA Modal - Exact Match with PDF */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#f5f5f5] rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
            {/* Modal Header - A4 Controls */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#0B2F6C] rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Pratinjau Letter of Acceptance (LOA)
                  </h3>
                  <p className="text-xs text-gray-500">
                    LOA untuk {data.ProgramStudiTagihan} -{" "}
                    {data.GelombangTagihan} - {ucFirst(data.PeriodeTagihan)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Tutup"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* A4 Canvas - Exact PDF Style */}
            <div className="bg-[#f5f5f5] p-8 flex justify-center">
              <div
                ref={modalContentRef}
                className="bg-white shadow-2xl w-full max-w-[21cm] p-[1.5cm] font-serif"
                style={{
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                  minHeight: "29.7cm",
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: "12pt",
                  lineHeight: "1.5",
                }}
              >
                {/* Kop Surat */}
                <div className="flex flex-row justify-between items-start">
                  {/* Logo UIB */}
                  <Image
                    src={"/logo/logo-uib.png"}
                    alt="Kop Surat"
                    unoptimized
                    className="w-40 h-auto mt-2"
                    width={150}
                    height={150}
                  />
                  {/* Address UIB */}
                  <div className="leading-[0.65rem]">
                    <p className="text-[8px] text-black font-extrabold">
                      UNIVERSITAS INTERNASIONAL BATAM
                    </p>
                    <p className="text-[8px] text-black">
                      Jl. Gajah Mada, Baloi-Sei Ladi, Tiban
                    </p>
                    <p className="text-[8px] text-black">
                      Indah, Kec. Sekupang, Kota Batam,
                    </p>
                    <p className="text-[8px] text-black">
                      Kepulauan Riau 29426
                    </p>
                    <p className="text-[8px] text-black">INDONESIA</p>
                  </div>

                  {/* Web & Kontak UIB */}
                  <div className="leading-[0.65rem]">
                    <p className="text-[8px] text-black">www.uib.ac.id</p>
                    <p className="text-[8px] text-black">humas@uib.ac.id</p>
                    <p className="text-[8px] text-black">
                      Tel +62 778 743 7111
                    </p>
                  </div>
                </div>

                {/* Nomor Surat, Perihal, Lampiran */}
                <div className="mt-6">
                  <table
                    className="w-full border-none"
                    style={{ border: "none" }}
                  >
                    <tbody>
                      <tr className="text-xs">
                        <td
                          className="w-18 font-bold"
                          style={{ border: "none", padding: "2px 0" }}
                        >
                          Nomor
                        </td>
                        <td style={{ border: "none", padding: "2px 0" }}>
                          : (Nomor Surat)
                        </td>
                      </tr>
                      <tr className="text-xs">
                        <td
                          className="w-18 font-bold"
                          style={{ border: "none", padding: "2px 0" }}
                        >
                          Perihal
                        </td>
                        <td style={{ border: "none", padding: "2px 0" }}>
                          : Hasil Ujian Saringan Masuk Mahasiswa Baru TA{" "}
                          {data.PeriodeTagihan.replace("ganjil", "").trim()}
                        </td>
                      </tr>
                      <tr className="text-xs">
                        <td
                          className="w-18 font-bold"
                          style={{ border: "none", padding: "2px 0" }}
                        >
                          Lampiran
                        </td>
                        <td style={{ border: "none", padding: "2px 0" }}>
                          : -
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Yth */}
                <div className="mt-6">
                  <p className="text-black text-sm">
                    Yth. Sdr/i. (Nama Calon Mahasiswa) / No Pendaftaran: (Nomor
                    Daftar)
                  </p>
                  <p className="text-black text-sm mt-1 ">
                    Siswa/i (Asal Sekolah)
                  </p>
                </div>

                {/* Opening Line */}
                <div className="mt-2">
                  <p className="text-black text-sm">Dengan Hormat,</p>
                </div>

                {/* SELAMAT */}
                <div className="mt-6">
                  <p className="text-black leading-relaxed whitespace-normal text-sm text-justify">
                    SELAMAT, Saudara/i dinyatakan{" "}
                    <span className="font-bold">LULUS</span> Ujian Saringan
                    Masuk Calon Mahasiswa Baru Program Magister jalur{" "}
                    {data.jalur_daftar} Universitas Internasional Batam{" "}
                    {data.GelombangTagihan} Tahun Akademik{" "}
                    {`${data.PeriodeTagihan.split("-")[1]}/${Number(data.PeriodeTagihan.split("-")[1]) + 1}`}{" "}
                    yang diselenggarakan pada{" "}
                    {IndonesianDateFormat(data.TanggalUjian)}. Untuk terdaftar
                    sebagai mahasiswa/i {data.GelombangTagihan} Program Studi{" "}
                    <span className="font-bold">
                      {data.ProgramStudiTagihan}
                    </span>
                    , mohon cermati informasi berikut ini :
                  </p>
                </div>

                {/* Tabel Tagihan */}
                <div className="mt-2">
                  <p className="mb-3">
                    1. Jumlah tagihan biaya bagi mahasiswa :
                  </p>

                  {/* Table */}
                  <div className="overflow-x-auto  pl-4">
                    <table
                      className="w-full text-sm border-collapse"
                      style={{ border: "1px solid black" }}
                    >
                      <thead>
                        <tr className="bg-zinc-500 border-b border-black">
                          <th
                            className="px-4 py-2 text-center text-xs font-bold border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            KETERANGAN KOMPONEN BIAYA
                          </th>
                          <th
                            className="px-4 py-2 text-center text-xs font-bold"
                            style={{ border: "1px solid black" }}
                          >
                            JUMLAH
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            className="px-2 py-1 pl-6 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            1) Biaya Kuliah Semester Satu
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {IndonesianCurrency(data.biaya_semester_1)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-2 py-1 pl-6 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            2) Biaya Kuliah Semester Dua
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {IndonesianCurrency(data.biaya_semester_2)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-2 py-1 pl-6 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            3) Biaya Kuliah Semester Tiga
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {IndonesianCurrency(data.biaya_semester_3)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-2 py-1 pl-6 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            4) Biaya Matrikulasi
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {IndonesianCurrency(data.biaya_matrikulasi)}
                          </td>
                        </tr>

                        {/* TOTAL BIAYA */}
                        <tr className="bg-gray-50 font-bold">
                          <td
                            className="px-2 py-1 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            TOTAL BIAYA YANG HARUS DILUNASI
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {IndonesianCurrency(totalUangMasuk)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Daftar Ulang - Exactly like PDF */}
                <div className="mt-6">
                  <div className="flex flex-row items-start gap-2">
                    <p className="mt-1 whitespace-normal text-sm text-justify">
                      2.
                    </p>
                    <p className="mt-1 whitespace-normal text-sm text-justify">
                      Calon mahasiswa harus melakukan daftar ulang dengan
                      membayarkan tagihan di atas paling lambat tanggal{" "}
                      <span className="font-bold">
                        {IndonesianDateFormat(data.TanggalBayar)}
                      </span>
                      . Pembayaran biaya daftar ulang melalui:
                    </p>
                  </div>

                  <div className="ml-8">
                    <p className="ml-1 whitespace-normal text-sm text-justify">
                      A. Nama Bank :{" "}
                      <span className="font-bold">OCBC Bank</span>
                    </p>
                    <p className="ml-6 whitespace-normal text-sm text-justify">
                      No Rekening : (Nomor Virtual Account Calon Mahasiswa)
                    </p>
                    <p className="ml-6">Atas Nama : (Nama Calon Mahasiswa)</p>
                    <p className="ml-6 text-sm">
                      Petunjuk pembayaran pada Lampiran-1.
                    </p>

                    <div className="flex flex-row items-start gap-2">
                      <p className="mt-1 whitespace-normal text-sm text-justify">
                        B.
                      </p>
                      <p className="mt-1 whitespace-normal text-sm text-justify">
                        Jumlah yang dibayar minimal sebesar Rp 3.000.000,- (tiga
                        juta rupiah). Sisa tagihan dapat dicicil perbulan sampai
                        batas waktu yang telah ditentukan (Lampiran-2).
                      </p>
                    </div>

                    <div className="flex flex-row items-start gap-2">
                      <p className="mt-1 whitespace-normal text-sm text-justify">
                        C.
                      </p>
                      <p className="mt-1 whitespace-normal text-sm text-justify">
                        Calon mahasiswa harus melengkapi dan mengunggah dokumen
                        daftar ulang pada laman{" "}
                        <span className="font-bold">pendaftaran.uib.ac.id</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Penutup */}
                <div className="mt-8">
                  <p className="whitespace-normal text-sm text-justify">
                    Demikian informasi ini disampaikan. Informasi lebih lanjut,
                    silakan menghubungi{" "}
                    <span className="font-bold">Humas UIB (0778-7437111</span>{" "}
                    atau <span className="font-bold">WA 0821 7484 6764)</span>{" "}
                    Atas perhatian dan kerjasama Saudara/i, kami ucapkan terima
                    kasih
                  </p>
                </div>

                {/* Signature */}
                <div className="mt-14">
                  <p className="whitespace-normal text-sm text-justify">
                    Batam, {IndonesianDateFormat(data.TanggalCetak)}
                  </p>
                  <br />
                  <br />
                  <br />
                  <p>Panitia PMB Universitas Internasional Batam</p>
                  <p>
                    TA{" "}
                    {`${data.PeriodeTagihan.split("-")[1]}/${Number(data.PeriodeTagihan.split("-")[1]) + 1}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-b-2xl">
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
