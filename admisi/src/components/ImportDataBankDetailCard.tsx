"use client";

import { ImportDataBankDetailType } from "@/types/ImportDataBankTypes";
import { IndonesianCurrency } from "@/utils/IndonesianCurrency";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";
import {
  User,
  Calendar,
  CreditCard,
  FileText,
  Receipt,
  CheckCircle,
  Trash2,
} from "lucide-react";

interface ImportDataBankDetailCardProps {
  item: ImportDataBankDetailType;
  index: number;
  showDeleteButton: boolean;
  isDeleting?: boolean;
  onDelete?: () => void;
}

export default function ImportDataBankDetailCard({
  item,
  index,
  showDeleteButton,
  isDeleting = false,
  onDelete,
}: ImportDataBankDetailCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Card Header dengan linear */}
      <div className="px-6 py-4 bg-linear-to-r from-gray-50 to-blue-50 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-bold">{index}</span>
              </div>
              {item.IsTransfer === "y" && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <CheckCircle size={8} className="text-white" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                {item.NamaCamhs}
              </h3>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-sm text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                  {item.NomorDaftar}
                </span>
                {item.UserUploadNama && (
                  <span className="text-xs text-gray-500">
                    by {item.UserUploadNama}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500 mb-1">Jumlah Dana</p>
            <p className="text-xl font-bold text-green-600">
              {IndonesianCurrency(item.TotalDana)}
            </p>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Informasi Dasar */}
          <div className="space-y-4">
            {/* Virtual Account dengan copy functionality */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <CreditCard className="text-blue-600" size={18} />
                  <h4 className="font-semibold text-gray-800">
                    Virtual Account
                  </h4>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(item.NomorVa)}
                  className="text-xs text-blue-600 hover:text-blue-800"
                  title="Copy to clipboard"
                >
                  Salin
                </button>
              </div>
              <code className="font-mono text-lg font-bold text-gray-800 bg-white px-3 py-2 rounded border border-blue-200 block break-all">
                {item.NomorVa}
              </code>
            </div>

            {/* Referensi dengan detail */}
            <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <FileText className="text-gray-600" size={18} />
                  <h4 className="font-semibold text-gray-800">Referensi</h4>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">No. Referensi</p>
                  <p className="font-medium text-gray-800 font-mono break-all">
                    {item.NoReferensi}
                  </p>
                </div>
              </div>
            </div>

            {/* Keterangan Upload */}
            {item.KeteranganUpload && (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Receipt className="text-gray-600" size={18} />
                  <h4 className="font-semibold text-gray-800">Keterangan</h4>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-700 whitespace-pre-wrap wrap-break-words">
                    {item.KeteranganUpload}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Timeline dan Status */}
          <div className="space-y-4">
            {/* Timeline dengan visual timeline */}
            <div className="bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Calendar className="text-blue-600" size={18} />
                <h4 className="font-semibold text-gray-800">Timeline</h4>
              </div>

              <div className="relative pl-6">
                {/* Vertical line */}
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-blue-200"></div>

                {/* Transfer Timeline */}
                <div className="relative mb-6">
                  <div className="absolute left-0 -translate-x-1/2">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-8">
                    <p className="text-xs text-gray-500 mb-1">Transfer</p>
                    <p className="font-medium text-gray-800">
                      {IndonesianDateFormat(item.TanggalTransfer)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {IndonesianDateFormat(item.TanggalTransfer)}
                    </p>
                  </div>
                </div>

                {/* Upload Timeline */}
                <div className="relative">
                  <div className="absolute left-0 -translate-x-1/2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-8">
                    <p className="text-xs text-gray-500 mb-1">
                      Upload ke Sistem
                    </p>
                    <p className="font-medium text-gray-800">
                      {IndonesianDateFormat(item.TanggalUpload)}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <User size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-600">
                        {item.UserUploadNama || `User ${item.UserUpload}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delete Section */}
            {showDeleteButton && (
              <div className="border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trash2 className="text-red-600" size={18} />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Hapus Data
                      </h4>
                      <p className="text-xs text-gray-600">
                        Hapus data transaksi ini dari sistem
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onDelete && onDelete()}
                    disabled={isDeleting}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors text-sm flex items-center space-x-1"
                  >
                    {isDeleting ? (
                      <>
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                        <span>Menghapus...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 size={14} />
                        <span>Hapus</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Versi minimalis untuk list view
export function ImportDataBankCompactCard({
  item,
  index,
}: ImportDataBankDetailCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xs">
                {index + 1}
              </span>
            </div>
            <h3 className="font-bold text-gray-800 truncate">
              {item.NamaCamhs}
            </h3>
            {item.IsTransfer === "y" && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <span>{item.NomorDaftar}</span>
            <span>•</span>
            <span>VA: {item.NomorVa.substring(0, 8)}...</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-green-600">
            {IndonesianCurrency(item.TotalDana)}
          </p>
          <p className="text-xs text-gray-500">
            {IndonesianDateFormat(item.TanggalTransfer)}
          </p>
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500">Referensi</p>
            <p className="text-sm font-medium truncate">{item.NoReferensi}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Upload</p>
            <div className="flex items-center space-x-1">
              <User size={12} className="text-gray-400" />
              <span className="text-sm truncate">
                {item.UserUploadNama || item.UserUpload}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
