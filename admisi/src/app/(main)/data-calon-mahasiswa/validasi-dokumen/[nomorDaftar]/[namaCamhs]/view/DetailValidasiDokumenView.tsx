"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useConfirmation } from "@/store/useConfirmationBox";
import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import { useDetailCalonMahasiswa } from "@/hooks/calon-mahasiswa/useDetailCalonMahasiswa";
import DetailCalonMahasiswaHeader from "@/components/DetailCalonMahasiswaHeader";
import BiodataView from "@/components/BiodataView";
import { GetNamaFileDariLinkBucket } from "@/utils/GetNamaFileDariLinkBucket";
import { useSaveValidasiDokumen } from "@/hooks/calon-mahasiswa/useSaveValidasiDokumen";
import { Loader2, X } from "lucide-react";

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
  const { data, isLoading, refetch } = useDetailCalonMahasiswa(
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
        Detail Dokumen - {namaCamhs} - {nomorDaftar}
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

        {/* Persyaratan Dokumen Sarjana */}
        {data?.dokumen_s1 && (
          <div className="card bg-white rounded-lg shadow-lg mb-6 flex flex-col items-start p-6  flex-wrap">
            <div className="w-full">
              <p className="text-black dark:text-white text-xl font-bold">
                Persyaratan Dokumen Sarjana
              </p>
              <div className="w-full mt-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                  <BiodataView
                    title="Pas Photo"
                    value={data?.dokumen_s1?.PasPhotoLink || ""}
                    type="file"
                    dataFile={{
                      namaFile: GetNamaFileDariLinkBucket(
                        data?.dokumen_s1?.PasPhotoLink || "",
                      ),
                      linkFile: data?.dokumen_s1?.PasPhotoLink || "#",
                      type: "preview",
                      buttonText: "Lihat",
                      onClick: () => {
                        window.open(
                          data?.dokumen_s1?.PasPhotoLink || "#",
                          "_blank",
                        );
                      },
                    }}
                  />
                  <BiodataView
                    title="Kartu Tanda Penduduk (KTP)"
                    value={data?.dokumen_s1?.KtpLink || ""}
                    type="file"
                    dataFile={{
                      namaFile: GetNamaFileDariLinkBucket(
                        data?.dokumen_s1?.KtpLink || "",
                      ),
                      linkFile: data?.dokumen_s1?.KTPLink || "#",
                      type: "preview",
                      buttonText: "Lihat",
                      onClick: () => {
                        window.open(data?.dokumen_s1?.KtpLink || "#", "_blank");
                      },
                    }}
                  />
                  <BiodataView
                    title="Kartu Keluarga (KK)"
                    value={data?.dokumen_s1?.KkLink || ""}
                    type="file"
                    dataFile={{
                      namaFile: GetNamaFileDariLinkBucket(
                        data?.dokumen_s1?.KkLink || "",
                      ),
                      linkFile: data?.dokumen_s1?.KkLink || "#",
                      type: "preview",
                      buttonText: "Lihat",
                      onClick: () => {
                        window.open(data?.dokumen_s1?.KkLink || "#", "_blank");
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Persyaratan Dokumen Sarjana */}
        {data?.dokumen_beasiswa && (
          <div className="card bg-white rounded-lg shadow-lg mb-6 flex flex-col items-start p-6  flex-wrap">
            <div className="w-full">
              <p className="text-black dark:text-white text-xl font-bold">
                Persyaratan Dokumen Beasiswa
              </p>
              <div className="w-full mt-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                  {/* Rapor Semester 1 */}
                  <BiodataView
                    title="Rapor Semester 1"
                    value={data?.dokumen_beasiswa?.Raport1Link || ""}
                    type="file"
                    dataFile={{
                      namaFile: GetNamaFileDariLinkBucket(
                        data?.dokumen_beasiswa?.Raport1Link || "",
                      ),
                      linkFile: data?.dokumen_beasiswa?.Raport1Link || "#",
                      type: "preview",
                      buttonText: "Lihat",
                      onClick: () => {
                        window.open(
                          data?.dokumen_beasiswa?.Raport1Link || "#",
                          "_blank",
                        );
                      },
                    }}
                  />

                  {/* Rapor Semester 2 */}
                  <BiodataView
                    title="Rapor Semester 2"
                    value={data?.dokumen_beasiswa?.Raport2Link || ""}
                    type="file"
                    dataFile={{
                      namaFile: GetNamaFileDariLinkBucket(
                        data?.dokumen_beasiswa?.Raport2Link || "",
                      ),
                      linkFile: data?.dokumen_beasiswa?.Raport2Link || "#",
                      type: "preview",
                      buttonText: "Lihat",
                      onClick: () => {
                        window.open(
                          data?.dokumen_beasiswa?.Raport2Link || "#",
                          "_blank",
                        );
                      },
                    }}
                  />

                  {/* Rapor Semester 3 */}
                  <BiodataView
                    title="Rapor Semester 3"
                    value={data?.dokumen_beasiswa?.Raport3Link || ""}
                    type="file"
                    dataFile={{
                      namaFile: GetNamaFileDariLinkBucket(
                        data?.dokumen_beasiswa?.Raport3Link || "",
                      ),
                      linkFile: data?.dokumen_beasiswa?.Raport3Link || "#",
                      type: "preview",
                      buttonText: "Lihat",
                      onClick: () => {
                        window.open(
                          data?.dokumen_beasiswa?.Raport3Link || "#",
                          "_blank",
                        );
                      },
                    }}
                  />

                  {/* Rapor Semester 4 */}
                  <BiodataView
                    title="Rapor Semester 4"
                    value={data?.dokumen_beasiswa?.Raport4Link || ""}
                    type="file"
                    dataFile={{
                      namaFile: GetNamaFileDariLinkBucket(
                        data?.dokumen_beasiswa?.Raport4Link || "",
                      ),
                      linkFile: data?.dokumen_beasiswa?.Raport4Link || "#",
                      type: "preview",
                      buttonText: "Lihat",
                      onClick: () => {
                        window.open(
                          data?.dokumen_beasiswa?.Raport4Link || "#",
                          "_blank",
                        );
                      },
                    }}
                  />

                  {/* Surat Keterangan Tidak Mampu */}
                  <BiodataView
                    title="Surat Keterangan Tidak Mampu"
                    value={
                      data?.dokumen_beasiswa?.SuratKeteranganTidakMampuLink ||
                      ""
                    }
                    type="file"
                    dataFile={{
                      namaFile: GetNamaFileDariLinkBucket(
                        data?.dokumen_beasiswa?.SuratKeteranganTidakMampuLink ||
                          "",
                      ),
                      linkFile:
                        data?.dokumen_beasiswa?.SuratKeteranganTidakMampuLink ||
                        "#",
                      type: "preview",
                      buttonText: "Lihat",
                      onClick: () => {
                        window.open(
                          data?.dokumen_beasiswa
                            ?.SuratKeteranganTidakMampuLink || "#",
                          "_blank",
                        );
                      },
                    }}
                  />

                  {/* Foto Rumah */}
                  <BiodataView
                    title="Foto Rumah"
                    value={data?.dokumen_beasiswa?.FotoRumahLink || ""}
                    type="file"
                    dataFile={{
                      namaFile: GetNamaFileDariLinkBucket(
                        data?.dokumen_beasiswa?.FotoRumahLink || "",
                      ),
                      linkFile: data?.dokumen_beasiswa?.FotoRumahLink || "#",
                      type: "preview",
                      buttonText: "Lihat",
                      onClick: () => {
                        window.open(
                          data?.dokumen_beasiswa?.FotoRumahLink || "#",
                          "_blank",
                        );
                      },
                    }}
                  />

                  {/* Tagihan Listrik */}
                  <BiodataView
                    title="Tagihan Listrik"
                    value={data?.dokumen_beasiswa?.TagihanListrikLink || ""}
                    type="file"
                    dataFile={{
                      namaFile: GetNamaFileDariLinkBucket(
                        data?.dokumen_beasiswa?.TagihanListrikLink || "",
                      ),
                      linkFile:
                        data?.dokumen_beasiswa?.TagihanListrikLink || "#",
                      type: "preview",
                      buttonText: "Lihat",
                      onClick: () => {
                        window.open(
                          data?.dokumen_beasiswa?.TagihanListrikLink || "#",
                          "_blank",
                        );
                      },
                    }}
                  />

                  {/* Tagihan Air */}
                  <BiodataView
                    title="Tagihan Air"
                    value={data?.dokumen_beasiswa?.TagihanAirLink || ""}
                    type="file"
                    dataFile={{
                      namaFile: GetNamaFileDariLinkBucket(
                        data?.dokumen_beasiswa?.TagihanAirLink || "",
                      ),
                      linkFile: data?.dokumen_beasiswa?.TagihanAirLink || "#",
                      type: "preview",
                      buttonText: "Lihat",
                      onClick: () => {
                        window.open(
                          data?.dokumen_beasiswa?.TagihanAirLink || "#",
                          "_blank",
                        );
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Persyaratan Dokumen S2 */}
        {data?.dokumen_s2 && (
          <>
            {/* Dokumen Calon Mahasiswa */}
            <div className="card bg-white rounded-lg shadow-lg mb-6 flex flex-col items-start p-6  flex-wrap">
              <div className="w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Dokumen Calon Mahasiswa
                </p>
                <div className="w-full mt-4">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    {/* Pas Photo */}
                    <BiodataView
                      title="Pas Photo"
                      value={data?.dokumen_s2?.PasPhotoLink || ""}
                      type="file"
                      dataFile={{
                        namaFile: GetNamaFileDariLinkBucket(
                          data?.dokumen_s2?.PasPhotoLink || "",
                        ),
                        linkFile: data?.dokumen_s2?.PasPhotoLink || "#",
                        type: "preview",
                        buttonText: "Lihat",
                        onClick: () => {
                          window.open(
                            data?.dokumen_s2?.PasPhotoLink || "#",
                            "_blank",
                          );
                        },
                      }}
                    />

                    {/* Kartu Tanda Penduduk (KTP) */}
                    <BiodataView
                      title="Kartu Tanda Penduduk (KTP)"
                      value={data?.dokumen_s2?.KtpLink || ""}
                      type="file"
                      dataFile={{
                        namaFile: GetNamaFileDariLinkBucket(
                          data?.dokumen_s2?.KtpLink || "",
                        ),
                        linkFile: data?.dokumen_s2?.KtpLink || "#",
                        type: "preview",
                        buttonText: "Lihat",
                        onClick: () => {
                          window.open(
                            data?.dokumen_s2?.KtpLink || "#",
                            "_blank",
                          );
                        },
                      }}
                    />

                    {/* Akta Lahir */}
                    <BiodataView
                      title="Akta Lahir"
                      value={data?.dokumen_s2?.AktaLahirLink || ""}
                      type="file"
                      dataFile={{
                        namaFile: GetNamaFileDariLinkBucket(
                          data?.dokumen_s2?.AktaLahirLink || "",
                        ),
                        linkFile: data?.dokumen_s2?.AktaLahirLink || "#",
                        type: "preview",
                        buttonText: "Lihat",
                        onClick: () => {
                          window.open(
                            data?.dokumen_s2?.AktaLahirLink || "#",
                            "_blank",
                          );
                        },
                      }}
                    />

                    {/* Kartu Keluarga (KK) */}
                    <BiodataView
                      title="Kartu Keluarga (KK)"
                      value={data?.dokumen_s2?.KkLink || ""}
                      type="file"
                      dataFile={{
                        namaFile: GetNamaFileDariLinkBucket(
                          data?.dokumen_s2?.KkLink || "",
                        ),
                        linkFile: data?.dokumen_s2?.KkLink || "#",
                        type: "preview",
                        buttonText: "Lihat",
                        onClick: () => {
                          window.open(
                            data?.dokumen_s2?.KkLink || "#",
                            "_blank",
                          );
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Persyaratan Dokumen Magister */}
            <div className="card bg-white rounded-lg shadow-lg mb-6 flex flex-col items-start p-6  flex-wrap">
              <div className="w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Persyaratan Dokumen Magister
                </p>
                <div className="w-full mt-4">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    {/* Transkrip Nilai */}
                    <BiodataView
                      title="Transkrip Nilai"
                      value={data?.dokumen_s2?.TranskripNilaiLink || ""}
                      type="file"
                      dataFile={{
                        namaFile: GetNamaFileDariLinkBucket(
                          data?.dokumen_s2?.TranskripNilaiLink || "",
                        ),
                        linkFile: data?.dokumen_s2?.TranskripNilaiLink || "#",
                        type: "preview",
                        buttonText: "Lihat",
                        onClick: () => {
                          window.open(
                            data?.dokumen_s2?.TranskripNilaiLink || "#",
                            "_blank",
                          );
                        },
                      }}
                    />

                    {/* Ijazah */}
                    <BiodataView
                      title="Ijazah"
                      value={data?.dokumen_s2?.IjazahLink || ""}
                      type="file"
                      dataFile={{
                        namaFile: GetNamaFileDariLinkBucket(
                          data?.dokumen_s2?.IjazahLink || "",
                        ),
                        linkFile: data?.dokumen_s2?.IjazahLink || "#",
                        type: "preview",
                        buttonText: "Lihat",
                        onClick: () => {
                          window.open(
                            data?.dokumen_s2?.IjazahLink || "#",
                            "_blank",
                          );
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Persyaratan Dokumen Transfer */}
        {data?.transfer_data && (
          <>
            {/* Data Transfer Calon Mahasiswa  */}
            <div className="card bg-white rounded-lg shadow-lg mb-6 flex flex-col items-start p-6  flex-wrap">
              <div className="w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Data Transfer Calon Mahasiswa
                </p>
                <div className="w-full mt-4">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    {/* Asal Universitas */}
                    <BiodataView
                      title="Asal Universitas"
                      value={data?.transfer_data?.AsalUniversitas || ""}
                      type="text"
                    />

                    {/* Program Studi Sebelumnya */}
                    <BiodataView
                      title="Program Studi Sebelumnya"
                      value={data?.transfer_data?.prodi_asal || ""}
                      type="text"
                    />

                    {/* Jenjang Pendidikan Terakhir */}
                    <BiodataView
                      title="Jenjang Pendidikan Terakhir"
                      value={data?.transfer_data?.jenjang_pendidikan || ""}
                      type="text"
                    />

                    {/* IPK */}
                    <BiodataView
                      title="IPK"
                      value={data?.transfer_data?.ipk || ""}
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Persyaratan Dokumen Transfer */}
            <div className="card bg-white rounded-lg shadow-lg mb-6 flex flex-col items-start p-6  flex-wrap">
              <div className="w-full">
                <p className="text-black dark:text-white text-xl font-bold">
                  Persyaratan Dokumen Transfer
                </p>
                <div className="w-full mt-4">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 w-full">
                    {/* Transkrip Nilai */}
                    <BiodataView
                      title="Transkrip Nilai"
                      value={data?.transfer_data?.TranskripNilai || ""}
                      type="file"
                      dataFile={{
                        namaFile: GetNamaFileDariLinkBucket(
                          data?.transfer_data?.TranskripNilai || "",
                        ),
                        linkFile: data?.transfer_data?.TranskripNilai || "#",
                        type: "preview",
                        buttonText: "Lihat",
                        onClick: () => {
                          window.open(
                            data?.transfer_data?.TranskripNilai || "#",
                            "_blank",
                          );
                        },
                      }}
                    />

                    {/* Ijazah */}
                    <BiodataView
                      title="Ijazah"
                      value={data?.transfer_data?.IjazahJenjang || ""}
                      type="file"
                      dataFile={{
                        namaFile: GetNamaFileDariLinkBucket(
                          data?.transfer_data?.IjazahJenjang || "",
                        ),
                        linkFile: data?.transfer_data?.IjazahJenjang || "#",
                        type: "preview",
                        buttonText: "Lihat",
                        onClick: () => {
                          window.open(
                            data?.transfer_data?.IjazahJenjang || "#",
                            "_blank",
                          );
                        },
                      }}
                    />

                    {/* Ijazah */}
                    <BiodataView
                      title="Dokumen Persetujuan Transfer Kredit"
                      value={data?.transfer_data?.DokPersetujuanTransfer || ""}
                      type="file"
                      dataFile={{
                        namaFile: GetNamaFileDariLinkBucket(
                          data?.transfer_data?.DokPersetujuanTransfer || "",
                        ),
                        linkFile:
                          data?.transfer_data?.DokPersetujuanTransfer || "#",
                        type: "preview",
                        buttonText: "Lihat",
                        onClick: () => {
                          window.open(
                            data?.transfer_data?.DokPersetujuanTransfer || "#",
                            "_blank",
                          );
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
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
