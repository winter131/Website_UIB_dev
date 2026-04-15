"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileUp,
  Download,
  Upload,
  FileSpreadsheet,
  X,
  FolderInput,
} from "lucide-react";

interface ImportDataBankSidePanelProps {
  onImportExcel?: (file: File) => void;
  onDownloadTemplate?: () => void;
  isImporting: boolean;
}

export default function ImportDataBankSidePanel({
  onImportExcel,
  isImporting,
}: ImportDataBankSidePanelProps) {
  const [importFile, setImportFile] = useState<File | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImportFile(file);
    }
  };

  const handleImport = () => {
    if (importFile && onImportExcel) {
      onImportExcel(importFile);
      setImportFile(null);
      setShowImportModal(false);
      const fileInput = document.getElementById(
        "excel-import",
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  const handleBatalImport = () => {
    setImportFile(null);
    const fileInput = document.getElementById(
      "excel-import",
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  useEffect(() => {
    setImportFile(null);
  }, [isImporting]);

  const handleDownloadFormat = () => {
    const link = document.createElement("a");
    link.href = "/format/format-import-daftar-ulang.xlsx";
    link.download = "format-import-daftar-ulang.xlsx";
    link.click();
  };

  return (
    <>
      <div className="space-y-4">
        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Alat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Download format import soal excel */}
            <Button
              onClick={() => handleDownloadFormat()}
              variant="outline"
              className="w-full justify-start"
              size="sm"
            >
              <FolderInput className="h-4 w-4 mr-2" />
              Download Format Import Daftar Ulang
            </Button>

            {/* Import soal excel */}
            <Button
              onClick={() => setShowImportModal(true)}
              variant="outline"
              className="w-full justify-start"
              size="sm"
            >
              <FolderInput className="h-4 w-4 mr-2" />
              Import Daftar Ulang Excel
            </Button>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="border-dashed">
          <CardContent>
            <div className="text-xs text-gray-500 space-y-1">
              <p className="font-medium text-gray-600">Tips:</p>
              <p>
                • Gunakan tombol <strong>"Import Daftar Ulang Excel"</strong>{" "}
                untuk mengimpor data daftar ulang dari file Excel (.xlsx).
              </p>
              <p>
                • Klik tombol <strong>Edit</strong> pada daftar ulang untuk
                mengubah data yang sudah ada.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal Import Excel */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-6 space-y-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Import Data Bank Daftar Ulang
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Import data daftar ulang dari file Excel
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowImportModal(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Download Template */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Download className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      Download Template Excel
                    </h4>
                    <p className="text-sm text-gray-600">
                      Gunakan template ini untuk format yang benar
                    </p>
                  </div>
                  <Button
                    onClick={handleDownloadFormat}
                    variant="outline"
                    size="sm"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <div className="mb-4">
                  <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h4 className="font-medium text-gray-900 mb-1">
                    Upload File Excel
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Format .xlsx atau .xls (maks. 5MB)
                  </p>
                </div>

                <label className="cursor-pointer">
                  <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <FileUp className="h-4 w-4" />
                    <span className="text-sm font-medium">Pilih File</span>
                  </div>
                  <input
                    id="excel-import"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                {importFile && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">
                        {importFile.name}
                      </span>
                      <span className="text-sm text-emerald-600 ml-auto">
                        {(importFile.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowImportModal(false);
                    handleBatalImport();
                  }}
                  disabled={isImporting}
                >
                  Batal
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={!importFile || isImporting}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {isImporting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Mengimport...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
