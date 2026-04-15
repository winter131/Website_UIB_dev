"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useConfirmation } from "@/store/useConfirmationBox";
import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import DetailCalonMahasiswaHeader from "@/components/DetailCalonMahasiswaHeader";
import { useDetailKeuanganDaftarUlang } from "@/hooks/calon-mahasiswa/useDetailKeuanganDaftarUlang";
import ValidasiKeuanganDaftarUlangDetailTagihanS1Card from "@/components/ValidasiKeuanganDaftarUlangDetailTagihanS1Card";
import ValidasiKeuanganDaftarUlangDetailImportBankCard from "@/components/ValidasiKeuanganDaftarUlangDetailImportBankCard";
import ValidasiKeuanganDaftarUlangBuktiBayarCard from "@/components/ValidasiKeuanganDaftarUlangBuktiBayarCard";
import ValidasiKeuanganDaftarUlangDetailTagihanS2Card from "@/components/ValidasiKeuanganDaftarUlangDetailTagihanS2Card";
import { Loader2, X } from "lucide-react";
import { useSaveValidasiKeuanganDaftarUlang } from "@/hooks/calon-mahasiswa/useSaveValidasiKeuanganDaftarUlang";

export default function ValidasiKeuanganDaftarUlangDetailView({
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
  const [dataCalonMahasiswa, setDataCalonMahasiswa] = useState<
    CalonMahasiswaType[]
  >([]);

  // Get data calon mahasiswa
  const { data, isLoading, refetch } = useDetailKeuanganDaftarUlang(
    session?.user?.accessToken,
    status,
    nomorDaftar,
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

  const handleTerima = (data: CalonMahasiswaType) => {
    showConfirmation({
      title: "Validasi Data Keuangan Daftar Ulang?",
      message: `Terima pembayaran dari calon mahasiswa ${data.NamaCamhs}? Data keuangan daftar ulang calon mahasiswa akan diverifikasi dan diubah menjadi LUNAS.`,
      icon: "check-circle",
      confirmButtonText: "Terima",
      confirmButtonColor: "bg-green-600",
      onConfirm() {
        validasiKeuanganDaftarUlangMutation({
          token: session.user?.accessToken,
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
      title: "Tolak Data Keuangan Daftar Ulang?",
      message: `Tolak pembayaran dari calon mahasiswa ${data.NamaCamhs}? Data keuangan calon mahasiswa akan diverifikasi dan diubah menjadi ditolak.`,
      icon: "x-circle",
      confirmButtonText: "Tolak",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        setIsLoadingSubmit(true);
        validasiKeuanganDaftarUlangMutation({
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

    if (data?.camhs_data?.StatusKeuanganDaftarUlang === "w") {
      setIsCanValidate(true);
    } else {
      setIsCanValidate(false);
    }
  }, [data]);

  console.log("Detail Keuangan Daftar Ulang Data:", data);

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">
        Detail Daftar Ulang - {namaCamhs} - {nomorDaftar}
      </h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm text-black">
        <ul>
          <li>
            <Link
              href={`/manajemen-daftar-ulang/validasi-keuangan-daftar-u`}
              className="btn bg-black btn-xs rounded-lg text-white font-normal no-underline"
            >
              <span className="bx bx-arrow-back"></span> Kembali
            </Link>
          </li>
          <li className="text-xs">
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="text-xs">
            <Link href={"/manajemen-daftar-ulang/validasi-keuangan-daftar-u"}>
              Validasi Keuangan Daftar Ulang
            </Link>
          </li>
          <li className="text-xs">
            <Link href={pathname}>Detail Daftar Ulang</Link>
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
            data={data?.camhs_data || null}
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
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data?.data_tagihan && (
              <>
                {data?.camhs_data?.JenjangCamhs === "S1" ? (
                  <ValidasiKeuanganDaftarUlangDetailTagihanS1Card
                    data={data?.data_tagihan}
                  />
                ) : data?.camhs_data?.JenjangCamhs === "S2" ? (
                  <ValidasiKeuanganDaftarUlangDetailTagihanS2Card
                    data={data?.data_tagihan}
                  />
                ) : null}
                <div className="flex flex-col gap-4">
                  <ValidasiKeuanganDaftarUlangDetailImportBankCard
                    data={data?.data_pembayaran || []}
                  />
                  <ValidasiKeuanganDaftarUlangBuktiBayarCard
                    data={data?.list_bukti_bayar || []}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {isCanValidate && (
        <div className="fixed bottom-0 right-0 w-full md:w-[82.5%] px-10 pb-6 z-50">
          <div className="flex flex-row gap-4 justify-end items-center p-4 flex-wrap">
            {/* Tombol Tolak */}
            <button
              disabled={isLoadingSubmit}
              onClick={() => setShowTolakModal(true)}
              className="btn btn-sm flex items-center gap-2 text-red-500 border border-red-500 bg-red-300/20 hover:bg-red-400/40 disabled:opacity-65"
            >
              {isLoadingSubmit ? (
                <>
                  Menyimpan
                  <span className="bx bx-loader bx-spin text-xl"></span>
                </>
              ) : (
                <>
                  Tolak
                  <span className="bx bx-x text-xl"></span>
                </>
              )}
            </button>

            {/* Tombol Terima */}
            <button
              disabled={isLoadingSubmit}
              onClick={() => {
                handleTerima(data?.camhs_data);
              }}
              className="btn btn-sm flex items-center gap-2 text-green-500 border border-green-500 bg-green-300/20 hover:bg-green-400/40 disabled:opacity-65"
            >
              {isLoadingSubmit ? (
                <>
                  Menyimpan
                  <span className="bx bx-loader bx-spin text-xl"></span>
                </>
              ) : (
                <>
                  Terima
                  <span className="bx bx-check text-xl"></span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Modal Tolak */}
      {showTolakModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Tolak Dokumen</h3>
                <p className="text-sm text-slate-600">
                  {data?.camhs_data?.NamaCamhs} -{" "}
                  {data?.camhs_data?.NomorDaftar}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Alasan Penolakan
              </label>
              <textarea
                value={alasanTolak}
                onChange={(e) => setAlasanTolak(e.target.value)}
                placeholder="Masukkan alasan penolakan..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none min-h-[100px]"
                rows={3}
              />
              <p className="text-xs text-slate-500 mt-1">Minimal 10 karakter</p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowTolakModal(false);
                  setAlasanTolak("");
                }}
                disabled={isLoadingSubmit}
                className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleTolak}
                disabled={
                  !alasanTolak.trim() ||
                  alasanTolak.trim().length < 10 ||
                  isLoadingSubmit
                }
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isLoadingSubmit ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" />
                    Konfirmasi Tolak
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
