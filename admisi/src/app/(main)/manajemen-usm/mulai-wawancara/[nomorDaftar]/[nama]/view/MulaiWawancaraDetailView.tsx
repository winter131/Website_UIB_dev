"use client";
import DetailCalonMahasiswaHeader from "@/components/DetailCalonMahasiswaHeader";

import { useMulaiWawancaraDataDetail } from "@/hooks/mulai-wawancara/useMulaiWawancaraDataDetail";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import MulaiWawancaraDetailSkeleton from "./MulaiWawancaraDetailSkeleton";
import WawancaraInformasiCalonMahasiswa from "@/components/WawancaraInformasiCalonMahasiswa";
import WawancaraInformasiWawancara from "@/components/WawancaraInformasiWawancara";
import WawancaraInformasiDisabilitas from "@/components/WawancaraInformasiDisabilitas";
import { FormIsiWawancaraType } from "@/types/MulaiWawancaraTypes";
import WawancaraInformasiRekomendasi from "@/components/WawancaraInformasiRekomendasi";
import WawancaraInformasiDokumenBeasiswa from "@/components/WawancaraInformasiDokumenBeasiswa";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useConfirmation } from "@/store/useConfirmationBox";
import { useSimpanWawancara } from "@/hooks/mulai-wawancara/useSimpanWawancara";

export default function MulaiWawancaraDetailView({
  nomorDaftar,
  namaCamhs,
}: {
  nomorDaftar: string;
  namaCamhs: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();
  const validasiForm = {
    S1_BEASISWA_NON_FK: [
      "tahunLulusan",
      "prestasi",
      "catatanLatarBelakang",
      "catatanPerilaku",
      "keperluanKerja",
      "sumberInformasi",
      "sumberInformasiLainnya",
      "pemberiRekomendasi",
      "namaGuruBK",
      "disabilitasCaMaba",
      "disabilitasAyah",
      "disabilitasIbu",
      "rekomendasiBeasiswa",
      "rekomendasiPeringkat",
      "rekomendasiDiterima",
      "alasanRaguRagu",
    ],
    S1_BEASISWA_FK: [
      "tahunLulusan",
      "hasilWawancaraPsikotest",
      "parameterEtikaKomunikasi",
      "parameterKemampuanAnalisa",
      "parameterProblemSolving",
      "parameterProfesionalisme",
      "disabilitasCaMaba",
      "disabilitasAyah",
      "disabilitasIbu",
      "rekomendasiBeasiswa",
      "rekomendasiPeringkat",
      "rekomendasiDiterima",
      "alasanRaguRagu",
    ],
    S1_NON_BEASISWA_NON_FK: [
      "tahunLulusan",
      "prestasi",
      "catatanLatarBelakang",
      "catatanPerilaku",
      "keperluanKerja",
      "sumberInformasi",
      "sumberInformasiLainnya",
      "pemberiRekomendasi",
      "namaGuruBK",
      "disabilitasCaMaba",
      "disabilitasAyah",
      "disabilitasIbu",
      "rekomendasiBeasiswa",
      "rekomendasiPeringkat",
      "rekomendasiDiterima",
      "alasanRaguRagu",
    ],
    S1_NON_BEASISWA_FK: [
      "tahunLulusan",
      "hasilWawancaraPsikotest",
      "parameterEtikaKomunikasi",
      "parameterKemampuanAnalisa",
      "parameterProblemSolving",
      "parameterProfesionalisme",
      "disabilitasCaMaba",
      "disabilitasAyah",
      "disabilitasIbu",
      "rekomendasiBeasiswa",
      "rekomendasiPeringkat",
      "rekomendasiDiterima",
      "alasanRaguRagu",
    ],
  };
  const [formData, setFormData] = useState<FormIsiWawancaraType>({
    tahunLulusan: "",
    prestasi: "",
    catatanLatarBelakang: "",
    catatanPerilaku: "",
    keperluanKerja: "",
    sumberInformasi: "",
    pemberiRekomendasi: "",
    namaGuruBK: "",
    rekomendasiBeasiswa: "",
    rekomendasiPeringkat: "",
    rekomendasiDiterima: "",
    alasanRaguRagu: "",
    sumberInformasiLainnya: "",
    disabilitasCaMaba: [],
    disabilitasAyah: [],
    disabilitasIbu: [],
    hasilWawancaraPsikotest: "",
    parameterEtikaKomunikasi: "",
    parameterKemampuanAnalisa: "",
    parameterProblemSolving: "",
    parameterProfesionalisme: "",
  });

  // Get data calon mahasiswa
  const { data, isLoading, refetch } = useMulaiWawancaraDataDetail(
    session?.user?.accessToken,
    status,
    nomorDaftar,
  );
  //Aktivasi or deaktivasi akun mutation
  const { mutate: simpanWawancaraMutation } = useSimpanWawancara(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil menyimpan data wawancara calon mahasiswa",
      });
      router.replace("/manajemen-usm/mulai-wawancara");
    },
    (msg) => {
      setIsSubmitting(false);
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: msg,
      });
    },
  );
  const isBeasiswa = data?.camhs_data?.IsBeasiswa === "y";
  const jenjang = data?.camhs_data?.JenjangCamhs === "S1" ? "S1" : "S2";

  const simpanWawancara = () => {
    const isCamhsFK = data?.camhs_data?.ProdiId === 81;

    let validasiKeys: string[] = [];

    if (jenjang === "S1") {
      if (isBeasiswa) {
        validasiKeys = isCamhsFK
          ? validasiForm.S1_BEASISWA_FK
          : validasiForm.S1_BEASISWA_NON_FK;
      } else {
        validasiKeys = isCamhsFK
          ? validasiForm.S1_NON_BEASISWA_FK
          : validasiForm.S1_NON_BEASISWA_NON_FK;
      }
    }

    const fieldNames: Record<string, string> = {
      tahunLulusan: "Tahun Lulusan",
      prestasi: "Prestasi",
      catatanLatarBelakang: "Catatan Latar Belakang",
      catatanPerilaku: "Catatan Perilaku",
      keperluanKerja: "Keperluan Kerja",
      sumberInformasi: "Sumber Informasi",
      sumberInformasiLainnya: "Sumber Informasi Lainnya",
      pemberiRekomendasi: "Pemberi Rekomendasi",
      namaGuruBK: "Nama Guru BK",
      disabilitasCaMaba: "Disabilitas Calon Mahasiswa",
      disabilitasAyah: "Disabilitas Ayah",
      disabilitasIbu: "Disabilitas Ibu",
      rekomendasiBeasiswa: "Rekomendasi Beasiswa",
      rekomendasiPeringkat: "Rekomendasi Peringkat",
      rekomendasiDiterima: "Rekomendasi Penerimaan",
      alasanRaguRagu: "Alasan Ragu-ragu",
      hasilWawancaraPsikotest: "Hasil Wawancara Psikotest",
      parameterEtikaKomunikasi: "Parameter Etika Komunikasi",
      parameterKemampuanAnalisa: "Parameter Kemampuan Analisa",
      parameterProblemSolving: "Parameter Problem Solving",
      parameterProfesionalisme: "Parameter Profesionalisme",
    };

    const missingFields: string[] = [];

    for (const key of validasiKeys) {
      if (
        key === "sumberInformasiLainnya" &&
        formData.sumberInformasi !== "Lainnya"
      )
        continue;
      if (key === "namaGuruBK" && formData.pemberiRekomendasi !== "Guru BK")
        continue;
      if (
        key === "alasanRaguRagu" &&
        formData.rekomendasiDiterima !== "Ragu-ragu"
      )
        continue;

      const value = formData[key as keyof FormIsiWawancaraType];

      let isEmpty = false;
      if (value === undefined || value === null) {
        isEmpty = true;
      } else if (typeof value === "string" && value.trim() === "") {
        isEmpty = true;
      } else if (Array.isArray(value) && value.length === 0) {
        if (
          key !== "disabilitasCaMaba" &&
          key !== "disabilitasAyah" &&
          key !== "disabilitasIbu"
        ) {
          isEmpty = true;
        }
      }

      if (isEmpty) {
        missingFields.push(fieldNames[key] || key);
      }
    }

    if (missingFields.length > 0) {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Form Belum Lengkap",
        message: `Harap melengkapi field berikut: ${missingFields.join(", ")}`,
      });
      return;
    }

    const payload = {
      nomor_daftar: nomorDaftar,
      tahun_lulusan: Number(formData.tahunLulusan) || 0,
      sumber_informasi: formData.sumberInformasi,
      sumber_lainnya:
        formData.sumberInformasi === "Lainnya"
          ? formData.sumberInformasiLainnya
          : "",
      prestasi_dicapai: formData.prestasi,
      catatan_pewawancara: formData.catatanLatarBelakang,
      perilaku_camhs: formData.catatanPerilaku,
      keperluan_kerja: formData.keperluanKerja,
      pemberi_rekomendasi: formData.pemberiRekomendasi,
      guru_bk:
        formData.pemberiRekomendasi === "Guru BK" ? formData.namaGuruBK : "",
      rekomendasi_pewawancara: formData.rekomendasiDiterima,
      catatan_ragu_ragu:
        formData.rekomendasiDiterima === "Ragu-ragu"
          ? formData.alasanRaguRagu
          : "",
      disabilitas_camhs: formData.disabilitasCaMaba || [],
      disabilitas_ayah: formData.disabilitasAyah || [],
      disabilitas_ibu: formData.disabilitasIbu || [],
      rekomendasi_peringkat: Number(formData.rekomendasiPeringkat) || 0,
      rekomendasi_beasiswa: Number(formData.rekomendasiBeasiswa) || 0,

      // Struct For FK
      tambahan_psikotest: isCamhsFK ? formData.hasilWawancaraPsikotest : "",
      motivasi_camhs: isCamhsFK ? formData.parameterEtikaKomunikasi : "",
      pengetahuan_dasar: isCamhsFK ? formData.parameterKemampuanAnalisa : "",
      kemampuan_tim: isCamhsFK ? formData.parameterProblemSolving : "",
      kesiapan_mental: isCamhsFK ? formData.parameterProfesionalisme : "",
    };

    showConfirmation({
      title: "Simpan Hasil Wawancara?",
      message:
        "Pastikan informasi yang diinput sudah sesuai dengan hasil wawancara tatap muka. Data yang tersimpan akan digunakan sebagai dasar keputusan penerimaan",
      icon: "save",
      confirmButtonText: "Simpan",
      confirmButtonColor: "bg-green-600",
      onConfirm() {
        setIsSubmitting(true);
        simpanWawancaraMutation({
          token: session.user?.accessToken,
          wawancara: payload,
        });
      },
    });
  };

  if (isLoading) {
    return <MulaiWawancaraDetailSkeleton />;
  }

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">
        Mulai Wawancara - {namaCamhs} - {nomorDaftar}
      </h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm text-black">
        <ul>
          <li>
            <Link
              href={`/manajemen-usm/mulai-wawancara`}
              className="btn bg-black btn-xs rounded-lg text-white font-normal no-underline"
            >
              <span className="bx bx-arrow-back"></span> Kembali
            </Link>
          </li>
          <li className="text-xs">
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="text-xs">
            <Link href={"/manajemen-usm/mulai-wawancara"}>Mulai Wawancara</Link>
          </li>
          <li className="text-xs">
            <Link href={pathname}>
              {namaCamhs} - {nomorDaftar}
            </Link>
          </li>
        </ul>
      </div>

      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Isi detail wawancara calon mahasiswa
        </span>
      </div>

      {/* Konten */}
      <div className="card bg-white rounded-lg shadow-lg mb-6 flex flex-col items-start p-6  flex-wrap mt-6">
        <DetailCalonMahasiswaHeader
          isLoading={isLoading}
          data={data?.camhs_data || null}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          {/* Informasi Calon Mahasiswa */}
          <WawancaraInformasiCalonMahasiswa
            data={data}
            tahunLulusan={formData.tahunLulusan}
            setTahunLulusan={(value) =>
              setFormData({ ...formData, tahunLulusan: value })
            }
            jenjang={jenjang}
          />

          {/* Dokumen */}
          {jenjang === "S1" && isBeasiswa ? (
            <WawancaraInformasiDokumenBeasiswa data={data} />
          ) : null}

          {/* Informasi Wawancara */}
          <WawancaraInformasiWawancara
            data={data}
            formData={formData}
            setFormData={(value: any, key: string) =>
              setFormData({ ...formData, [key]: value })
            }
          />

          {/* Disabilitas */}
          <WawancaraInformasiDisabilitas
            formData={formData}
            setFormData={(value: any, key: string) =>
              setFormData({ ...formData, [key]: value })
            }
          />
        </div>

        <div className="space-y-8 sticky top-5 self-start">
          {/* Recommendation Section */}
          <WawancaraInformasiRekomendasi
            data={data}
            formData={formData}
            setFormData={(value: any, key: string) =>
              setFormData({ ...formData, [key]: value })
            }
            simpanWawancara={simpanWawancara}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
