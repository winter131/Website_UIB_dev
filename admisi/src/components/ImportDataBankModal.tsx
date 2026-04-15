"use client";

import { ImportDataBankDetailType } from "@/types/ImportDataBankTypes";
import { IndonesianCurrency } from "@/utils/IndonesianCurrency";
import { X, RefreshCw, AlertCircle } from "lucide-react";
import { columnsDetail } from "@/app/(main)/manajemen-daftar-ulang/import-data-bank/columnsDetail";
import { DataTableDetail } from "@/app/(main)/manajemen-daftar-ulang/import-data-bank/data-table-detail";
import { useState } from "react";

interface ImportDataBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ImportDataBankDetailType[];
  isLoading?: boolean;
  refetch?: () => void;
  onDelete?: (item: ImportDataBankDetailType) => void;
  isDeleting?: boolean;
}

export default function ImportDataBankModal({
  isOpen,
  onClose,
  data,
  isLoading = false,
  refetch,
  onDelete,
  isDeleting = false,
}: ImportDataBankModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const calculateTotals = () => {
    const totalTransactions = data.length;
    const totalAmount = data.reduce((sum, item) => sum + item.TotalDana, 0);
    const averageAmount =
      totalTransactions > 0 ? totalAmount / totalTransactions : 0;

    return { totalTransactions, totalAmount, averageAmount };
  };

  const { totalTransactions, totalAmount } = calculateTotals();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Detail Import Data Bank
            </h2>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-sm text-gray-500">
                {totalTransactions} transaksi ditemukan
              </span>
              {isLoading && (
                <span className="flex items-center text-sm text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Memuat...
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {refetch && (
              <button
                onClick={refetch}
                disabled={isLoading}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Refresh data"
              >
                <RefreshCw
                  size={16}
                  className={isLoading ? "animate-spin" : ""}
                />
                <span>Refresh</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
              disabled={isLoading}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            {isLoading && data.length === 0 ? (
              // Loading State
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Memuat data impor...</p>
              </div>
            ) : data.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Tidak Ada Data Impor Bank
                </h3>
                <p className="text-gray-500 mb-4">
                  Belum ada data impor bank yang ditemukan.
                </p>
                {refetch && (
                  <button
                    onClick={refetch}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <RefreshCw size={16} />
                    <span>Muat Ulang</span>
                  </button>
                )}
              </div>
            ) : (
              // Data Content
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Transaksi</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {totalTransactions}
                        </p>
                      </div>
                      <div className="text-blue-400">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="font-bold">T</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Dana</p>
                        <p className="text-2xl font-bold text-green-600">
                          {IndonesianCurrency(totalAmount)}
                        </p>
                      </div>
                      <div className="text-green-400">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="font-bold">IDR</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <input
                  type="text"
                  name="search"
                  id="search"
                  className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                  placeholder="Cari berdasarkan nama, nomor daftar, nomor VA atau jumlah dana..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Tabel Data */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto w-full">
                    <DataTableDetail
                      columns={columnsDetail}
                      data={data || []}
                      isLoading={isLoading}
                      refetch={refetch}
                      searchQuery={searchTerm}
                      onDelete={onDelete}
                      isDeleting={isDeleting}
                    />
                  </div>
                </div>

                {/* Footer Summary */}
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      Menampilkan {data.length} transaksi
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        Total {totalTransactions} transaksi
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        {IndonesianCurrency(totalAmount)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4">
          <div className="flex justify-end items-center">
            <div className="flex space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                disabled={isLoading}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
