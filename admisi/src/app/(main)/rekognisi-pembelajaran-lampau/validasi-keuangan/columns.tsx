"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  CalonMahasiswaRPLType,
  CalonMahasiswaType,
} from "@/types/CalonMahasiswaTypes";
import ValidasiDokumenCalonMahasiswaRPLCard from "@/components/ValidasiDokumenCalonMahasiswaRPLCard";
import ValidasiKeuanganCalonMahasiswaRPLCard from "@/components/ValidasiKeuanganCalonMahasiswaRPLCard";

export const columns: ColumnDef<CalonMahasiswaRPLType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [
        row.NomorDaftar,
        row.NamaCamhs,
        row.BiodataCamhs.WaktuKuliah,
        row.NamaProdi,
      ]
        .join(" ")
        .toLowerCase(),
    header: () => null,
    cell: ({ row }) => null,
    enableHiding: true,
  },
  {
    id: "index",
    header: () => null,
    cell: ({ row, table }) => {
      const meta = table.options.meta as any;
      const data = row.original;
      return (
        <ValidasiKeuanganCalonMahasiswaRPLCard
          data={data}
          onTerima={meta.handleTerima}
          onTolak={meta.handleTolak}
          isProcessing={meta.isProcessing}
        />
      );
    },
  },
];
