"use client";
import { TagihanLOAMagisterType } from "@/types/TagihanLOATypes";
import { IndonesianCurrency } from "@/utils/IndonesianCurrency";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";
import { ucFirst } from "@/utils/UcFirst";
import Image from "next/image";
import { forwardRef } from "react";

interface Props {
  data: TagihanLOAMagisterType;
  nomorSurat: string;
  camhsData: any;
}

const PreviewLOAMagisterA4 = forwardRef<HTMLDivElement, Props>(
  ({ data, nomorSurat, camhsData }, ref) => {
    // Calculate total biaya
    const totalBiayaMahasiswaBaru = data.biaya_matrikulasi;
    const totalBiayaKuliahSemester =
      data.biaya_semester_1 + data.biaya_semester_2 + data.biaya_semester_3;
    const totalUangMasuk = totalBiayaMahasiswaBaru + totalBiayaKuliahSemester;

    return (
      <div
        ref={ref}
        className="bg-white shadow-2xl w-full max-w-[21cm] p-[1.5cm] font-serif shrink-0 border border-gray-100"
        style={{
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
          <div className="leading-[0.65rem] text-right">
            <p className="text-[8px] text-black font-extrabold">
              UNIVERSITAS INTERNASIONAL BATAM
            </p>
            <p className="text-[8px] text-black">
              Jl. Gajah Mada, Baloi-Sei Ladi, Tiban
            </p>
            <p className="text-[8px] text-black">
              Indah, Kec. Sekupang, Kota Batam,
            </p>
            <p className="text-[8px] text-black">Kepulauan Riau 29426</p>
            <p className="text-[8px] text-black">INDONESIA</p>
          </div>

          {/* Web & Kontak UIB */}
          <div className="leading-[0.65rem] text-right">
            <p className="text-[8px] text-black">www.uib.ac.id</p>
            <p className="text-[8px] text-black">humas@uib.ac.id</p>
            <p className="text-[8px] text-black">Tel +62 778 743 7111</p>
          </div>
        </div>

        {/* Nomor Surat, Perihal, Lampiran */}
        <div className="mt-6">
          <table className="w-full border-none" style={{ border: "none" }}>
            <tbody>
              <tr className="text-xs">
                <td
                  className="w-18 font-bold"
                  style={{ border: "none", padding: "2px 0" }}
                >
                  Nomor
                </td>
                <td style={{ border: "none", padding: "2px 0" }}>
                  : {nomorSurat}
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
                  {data.PeriodeTagihan?.replace("ganjil", "").trim()}
                </td>
              </tr>
              <tr className="text-xs">
                <td
                  className="w-18 font-bold"
                  style={{ border: "none", padding: "2px 0" }}
                >
                  Lampiran
                </td>
                <td style={{ border: "none", padding: "2px 0" }}>: -</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Yth */}
        <div className="mt-6">
          <p className="text-black text-sm">
            Yth. Sdr/i. {camhsData?.NamaCamhs} / No Pendaftaran:{" "}
            {camhsData?.NomorDaftar}
          </p>
          <p className="text-black text-sm mt-1 ">Siswa/i (Asal Sekolah)</p>
        </div>

        {/* Opening Line */}
        <div className="mt-2">
          <p className="text-black text-sm">Dengan Hormat,</p>
        </div>

        {/* SELAMAT */}
        <div className="mt-6">
          <p className="text-black leading-relaxed whitespace-normal text-sm text-justify">
            SELAMAT, Saudara/i dinyatakan{" "}
            <span className="font-bold">LULUS</span> Ujian Saringan Masuk Calon
            Mahasiswa Baru Program Magister jalur {data.jalur_daftar}{" "}
            Universitas Internasional Batam {data.GelombangTagihan} Tahun
            Akademik{" "}
            {`${data.PeriodeTagihan?.split("-")[1]}/${Number(data.PeriodeTagihan?.split("-")[1]) + 1}`}{" "}
            yang diselenggarakan pada {IndonesianDateFormat(data.TanggalUjian)}.
            Untuk terdaftar sebagai mahasiswa/i {data.GelombangTagihan} Program
            Studi <span className="font-bold">{data.ProgramStudiTagihan}</span>,
            mohon cermati informasi berikut ini :
          </p>
        </div>

        {/* Tabel Tagihan */}
        <div className="mt-2">
          <p className="mb-3 text-sm">
            1. Jumlah tagihan biaya bagi mahasiswa :
          </p>

          {/* Table */}
          <div className="overflow-x-auto pl-4">
            <table
              className="w-full text-sm border-collapse"
              style={{ border: "1px solid black" }}
            >
              <thead>
                <tr className="bg-zinc-200 border-b border-black">
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
            <p className="mt-1 whitespace-normal text-sm text-justify">2.</p>
            <p className="mt-1 whitespace-normal text-sm text-justify">
              Calon mahasiswa harus melakukan daftar ulang dengan membayarkan
              tagihan di atas paling lambat tanggal{" "}
              <span className="font-bold">
                {IndonesianDateFormat(data.TanggalBayar)}
              </span>
              . Pembayaran biaya daftar ulang melalui:
            </p>
          </div>

          <div className="ml-8">
            <p className="ml-1 whitespace-normal text-sm text-justify">
              A. Nama Bank : <span className="font-bold">OCBC Bank</span>
            </p>
            <p className="ml-6 whitespace-normal text-sm text-justify flex gap-2">
              <span>No Rekening :</span>{" "}
              <span>{camhsData?.VaCamhs || "Belum Dibuat"}</span>
            </p>
            <p className="ml-6 flex gap-2 text-sm">
              <span>Atas Nama :</span>{" "}
              <span>Marga Tionghoa / {camhsData?.NamaCamhs}</span>
            </p>
            <p className="ml-6 text-sm">Petunjuk pembayaran pada Lampiran-1.</p>

            <div className="flex flex-row items-start gap-2">
              <p className="mt-1 whitespace-normal text-sm text-justify">B.</p>
              <p className="mt-1 whitespace-normal text-sm text-justify">
                Jumlah yang dibayar minimal sebesar Rp 3.000.000,- (tiga juta
                rupiah). Sisa tagihan dapat dicicil perbulan sampai batas waktu
                yang telah ditentukan (Lampiran-2).
              </p>
            </div>

            <div className="flex flex-row items-start gap-2">
              <p className="mt-1 whitespace-normal text-sm text-justify">C.</p>
              <p className="mt-1 whitespace-normal text-sm text-justify">
                Calon mahasiswa harus melengkapi dan mengunggah dokumen daftar
                ulang pada laman{" "}
                <span className="font-bold">pendaftaran.uib.ac.id</span>
              </p>
            </div>
          </div>
        </div>

        {/* Penutup */}
        <div className="mt-8">
          <p className="whitespace-normal text-sm text-justify">
            Demikian informasi ini disampaikan. Informasi lebih lanjut, silakan
            menghubungi{" "}
            <span className="font-bold">Humas UIB (0778-7437111</span> atau{" "}
            <span className="font-bold">WA 0821 7484 6764)</span> Atas perhatian
            dan kerjasama Saudara/i, kami ucapkan terima kasih
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
          <p className="text-sm font-semibold">
            Panitia PMB Universitas Internasional Batam
          </p>
          <p className="text-sm">
            TA{" "}
            {`${data.PeriodeTagihan?.split("-")[1]}/${Number(data.PeriodeTagihan?.split("-")[1]) + 1}`}
          </p>
        </div>
      </div>
    );
  },
);

PreviewLOAMagisterA4.displayName = "PreviewLOAMagisterA4";
export default PreviewLOAMagisterA4;
