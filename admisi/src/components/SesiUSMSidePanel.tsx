"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";

interface SesiUSMSidePanelProps {
  onAddSesi: () => void;
  isAddingSesi: boolean;
}

export default function SesiUSMSidePanel({
  onAddSesi,
  isAddingSesi,
}: SesiUSMSidePanelProps) {
  return (
    <>
      <div className="space-y-4">
        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Alat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Tambah Soal USM */}
            <div className="space-y-2">
              <Button
                onClick={() => {
                  onAddSesi();
                }}
                disabled={isAddingSesi}
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <FilePlus className="h-4 w-4 mr-2" />
                Tambah Sesi USM
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="border-dashed">
          <CardContent>
            <div className="text-xs text-gray-500 space-y-1">
              <p className="font-medium text-gray-600">Tips:</p>
              <p>
                • Gunakan tombol <strong>"Tambah Sesi USM"</strong> untuk
                menambahkan data sesi USM.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
