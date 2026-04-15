"use client";

import { ColumnDef } from "@tanstack/react-table";
import SoalUSMCard from "@/components/SoalUSMCard";
import { SesiUSMAlternateType } from "@/types/SesiUSMTypes";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";
import SesiUSMCard from "@/components/SesiUSMCard";

export const columns: ColumnDef<SesiUSMAlternateType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [
        row.nama_ujian,
        row.tanggal_mulai,
        IndonesianDateFormat(row.tanggal_mulai),
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
      return (
        <SesiUSMCard
          data={row.original}
          onEdit={meta.handleEdit}
          onAction={meta.handleAction}
          isResettingToken={meta.isResettingToken}
          onResetToken={meta.handleResetToken}
        />
      );
    },
  },
];
