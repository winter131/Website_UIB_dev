"use client";

import { DetailKeuanganDaftarUlangDataPembayaranType } from "@/types/DetailKeuanganDaftarUlangTypes";
import { IndonesianCurrency } from "@/utils/IndonesianCurrency";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";

interface DetailImportBankProps {
  data: DetailKeuanganDaftarUlangDataPembayaranType[];
  isBeasiswa?: boolean;
  peringkatBeasiswa?: string;
}

export default function ValidasiKeuanganDaftarUlangDetailImportBankCard({
  data,
}: DetailImportBankProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Detail Import Bank
      </h2>

      {data && data.length > 0 ? (
        <div className="space-y-3">
          {data.map((pembayaran, index) => (
            <div key={index} className="border rounded-lg p-3 hover:bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-sm">
                  No. Referensi: {pembayaran.NoReferensi}
                </span>
                <span className="text-green-600 font-semibold">
                  {IndonesianCurrency(pembayaran.JumlahDana)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{IndonesianDateFormat(pembayaran.TanggalTransfer)}</span>
                <span>VA: {pembayaran.NomorVa}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Diupload oleh: {pembayaran.NamaUserUpload} (
                {pembayaran.UserUpload})
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">Belum ada import bank</p>
      )}
    </div>
  );
}
