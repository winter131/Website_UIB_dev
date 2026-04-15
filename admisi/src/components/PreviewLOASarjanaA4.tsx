"use client";
import { TagihanLOASarjanaType } from "@/types/TagihanLOATypes";
import { IndonesianCurrency } from "@/utils/IndonesianCurrency";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";
import { ucFirst } from "@/utils/UcFirst";
import Image from "next/image";
import { forwardRef } from "react";

interface Props {
  data: TagihanLOASarjanaType;
  nomorSurat: string;
  camhsData: any;
  handleValidasiLoa: () => void;
  isLoaValidating: boolean;
}

const PreviewLOASarjanaA4 = forwardRef<HTMLDivElement, Props>(
  (
    { data, nomorSurat, camhsData, handleValidasiLoa, isLoaValidating },
    ref,
  ) => {
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

    const isCanValidate = camhsData.ApprovalTagihanData.StatusValidasi === "w";

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
                <td style={{ border: "none", padding: "2px 0" }}>: 1 bundel</td>
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
          <p className="text-black text-sm mt-1 ">
            Siswa/i {camhsData?.AsalSekolah}
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
            <span className="font-bold">LULUS</span> Ujian Saringan Masuk
            Mahasiswa Baru Universitas Internasional Batam{" "}
            <span className="font-bold">
              {data.IsBeasiswa === "y"
                ? `Gelombang ${data.GelombangTagihan}`
                : `Regular ${data.GelombangTagihan}`}
            </span>{" "}
            Tahun Akademik{" "}
            {`${data.PeriodeTagihan?.split("-")[1]}/${Number(data.PeriodeTagihan?.split("-")[1]) + 1}`}{" "}
            yang diselenggarakan di {data.LokasiUjian} pada tanggal{" "}
            <span className="font-bold">
              {IndonesianDateFormat(data.TanggalUjian)}
            </span>
            . Untuk <span className="font-bold">terdaftar</span> sebagai
            mahasiswa/i {data.GelombangTagihan} Program Studi{" "}
            <span className="font-bold">{data.ProgramStudiTagihan}</span>,{" "}
            <span className="font-bold capitalize">
              Kelas {data.waktu_kuliah}
            </span>
            , mohon cermati informasi berikut ini :
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
                {/* A. Biaya Mahasiswa Baru */}
                <tr className="bg-gray-50">
                  <td
                    className="px-2 py-1 border-r border-black font-semibold"
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
                    1) Sumbangan Penyelenggaraan Pendidikan (SPP)/Uang Gedung
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
                    2) Biaya PPL (Penyelenggaraan Pendidikan & Lain-lain)
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
                    className="px-2 py-1 border-r border-black font-semibold"
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
                    1) Biaya Penyelenggaraan Pendidikan Pokok (BPP Pokok)
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
                    1) Potongan Uang Gedung, sebesar {persenPotonganSPP}%
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
                    4) Potongan BPP Praktikum, sebesar {persenPotonganPraktikum}
                    %
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

        {/* 2. Daftar Ulang */}
        <div className="mt-6">
          <div className="flex flex-row items-start gap-2">
            <p className="mt-1 whitespace-normal text-sm text-justify">2.</p>
            <p className="mt-1 whitespace-normal text-sm text-justify">
              Calon mahasiswa harus melakukan daftar ulang dengan membayarkan
              tagihan di atas (1.E) paling lambat tanggal{" "}
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
            <p className="ml-6 text-sm">
              Petunjuk pembayaran pada{" "}
              <span className="font-bold">Lampiran-1</span>.
            </p>

            <div className="flex flex-row items-start gap-2">
              <p className="mt-1 whitespace-normal text-sm text-justify">B.</p>
              <p className="mt-1 whitespace-normal text-sm text-justify">
                Jumlah yang dibayar minimal sebesar Rp 3.000.000,- (tiga juta
                rupiah). Sisa tagihan dapat dicicil perbulan sampai tanggal{" "}
                {IndonesianDateFormat(data.TanggalBayar)} dengan mengisi Surat
                Pernyataan Cicilan Biaya Kuliah{" "}
                <span className="font-bold">(Lampiran-3)</span>.
              </p>
            </div>

            <div className="flex flex-row items-start gap-2">
              <p className="mt-1 whitespace-normal text-sm text-justify">C.</p>
              <p className="mt-1 whitespace-normal text-sm text-justify">
                Calon mahasiswa harus melengkapi dan mengunggah dokumen daftar
                ulang pada laman{" "}
                <span className="font-bold">pendaftaran.uib.ac.id</span>{" "}
                (pedoman pada <span className="font-bold">Lampiran-2</span>
                ).
              </p>
            </div>

            <div className="flex flex-row items-start gap-2">
              <p className="mt-1 whitespace-normal text-sm text-justify">D.</p>
              <p className="mt-1 whitespace-normal text-sm text-justify">
                Persyaratan lain sesuai dan tercantum di{" "}
                <span className="font-bold">Lampiran-3</span>.
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
        {/* Action Buttons */}
        {isCanValidate && (
          <div className="fixed bottom-0 right-0 w-full md:w-[82.5%] px-10 pb-6 z-50">
            <div className="flex flex-row gap-4 justify-end items-center p-4 flex-wrap">
              {/* Tombol Validasi LOA */}
              {data && (
                <button
                  disabled={isLoaValidating}
                  onClick={handleValidasiLoa}
                  className="btn btn-sm flex items-center gap-2 text-white border border-yellow-500 bg-yellow-300 hover:bg-yellow-400 disabled:opacity-65"
                >
                  {isLoaValidating ? (
                    <>
                      Memvalidasi
                      <span className="bx bx-loader bx-spin text-xl"></span>
                    </>
                  ) : (
                    <>
                      Validasi LOA
                      <span className="bx bx-check-double text-xl"></span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);

PreviewLOASarjanaA4.displayName = "PreviewLOASarjanaA4";
export default PreviewLOASarjanaA4;
