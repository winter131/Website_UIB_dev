"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useConfirmation } from "@/store/useConfirmationBox";
import {
  CalonMahasiswaRPLType,
  CalonMahasiswaType,
} from "@/types/CalonMahasiswaTypes";
import BiodataView from "@/components/BiodataView";
import { useSaveValidasiDokumen } from "@/hooks/calon-mahasiswa/useSaveValidasiDokumen";
import { Loader2, X } from "lucide-react";
import { useDetailCalonMahasiswaRPL } from "@/hooks/calon-mahasiswa/useDetailCalonMahasiswaRPL";
import DetailCalonMahasiswaRPLHeader from "@/components/DetailCalonMahasiswaRPLHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ucFirst } from "@/utils/UcFirst";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useSaveValidasiDokumenRPL } from "@/hooks/calon-mahasiswa/useSaveValidasiDokumenRPL";

export default function DetailValidasiDokumenView({
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
  const { data, isLoading, refetch } = useDetailCalonMahasiswaRPL(
    session?.user?.accessToken,
    status,
    nomorDaftar,
  );

  const { mutate: validasiDokumenRPLMutation } = useSaveValidasiDokumenRPL(
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

  const handleTerima = (data: CalonMahasiswaRPLType) => {
    showConfirmation({
      title: "Validasi Data Dokumen?",
      message: `Terima dokumen dari calon mahasiswa ${data.NamaCamhs}? Data dokumen calon mahasiswa akan diverifikasi dan diubah menjadi LENGKAP.`,
      icon: "check-circle",
      confirmButtonText: "Terima",
      confirmButtonColor: "bg-green-600",
      onConfirm() {
        setIsLoadingSubmit(true);
        validasiDokumenRPLMutation({
          token: session?.user?.accessToken,
          validasi: {
            sel_camhs: data.NomorDaftar, // Nomor Daftar Calon Mahasiswa
            status_validasi: "y", // Validasi Dari Keuangannya y OR n
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
        validasiDokumenRPLMutation({
          token: session?.user?.accessToken,
          validasi: {
            sel_camhs: nomorDaftar, // Nomor Daftar Calon Mahasiswa
            status_validasi: "n", // Validasi Dari Keuangannya y OR n
            ket_tolak: alasanTolak, // Alasan penolakan
          },
          data,
        });
      },
    });
  };

  useEffect(() => {
    if (!data) return;

    if (data?.camhs_data?.StatusDokumenCamhs === "w") {
      setIsCanValidate(true);
    }
  }, [data]);

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">
        Detail Dokumen - {namaCamhs} - {nomorDaftar}
      </h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm text-black">
        <ul>
          <li>
            <Link
              href={`/rekognisi-pembelajaran-lampau/validasi-dokumen`}
              className="btn bg-black btn-xs rounded-lg text-white font-normal no-underline"
            >
              <span className="bx bx-arrow-back"></span> Kembali
            </Link>
          </li>
          <li className="text-xs">
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="text-xs">
            <Link href={"/rekognisi-pembelajaran-lampau/validasi-dokumen"}>
              Validasi Dokumen Calon Mahasiswa RPL
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
          <DetailCalonMahasiswaRPLHeader
            isLoading={isLoading}
            data={data?.camhs_data || null}
          />
        </div>

        <Tabs defaultValue="informasi_dasar" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="informasi_dasar">Informasi Dasar</TabsTrigger>
            <TabsTrigger value="orangtua_wali">Orangtua & Wali</TabsTrigger>
            <TabsTrigger value="pendidikan">Pendidikan</TabsTrigger>
            <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          </TabsList>
          <TabsContent value="informasi_dasar">
            {/* Informasi Dasar */}
            <div className="mb-6 flex flex-col items-start py-6 px-10 bg-white rounded-lg shadow-lg">
              {/* Jenjang */}
              <div className="my-2 w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Jenjang
                </p>
                <div className="divider"></div>
                <div className="w-full mb-3">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    <BiodataView
                      title="Jenjang"
                      value={
                        data?.camhs_data?.JenjangCamhs === "Strata 1"
                          ? "Sarjana"
                          : data?.camhs_data?.JenjangCamhs === "Strata 2"
                            ? "Magister"
                            : ""
                      }
                      type="text"
                    />
                  </div>
                </div>
              </div>
              {/* Biodata */}
              <div className="my-2 w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Biodata
                </p>
                <div className="divider"></div>
                <div className="w-full mb-3">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    <BiodataView
                      title="NIK"
                      value={
                        data?.camhs_data?.BiodataCamhs?.NikCamhs ||
                        "Tidak diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Nama Lengkap"
                      value={data?.camhs_data?.NamaCamhs || "Tidak diisi"}
                      type="text"
                    />
                    <BiodataView
                      title="Jenis Kelamin"
                      value={data?.camhs_data?.JkCamhs || "Tidak diisi"}
                      type="text"
                    />
                    <BiodataView
                      title="Kewarganegaraan"
                      value={
                        data?.camhs_data?.BiodataCamhs?.KewarganegaraanCamhs ||
                        "Tidak diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Agama"
                      value={
                        data?.camhs_data?.BiodataCamhs?.AgamaCamhs ||
                        "Tidak diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Tempat Lahir"
                      value={
                        data?.camhs_data?.BiodataCamhs?.TempatLahir ||
                        "Tidak diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Tanggal Lahir"
                      value={
                        data?.camhs_data?.BiodataCamhs?.TanggalLahir ||
                        "Tidak diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="No. Telepon"
                      value={data?.camhs_data?.NoTelp || "Tidak diisi"}
                      type="text"
                    />
                    <BiodataView
                      title="No. WhatsApp"
                      value={data?.camhs_data?.NoWa || "Tidak diisi"}
                      type="text"
                    />
                    <BiodataView
                      title="ID Line"
                      value={data?.camhs_data?.LineCamhs || "Tidak diisi"}
                      type="text"
                    />
                    <BiodataView
                      title="Email"
                      value={data?.camhs_data?.EmailCamhs || "Tidak diisi"}
                      type="text"
                    />
                    <BiodataView
                      title="No. NPWP"
                      value={
                        data?.camhs_data?.BiodataCamhs?.NpwpCamhs ||
                        "Tidak diisi"
                      }
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/* Alamat */}
              <div className="my-2 w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Alamat
                </p>
                <div className="divider"></div>
                <div className="w-full mb-3">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    <BiodataView
                      title="Alamat Rumah"
                      value={
                        data?.camhs_data?.BiodataCamhs?.AlamatCamhs ||
                        "Tidak diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Nama Dusun"
                      value={data?.camhs_data?.NamaCamhsdusun || "Tidak diisi"}
                      type="text"
                    />
                    <BiodataView
                      title="No. RT"
                      value={
                        data?.camhs_data?.BiodataCamhs?.NoRtCamhs ||
                        "Tidak diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="No. RW"
                      value={
                        data?.camhs_data?.BiodataCamhs?.NoRwCamhs ||
                        "Tidak diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Kelurahan"
                      value={
                        data?.camhs_data?.BiodataCamhs?.KelurahanCamhs ||
                        "Tidak diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Kecamatan"
                      value={
                        data?.camhs_data?.BiodataCamhs?.KecamatanCamhs ||
                        "Tidak diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Kode Pos"
                      value={
                        data?.camhs_data?.BiodataCamhs?.KodePosCamhs ||
                        "Tidak diisi"
                      }
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/* Pekerjaan */}
              <div className="my-2 w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Pekerjaan
                </p>
                <div className="divider"></div>
                <div className="w-full mb-3">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    <BiodataView
                      title="Nama Instansi"
                      value={
                        data?.camhs_data?.NamaCamhs_instansi || "Tidak diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Status Instansi"
                      value={
                        data?.camhs_data?.BiodataCamhs?.StatusInstansi === "pts"
                          ? "Perguruan Tinggi Swasta"
                          : data?.camhs_data?.BiodataCamhs?.StatusInstansi ===
                              "ptn"
                            ? "Perguruan Tinggi Negeri"
                            : data?.camhs_data?.BiodataCamhs?.StatusInstansi ===
                                "bumn"
                              ? "BUMN"
                              : data?.camhs_data?.BiodataCamhs
                                    ?.StatusInstansi === "swasta"
                                ? "Swasta"
                                : data?.camhs_data?.BiodataCamhs
                                      ?.StatusInstansi === "pemerintah"
                                  ? "Pemerintah"
                                  : data?.camhs_data?.BiodataCamhs
                                        ?.StatusInstansi === "wiraswasta"
                                    ? "Wiraswasta"
                                    : "Belum Diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Tahun Mulai Bekerja"
                      value={
                        data?.camhs_data?.BiodataCamhs?.TahunMulaiKerja ||
                        "Tidak diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Lama Pengalaman"
                      value={data?.camhs_data?.LamaPengalaman || "Tidak diisi"}
                      type="text"
                    />
                    <BiodataView
                      title="Jabatan"
                      value={
                        data?.camhs_data?.BiodataCamhs?.Jabatan || "Tidak diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Bidang Keahlian"
                      value={
                        data?.camhs_data?.BiodataCamhs?.BidangKeahlian ||
                        "Tidak diisi"
                      }
                      type="text"
                    />
                    {/* <BiodataView
                      title="Link CV"
                      value={
                        data?.camhs_data?.BiodataCamhs?.LinkCv ||
                        "https://loading.com"
                      }
                      type="link"
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="orangtua_wali">
            {/* Orang Tua & Wali */}
            <div className="mb-6 flex flex-col items-start py-6 px-10 bg-white rounded-lg shadow-lg">
              {/* Biodata Keluarga */}
              <div className="my-2 w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Biodata Keluarga
                </p>
                <div className="divider"></div>
                <div className="w-full mb-3">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    <BiodataView
                      title="Nomor KK"
                      value={
                        data?.camhs_data?.BiodataCamhs?.NoKkCamhs ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Nama Kepala Keluarga"
                      value={
                        data?.camhs_data?.NamaCamhs_kepala_keluarga ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/* Biodata Ayah */}
              <div className="my-2 w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Biodata Ayah
                </p>
                <div className="divider"></div>
                <div className="w-full mb-3">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    <BiodataView
                      title="NIK"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.NikAyah ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Nama"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.NamaAyah ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Tanggal Lahir"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.TanggalLahirAyah ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="No. Telepon"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.NoHpAyah ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Pendidikan Terakhir"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.PendidikanAyah === "D1"
                          ? "Diploma 1"
                          : data?.camhs_data?.DataOrtuCamhs?.PendidikanAyah ===
                              "D2"
                            ? "Diploma 2"
                            : data?.camhs_data?.DataOrtuCamhs
                                  ?.PendidikanAyah === "D3"
                              ? "Diploma 3"
                              : data?.camhs_data?.DataOrtuCamhs
                                    ?.PendidikanAyah === "D4"
                                ? "Diploma 4"
                                : data?.camhs_data?.DataOrtuCamhs
                                      ?.PendidikanAyah === "NON-AKAD"
                                  ? "Non-Akademik"
                                  : data?.camhs_data?.DataOrtuCamhs
                                        ?.PendidikanAyah === "PROFESI"
                                    ? "Profesi"
                                    : data?.camhs_data?.DataOrtuCamhs
                                          ?.PendidikanAyah === "Sp-1"
                                      ? "Spesialis 1"
                                      : data?.camhs_data?.DataOrtuCamhs
                                            ?.PendidikanAyah === "Sp-2"
                                        ? "Spesialis 2"
                                        : data?.camhs_data?.DataOrtuCamhs
                                              ?.PendidikanAyah === "S1"
                                          ? "Strata 1"
                                          : data?.camhs_data?.DataOrtuCamhs
                                                ?.PendidikanAyah === "S2"
                                            ? "Strata 2"
                                            : data?.camhs_data?.DataOrtuCamhs
                                                  ?.PendidikanAyah === "S3"
                                              ? "Strata 3"
                                              : data?.camhs_data?.DataOrtuCamhs
                                                    ?.PendidikanAyah ===
                                                  "TAMAT SMA"
                                                ? "Tamat SMA"
                                                : data?.camhs_data
                                                      ?.DataOrtuCamhs
                                                      ?.PendidikanAyah ===
                                                    "TAMAT SMP"
                                                  ? "Tamat SMP"
                                                  : data?.camhs_data
                                                        ?.DataOrtuCamhs
                                                        ?.PendidikanAyah ===
                                                      "TAMAT SD"
                                                    ? "Tamat SD"
                                                    : data?.camhs_data
                                                          ?.DataOrtuCamhs
                                                          ?.PendidikanAyah ===
                                                        "TDK TMT SD"
                                                      ? "Tidak Tamat SD"
                                                      : "Belum Diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Pekerjaan"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.NamaPekerjaanAyah ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView title="Penghasilan" value={`-`} type="text" />
                    <BiodataView
                      title="Status"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.IsMeninggalAyah ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/* Biodata Ibu */}
              <div className="my-2 w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Biodata Ibu
                </p>
                <div className="divider"></div>
                <div className="w-full mb-3">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    <BiodataView
                      title="NIK"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.NikIbu || "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Nama"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.NamaIbu ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Tanggal Lahir"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.TanggalLahirIbu ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="No. Telepon"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.NoHpIbu ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Pendidikan Terakhir"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.PendidikanIbu === "D1"
                          ? "Diploma 1"
                          : data?.camhs_data?.DataOrtuCamhs?.PendidikanIbu ===
                              "D2"
                            ? "Diploma 2"
                            : data?.camhs_data?.DataOrtuCamhs?.PendidikanIbu ===
                                "D3"
                              ? "Diploma 3"
                              : data?.camhs_data?.DataOrtuCamhs
                                    ?.PendidikanIbu === "D4"
                                ? "Diploma 4"
                                : data?.camhs_data?.DataOrtuCamhs
                                      ?.PendidikanIbu === "NON-AKAD"
                                  ? "Non-Akademik"
                                  : data?.camhs_data?.DataOrtuCamhs
                                        ?.PendidikanIbu === "PROFESI"
                                    ? "Profesi"
                                    : data?.camhs_data?.DataOrtuCamhs
                                          ?.PendidikanIbu === "Sp-1"
                                      ? "Spesialis 1"
                                      : data?.camhs_data?.DataOrtuCamhs
                                            ?.PendidikanIbu === "Sp-2"
                                        ? "Spesialis 2"
                                        : data?.camhs_data?.DataOrtuCamhs
                                              ?.PendidikanIbu === "S1"
                                          ? "Strata 1"
                                          : data?.camhs_data?.DataOrtuCamhs
                                                ?.PendidikanIbu === "S2"
                                            ? "Strata 2"
                                            : data?.camhs_data?.DataOrtuCamhs
                                                  ?.PendidikanIbu === "S3"
                                              ? "Strata 3"
                                              : data?.camhs_data?.DataOrtuCamhs
                                                    ?.PendidikanIbu ===
                                                  "TAMAT SMA"
                                                ? "Tamat SMA"
                                                : data?.camhs_data
                                                      ?.DataOrtuCamhs
                                                      ?.PendidikanIbu ===
                                                    "TAMAT SMP"
                                                  ? "Tamat SMP"
                                                  : data?.camhs_data
                                                        ?.DataOrtuCamhs
                                                        ?.PendidikanIbu ===
                                                      "TAMAT SD"
                                                    ? "Tamat SD"
                                                    : data?.camhs_data
                                                          ?.DataOrtuCamhs
                                                          ?.PendidikanIbu ===
                                                        "TDK TMT SD"
                                                      ? "Tidak Tamat SD"
                                                      : "Belum Diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Pekerjaan"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.NamaPekerjaanIbu ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView title="Penghasilan" value={`-`} type="text" />
                    <BiodataView
                      title="Status"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.IsMeninggalIbu ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Alamat Orang Tua"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.AlamatOrtu ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/* Biodata Wali */}
              <div className="my-2 w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Biodata Wali
                </p>
                <div className="divider"></div>
                <div className="w-full mb-3">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    <BiodataView
                      title="NIK"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.NikWali ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Nama"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.NamaWali ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Tanggal Lahir"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.TanggalLahirWali ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="No. Telepon"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.NoHpWali ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Pendidikan Terakhir"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.PendidikanWali ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Pekerjaan"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.NamaPekerjaanWali ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView title="Penghasilan" value={`-`} type="text" />
                    <BiodataView
                      title="Alamat"
                      value={
                        data?.camhs_data?.DataOrtuCamhs?.AlamatWali ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="pendidikan">
            {/* Pendidikan */}
            <div className="mb-6 flex flex-col items-start py-6 px-10 bg-white rounded-lg shadow-lg">
              {/* Riwayat Pendidikan */}
              <div className="my-2 w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Riwayat Pendidikan
                </p>
                <div className="divider"></div>
                <div className="w-full mb-3">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    <BiodataView
                      title="Nomor Induk Siswa Nasional (NISN)"
                      value={
                        data?.camhs_data?.BiodataCamhs?.NisnCamhs ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Nomor Ijazah"
                      value={
                        data?.camhs_data?.BiodataCamhs?.NomorIjazah ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Asal Pendidikan Terakhir"
                      value={
                        data?.camhs_data?.BiodataCamhs
                          ?.AsalPendidikanTerakhir || "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Jurusan"
                      value={
                        data?.camhs_data?.BiodataCamhs?.JurusanCamhs ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/* Perkuliahan */}
              <div className="my-2 w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Perkuliahan
                </p>
                <div className="divider"></div>
                <div className="w-full mb-3">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    <BiodataView
                      title="Sumber Biaya"
                      value={
                        data?.camhs_data?.BiodataCamhs?.SumberBiaya ===
                        "sendiri"
                          ? "Sendiri"
                          : data?.camhs_data?.BiodataCamhs?.SumberBiaya ===
                              "instansi"
                            ? "Instansi"
                            : data?.camhs_data?.BiodataCamhs?.SumberBiaya ===
                                "lainnya"
                              ? "Lainnya"
                              : "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Program Studi Tujuan"
                      value={data?.camhs_data?.NamaProdi || "Belum diisi"}
                      type="text"
                    />
                    <BiodataView
                      title="Waktu Kuliah"
                      value={
                        (data?.camhs_data?.BiodataCamhs?.WaktuKuliah &&
                          ucFirst(
                            data?.camhs_data?.BiodataCamhs?.WaktuKuliah,
                          )) ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 lg:gap-8 w-full">
                    <div className="p-4">
                      <p className="font-bold text-slate-400 dark:text-white text-xs">
                        Mata Kuliah yang ingin diakui
                      </p>
                      <div className="mt-3">
                        <DataTable
                          columns={columns}
                          data={data?.matkul_pilihan || []}
                          isLoading={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="dokumen">
            {/* Dokumen */}
            <div className="mb-6 flex flex-col items-start py-6 px-10 bg-white rounded-lg shadow-lg">
              {/* Dokumen Pribadi */}
              <div className="my-2 w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Dokumen Pribadi
                </p>
                <div className="divider"></div>
                <div className="w-full mb-3">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    <BiodataView
                      title="Akta Lahir"
                      value={data?.camhs_data?.DokumenData?.AktaLahirNama}
                      type="file"
                      dataFile={{
                        namaFile: data?.camhs_data?.DokumenData?.AktaLahirNama,
                        linkFile: data?.camhs_data?.DokumenData?.AktaLahirLink,
                        type: "preview",
                        buttonText: "Lihat Dokumen",
                        onClick: () => {
                          window.open(
                            data?.camhs_data?.DokumenData?.AktaLahirLink,
                            "_blank",
                          );
                        },
                      }}
                    />
                    <BiodataView
                      title="Kartu Keluarga"
                      value={data?.camhs_data?.DokumenData?.KkNama}
                      type="file"
                      dataFile={{
                        namaFile: data?.camhs_data?.DokumenData?.KkNama,
                        linkFile: data?.camhs_data?.DokumenData?.KkLink,
                        type: "preview",
                        buttonText: "Lihat Dokumen",
                        onClick: () => {
                          window.open(
                            data?.camhs_data?.DokumenData?.KkLink,
                            "_blank",
                          );
                        },
                      }}
                    />
                    <BiodataView
                      title="KTP"
                      value={data?.camhs_data?.DokumenData?.KtpNama}
                      type="file"
                      dataFile={{
                        namaFile: data?.camhs_data?.DokumenData?.KtpNama,
                        linkFile: data?.camhs_data?.DokumenData?.KtpLink,
                        type: "preview",
                        buttonText: "Lihat Dokumen",
                        onClick: () => {
                          window.open(
                            data?.camhs_data?.DokumenData?.KtpLink,
                            "_blank",
                          );
                        },
                      }}
                    />
                    <BiodataView
                      title="NPWP"
                      value={data?.camhs_data?.DokumenData?.NpwpNama}
                      type="file"
                      dataFile={{
                        namaFile: data?.camhs_data?.DokumenData?.NpwpNama,
                        linkFile: data?.camhs_data?.DokumenData?.NpwpLink,
                        type: "preview",
                        buttonText: "Lihat Dokumen",
                        onClick: () => {
                          window.open(
                            data?.camhs_data?.DokumenData?.NpwpLink,
                            "_blank",
                          );
                        },
                      }}
                    />
                    <BiodataView
                      title="Pas Photo"
                      value={data?.camhs_data?.DokumenData?.PasPhotoNama}
                      type="file"
                      dataFile={{
                        namaFile: data?.camhs_data?.DokumenData?.PasPhotoNama,
                        linkFile: data?.camhs_data?.DokumenData?.PasPhotoLink,
                        type: "preview",
                        buttonText: "Lihat Dokumen",
                        onClick: () => {
                          window.open(
                            data?.camhs_data?.DokumenData?.PasPhotoLink,
                            "_blank",
                          );
                        },
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Dokumen Pendidikan */}
              <div className="my-2 w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Dokumen Pendidikan
                </p>
                <div className="divider"></div>
                <div className="w-full mb-3">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    <BiodataView
                      title="Ijazah"
                      value={data?.camhs_data?.DokumenData?.IjazahNama}
                      type="file"
                      dataFile={{
                        namaFile: data?.camhs_data?.DokumenData?.IjazahNama,
                        linkFile: data?.camhs_data?.DokumenData?.IjazahLink,
                        type: "preview",
                        buttonText: "Lihat Dokumen",
                        onClick: () => {
                          window.open(
                            data?.camhs_data?.DokumenData?.IjazahLink,
                            "_blank",
                          );
                        },
                      }}
                    />
                    <BiodataView
                      title="Kartu Pelajar"
                      value={data?.camhs_data?.DokumenData?.KartuPelajarNama}
                      type="file"
                      dataFile={{
                        namaFile:
                          data?.camhs_data?.DokumenData?.KartuPelajarNama,
                        linkFile:
                          data?.camhs_data?.DokumenData?.KartuPelajarLink,
                        type: "preview",
                        buttonText: "Lihat Dokumen",
                        onClick: () => {
                          window.open(
                            data?.camhs_data?.DokumenData?.KartuPelajarLink,
                            "_blank",
                          );
                        },
                      }}
                    />
                    <BiodataView
                      title="Link Bukti Pengakuan Mata Kuliah"
                      value={
                        data?.camhs_data?.LinkBuktiPengalaman || "Belum diisi"
                      }
                      type="text"
                    />
                  </div>
                </div>
              </div>

              {/* Dokumen Pembayaran */}
              <div className="my-2 w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Dokumen Pembayaran
                </p>
                <div className="divider"></div>
                <div className="w-full mb-3">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    <BiodataView
                      title="Pemilik Rekening"
                      value={
                        data?.camhs_data?.DokumenData?.PemilikRekening ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Bank"
                      value={
                        data?.camhs_data?.DokumenData?.BankPembayaran ||
                        "Belum diisi"
                      }
                      type="text"
                    />
                    <BiodataView
                      title="Bukti Pembayaran"
                      value={data?.camhs_data?.DokumenData?.BuktiBayarNama}
                      type="file"
                      dataFile={{
                        namaFile: data?.camhs_data?.DokumenData?.BuktiBayarNama,
                        linkFile: data?.camhs_data?.DokumenData?.BuktiBayarLink,
                        type: "preview",
                        buttonText: "Lihat Dokumen",
                        onClick: () => {
                          window.open(
                            data?.camhs_data?.DokumenData?.BuktiBayarLink,
                            "_blank",
                          );
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
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
