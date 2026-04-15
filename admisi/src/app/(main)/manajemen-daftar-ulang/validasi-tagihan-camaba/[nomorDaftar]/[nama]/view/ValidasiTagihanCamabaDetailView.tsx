"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useConfirmation } from "@/store/useConfirmationBox";
import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import DetailCalonMahasiswaHeader from "@/components/DetailCalonMahasiswaHeader";
import { Loader2, X } from "lucide-react";
import { useSaveValidasiKeuanganDaftarUlang } from "@/hooks/calon-mahasiswa/useSaveValidasiKeuanganDaftarUlang";
import { useDetailTagihanCamaba } from "@/hooks/calon-mahasiswa/useDetailTagihanCamaba";
import { useValidateLoaCamhs } from "@/hooks/calon-mahasiswa/useValidateLoaCamhs";
import { ucFirst } from "@/utils/UcFirst";
import PreviewLOASarjanaA4 from "@/components/PreviewLOASarjanaA4";
import PreviewLOAMagisterA4 from "@/components/PreviewLOAMagisterA4";
import {
  TagihanLOASarjanaType,
  TagihanLOAMagisterType,
} from "@/types/TagihanLOATypes";

export default function ValidasiTagihanCamabaDetailView({
  nomorDaftar,
  namaCamhs,
}: {
  nomorDaftar: string;
  namaCamhs: string;
}) {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [showTolakModal, setShowTolakModal] = useState(false);
  const [alasanTolak, setAlasanTolak] = useState("");

  // Get data calon mahasiswa
  const { data, isLoading, refetch } = useDetailTagihanCamaba(
    session?.user?.accessToken,
    status,
    nomorDaftar,
  );

  // Validate LOA Mutation
  const { mutate: validateLoaMutation, isPending: isLoaValidating } =
    useValidateLoaCamhs(
      (data: any) => {
        showNotification({
          status: "text-green-500",
          icon: "bx bx-check text-2xl",
          header: "Berhasil",
          message: "Berhasil memvalidasi LOA Calon Mahasiswa",
        });
        refetch();
      },
      (msg) => {
        showNotification({
          status: "text-red-500",
          icon: "bx bx-error text-2xl",
          header: "Terjadi Kesalahan",
          message: msg,
        });
      },
    );

  const { mutate: validasiKeuanganDaftarUlangMutation } =
    useSaveValidasiKeuanganDaftarUlang(
      (data: any) => {
        console.log("onSuccess data:", data);
        const res = data.data;
        const validasi = data.validasi;

        if (validasi.status_validasi === "y") {
          showNotification({
            status: "text-green-500",
            icon: "bx bx-check text-2xl",
            header: "Berhasil",
            message: `Berhasil melakukan validasi keuangan daftar ulang ${res.NamaCamhs}`,
          });

          refetch();
        } else {
          showNotification({
            status: "text-red-500",
            icon: "bx bx-check text-2xl",
            header: "Berhasil",
            message: `Berhasil menolak data keuangan daftar ulang ${res.NamaCamhs}`,
          });

          refetch();
        }
      },
      (msg) => {
        showNotification({
          status: "text-red-500",
          icon: "bx bx-error text-2xl",
          header: "Terjadi Kesalahan",
          message: msg,
        });
      },
    );

  const handleValidasiLoa = () => {
    showConfirmation({
      title: "Validasi LOA Calon Mahasiswa?",
      message: `Konfirmasi validasi Penerbitan Letter of Acceptance (LOA) untuk ${data?.data_camhs?.NamaCamhs}?`,
      icon: "check-circle",
      confirmButtonText: "LOA Valid",
      confirmButtonColor: "bg-yellow-500",
      onConfirm() {
        validateLoaMutation({
          token: session?.user?.accessToken,
          data: {
            sel_camhs: nomorDaftar,
          },
        });
      },
    });
  };

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">
        Detail Validasi Tagihan Camaba - {namaCamhs} - {nomorDaftar}
      </h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm text-black">
        <ul>
          <li>
            <Link
              href={`/manajemen-daftar-ulang/validasi-tagihan-camaba`}
              className="btn bg-black btn-xs rounded-lg text-white font-normal no-underline"
            >
              <span className="bx bx-arrow-back"></span> Kembali
            </Link>
          </li>
          <li className="text-xs">
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="text-xs">
            <Link href={"/manajemen-daftar-ulang/validasi-tagihan-camaba"}>
              Validasi Tagihan Camaba
            </Link>
          </li>
          <li className="text-xs">
            <Link href={pathname}>Detail Validasi Tagihan Camaba</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Detail validasi keuangan daftar ulang calon mahasiswa
        </span>
      </div>

      {/* Main Content */}
      <div className="w-full mt-4 mb-10">
        {/* Header Detail Calon Mahasiswa */}
        <div className="card bg-white rounded-lg shadow-lg mb-6 flex flex-col items-start p-6  flex-wrap">
          <DetailCalonMahasiswaHeader
            isLoading={isLoading}
            data={data?.data_camhs || null}
          />
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="skeleton w-full h-84 bg-gray-300"></div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="skeleton w-full h-40 bg-gray-300"></div>
              <div className="skeleton w-full h-40 bg-gray-300"></div>
            </div>
          </div>
        ) : data?.data_tagihan ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex justify-center w-full col-span-2">
              <div className="transform scale-[0.6] sm:scale-75 md:scale-90 lg:scale-[0.8] xl:scale-100 origin-top">
                {data?.data_camhs?.JenjangCamhs === "S1" ? (
                  <PreviewLOASarjanaA4
                    data={data?.data_tagihan as TagihanLOASarjanaType}
                    nomorSurat={data?.nomor_surat || "-"}
                    camhsData={data?.data_camhs}
                    handleValidasiLoa={handleValidasiLoa}
                    isLoaValidating={isLoaValidating}
                  />
                ) : data?.data_camhs?.JenjangCamhs === "S2" ? (
                  <PreviewLOAMagisterA4
                    data={data?.data_tagihan as TagihanLOAMagisterType}
                    nomorSurat={data?.nomor_surat || "-"}
                    camhsData={data?.data_camhs}
                  />
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="w-full h-84 bg-white flex flex-col items-center justify-center rounded-xl p-6 col-span-2">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <span className="bx bx-receipt text-5xl text-slate-400"></span>
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-1">
                Data Tagihan Belum Diatur
              </h3>
              <p className="text-slate-500 text-sm text-center max-w-md">
                Saat ini belum ada rincian data tagihan yang tersedia untuk
                program studi{" "}
                <span className="font-bold">
                  {data?.data_camhs?.NamaProdi ||
                    "Nama program studi tidak ditemukan"}{" "}
                </span>
                peringkat{" "}
                <span className="font-bold">
                  {data?.hasil_seleksi?.PeringkatNama ||
                    "Nama peringkat tidak ditemukan"}{" "}
                </span>
                pada gelombang{" "}
                <span className="font-bold">
                  {data?.data_camhs?.GelombangCamhs ||
                    "Gelombang tidak ditemukan"}{" "}
                </span>{" "}
                periode{" "}
                <span className="font-bold">
                  {data?.data_camhs?.PeriodeCamhs
                    ? ucFirst(data?.data_camhs?.PeriodeCamhs)
                    : "Periode tidak ditemukan"}{" "}
                </span>
                yang diraih calon mahasiswa ini.
              </p>
              <Link
                href={`/manajemen-daftar-ulang/tagihan-loa${data?.data_camhs?.JenjangCamhs === "S1" ? "" : "-s2"}?from=${pathname}`}
                className="btn btn-sm rounded-md text-white bg-black hover:bg-black/80 mt-2"
              >
                Buat Tagihan
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
