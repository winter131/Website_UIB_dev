"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import { LokasiUjianType } from "@/types/LokasiUjianTypes";
import { useEditLokasiUjian } from "@/hooks/lokasi-ujian/useEditLokasiUjian";
import { useDeleteLokasiUjian } from "@/hooks/lokasi-ujian/useDeleteLokasiUjian";
import { useGelombangPendaftaranData } from "@/hooks/gelombang-pendaftaran/useGelombangPendaftaranData";
import SelectSearch from "@/components/SelectSearch";
import { usePeriodeData } from "@/hooks/periode/usePeriodeData";
import { useDebounce } from "use-debounce";
import { PeriodeType } from "@/types/PeriodeTypes";
import { useJenisGelombangData } from "@/hooks/jenis-gelombang/useJenisGelombangData";
import { JenisGelombangType } from "@/types/JenisGelombangTypes";
import { useLokasiUjianData } from "@/hooks/lokasi-ujian/useLokasiUjianData";
import { ucFirst } from "@/utils/UcFirst";
import { IndonesianCurrency } from "@/utils/IndonesianCurrency";
import { useCreateGelombangPendaftaran } from "@/hooks/gelombang-pendaftaran/useCreateGelombangPendaftaran";
import { DatePicker } from "@/components/DatePicker";
import { useEditGelombangPendaftaran } from "@/hooks/gelombang-pendaftaran/useEditGelombangPendaftaran";
import { DetailGelombangType } from "@/types/DetailGelombangTypes";
import { useDeleteGelombangPendaftaran } from "@/hooks/gelombang-pendaftaran/useDeleteGelombangPendaftaran";

export default function GelombangPendaftaranView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [gelombangPendaftaran, setGelombangPendaftaran] = useState({
    detail_gelombang_id: "", // Only for editing
    gelombang_id: "", // Number And Required
    periode_id: "", // Number And Required
    biaya_formulir: "", // Number
    mulai_daftar: "", // String And Required di database yyyy-mm-dd
    akhir_daftar: "", // String And Required di database yyyy-mm-dd
    mulai_verifikasi: "", // String And Required di database yyyy-mm-dd
    akhir_verifikasi: "", // String And Required di database yyyy-mm-dd
    tanggal_ujian: "", // String And Required di database yyyy-mm-dd
    jam_mulai_ujian: "", // String And Required di database HH:ii
    jam_akhir_ujian: "", // String And Required di database HH:ii
    tanggal_pengumuman: "", // String And Required di database yyyy-mm-dd
    tanggal_daftar_ulang: "", // String And Required di database yyyy-mm-dd
    lokasi_ujian: "", // int Required dari database
    jenjang_gelombang: "", // S1 OR S2
    jenis_pendaftaran: "", //'nasional','internasional'
    cicilan_gelombang: "", // Entah Isinya apa nggak perlu ada tapi disediakan aja
  });

  const [searchPeriodeQuery, setSearchPeriodeQuery] = useState("");
  const [debouncedSearchPeriodeQuery] = useDebounce(searchPeriodeQuery, 500);
  const [periodeOptions, setPeriodeOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [searchJenisGelombangQuery, setSearchJenisGelombangQuery] =
    useState("");
  const [debouncedSearchJenisGelombangQuery] = useDebounce(
    searchJenisGelombangQuery,
    500,
  );
  const [jenisGelombangOptions, setJenisGelombangOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [searchLokasiUjianQuery, setSearchLokasiUjianQuery] = useState("");
  const [debouncedSearchLokasiUjianQuery] = useDebounce(
    searchLokasiUjianQuery,
    500,
  );
  const [lokasiUjianOptions, setLokasiUjianOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // Get data gelombang pendaftaran
  const { data, isLoading, refetch } = useGelombangPendaftaranData(
    session.user?.accessToken,
    status,
  );
  // get periode options
  const {
    data: dataPeriodeOptions,
    isLoading: isLoadingPeriodeOptions,
    refetch: refetchPeriodeOptions,
  } = usePeriodeData(session.user?.accessToken, status);
  // Get jenis gelombang options
  const {
    data: dataJenisGelombangOptions,
    isLoading: isLoadingJenisGelombangOptions,
    refetch: refetchJenisGelombangOptions,
  } = useJenisGelombangData(session.user?.accessToken, status);
  // Get lokasi ujian options
  const {
    data: dataLokasiUjianOptions,
    isLoading: isLoadingLokasiUjianOptions,
    refetch: refetchLokasiUjianOptions,
  } = useLokasiUjianData(session.user?.accessToken, status);

  // Mutation create gelombang pendaftaran
  const { mutate: createGelombangPendaftaranMutation } =
    useCreateGelombangPendaftaran(
      () => {
        showNotification({
          status: "text-green-500",
          icon: "bx bx-check text-2xl",
          header: "Berhasil",
          message: "Berhasil menambahkan gelombang pendaftaran",
        });
        refetch();
        setGelombangPendaftaran({
          detail_gelombang_id: "",
          gelombang_id: "",
          periode_id: "",
          biaya_formulir: "",
          mulai_daftar: "",
          akhir_daftar: "",
          mulai_verifikasi: "",
          akhir_verifikasi: "",
          tanggal_ujian: "",
          jam_mulai_ujian: "",
          jam_akhir_ujian: "",
          tanggal_pengumuman: "",
          tanggal_daftar_ulang: "",
          lokasi_ujian: "",
          jenjang_gelombang: "",
          jenis_pendaftaran: "",
          cicilan_gelombang: "",
        });
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
  const { mutate: updateGelombangPendaftaranMutation } =
    useEditGelombangPendaftaran(
      () => {
        showNotification({
          status: "text-green-500",
          icon: "bx bx-check text-2xl",
          header: "Berhasil",
          message: "Berhasil mengedit gelombang pendaftaran",
        });
        refetch();
        setGelombangPendaftaran({
          detail_gelombang_id: "",
          gelombang_id: "",
          periode_id: "",
          biaya_formulir: "",
          mulai_daftar: "",
          akhir_daftar: "",
          mulai_verifikasi: "",
          akhir_verifikasi: "",
          tanggal_ujian: "",
          jam_mulai_ujian: "",
          jam_akhir_ujian: "",
          tanggal_pengumuman: "",
          tanggal_daftar_ulang: "",
          lokasi_ujian: "",
          jenjang_gelombang: "",
          jenis_pendaftaran: "",
          cicilan_gelombang: "",
        });
        setIsEditing(false);
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
  const { mutate: deleteGelombangPendaftaranMutation } =
    useDeleteGelombangPendaftaran(
      () => {
        showNotification({
          status: "text-green-500",
          icon: "bx bx-check text-2xl",
          header: "Berhasil",
          message: "Berhasil menghapus gelombang pendaftaran",
        });
        refetch();
        setGelombangPendaftaran({
          detail_gelombang_id: "",
          gelombang_id: "",
          periode_id: "",
          biaya_formulir: "",
          mulai_daftar: "",
          akhir_daftar: "",
          mulai_verifikasi: "",
          akhir_verifikasi: "",
          tanggal_ujian: "",
          jam_mulai_ujian: "",
          jam_akhir_ujian: "",
          tanggal_pengumuman: "",
          tanggal_daftar_ulang: "",
          lokasi_ujian: "",
          jenjang_gelombang: "",
          jenis_pendaftaran: "",
          cicilan_gelombang: "",
        });
        setSearchTerm("");
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

  // Submit form tambah dan edit gelombang pendaftaran
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    !isEditing
      ? createGelombangPendaftaranMutation({
          token: session.user?.accessToken,
          gelombangPendaftaran: {
            gelombang_id: Number(gelombangPendaftaran.gelombang_id), // Number And Required
            periode_id: Number(gelombangPendaftaran.periode_id), // Number And Required
            biaya_formulir: Number(gelombangPendaftaran.biaya_formulir), // Number
            mulai_daftar: gelombangPendaftaran.mulai_daftar, // String And Required di database yyyy-mm-dd
            akhir_daftar: gelombangPendaftaran.akhir_daftar, // String And Required di database yyyy-mm-dd
            mulai_verifikasi: gelombangPendaftaran.mulai_verifikasi, // String And Required di database yyyy-mm-dd
            akhir_verifikasi: gelombangPendaftaran.akhir_verifikasi, // String And Required di database yyyy-mm-dd
            tanggal_ujian: gelombangPendaftaran.tanggal_ujian.split("T")[0], // String And Required di database yyyy-mm-dd
            jam_mulai_ujian: gelombangPendaftaran.jam_mulai_ujian, // String And Required di database HH:ii
            jam_akhir_ujian: gelombangPendaftaran.jam_akhir_ujian, // String And Required di database HH:ii
            tanggal_pengumuman: gelombangPendaftaran.tanggal_pengumuman, // String And Required di database yyyy-mm-dd
            tanggal_daftar_ulang: gelombangPendaftaran.tanggal_daftar_ulang, // String And Required di database yyyy-mm-dd
            lokasi_ujian: Number(gelombangPendaftaran.lokasi_ujian), // int Required dari database
            jenjang_gelombang: gelombangPendaftaran.jenjang_gelombang, // S1 OR S2
            jenis_pendaftaran: gelombangPendaftaran.jenis_pendaftaran, //'nasional','internasional'
            cicilan_gelombang: gelombangPendaftaran.cicilan_gelombang, // Entah Isinya apa nggak perlu ada tapi disediakan aja
          },
        })
      : updateGelombangPendaftaranMutation({
          token: session.user?.accessToken,
          gelombangPendaftaran: {
            detail_gelombang_id: Number(
              gelombangPendaftaran.detail_gelombang_id,
            ),
            gelombang_id: Number(gelombangPendaftaran.gelombang_id), // Number And Required
            periode_id: Number(gelombangPendaftaran.periode_id), // Number And Required
            biaya_formulir: Number(gelombangPendaftaran.biaya_formulir), // Number
            mulai_daftar: gelombangPendaftaran.mulai_daftar, // String And Required di database yyyy-mm-dd
            akhir_daftar: gelombangPendaftaran.akhir_daftar, // String And Required di database yyyy-mm-dd
            mulai_verifikasi: gelombangPendaftaran.mulai_verifikasi, // String And Required di database yyyy-mm-dd
            akhir_verifikasi: gelombangPendaftaran.akhir_verifikasi, // String And Required di database yyyy-mm-dd
            tanggal_ujian: gelombangPendaftaran.tanggal_ujian.split("T")[0], // String And Required di database yyyy-mm-dd
            jam_mulai_ujian: gelombangPendaftaran.jam_mulai_ujian, // String And Required di database HH:ii
            jam_akhir_ujian: gelombangPendaftaran.jam_akhir_ujian, // String And Required di database HH:ii
            tanggal_pengumuman: gelombangPendaftaran.tanggal_pengumuman, // String And Required di database yyyy-mm-dd
            tanggal_daftar_ulang: gelombangPendaftaran.tanggal_daftar_ulang, // String And Required di database yyyy-mm-dd
            lokasi_ujian: Number(gelombangPendaftaran.lokasi_ujian), // int Required dari database
            jenjang_gelombang: gelombangPendaftaran.jenjang_gelombang, // S1 OR S2
            jenis_pendaftaran: gelombangPendaftaran.jenis_pendaftaran, //'nasional','internasional'
            cicilan_gelombang: gelombangPendaftaran.cicilan_gelombang, // Entah Isinya apa nggak perlu ada tapi disediakan aja
          },
        });
  };
  // Open editing state
  const handleEdit = (data: DetailGelombangType) => {
    setIsEditing(true);
    setGelombangPendaftaran({
      detail_gelombang_id: String(data.detail_gelombang_id),
      gelombang_id: String(data.gelombang_id), // Number And Required
      periode_id: String(data.periode_id), // Number And Required
      biaya_formulir: String(data.biaya_formulir), // Number
      mulai_daftar: data.mulai_daftar, // String And Required di database yyyy-mm-dd
      akhir_daftar: data.akhir_daftar, // String And Required di database yyyy-mm-dd
      mulai_verifikasi: data.mulai_verifikasi, // String And Required di database yyyy-mm-dd
      akhir_verifikasi: data.akhir_verifikasi, // String And Required di database yyyy-mm-dd
      tanggal_ujian: data.tanggal_ujian, // String And Required di database yyyy-mm-dd
      jam_mulai_ujian: data.jam_mulai_ujian, // String And Required di database HH:ii
      jam_akhir_ujian: data.jam_akhir_ujian, // String And Required di database HH:ii
      tanggal_pengumuman: data.tanggal_pengumuman, // String And Required di database yyyy-mm-dd
      tanggal_daftar_ulang: data.tanggal_daftar_ulang, // String And Required di database yyyy-mm-dd
      lokasi_ujian: String(data.lokasi_ujian), // int Required dari database
      jenjang_gelombang: data.jenjang_gelombang, // S1 OR S2
      jenis_pendaftaran: data.jenis_pendaftaran, //'nasional','internasional'
      cicilan_gelombang: data.cicilan_gelombang, // Entah Isinya apa nggak perlu ada tapi disediakan aja
    });
  };
  // Handle delete
  const handleDelete = (data: DetailGelombangType) => {
    showConfirmation({
      title: "Hapus gelombang pendaftaran?",
      message:
        "Gelombang pendaftaran ini akan dihapus dari sistem dan tidak dapat dikembalikan. Lanjut hapus?",
      icon: "trash",
      confirmButtonText: "Hapus",
      confirmButtonColor: "bg-red-600",
      onConfirm() {
        deleteGelombangPendaftaranMutation({
          token: session.user?.accessToken,
          detailGelombangId: data.detail_gelombang_id,
        });
      },
    });
  };

  // Filter periode
  useEffect(() => {
    if (!dataPeriodeOptions) return;

    const search = debouncedSearchPeriodeQuery.toLowerCase();

    const filtered = dataPeriodeOptions.filter(
      (per: PeriodeType) =>
        per.periode_jenis.toLowerCase().includes(search) ||
        per.tahun_periode.toString().includes(search),
    );

    setPeriodeOptions(
      filtered.map((per: PeriodeType) => ({
        value: per.periode_id,
        label: `${per.tahun_periode} - ${ucFirst(per.periode_jenis)}`,
      })),
    );
  }, [dataPeriodeOptions, debouncedSearchPeriodeQuery]);

  // Filter jenis gelombang
  useEffect(() => {
    if (!dataJenisGelombangOptions) return;

    const search = debouncedSearchJenisGelombangQuery.toLowerCase();

    const filtered = dataJenisGelombangOptions.filter(
      (jen: JenisGelombangType) =>
        jen.nama_gelombang.toLowerCase().includes(search),
    );

    setJenisGelombangOptions(
      filtered.map((jen: JenisGelombangType) => ({
        value: jen.gelombang_id,
        label: jen.nama_gelombang,
      })),
    );
  }, [dataJenisGelombangOptions, debouncedSearchJenisGelombangQuery]);

  // Filter lokasi ujian
  useEffect(() => {
    if (!dataLokasiUjianOptions) return;

    const search = debouncedSearchLokasiUjianQuery.toLowerCase();

    const filtered = dataLokasiUjianOptions.filter(
      (lok: LokasiUjianType) =>
        lok.lokasi_nama.toLowerCase().includes(search) ||
        lok.alamat_ujian.toLowerCase().includes(search),
    );

    setLokasiUjianOptions(
      filtered.map((lok: LokasiUjianType) => ({
        value: lok.lokasi_id,
        label: lok.lokasi_nama,
      })),
    );
  }, [dataLokasiUjianOptions, debouncedSearchLokasiUjianQuery]);
  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">
        Gelombang Pendaftaran
      </h1>

      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm text-black">
        <ul>
          <li>
            <Link
              href={`/dashboard`}
              className="btn bg-black btn-xs rounded-lg text-white font-normal no-underline"
            >
              <span className="bx bx-arrow-back"></span> Kembali
            </Link>
          </li>
          <li className="text-xs">
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li className="text-xs">
            <Link href={pathname}>Gelombang Pendaftaran</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul untuk manajemen gelombang pendaftaran calon mahasiswa baru.
        </span>
        <hr className="my-4" />
        <input
          type="text"
          placeholder="Cari gelombang pendaftaran..."
          className="input w-full bg-white mb-4 input-md shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Main Content - Table gelombang pendaftarandan form gelombang pendaftaran*/}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {/* Table gelombang pendaftaran*/}
        <div className="col-span-2">
          <DataTable
            columns={columns}
            data={data || []}
            searchQuery={searchTerm}
            isLoading={isLoading}
            refetch={refetch}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>

        {/* Form gelombang pendaftaran */}
        <div className="col-span-1">
          <div className="w-full card h-auto bg-white text-black p-4 shadow sticky self-start top-4">
            <h2 className="text-l font-bold mb-4">
              {isEditing ? "Ubah" : "Tambah"} Gelombang Pendaftaran
            </h2>

            <form id="form" onSubmit={handleSubmit} className="space-y-8">
              {/* =======================================================
                  SECTION 1 — INFORMASI DASAR
                ======================================================= */}
              <div>
                <h3 className="text-md font-semibold text-slate-700">
                  Informasi Dasar
                </h3>
                <div className="h-px bg-slate-200 my-2" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Periode */}
                  <div className="form-control">
                    <label className="label" htmlFor="periode">
                      <span className="label-text text-black font-medium text-sm">
                        Periode Pendaftaran{" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <SelectSearch
                      data={periodeOptions || []}
                      fieldName="Periode"
                      placeholder="Pilih periode..."
                      defaultEmptyValue={{
                        value: "",
                        label: "Pilih periode...",
                      }}
                      value={gelombangPendaftaran.periode_id}
                      setValue={(data) =>
                        setGelombangPendaftaran((prev) => ({
                          ...prev,
                          periode_id: data,
                        }))
                      }
                      isLoading={isLoadingPeriodeOptions}
                      searchQuery={searchPeriodeQuery}
                      setSearchQuery={setSearchPeriodeQuery}
                    />
                  </div>

                  {/* Gelombang */}
                  <div className="form-control">
                    <label className="label" htmlFor="gelombang">
                      <span className="label-text text-black font-medium text-sm">
                        Gelombang <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <SelectSearch
                      data={jenisGelombangOptions || []}
                      fieldName="Gelombang"
                      placeholder="Pilih gelombang..."
                      defaultEmptyValue={{
                        value: "",
                        label: "Pilih gelombang...",
                      }}
                      value={gelombangPendaftaran.gelombang_id}
                      setValue={(data) =>
                        setGelombangPendaftaran((prev) => ({
                          ...prev,
                          gelombang_id: data,
                        }))
                      }
                      isLoading={isLoadingJenisGelombangOptions}
                      searchQuery={searchJenisGelombangQuery}
                      setSearchQuery={setSearchJenisGelombangQuery}
                    />
                  </div>

                  {/* Jenjang */}
                  <div className="form-control">
                    <label className="label" htmlFor="jenjang">
                      <span className="label-text text-black font-medium text-sm">
                        Jenjang <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <select
                      id="jenjang"
                      name="jenjang"
                      className="select select-sm select-bordered bg-white text-black"
                      required
                      value={gelombangPendaftaran.jenjang_gelombang}
                      onChange={(e) =>
                        setGelombangPendaftaran({
                          ...gelombangPendaftaran,
                          jenjang_gelombang: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Pilih jenjang
                      </option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                    </select>
                  </div>

                  {/* Jenis Pendaftaran */}
                  <div className="form-control">
                    <label className="label" htmlFor="jenisPendaftaran">
                      <span className="label-text text-black font-medium text-sm">
                        Jenis Pendaftaran{" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <select
                      id="jenisPendaftaran"
                      name="jenisPendaftaran"
                      className="select select-sm select-bordered bg-white text-black"
                      required
                      value={gelombangPendaftaran.jenis_pendaftaran}
                      onChange={(e) =>
                        setGelombangPendaftaran({
                          ...gelombangPendaftaran,
                          jenis_pendaftaran: e.target.value,
                        })
                      }
                    >
                      <option value="" disabled>
                        Pilih jenis
                      </option>
                      <option value="nasional">Nasional</option>
                      <option value="internasional">Internasional</option>
                    </select>
                  </div>

                  {/* Lokasi Ujian */}
                  <div className="form-control">
                    <label className="label" htmlFor="lokasiUjian">
                      <span className="label-text text-black font-medium text-sm">
                        Lokasi Ujian <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <SelectSearch
                      data={lokasiUjianOptions || []}
                      fieldName="Lokasi Ujian"
                      placeholder="Pilih lokasi ujian..."
                      defaultEmptyValue={{
                        value: "",
                        label: "Pilih lokasi ujian...",
                      }}
                      value={gelombangPendaftaran.lokasi_ujian}
                      setValue={(data) =>
                        setGelombangPendaftaran((prev) => ({
                          ...prev,
                          lokasi_ujian: data,
                        }))
                      }
                      isLoading={isLoadingLokasiUjianOptions}
                      searchQuery={searchLokasiUjianQuery}
                      setSearchQuery={setSearchLokasiUjianQuery}
                    />
                  </div>

                  {/* Biaya Pendaftaran (full width row) */}
                  <div className="form-control">
                    <label className="label" htmlFor="biayaPendaftaran">
                      <span className="label-text text-black font-medium text-sm">
                        Biaya Pendaftaran{" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>

                    <input
                      type="text"
                      id="biayaPendaftaran"
                      className="input input-bordered input-sm bg-white text-black"
                      placeholder="Biaya pendaftaran..."
                      value={IndonesianCurrency(
                        Number(gelombangPendaftaran.biaya_formulir || 0),
                      )}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "");
                        setGelombangPendaftaran({
                          ...gelombangPendaftaran,
                          biaya_formulir: raw,
                        });
                      }}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* =======================================================
                    SECTION 2 — JADWAL PENDAFTARAN
                  ======================================================= */}
              <div>
                <h3 className="text-md font-semibold text-slate-700">
                  Jadwal Pendaftaran
                </h3>
                <div className="h-px bg-slate-200 my-2" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mulai Pendaftaran */}
                  <div className="form-control">
                    <label className="label" htmlFor="mulaiPendaftaran">
                      <span className="label-text text-black font-medium text-sm">
                        Mulai Pendaftaran{" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <DatePicker
                      placeholder="Pilih tanggal"
                      value={gelombangPendaftaran.mulai_daftar}
                      setValue={(data) =>
                        setGelombangPendaftaran((prev) => ({
                          ...prev,
                          mulai_daftar: data,
                        }))
                      }
                    />
                  </div>

                  {/* Akhir Pendaftaran */}
                  <div className="form-control">
                    <label className="label" htmlFor="akhirPendaftaran">
                      <span className="label-text text-black font-medium text-sm">
                        Akhir Pendaftaran{" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <DatePicker
                      placeholder="Pilih tanggal"
                      value={gelombangPendaftaran.akhir_daftar}
                      setValue={(data) =>
                        setGelombangPendaftaran((prev) => ({
                          ...prev,
                          akhir_daftar: data,
                        }))
                      }
                    />
                  </div>

                  {/* Mulai Verifikasi */}
                  <div className="form-control">
                    <label className="label" htmlFor="mulaiVerifikasi">
                      <span className="label-text text-black font-medium text-sm">
                        Mulai Verifikasi <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <DatePicker
                      placeholder="Pilih tanggal"
                      value={gelombangPendaftaran.mulai_verifikasi}
                      setValue={(data) =>
                        setGelombangPendaftaran((prev) => ({
                          ...prev,
                          mulai_verifikasi: data,
                        }))
                      }
                    />
                  </div>

                  {/* Akhir Verifikasi */}
                  <div className="form-control">
                    <label className="label" htmlFor="akhirVerifikasi">
                      <span className="label-text text-black font-medium text-sm">
                        Akhir Verifikasi <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <DatePicker
                      placeholder="Pilih tanggal"
                      value={gelombangPendaftaran.akhir_verifikasi}
                      setValue={(data) =>
                        setGelombangPendaftaran((prev) => ({
                          ...prev,
                          akhir_verifikasi: data,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* =======================================================
                    SECTION 3 — JADWAL UJIAN
                  ======================================================= */}
              <div>
                <h3 className="text-md font-semibold text-slate-700">
                  Jadwal Ujian
                </h3>
                <div className="h-px bg-slate-200 my-2" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tanggal Ujian Saringan Masuk */}
                  <div className="form-control">
                    <label className="label" htmlFor="tanggalUjian">
                      <span className="label-text text-black font-medium text-sm">
                        Tanggal USM <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <DatePicker
                      placeholder="Pilih tanggal ujian"
                      value={gelombangPendaftaran.tanggal_ujian}
                      setValue={(data) =>
                        setGelombangPendaftaran((prev) => ({
                          ...prev,
                          tanggal_ujian: data,
                        }))
                      }
                    />
                  </div>

                  {/* Jam Mulai */}
                  <div className="form-control">
                    <label className="label" htmlFor="jamMulaiUjian">
                      <span className="label-text text-black font-medium text-sm">
                        Jam Mulai Ujian <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="time"
                      className="input input-bordered input-sm bg-white text-black timepicker-icon"
                      value={gelombangPendaftaran.jam_mulai_ujian}
                      onChange={(e) =>
                        setGelombangPendaftaran((prev) => ({
                          ...prev,
                          jam_mulai_ujian: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  {/* Jam Selesai */}
                  <div className="form-control">
                    <label className="label" htmlFor="jamSelesaiUjian">
                      <span className="label-text text-black font-medium text-sm">
                        Jam Selesai Ujian{" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="time"
                      className="input input-bordered input-sm bg-white text-black timepicker-icon"
                      value={gelombangPendaftaran.jam_akhir_ujian}
                      onChange={(e) =>
                        setGelombangPendaftaran((prev) => ({
                          ...prev,
                          jam_akhir_ujian: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* =======================================================
                    SECTION 4 — TAHAPAN AKHIR
                  ======================================================= */}
              <div>
                <h3 className="text-md font-semibold text-slate-700">
                  Tahapan Akhir
                </h3>
                <div className="h-px bg-slate-200 my-2" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Tanggal Pengumuman */}
                  <div className="form-control">
                    <label className="label" htmlFor="tanggalPengumuman">
                      <span className="label-text text-black font-medium text-sm">
                        Tanggal Pengumuman{" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <DatePicker
                      placeholder="Pilih tanggal"
                      value={gelombangPendaftaran.tanggal_pengumuman}
                      setValue={(data) =>
                        setGelombangPendaftaran((prev) => ({
                          ...prev,
                          tanggal_pengumuman: data,
                        }))
                      }
                    />
                  </div>

                  {/* Tanggal Daftar Ulang */}
                  <div className="form-control">
                    <label className="label" htmlFor="tanggalDaftarUlang">
                      <span className="label-text text-black font-medium text-sm">
                        Tanggal Daftar Ulang{" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <DatePicker
                      placeholder="Pilih tanggal"
                      value={gelombangPendaftaran.tanggal_daftar_ulang}
                      setValue={(data) =>
                        setGelombangPendaftaran((prev) => ({
                          ...prev,
                          tanggal_daftar_ulang: data,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* =======================================================
      BUTTONS
     ======================================================= */}
              <div className="flex justify-end gap-2">
                <button
                  className="btn btn-error btn-sm text-white"
                  type="reset"
                  disabled={isLoading}
                  onClick={() => {
                    setIsEditing(false);
                    setGelombangPendaftaran({
                      detail_gelombang_id: "",
                      gelombang_id: "",
                      periode_id: "",
                      biaya_formulir: "",
                      mulai_daftar: "",
                      akhir_daftar: "",
                      mulai_verifikasi: "",
                      akhir_verifikasi: "",
                      tanggal_ujian: "",
                      jam_mulai_ujian: "",
                      jam_akhir_ujian: "",
                      tanggal_pengumuman: "",
                      tanggal_daftar_ulang: "",
                      lokasi_ujian: "",
                      jenjang_gelombang: "",
                      jenis_pendaftaran: "",
                      cicilan_gelombang: "",
                    });
                  }}
                >
                  Reset
                </button>

                <button
                  className="btn btn-success btn-sm text-white"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="bx bx-loader bx-spin"></span>
                  ) : (
                    <>
                      <span className="bx bx-save" /> Simpan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
