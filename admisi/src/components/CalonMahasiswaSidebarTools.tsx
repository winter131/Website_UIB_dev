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
  UserPlus,
  IdCard,
  IdCardLanyard,
} from "lucide-react";
import { useNotifikasi } from "@/store/useNotifikasi";

interface CalonMahasiswaSidebarToolsProps {
  onImportExcel?: (file: File, jenjang: string) => void;
  onExportExcel?: () => void;
  onDownloadTemplate?: () => void;
  isImporting: boolean;
}

export default function CalonMahasiswaSidebarTools({
  onImportExcel,
  onExportExcel,
  onDownloadTemplate,
  isImporting,
}: CalonMahasiswaSidebarToolsProps) {
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
          {/* Tambah Calon Mahasiswa */}
          <div className="space-y-2">
            <Button
              onClick={() => {}}
              variant="outline"
              className="w-full justify-start"
              size="sm"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Tambah Calon Mahasiswa
            </Button>
          </div>

          {/* Cetak Kelengkapan Dokumen */}
          <Button
            onClick={() => {}}
            variant="outline"
            className="w-full justify-start"
            size="sm"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Cetak Kelengkapan Dokumen
          </Button>

          {/* Cetak Biodata */}
          <Button
            onClick={() => {}}
            variant="outline"
            className="w-full justify-start"
            size="sm"
          >
            <IdCard className="h-4 w-4 mr-2" />
            Cetak Biodata
          </Button>

          {/* Cetak Kartu Ujian */}
          <Button
            onClick={() => {}}
            variant="outline"
            className="w-full justify-start"
            size="sm"
          >
            <IdCardLanyard className="h-4 w-4 mr-2" />
            Cetak Kartu Ujian
          </Button>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="border-dashed">
        <CardContent>
          <div className="text-xs text-gray-500 space-y-1">
            <p className="font-medium text-gray-600">Tips:</p>
            <p>
              • Gunakan tombol <strong>"Tambah Calon Mahasiswa"</strong> untuk
              menambahkan data calon mahasiswa secara manual.
            </p>
            <p>
              • Gunakan tombol <strong>"Cetak Kelengkapan Dokumen"</strong>{" "}
              untuk mencetak kelengkapan dokumen calon mahasiswa.
            </p>
            <p>
              • Gunakan tombol <strong>"Cetak Biodata"</strong> untuk mencetak
              biodata calon mahasiswa.
            </p>
            <p>
              • Gunakan tombol <strong>"Cetak Kartu Ujian"</strong> untuk
              mencetak kartu ujian calon mahasiswa.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
