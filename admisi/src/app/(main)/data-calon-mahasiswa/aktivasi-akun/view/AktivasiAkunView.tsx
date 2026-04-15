"use client";
import { useNotifikasi } from "@/store/useNotifikasi";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../columns";
import { useConfirmation } from "@/store/useConfirmationBox";
import { useDebounce } from "use-debounce";
import { Check, Copy, Edit, Lock, X } from "lucide-react";
import { useAktivasiAkunData } from "@/hooks/aktivasi-akun/useAktivasiAkunData";
import { useEditAktivasiAkun } from "@/hooks/aktivasi-akun/useEditAktivasiAkun";
import { MemberDaftarType } from "@/types/MemberDaftarType";
import { useResetPassword } from "@/hooks/aktivasi-akun/useResetPassword";

export default function AktivasiAkunView() {
  const pathname = usePathname();
  const showNotification = useNotifikasi.getState().show;
  const showConfirmation = useConfirmation.getState().show;
  const { data: session, status }: { data: any; status: string } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    freeSearch: "",
    statusAkun: "",
  });
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [resetController, setResetController] = useState({
    open: false,
    newPassword: "",
    copied: false,
  });

  // Get data calon mahasiswa
  const { data, isLoading, refetch } = useAktivasiAkunData(
    session.user?.accessToken,
    status,
    filter,
  );
  //Aktivasi or deaktivasi akun mutation
  const { mutate: editAktivasiAkunMutation } = useEditAktivasiAkun(
    () => {
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mengedit aktivasi akun calon mahasiswa",
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
  // Reset password mutation
  const { mutate: resetPasswordMutation } = useResetPassword(
    (data) => {
      setResetController({
        open: true,
        newPassword: data?.data?.new_password,
        copied: false,
      });
      showNotification({
        status: "text-green-500",
        icon: "bx bx-check text-2xl",
        header: "Berhasil",
        message: "Berhasil mereset password akun calon mahasiswa",
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

  // Save filter to localStorage untuk persistensi data filter
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("appliedFilterAktivasiAkun");
    const search = localStorage.getItem("appliedSearchAktivasiAkun");
    if (saved) {
      setFilter(JSON.parse(saved));
      setSearchTerm(search || "");
    }
    setIsLoaded(true);
  }, []);
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(
      "appliedFilterAktivasiAkun",
      JSON.stringify({
        freeSearch: filter.freeSearch,
        statusAkun: filter.statusAkun,
      }),
    );
    localStorage.setItem("appliedSearchAktivasiAkun", debouncedSearchTerm);
  }, [filter, debouncedSearchTerm, isLoaded]);

  // Refetch data when filter or search term changes
  useEffect(() => {
    setFilter((prev) => ({ ...prev, freeSearch: debouncedSearchTerm }));
  }, [debouncedSearchTerm]);

  useEffect(() => {
    refetch();
  }, [filter]);

  // Handle reset filter
  const handleResetFilter = () => {
    setFilter({
      freeSearch: "",
      statusAkun: "",
    });
    setSearchTerm("");
  };

  const handleAkunChange = (data: MemberDaftarType, tipe: string) => {
    let conf = {
      title: `${tipe === "aktivasi" ? "Aktivasi" : "Nonaktifkan"} Akun ${data.NamaMember}?`,
      message:
        "Apakah Anda yakin ingin " +
        (tipe === "aktivasi" ? "mengaktivasi" : "menonaktifkan") +
        ` akun ${data.NamaMember}? Setelah di` +
        (tipe === "aktivasi" ? "aktivasi" : "nonaktifkan") +
        ` , ${tipe === "aktivasi" ? "akun dapat digunakan untuk login ke sistem pendaftaran." : "akun tidak dapat digunakan untuk login ke sistem pendaftaran."}`,
      icon: `${tipe === "aktivasi" ? "user-check" : "user-x"}`,
      confirmButtonText: `${tipe === "aktivasi" ? "Aktivasi" : "Nonaktifkan"}`,
      confirmButtonColor: `${tipe === "aktivasi" ? "bg-green-600" : "bg-red-600"}`,
    };

    showConfirmation({
      title: conf.title,
      message: conf.message,
      icon: conf.icon,
      confirmButtonText: conf.confirmButtonText,
      confirmButtonColor: conf.confirmButtonColor,
      onConfirm() {
        editAktivasiAkunMutation({
          token: session.user?.accessToken,
          aktivasiAkun: {
            email_member: data.EmailMember,
            status_aktif: tipe === "aktivasi" ? "y" : "n",
          },
        });
      },
    });
  };

  const handleResetPassword = (data: MemberDaftarType) => {
    showConfirmation({
      title: `Reset Password Akun ${data.NamaMember}?`,
      message:
        "Apakah Anda yakin ingin mereset password akun " +
        data.NamaMember +
        "?",
      icon: "key",
      confirmButtonText: "Reset",
      confirmButtonColor: "bg-amber-500",
      onConfirm() {
        resetPasswordMutation({
          token: session.user?.accessToken,
          aktivasiAkun: {
            email_member: data.EmailMember,
          },
        });
      },
    });
  };

  const copyPasswordToClipboard = async (newPassword: string) => {
    if (!newPassword) return;

    try {
      await navigator.clipboard.writeText(newPassword);
      setResetController((prev) => ({ ...prev, copied: true }));
      setTimeout(
        () => setResetController((prev) => ({ ...prev, copied: false })),
        2000,
      );
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  const handleCloseEditModal = () => {
    setResetController((prev) => ({
      ...prev,
      open: false,
      copied: false,
      newPassword: "",
    }));
  };

  return (
    <div className="px-8 py-4">
      <h1 className="w-full text-4xl font-bold text-black">
        Aktivasi Akun Pendaftar
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
            <Link href={pathname}>Aktivasi Akun Pendaftar</Link>
          </li>
        </ul>
      </div>

      {/* Search */}
      <div className="mt-2 flex flex-wrap gap-4">
        <span className="font-normal text-black">
          Modul ini digunakan untuk mengelola aktivasi akun pendaftar yang sudah
          mendaftar di Sistem Pendaftaran namun belum melakukan aktivasi akun.
        </span>
      </div>

      {/* Filter & Search Section */}
      <div className="bg-white rounded-xl shadow p-5 space-y-4 my-4">
        <div className="flex flex-row items-center justify-between">
          <div className="w-max">
            <span className="font-semibold">Filter dan pencarian</span>
            <hr />
            <span className="text-xs text-gray-500">
              Gunakan fitur pencarian untuk mencari data pendaftar berdasarkan
              nama, email dan status akun.
            </span>
          </div>
          {/* Reset filter button */}
          {filter.freeSearch !== "" || filter.statusAkun !== "" ? (
            <button
              onClick={handleResetFilter}
              className="btn btn-xs btn-ghost bg-red-600 text-white hover:bg-red-700 rounded-lg"
            >
              <X className="w-3 h-3" /> Bersihkan filter
            </button>
          ) : null}
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            {/* Search */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Cari akun pendaftar{" "}
              </label>
              <input
                type="text"
                placeholder="Ketik nama akun pendaftar atau email..."
                className="input w-full bg-white mb-4 input-md shadow mt-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Filter status */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Status Akun <small className="text-xs text-red-500">*</small>
              </label>
              <select
                id="statusAkun"
                name="statusAkun"
                className="select select-sm select-bordered bg-white text-black border border-gray-300 rounded-md w-full mt-1"
                required
                value={filter.statusAkun || ""}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    statusAkun: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Pilih status akun
                </option>
                <option value="all">Semua Status</option>
                <option value="sudah">Sudah aktivasi</option>
                <option value="belum">Belum aktivasi</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Table virtual account */}
      <div className="w-full">
        {/* Table virtual account calon mahasiswa */}
        <DataTable
          columns={columns}
          data={data || []}
          searchQuery={searchTerm}
          isLoading={isLoading}
          refetch={refetch}
          handleAkunChange={handleAkunChange}
          handleResetPassword={handleResetPassword}
        />
      </div>
      {/* Modal reset password */}
      {resetController.open &&
        modalResetPassword(
          resetController.newPassword,
          resetController.copied,
          handleCloseEditModal,
          copyPasswordToClipboard,
        )}
    </div>
  );
}

const modalResetPassword = (
  newPassword: string,
  copied: boolean,
  onClose: () => void,
  onCopy: (newPassword: string) => void,
) => {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Lock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  Reset Password Berhasil
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password Baru
            </label>
            <>
              <div className="bg-white border border-emerald-300 rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-gray-900 font-mono tracking-wider">
                    {newPassword}
                  </p>
                  <button
                    onClick={onCopy.bind(null, newPassword)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      copied
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">Disalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm font-medium">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Salin password baru
              </p>
            </>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
