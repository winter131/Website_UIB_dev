"use client";
import { TagihanLOASarjanaType } from "@/types/TagihanLOATypes";
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
  Download,
  Printer,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";

interface TagihanLOASarjanaCardProps {
  data: TagihanLOASarjanaType;
  handleEdit?: (data: TagihanLOASarjanaType) => void;
  handleDelete?: (data: TagihanLOASarjanaType) => void;
}

export default function TagihanLOASarjanaCard({
  data,
  handleEdit,
  handleDelete,
}: TagihanLOASarjanaCardProps) {
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
  const totalBiayaMahasiswaBaru = data.biaya_spp + data.biaya_ppl;
  const totalBiayaKuliahSemester =
    data.biaya_bpp + data.biaya_sks + data.biaya_praktikum + data.biaya_toeic;
  const totalUangMasuk = totalBiayaMahasiswaBaru + totalBiayaKuliahSemester;

  // Calculate potongan
  const totalPotongan =
    data.potongan_spp +
    data.potongan_bpp +
    data.potongan_sks +
    data.potongan_praktikum;
  const totalSetelahPotongan = totalUangMasuk - totalPotongan;

  // Calculate persentase potongan
  const persenPotonganSPP =
    data.biaya_spp > 0
      ? Math.round((data.potongan_spp / data.biaya_spp) * 100)
      : 0;
  const persenPotonganBPP =
    data.biaya_bpp > 0
      ? Math.round((data.potongan_bpp / data.biaya_bpp) * 100)
      : 0;
  const persenPotonganSKS =
    data.biaya_sks > 0
      ? Math.round((data.potongan_sks / data.biaya_sks) * 100)
      : 0;
  const persenPotonganPraktikum =
    data.biaya_praktikum > 0
      ? Math.round((data.potongan_praktikum / data.biaya_praktikum) * 100)
      : 0;

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow && modalContentRef.current) {
      const content = modalContentRef.current.cloneNode(true) as HTMLElement;

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>LOA - ${data.ProgramStudiTagihan}</title>
            <style>
              @page {
                size: A4;
                margin: 2cm;
              }
              body {
                font-family: 'Times New Roman', Times, serif;
                line-height: 1.5;
                color: #000;
                background: white;
                margin: 0;
                padding: 0;
                font-size: 12pt;
              }
              .a4-container {
                max-width: 21cm;
                margin: 0 auto;
                background: white;
                padding: 0.5cm;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin: 15px 0;
                font-size: 11pt;
              }
              th, td {
                border: 1px solid #000;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f0f0f0;
                font-weight: bold;
              }
              .text-right {
                text-align: right;
              }
              .font-bold {
                font-weight: bold;
              }
              .border-bottom {
                border-bottom: 2px solid #000;
              }
              .mt-4 {
                margin-top: 20px;
              }
              .mb-4 {
                margin-bottom: 20px;
              }
              .p-4 {
                padding: 20px;
              }
              .text-lg {
                font-size: 14pt;
              }
              .text-xl {
                font-size: 16pt;
              }
              .bg-gray {
                background-color: #f8f9fa;
              }
              .bg-blue-light {
                background-color: #e6f0fa;
              }
              .bg-amber-light {
                background-color: #fff4e5;
              }
            </style>
          </head>
          <body>
            <div class="a4-container">
              ${content.innerHTML}
            </div>
            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

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
              <span
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border flex items-center gap-1.5 ${getWaktuKuliahColor(
                  data.waktu_kuliah,
                )}`}
              >
                {data.waktu_kuliah === "pagi" ? (
                  <>
                    <Sun className="w-3.5 h-3.5" />
                    <span>{ucFirst(data.waktu_kuliah)}</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5" />
                    <span>{ucFirst(data.waktu_kuliah)}</span>
                  </>
                )}
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

            {/* Peringkat/Beasiswa */}
            {data.PeringkatDicapai && (
              <div className="flex items-center gap-3 p-3 bg-linear-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 hover:border-amber-200 transition-all duration-200 group">
                <div className="p-2.5 bg-linear-to-br from-amber-500 to-orange-500 rounded-lg shadow-sm">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-amber-600 font-medium">
                    Peringkat
                  </p>
                  <p className="text-sm font-semibold text-amber-800">
                    {data.PeringkatDicapai}
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
                    {data.GelombangTagihan} - {ucFirst(data.PeriodeTagihan)} -{" "}
                    {data.PeringkatDicapai || "N/A"}
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
                          : 1 bundel
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

                {/* SELAMAT, Saudara/i dinyatakan <span style="font-weight: bold;"><u>LULUS</u></span> Ujian Saringan Masuk Mahasiswa Baru Universitas Internasional Batam <span style="font-weight: bold;">Gelombang <?php if ($isbeasiswa == 'y') {echo $gelombang;} else {echo "Regular ".$gelombang;}?></span> Tahun Akademik <?php echo $tahun;?>/<?php echo $tahun+1;?> yang diselenggarakan di <?=$lokasi?> pada tanggal <span style="font-weight: bold;"><?=$tanggaltest?></span>. Untuk <span style="font-weight: bold;">terdaftar</span> sebagai mahasiswa/i
							<?=$gelombang?> Program Studi <span style="font-weight: bold;"> <?=$prodi?>, Kelas <?=$waktukul?>, </span> mohon cermati informasi berikut ini : */}

                {/* SELAMAT */}
                <div className="mt-6">
                  <p className="text-black leading-relaxed whitespace-normal text-sm text-justify">
                    SELAMAT, Saudara/i dinyatakan{" "}
                    <span className="font-bold">LULUS</span> Ujian Saringan
                    Masuk Mahasiswa Baru Universitas Internasional Batam{" "}
                    <span className="font-bold">
                      {data.IsBeasiswa === "y"
                        ? `Gelombang ${data.GelombangTagihan}`
                        : `Regular ${data.GelombangTagihan}`}
                    </span>{" "}
                    Tahun Akademik{" "}
                    {`${data.PeriodeTagihan.split("-")[1]}/${Number(data.PeriodeTagihan.split("-")[1]) + 1}`}{" "}
                    yang diselenggarakan di {data.LokasiUjian} pada tanggal{" "}
                    <span className="font-bold">
                      {IndonesianDateFormat(data.TanggalUjian)}
                    </span>
                    . Untuk <span className="font-bold">terdaftar</span> sebagai
                    mahasiswa/i {data.GelombangTagihan} Program Studi{" "}
                    <span className="font-bold">
                      {data.ProgramStudiTagihan}
                    </span>
                    ,{" "}
                    <span className="font-bold capitalize">
                      Kelas {data.waktu_kuliah}
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
                        {/* A. Biaya Mahasiswa Baru */}
                        <tr className="bg-gray-50">
                          <td
                            className="px-2 py-1 border-r border-black"
                            style={{ border: "1px solid black" }}
                            colSpan={2}
                          >
                            A. Biaya Mahasiswa Baru{" "}
                            <span className="font-bold">
                              (hanya sekali di tahun pertama)
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-2 py-1 pl-6 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            1) Sumbangan Penyelenggaraan Pendidikan (SPP)/Uang
                            Gedung
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {IndonesianCurrency(data.biaya_spp)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-2 py-1 pl-6 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            2) Biaya PPL (Penyelenggaraan Pendidikan &
                            Lain-lain)
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {IndonesianCurrency(data.biaya_ppl)}
                          </td>
                        </tr>

                        {/* B. Biaya Kuliah Semester */}
                        <tr className="bg-gray-50">
                          <td
                            className="px-2 py-1 border-r border-black"
                            style={{ border: "1px solid black" }}
                            colSpan={2}
                          >
                            B. Biaya Kuliah untuk{" "}
                            <span className="font-bold">Semester Satu :</span>
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-2 py-1 pl-6 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            1) Biaya Penyelenggaraan Pendidikan Pokok (BPP
                            Pokok)
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {IndonesianCurrency(data.biaya_bpp)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-2 py-1 pl-6 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            2) BPP SKS Semester I
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {IndonesianCurrency(data.biaya_sks)}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-2 py-1 pl-6 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            3) BPP Praktikum
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {IndonesianCurrency(data.biaya_praktikum)}
                          </td>
                        </tr>

                        {/* C. Total Uang Masuk */}
                        <tr className="font-bold">
                          <td
                            className="px-2 py-1 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            C. Total Uang Masuk (A+B)
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {IndonesianCurrency(totalUangMasuk)}
                          </td>
                        </tr>

                        {/* D. BEASISWA */}
                        <tr className="bg-gray-50">
                          <td
                            className="px-2 py-1 font-bold border-r border-black"
                            style={{ border: "1px solid black" }}
                            colSpan={2}
                          >
                            D. BEASISWA YANG DIRAIH:{" "}
                            {data.IsBeasiswa === "y"
                              ? data.PeringkatDicapai || "-"
                              : "-"}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-2 py-1 pl-6 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            1) Potongan Uang Gedung, sebesar {persenPotonganSPP}
                            %
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {data.potongan_spp > 0
                              ? IndonesianCurrency(data.potongan_spp)
                              : "Rp 0"}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-2 py-1 pl-6 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            2) Potongan BPP Pokok, sebesar {persenPotonganBPP}%
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {data.potongan_bpp > 0
                              ? IndonesianCurrency(data.potongan_bpp)
                              : "Rp 0"}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-2 py-1 pl-6 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            3) Potongan BPP SKS, sebesar {persenPotonganSKS}%
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {data.potongan_sks > 0
                              ? IndonesianCurrency(data.potongan_sks)
                              : "Rp 0"}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="px-2 py-1 pl-6 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            4) Potongan BPP Praktikum, sebesar{" "}
                            {persenPotonganPraktikum}%
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {data.potongan_praktikum > 0
                              ? IndonesianCurrency(data.potongan_praktikum)
                              : "Rp 0"}
                          </td>
                        </tr>
                        <tr className="bg-gray-50 font-bold">
                          <td
                            className="px-2 py-1 pl-6 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            JUMLAH POTONGAN BEASISWA
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {IndonesianCurrency(totalPotongan)}
                          </td>
                        </tr>

                        {/* E. TOTAL BIAYA */}
                        <tr className="bg-gray-50 font-bold">
                          <td
                            className="px-2 py-1 border-r border-black"
                            style={{ border: "1px solid black" }}
                          >
                            E. TOTAL BIAYA YANG HARUS DILUNASI (C-D)
                          </td>
                          <td
                            className="px-2 py-1 text-right"
                            style={{ border: "1px solid black" }}
                          >
                            {IndonesianCurrency(totalSetelahPotongan)}
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
                      membayarkan tagihan di atas (1.E) paling lambat tanggal{" "}
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
                      Petunjuk pembayaran pada{" "}
                      <span className="font-bold">Lampiran-1</span>.
                    </p>

                    <div className="flex flex-row items-start gap-2">
                      <p className="mt-1 whitespace-normal text-sm text-justify">
                        B.
                      </p>
                      <p className="mt-1 whitespace-normal text-sm text-justify">
                        Jumlah yang dibayar minimal sebesar Rp 3.000.000,- (tiga
                        juta rupiah). Sisa tagihan dapat dicicil perbulan sampai
                        tanggal {IndonesianDateFormat(data.TanggalBayar)} dengan
                        mengisi Surat Pernyataan Cicilan Biaya Kuliah{" "}
                        <span className="font-bold">(Lampiran-3)</span>.
                      </p>
                    </div>

                    <div className="flex flex-row items-start gap-2">
                      <p className="mt-1 whitespace-normal text-sm text-justify">
                        C.
                      </p>
                      <p className="mt-1 whitespace-normal text-sm text-justify">
                        Calon mahasiswa harus melengkapi dan mengunggah dokumen
                        daftar ulang pada laman{" "}
                        <span className="font-bold">pendaftaran.uib.ac.id</span>{" "}
                        (pedoman pada{" "}
                        <span className="font-bold">Lampiran-2</span>
                        ).
                      </p>
                    </div>

                    <div className="flex flex-row items-start gap-2">
                      <p className="mt-1 whitespace-normal text-sm text-justify">
                        D.
                      </p>
                      <p className="mt-1 whitespace-normal text-sm text-justify font-bold">
                        Ketentuan pengunduran diri dan pengembalian pembayaran,
                        silakan baca Lampiran-2
                      </p>
                    </div>
                  </div>
                </div>

                {/* CATATAN PENTING */}
                <div className="mt-6">
                  <p className="font-bold">CATATAN PENTING:</p>
                  <p className="whitespace-normal text-sm text-justify">
                    Bagi calon mahasiswa peraih beasiswa Prestasi 3 dan Prestasi
                    4, serta program regular, apabila melakukan pelunasan
                    pembayaran pada periode daftar ulang (
                    {IndonesianDateFormat(data.TanggalCetak)} -{" "}
                    {IndonesianDateFormat(data.TanggalBayar)}), maka akan
                    mendapat potongan sebesar{" "}
                    <span className="font-bold">Rp 1.000.000,</span>- (satu juta
                    rupiah).
                  </p>
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
