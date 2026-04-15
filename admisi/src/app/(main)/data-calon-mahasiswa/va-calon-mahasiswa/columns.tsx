"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import VirtualAccountCalonMahasiswaCard from "@/components/VirtualAccountCalonMahasiswaCard";

export const columns: ColumnDef<CalonMahasiswaType>[] = [
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
      return (
        <VirtualAccountCalonMahasiswaCard
          data={data}
          handleSubmit={meta.handleSubmit}
        />
      );
    },
  },
];
