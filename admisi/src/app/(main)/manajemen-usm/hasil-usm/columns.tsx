"use client";

import { ColumnDef } from "@tanstack/react-table";
import HasilUjianSaringanMasukCard from "@/components/HasilUjianSaringanMasukCard";
import { HasilUjianSaringanMasukType } from "@/types/HasilUSMTypes";

export const columns: ColumnDef<HasilUjianSaringanMasukType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [
        row.NomorDaftar,
        row.NamaCamhs,
        row.WaktuKuliah,
        row.JenisUjian,
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
      return <HasilUjianSaringanMasukCard data={data} />;
    },
  },
];
