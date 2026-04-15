"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useConfirmation } from "@/store/useConfirmationBox";
import {
  NotionEditor,
  NotionEditorRef,
} from "@/components/tiptap-templates/notion-like/notion-like-editor";
import { Switch } from "@/components/ui/switch";
import HeaderImageUpload from "@/components/HeaderImageUpload";
import { isTiptapEmpty } from "@/utils/isTiptapEmpty";
import { useEditInformasiUmum } from "@/hooks/informasi-umum/useEditInformasiUmum";
import useInformasiUmum from "@/store/useEditInformasiUmum";
import { decodeHtmlEntities } from "@/utils/decodeHTMLEntities";

export default function UbahInformasiView() {
  const pathname = usePathname();
  const router = useRouter();
  const { editInformasiUmum, setEditInformasiUmum }: any = useInformasiUmum();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();
  const [isLoading, setIsLoading] = useState(false);
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

  const { mutate: editInformasiUmumMutation } = useEditInformasiUmum(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengubah informasi umum",
      });
      setInformasiUmum({
        id_informasi: "",
        header_file_name: "",
        judul_informasi: "",
        keterangan_info: "",
        body_informasi: null,
        header_gambar: null,
        is_active: false,
      });
      setIsLoading(false);
      router.push("/managemen-data-umum/informasi-umum");
    },
    (msg) => {
      setIsLoading(false);
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: msg,
      });
    }
  );

  useEffect(() => {
    if (!editInformasiUmum) {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: "Informasi umum tidak ditemukan",
      });
      router.push("/managemen-data-umum/informasi-umum");
      return;
    }

    const decoded = decodeHtmlEntities(editInformasiUmum.body_informasi);

    setInformasiUmum({
      id_informasi: editInformasiUmum.id_informasi,
      header_file_name: editInformasiUmum.HeaderFileName,
      judul_informasi: editInformasiUmum.judul_informasi,
      keterangan_info: editInformasiUmum.keterangan_info,
      body_informasi: JSON.parse(decoded),
      header_gambar: editInformasiUmum.header_gambar,
      is_active: editInformasiUmum.is_aktif === "y" ? true : false,
    });
  }, [editInformasiUmum]);

  // Submit form tambah informasi umum
  const handleSubmit = async () => {
    if (informasiUmum.judul_informasi.trim() === "") {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: "Judul informasi umum tidak boleh kosong",
      });
      return;
    }

    if (informasiUmum.keterangan_info.trim() === "") {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: "Keterangan informasi umum tidak boleh kosong",
      });
      return;
    }

    if (isTiptapEmpty(informasiUmum.body_informasi)) {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Terjadi Kesalahan",
        message: "Isi informasi umum tidak boleh kosong",
      });
      return;
    }
    setIsLoading(true);
    editInformasiUmumMutation({
      token: session.user?.accessToken,
      informasiUmum: {
        id_informasi: informasiUmum.id_informasi,
        judul_informasi: informasiUmum.judul_informasi,
        keterangan_info: informasiUmum.keterangan_info,
        body_informasi: informasiUmum.body_informasi,
        header_gambar: informasiUmum.header_gambar,
        header_file_name: informasiUmum.header_file_name,
        is_aktif: informasiUmum.is_active,
      },
    });
  };

  const editorRef = useRef<NotionEditorRef>(null);

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">
        Informasi Umum - Ubah Informasi
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
            <Link href={pathname}>Ubah Informasi</Link>
          </li>
        </ul>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-3">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informasi Utama */}
          <section className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Informasi Utama
            </h2>

            <div className="space-y-4">
              {/* Judul */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul <small className="text-red-500">*</small>
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Contoh: Beasiswa Universitas Internasional Batam"
                  onChange={(e) => {
                    setInformasiUmum((prev) => {
                      return {
                        ...prev,
                        judul_informasi: e.target.value,
                      };
                    });
                  }}
                  value={informasiUmum.judul_informasi}
                />
              </div>

              {/* Keterangan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keterangan Singkat <small className="text-red-500">*</small>
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  placeholder="Ringkasan singkat yang akan tampil di daftar informasi"
                  onChange={(e) => {
                    setInformasiUmum((prev) => {
                      return {
                        ...prev,
                        keterangan_info: e.target.value,
                      };
                    });
                  }}
                  value={informasiUmum.keterangan_info}
                />
              </div>
            </div>
          </section>

          {/* Editor */}
          <section className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Isi Informasi <small className="text-red-500">*</small>
            </h2>

            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <NotionEditor
                ref={editorRef}
                content={informasiUmum.body_informasi}
                onChange={(content) => {
                  setInformasiUmum((prev) => ({
                    ...prev,
                    body_informasi: content,
                  }));
                }}
              />
            </div>
          </section>
        </div>

        {/* RIGHT */}
        <div className="space-y-6 sticky top-5 self-start">
          {/* Status */}
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Publikasi
            </h2>

            <label className="flex items-center justify-between text-sm text-gray-700">
              <span>Aktifkan informasi</span>
              <div className="flex items-center space-x-2">
                <Switch
                  id="airplane-mode"
                  checked={informasiUmum.is_active}
                  onCheckedChange={(e) =>
                    setInformasiUmum((prev) => ({
                      ...prev,
                      is_active: e,
                    }))
                  }
                />
              </div>
            </label>
          </section>

          {/* Header Image */}
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Gambar Header
            </h2>

            <HeaderImageUpload
              value={informasiUmum.header_gambar}
              onChange={(file) =>
                setInformasiUmum((prev) => ({
                  ...prev,
                  header_gambar: file,
                }))
              }
            />
          </section>

          {/* Actions */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 space-y-3">
            <button
              className="w-full rounded-lg bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-600 hover:text-white hover:bg-emerald-700 border border-emerald-600 flex flex-row justify-center items-center gap-2"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="bx bx-loader-alt animate-spin text-lg"></span>
              ) : (
                <span className="bx bx-save text-lg"></span>
              )}{" "}
              Simpan Informasi
            </button>
            <button
              className="w-full rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:text-white hover:bg-red-700 border border-red-600 flex flex-row justify-center items-center gap-2"
              onClick={() =>
                showConfirmation({
                  title: "Reset Form Informasi?",
                  message:
                    "Anda yakin ingin me-reset form informasi ini? Data yang telah ditambahkan akan hilang.",
                  onConfirm: () => {
                    setInformasiUmum({
                      id_informasi: "",
                      header_file_name: "",
                      judul_informasi: "",
                      keterangan_info: "",
                      body_informasi: null,
                      header_gambar: null,
                      is_active: false,
                    });
                    editorRef.current?.clearContent();
                  },
                })
              }
            >
              <span className="bx bx-reset text-lg"></span> Reset
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
