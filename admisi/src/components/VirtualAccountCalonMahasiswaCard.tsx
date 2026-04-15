import { useNotifikasi } from "@/store/useNotifikasi";
import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import {
  CreditCardIcon,
  User,
  School,
  Clock,
  GraduationCap,
  Copy,
  Check,
  Edit,
} from "lucide-react";
import { useState } from "react";

export default function VirtualAccountCalonMahasiswaCard({
  data,
  handleSubmit,
}: {
  data: CalonMahasiswaType;
  handleSubmit?: (data: CalonMahasiswaType) => void;
}) {
  const showNotification = useNotifikasi.getState().show;
  const [copied, setCopied] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newVa, setNewVa] = useState(data.VaCamhs || "");
  const [isLoading, setIsLoading] = useState(false);

  const copyToClipboard = async () => {
    if (!data.VaCamhs) return;

    try {
      await navigator.clipboard.writeText(data.VaCamhs);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleOpenEditModal = () => {
    setNewVa(data.VaCamhs || "");
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setNewVa("");
  };

  const handleSaveVa = async () => {
    if (!newVa.trim()) {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Virtual Account tidak boleh kosong",
      });
      return;
    }

    setIsLoading(true);
    try {
      handleSubmit?.({ ...data, VaCamhs: newVa.trim() });
      handleCloseEditModal();
    } catch (error) {
      showNotification({
        status: "text-red-500",
        icon: "bx bx-error text-2xl",
        header: "Error",
        message: "Gagal mengedit virtual account",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Compact Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-gray-900 truncate">
                  {data.NamaCamhs}
                </h3>
                <p className="text-sm text-gray-600 font-mono">
                  {data.NomorDaftar}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Compact Grid */}
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
              <div className="mt-0.5">
                <GraduationCap className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-amber-900">Jenjang</p>
                <p className="text-sm font-semibold text-gray-900">
                  {data.JenjangCamhs}
                </p>
              </div>
            </div>
            {/* Program Studi */}
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="mt-0.5">
                <School className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-900">
                  Program Studi
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {data.NamaProdi}
                </p>
              </div>
            </div>

            {/* Waktu Kuliah */}
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="mt-0.5">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-purple-900">
                  Waktu Kuliah
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {data.WaktuKuliah === "malam" ? "Malam" : "Siang"}
                </p>
              </div>
            </div>
          </div>

          {/* Virtual Account Highlight */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <CreditCardIcon className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Virtual Account</h4>
                  <p className="text-xs text-gray-600">Nomor pembayaran</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${
                  data.VaCamhs
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {data.VaCamhs ? "Aktif" : "Belum Tersedia"}
              </span>
            </div>

            {data.VaCamhs ? (
              <>
                <div className="bg-white border border-emerald-300 rounded-lg p-4 mb-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-900 font-mono tracking-wider">
                      {data.VaCamhs}
                    </p>
                    <button
                      onClick={copyToClipboard}
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
                  Salin nomor Virtual Account
                </p>
              </>
            ) : (
              <div className="text-center py-2">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mb-2">
                  <CreditCardIcon className="w-5 h-5 text-gray-400" />
                </div>
                <p className="font-medium text-gray-700">
                  Virtual Account Belum Dibuat
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Segera buat virtual account untuk calon mahasiswa ini agar
                  calon mahasiswa dapat melakukan pembayaran.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer with Edit Button */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex justify-end">
            <button
              onClick={handleOpenEditModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors font-medium"
            >
              <Edit className="w-4 h-4" />
              Ubah Virtual Account
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Edit className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">
                      Ubah Virtual Account
                    </h3>
                    <p className="text-sm text-gray-600">{data.NamaCamhs}</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseEditModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Virtual Account Baru
                </label>
                <input
                  type="text"
                  value={newVa}
                  onChange={(e) => setNewVa(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-lg"
                  placeholder="Masukkan nomor VA baru"
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2">
                  Pastikan nomor VA valid dan sesuai dengan sistem pembayaran
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Informasi Calon Mahasiswa:
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Nama</p>
                    <p className="font-medium">{data.NamaCamhs}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Nomor Daftar</p>
                    <p className="font-medium font-mono">{data.NomorDaftar}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Program Studi</p>
                    <p className="font-medium">{data.NamaProdi}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Virtual Account Saat Ini</p>
                    <p className="font-medium font-mono">
                      {data.VaCamhs || "Belum ada"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleCloseEditModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                disabled={isLoading}
              >
                Batal
              </button>
              <button
                onClick={handleSaveVa}
                disabled={isLoading || !newVa.trim()}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Perubahan"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
