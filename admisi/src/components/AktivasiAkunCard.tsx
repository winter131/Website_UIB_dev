import { MemberDaftarType } from "@/types/MemberDaftarType";
import {
  User,
  Mail,
  Key,
  Shield,
  RefreshCw,
  CheckCircle,
  XCircle,
  UserCheck,
} from "lucide-react";
import { useState } from "react";

interface AktivasiAkunCardProps {
  data: MemberDaftarType;
  handleAkunChange?: (data: MemberDaftarType, tipe: string) => void;
  handleResetPassword?: (data: MemberDaftarType) => void;
}

export default function AktivasiAkunCard({
  data,
  handleAkunChange,
  handleResetPassword,
}: AktivasiAkunCardProps) {
  const [isActivating, setIsActivating] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleActivateAccount = (tipe: string) => {
    if (!handleAkunChange) return;
    setIsActivating(true);
    handleAkunChange(data, tipe);
    setIsActivating(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow">
      {/* Status Banner */}
      <div
        className={`px-4 py-3 flex items-center justify-between ${
          data.IsAktif === "y" ? "bg-green-50" : "bg-amber-50"
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-full ${
              data.IsAktif === "y"
                ? "bg-green-100 text-green-600"
                : "bg-amber-100 text-amber-600"
            }`}
          >
            {data.IsAktif === "y" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
          </div>
          <span
            className={`font-medium ${
              data.IsAktif === "y" ? "text-green-800" : "text-amber-800"
            }`}
          >
            {data.IsAktif === "y" ? "Akun Aktif" : "Akun Tidak Aktif"}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {data.IsAktif === "n" && "⏳ Butuh aktivasi"}
        </span>
      </div>

      {/* Profile Info */}
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <div className="shrink-0">
            <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <User className="w-7 h-7 text-blue-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg mb-1">
              {data.NamaMember}
            </h3>
            <p className="text-sm text-gray-600">Pendaftar SIM Pendaftaran</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="space-y-3 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="w-4 h-4 text-gray-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-500 mb-0.5">Email</p>
              <p className="text-sm font-medium text-gray-900 break-all">
                {data.EmailMember}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Key className="w-4 h-4 text-gray-500 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-gray-500 mb-0.5">NIK</p>
              <p className="text-sm font-mono font-medium text-gray-900">
                {data.NikMember}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex flex-col gap-2">
          {data.IsAktif === "n" && handleAkunChange && (
            <button
              onClick={() => handleActivateAccount("aktivasi")}
              disabled={isActivating}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-100 hover:bg-green-600 rounded-lg transition-colors font-medium disabled:opacity-50 border border-green-400 text-green-800 hover:text-white"
            >
              {isActivating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Mengaktivasi...</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Aktivasi Akun</span>
                </>
              )}
            </button>
          )}

          <div className="flex flex-row items-center justify-center gap-4">
            {data.IsAktif === "y" && handleAkunChange && (
              <button
                onClick={() => handleActivateAccount("nonaktif")}
                disabled={isActivating}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-100 hover:bg-red-600 rounded-lg transition-colors font-medium disabled:opacity-50 border border-red-400 text-red-800 hover:text-white"
              >
                {isActivating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Mengaktivasi...</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Non Aktifkan</span>
                  </>
                )}
              </button>
            )}

            {data.IsAktif === "y" && handleResetPassword && (
              <button
                onClick={() => handleResetPassword(data)}
                disabled={isActivating}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-100 hover:bg-amber-600 rounded-lg transition-colors font-medium disabled:opacity-50 border border-amber-400 text-amber-800 hover:text-white"
              >
                {isActivating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Mengaktivasi...</span>
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    <span>Reset Password</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
