"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PlusCircle,
  FileUp,
  Download,
  Upload,
  FileSpreadsheet,
  X,
  FileDown,
} from "lucide-react";
import { useNotifikasi } from "@/store/useNotifikasi";

interface VirtualAccountSidebarToolsProps {
  onImportExcel?: (file: File, jenjang: string) => void;
  onExportExcel?: () => void;
  onDownloadTemplate?: () => void;
  isImporting: boolean;
}

export default function VirtualAccountSidebarTools({
  onImportExcel,
  onExportExcel,
  onDownloadTemplate,
  isImporting,
}: VirtualAccountSidebarToolsProps) {
  const showNotification = useNotifikasi.getState().show;
  const [importFile, setImportFile] = useState<File | null>(null);
  const [jenjang, setJenjang] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFile(file);
    }
  };

  const handleImport = () => {
    if (importFile && onImportExcel) {
      if (jenjang === "") {
        showNotification({
          status: "text-yellow-500",
          icon: "bx bx-error text-2xl",
          header: "Peringatan",
          message: "Jenjang harus dipilih sebelum mengimpor virtual account",
        });
        return;
      }
      onImportExcel(importFile, jenjang);
      setImportFile(null);
      const fileInput = document.getElementById(
        "excel-import"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  const handleBatalImport = () => {
    setImportFile(null);
    const fileInput = document.getElementById(
      "excel-import"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  useEffect(() => {
    setJenjang("");
    setImportFile(null);
  }, [isImporting]);

  return (
    <div className="space-y-4">
      {/* Quick Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Alat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Import Excel */}
          <div className="space-y-2">
            <Input
              id="excel-import"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              onClick={() => document.getElementById("excel-import")?.click()}
              variant="outline"
              className="w-full justify-start"
              size="sm"
            >
              <FileUp className="h-4 w-4 mr-2" />
              Import dari Excel
            </Button>
          </div>

          {/* Export Excel */}
          <Button
            onClick={onExportExcel}
            variant="outline"
            className="w-full justify-start"
            size="sm"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Export ke Excel
          </Button>

          {/* Download Template */}
          <Button
            onClick={onDownloadTemplate}
            variant="outline"
            className="w-full justify-start"
            size="sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Template Excel
          </Button>
        </CardContent>
      </Card>

      {/* File Import Section */}
      {importFile && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              File Siap Import
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-blue-600" />
                  <span className="text-sm truncate">{importFile.name}</span>
                </div>
                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setImportFile(null)}
                >
                  <X className="h-3 w-3" />
                </Button> */}
              </div>
              {/* Jenjang */}
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Pilih Jenjang{" "}
                  <small className="text-xs text-red-500">*</small>
                </label>
                <select
                  id="jenjang"
                  name="jenjang"
                  className="select select-sm select-bordered bg-white text-black border border-gray-300 rounded-md w-full mt-1"
                  required
                  value={jenjang || ""}
                  onChange={(e) => setJenjang(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih jenjang
                  </option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleBatalImport()}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleImport}
                  size="sm"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Upload className="h-3 w-3 mr-2" />
                  Import
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Tips */}
      <Card className="border-dashed">
        <CardContent>
          <div className="text-xs text-gray-500 space-y-1">
            <p className="font-medium text-gray-600">Tips:</p>
            <p>
              • Unduh template Excel untuk mengimpor virtual account dengan
              format yang benar
            </p>
            <p>• Impor virtual account untuk menambahkan data lebih cepat</p>
            <p>• Format Excel: .xlsx</p>
            <p>• Ekspor data virtual account ke Excel</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
