"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { decodeHtmlEntities } from "@/utils/decodeHTMLEntities";
import useDetailInformasiUmum from "@/store/useDetailInformasiUmum";
import TiptapViewer from "@/components/TipTapViewer";

export default function DetailInformasiView() {
  const pathname = usePathname();
  const router = useRouter();
  const { detailInformasiUmum, setDetailInformasiUmum }: any =
    useDetailInformasiUmum();
  const showNotification = useNotifikasi.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();
  const [informasiUmum, setInformasiUmum] = useState<{
    id_informasi: string;
    header_file_name: string;
    judul_informasi: string;
    keterangan_info: string;
    body_informasi: any;
    header_gambar: File | null | string;
    is_active: boolean;
  }>({
    id_informasi: "",
    header_file_name: "",
    judul_informasi: "",
    keterangan_info: "",
    body_informasi: null,
    header_gambar: null,
    is_active: false,
  });

  useEffect(() => {
    if (!detailInformasiUmum) {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: "Informasi umum tidak ditemukan",
      });
      router.push("/managemen-data-umum/informasi-umum");
      return;
    }

    const decoded = decodeHtmlEntities(detailInformasiUmum.body_informasi);

    setInformasiUmum({
      id_informasi: detailInformasiUmum.id_informasi,
      header_file_name: detailInformasiUmum.HeaderFileName,
      judul_informasi: detailInformasiUmum.judul_informasi,
      keterangan_info: detailInformasiUmum.keterangan_info,
      body_informasi: JSON.parse(decoded),
      header_gambar: detailInformasiUmum.header_gambar,
      is_active: detailInformasiUmum.is_aktif === "y" ? true : false,
    });
  }, [detailInformasiUmum]);

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">
        Informasi Umum - Detail Informasi
      </h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm text-black">
        <ul>
          <li>
            <Link
              href={`/managemen-data-umum/informasi-umum`}
              className="btn bg-black btn-xs rounded-lg text-white font-normal no-underline"
            >
              <span className="bx bx-arrow-back"></span> Kembali
            </Link>
          </li>
          <li className="text-xs">
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="text-xs">
            <Link href={"/managemen-data-umum/informasi-umum"}>
              Informasi Umum
            </Link>
          </li>
          <li className="text-xs">
            <Link href={pathname}>Detail Informasi</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      {/* Preview Content */}
      <div className="mt-6 max-w-5xl">
        {/* Header Image */}
        {typeof informasiUmum.header_gambar === "string" && (
          <div className="mb-6 overflow-hidden rounded-xl border">
            <img
              src={informasiUmum.header_gambar}
              alt={informasiUmum.judul_informasi}
              className="h-64 w-full object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900">
          {informasiUmum.judul_informasi}
        </h1>

        {/* Meta */}
        <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
          <span>
            Status:{" "}
            <span
              className={`font-medium ${
                informasiUmum.is_active ? "text-green-600" : "text-gray-500"
              }`}
            >
              {informasiUmum.is_active ? "Aktif" : "Non Aktif"}
            </span>
          </span>
        </div>

        {/* Keterangan */}
        <p className="mt-4 text-lg text-gray-700">
          {informasiUmum.keterangan_info}
        </p>

        {/* Divider */}
        <hr className="my-8 border-gray-200" />

        {/* Body */}
        {informasiUmum.body_informasi && (
          <TiptapViewer content={informasiUmum.body_informasi} />
        )}
      </div>
    </div>
  );
}
