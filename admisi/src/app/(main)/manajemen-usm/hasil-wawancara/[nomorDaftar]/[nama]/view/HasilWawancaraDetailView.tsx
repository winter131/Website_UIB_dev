"use client";
import DetailCalonMahasiswaHeader from "@/components/DetailCalonMahasiswaHeader";
import { useHasilWawancaraDetail } from "@/hooks/hasil-wawancara/useHasilWawancaraDetail";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MulaiWawancaraDetailSkeleton from "@/app/(main)/manajemen-usm/mulai-wawancara/[nomorDaftar]/[nama]/view/MulaiWawancaraDetailSkeleton";
import WawancaraInformasiCalonMahasiswa from "@/components/WawancaraInformasiCalonMahasiswa";
import WawancaraInformasiWawancara from "@/components/WawancaraInformasiWawancara";
import WawancaraInformasiDisabilitas from "@/components/WawancaraInformasiDisabilitas";
import { FormIsiWawancaraType } from "@/types/MulaiWawancaraTypes";
import WawancaraInformasiRekomendasi from "@/components/WawancaraInformasiRekomendasi";
import WawancaraInformasiDokumenBeasiswa from "@/components/WawancaraInformasiDokumenBeasiswa";

export default function HasilWawancaraDetailView({
  nomorDaftar,
  namaCamhs,
}: {
  nomorDaftar: string;
  namaCamhs: string;
}) {
  const pathname = usePathname();
  const { data: session, status }: { data: any; status: string } = useSession();

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

  // Get data detail wawancara
  const { data, isLoading } = useHasilWawancaraDetail(
    session?.user?.accessToken,
    status,
    nomorDaftar,
  );

  const isBeasiswa = data?.camhs_data?.IsBeasiswa === "y";
  const jenjang = data?.camhs_data?.JenjangCamhs === "S1" ? "S1" : "S2";
  const isCamhsFK = data?.camhs_data?.ProdiId === 81;

  // Populate form data from API response
  useEffect(() => {
    if (!data?.detail_wawancara) return;

    const w = data.detail_wawancara;
    setFormData({
      tahunLulusan: w.tahun_lulusan ? String(w.tahun_lulusan) : "",
      prestasi: w.prestasi_dicapai || "",
      catatanLatarBelakang: w.catatan_pewawancara || "",
      catatanPerilaku: w.perilaku_camhs || "",
      keperluanKerja: w.keperluan_kerja || "",
      sumberInformasi: w.sumber_informasi || "",
      pemberiRekomendasi: w.pemberi_rekomendasi || "",
      namaGuruBK: w.guru_bk || "",
      rekomendasiBeasiswa: w.rekomendasi_beasiswa
        ? String(w.rekomendasi_beasiswa)
        : "",
      rekomendasiPeringkat: w.rekomendasi_peringkat
        ? String(w.rekomendasi_peringkat)
        : "",
      rekomendasiDiterima: w.rekomendasi_pewawancara || "",
      alasanRaguRagu: w.catatan_ragu_ragu || "",
      sumberInformasiLainnya: w.sumber_lainnya || "",
      disabilitasCaMaba: w.disabilitas_camhs || [],
      disabilitasAyah: w.disabilitas_ayah || [],
      disabilitasIbu: w.disabilitas_ibu || [],
      hasilWawancaraPsikotest: w.tambahan_psikotest || "",
      parameterEtikaKomunikasi: w.motivasi_camhs || "",
      parameterKemampuanAnalisa: w.pengetahuan_dasar || "",
      parameterProblemSolving: w.kemampuan_tim || "",
      parameterProfesionalisme: w.kesiapan_mental || "",
    });
  }, [data]);

  if (isLoading) {
    return <MulaiWawancaraDetailSkeleton />;
  }

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">
        Detail Hasil Wawancara - {namaCamhs}
      </h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm text-black">
        <ul>
          <li>
            <Link
              href={`/manajemen-usm/hasil-wawancara`}
              className="btn bg-black btn-xs rounded-lg text-white font-normal no-underline"
            >
              <span className="bx bx-arrow-back"></span> Kembali
            </Link>
          </li>
          <li className="text-xs">
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="text-xs">
            <Link href={"/manajemen-usm/hasil-wawancara"}>Hasil Wawancara</Link>
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
          Detail lengkap hasil wawancara calon mahasiswa (hanya baca)
        </span>
      </div>

      {/* Konten */}
      <div className="card bg-white rounded-lg shadow-lg mb-6 flex flex-col items-start p-6 flex-wrap mt-6">
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
            setTahunLulusan={() => {}}
            jenjang={jenjang}
            readOnly={true}
          />

          {/* Dokumen */}
          {jenjang === "S1" && isBeasiswa ? (
            <WawancaraInformasiDokumenBeasiswa data={data} />
          ) : null}

          {/* Informasi Wawancara */}
          <WawancaraInformasiWawancara
            data={data}
            formData={formData}
            setFormData={() => {}}
            readOnly={true}
          />

          {/* Disabilitas */}
          <WawancaraInformasiDisabilitas
            formData={formData}
            setFormData={() => {}}
            readOnly={true}
          />
        </div>

        <div className="space-y-8 sticky top-5 self-start">
          {/* Recommendation Section */}
          <WawancaraInformasiRekomendasi
            data={data}
            formData={formData}
            setFormData={() => {}}
            simpanWawancara={() => {}}
            isSubmitting={false}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
}
