"use client";

import { ColumnDef } from "@tanstack/react-table";
import { HasilUSMType } from "@/types/HasilUSMTypes";
import ResetUSMCard from "@/components/ResetUSMCard";

export const columns: ColumnDef<HasilUSMType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [
        row.NomorDaftar,
        row.NamaMaba,
        row.WaktuMulai,
        row.WaktuSelesai,
        row.CanReset,
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
        <ResetUSMCard
          mahasiswa={data}
          onResetTime={meta.handleResetWaktuSelesai}
          onDeleteData={meta.handleHapusDataMengikuti}
        />
      );
    },
  },
];
