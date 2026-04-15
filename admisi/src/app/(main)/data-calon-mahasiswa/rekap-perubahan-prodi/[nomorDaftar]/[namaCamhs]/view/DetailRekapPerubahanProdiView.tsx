"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useConfirmation } from "@/store/useConfirmationBox";
import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import DetailCalonMahasiswaHeader from "@/components/DetailCalonMahasiswaHeader";
import BiodataView from "@/components/BiodataView";
import { GetNamaFileDariLinkBucket } from "@/utils/GetNamaFileDariLinkBucket";
import { useSaveValidasiDokumen } from "@/hooks/calon-mahasiswa/useSaveValidasiDokumen";
import { Loader2, X } from "lucide-react";
import { useDetailCalonMahasiswaPindahProdi } from "@/hooks/calon-mahasiswa/useDetailCalonMahasiswaPindahProdi";
import SejarahPerubahanProdiCard from "@/components/SejarahPerubahanProdiCard";
import {
  RekapPerubahanProdiType,
  SejarahTagihanYangDihapusType,
} from "@/types/RekapPerubahanProdiTypes";
import SejarahTagihanYangDihapusCard from "@/components/SejarahTagihanYangDihapusCard";

export default function RekapPerubahanProdiView({
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
  const [isCanValidate, setIsCanValidate] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [showTolakModal, setShowTolakModal] = useState(false);
  const [alasanTolak, setAlasanTolak] = useState("");

  // Get data calon mahasiswa
  const { data, isLoading, refetch } = useDetailCalonMahasiswaPindahProdi(
    session?.user?.accessToken,
    status,
    nomorDaftar,
  );

  const { mutate: validasiDokumenMutation } = useSaveValidasiDokumen(
    (data: any) => {
      const res = data.data;
      const validasi = data.validasi;

      if (validasi.status_validasi === "y") {
        showNotification({
          status: "text-green-500",
          icon: "bx bx-check text-2xl",
          header: "Berhasil",
          message: `Berhasil melakukan validasi dokumen ${res.NamaCamhs}`,
        });

        setIsCanValidate(false);
      } else {
        showNotification({
          status: "text-red-500",
          icon: "bx bx-check text-2xl",
          header: "Berhasil",
          message: `Berhasil menolak data dokumen ${res.NamaCamhs}`,
        });

        setIsCanValidate(false);
      }
      setAlasanTolak("");
      setIsLoadingSubmit(false);
    },
    (msg) => {
      setIsLoadingSubmit(false);
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: msg,
      });
    },
  );

  const handleTerima = (data: CalonMahasiswaType) => {
    showConfirmation({
      title: "Validasi Data Dokumen?",
      message: `Terima dokumen dari calon mahasiswa ${data.NamaCamhs}? Data dokumen calon mahasiswa akan diverifikasi dan diubah menjadi LENGKAP.`,
      icon: "check-circle",
      confirmButtonText: "Terima",
      confirmButtonColor: "bg-green-600",
      onConfirm() {
        setIsLoadingSubmit(true);
        validasiDokumenMutation({
          token: session?.user?.accessToken,
          validasi: {
            sel_camhs: data.NomorDaftar, // Nomor Daftar Calon Mahasiswa
            status_validasi: "y", // Validasi Dari Keuangannya y OR n
            jenjang_camhs: data.JenjangCamhs, // Jenjang Calon Mahasiswanya
          },
          data,
        });
      },
    });
  };

  const handleTolak = () => {
    if (alasanTolak.trim()) {
      confirmTolak(
        data?.camhs_data?.NomorDaftar,
        alasanTolak,
        data?.camhs_data,
      );
      setShowTolakModal(false);
    }
  };

  const confirmTolak = (
    nomorDaftar: string,
    alasanTolak: string,
    data: CalonMahasiswaType,
  ) => {
    showConfirmation({
      title: "Tolak Data Dokumen?",
      message: `Tolak dokumen dari calon mahasiswa ${data.NamaCamhs}? Data dokumen calon mahasiswa akan diverifikasi dan diubah menjadi ditolak.`,
      icon: "x-circle",
      confirmButtonText: "Tolak",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        setIsLoadingSubmit(true);
        validasiDokumenMutation({
          token: session?.user?.accessToken,
          validasi: {
            sel_camhs: nomorDaftar, // Nomor Daftar Calon Mahasiswa
            status_validasi: "n", // Validasi Dari Keuangannya y OR n
            jenjang_camhs: data.JenjangCamhs, // Jenjang Calon Mahasiswanya
            ket_tolak: alasanTolak, // Alasan penolakan
          },
          data,
        });
      },
    });
  };

  useEffect(() => {
    if (!data) return;

    if (data.can_validate_dokumen === "y") {
      setIsCanValidate(true);
    }
  }, [data]);

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">
        Detail Perubahan Program Studi - {namaCamhs} - {nomorDaftar}
      </h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm text-black">
        <ul>
          <li>
            <Link
              href={`/data-calon-mahasiswa/validasi-dokumen`}
              className="btn bg-black btn-xs rounded-lg text-white font-normal no-underline"
            >
              <span className="bx bx-arrow-back"></span> Kembali
            </Link>
          </li>
          <li className="text-xs">
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="text-xs">
            <Link href={"/data-calon-mahasiswa/validasi-dokumen"}>
              Validasi Dokumen Calon Mahasiswa
            </Link>
          </li>
          <li className="text-xs">
            <Link href={pathname}>Validasi Dokumen Calon Mahasiswa</Link>
          </li>
        </ul>
      </div>

      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Detail biodata dan dokumen calon mahasiswa
        </span>
      </div>

      {/* Main Content */}
      <div className="w-full mt-4">
        {/* Header Detail Calon Mahasiswa */}
        <div className="card bg-white rounded-lg shadow-lg mb-6 flex flex-col items-start p-6  flex-wrap">
          <DetailCalonMahasiswaHeader
            isLoading={isLoading}
            data={data?.camhs_data || null}
          />
        </div>

        {/* Riwayat perubahan prodi */}
        <div className="card bg-white rounded-lg shadow-lg mb-6 flex flex-col items-start p-6  flex-wrap">
          <div className="w-full">
            <p className="text-black dark:text-white text-xl font-bold">
              Sejarah Perubahan Program Studi
            </p>
            <div className="w-full mt-4">
              {(data?.list_pindah_prodi || []).length > 0 ? (
                <>
                  {(data?.list_pindah_prodi || []).map(
                    (
                      perubahanProdi: RekapPerubahanProdiType,
                      index: number,
                    ) => (
                      <div key={index} className="mb-4">
                        <SejarahPerubahanProdiCard data={perubahanProdi} />
                      </div>
                    ),
                  )}
                </>
              ) : (
                <p className="text-gray-500 text-sm">
                  Belum ada riwayat perubahan program studi.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sejarah Tagihan */}
        <div className="card bg-white rounded-lg shadow-lg mb-6 flex flex-col items-start p-6  flex-wrap">
          <div className="w-full">
            <p className="text-black dark:text-white text-xl font-bold">
              Sejarah Tagihan Yang Dihapus
            </p>
            <div className="w-full mt-4">
              {(data?.list_history_tagihan || []).length > 0 ? (
                <>
                  {(data?.list_history_tagihan || []).map(
                    (tagihan: SejarahTagihanYangDihapusType, index: number) => (
                      <div key={index} className="mb-4">
                        <SejarahTagihanYangDihapusCard data={tagihan} />
                      </div>
                    ),
                  )}
                </>
              ) : (
                <p className="text-gray-500 text-sm">
                  Belum ada riwayat tagihan yang dihapus.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
