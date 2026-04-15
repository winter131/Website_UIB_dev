"use client";

import { ImportDataBankType } from "@/types/ImportDataBankTypes";
import { IndonesianCurrency } from "@/utils/IndonesianCurrency";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";
import { Upload, User, Calendar, DollarSign, Eye } from "lucide-react";

interface ImportDataBankCardProps {
  data: ImportDataBankType;
  showCard?: boolean;
  handleViewDetail?: (data: ImportDataBankType) => void;
}

export default function ImportDataBankCard({
  data,
  showCard = true,
  handleViewDetail,
}: ImportDataBankCardProps) {
  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Informasi Upload
          </h3>
          <p className="text-sm text-gray-500">
            {IndonesianDateFormat(data.TanggalUpload)}
          </p>
        </div>
        <button
          onClick={() => handleViewDetail && handleViewDetail(data)}
          className="btn btn-sm rounded-lg bg-blue-500 border-none hover:bg-blue-600"
        >
          <Eye size={18} /> Lihat Detail
        </button>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Uploader */}
        <div className="rounded-xl border bg-white p-4 hover:shadow-sm transition">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <User size={18} />
            </div>
            <h4 className="font-medium text-gray-700">Pengupload</h4>
          </div>

          <div className="space-y-3 whitespace-normal">
            <div>
              <p className="text-xs text-gray-500">Nama</p>
              <p className="font-medium text-gray-800">{data.UserUploadNama}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">NIP</p>
              <p className="font-mono text-sm text-gray-700">
                {data.UserUpload}
              </p>
            </div>
          </div>
        </div>

        {/* Upload Detail */}
        <div className="rounded-xl border bg-white p-4 hover:shadow-sm transition">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Upload size={18} />
            </div>
            <h4 className="font-medium text-gray-700">Detail Upload</h4>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500">Tanggal Upload</p>
              <p className="font-medium text-gray-800">
                {IndonesianDateFormat(data.TanggalUpload)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Data</p>
              <p className="font-semibold text-gray-800">
                {data.TotalData.toLocaleString()} data
              </p>
            </div>
          </div>
        </div>

        {/* Financial Highlight */}
        <div className="md:col-span-2 rounded-xl bg-linear-to-r from-emerald-50 to-teal-50 p-5 border">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-white text-emerald-600 shadow-sm">
              <DollarSign size={18} />
            </div>
            <h4 className="font-medium text-gray-700">Total Dana</h4>
          </div>

          <p className="text-3xl font-bold text-emerald-600 text-center">
            {IndonesianCurrency(data.JumlahDana)}
          </p>
        </div>
      </div>
    </div>
  );

  if (!showCard) return content;

  return (
    <div className="rounded-2xl bg-white border shadow-sm p-6">{content}</div>
  );
}
