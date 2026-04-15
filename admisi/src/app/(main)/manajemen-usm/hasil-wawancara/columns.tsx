"use client";

import { ColumnDef } from "@tanstack/react-table";
import HasilWawancaraCard from "@/components/HasilWawancaraCard";
import { HasilWawancaraType } from "@/types/HasilWawancaraTypes";

export const columns: ColumnDef<HasilWawancaraType>[] = [
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
        <HasilWawancaraCard
          data={data}
          onDelete={meta.handleDelete}
          onDetail={meta.handleDetail}
        />
      );
    },
  },
];
