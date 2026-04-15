"use client";

import { DetailKeuanganDaftarUlangListBuktiBayarType } from "@/types/DetailKeuanganDaftarUlangTypes";
import { IndonesianCurrency } from "@/utils/IndonesianCurrency";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";
import {
  CheckCircle,
  CreditCard,
  Download,
  ExternalLink,
  Eye,
  FileText,
  XCircle,
} from "lucide-react";

interface BuktiBayarProps {
  data: DetailKeuanganDaftarUlangListBuktiBayarType[];
  isBeasiswa?: boolean;
  peringkatBeasiswa?: string;
}

export default function ValidasiKeuanganDaftarUlangBuktiBayarCard({
  data,
}: BuktiBayarProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Bukti Bayar</h2>

      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((pembayaran, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-full ${pembayaran.IsValid === "y" ? "bg-green-100 text-green-600" : pembayaran.IsValid === "n" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"}`}
                  >
                    {pembayaran.IsValid === "y" ? (
                      <CreditCard size={20} />
                    ) : pembayaran.IsValid === "n" ? (
                      <XCircle size={20} />
                    ) : (
                      <FileText size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {pembayaran.PemilikRekening}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {pembayaran.AsalBank}
                      </span>
                      <span>
                        {IndonesianDateFormat(pembayaran.TanggalUpload)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-3">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">File:</span>{" "}
                  {pembayaran.BuktiBayarFile}
                </div>

                <div className="flex space-x-2">
                  <a
                    href={pembayaran.BuktiBayarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm flex items-center space-x-1 px-3 py-1.5"
                    title="Preview"
                  >
                    <ExternalLink size={16} />
                    <span>Lihat</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <FileText className="mx-auto text-gray-400 mb-3" size={48} />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            Tidak Ada Bukti Bayar
          </h3>
          <p className="text-gray-500">
            Belum ada bukti pembayaran yang diupload
          </p>
        </div>
      )}
    </div>
  );
}
