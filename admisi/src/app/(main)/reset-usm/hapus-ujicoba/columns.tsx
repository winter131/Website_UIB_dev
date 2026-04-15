"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { HasilUSMType } from "@/types/HasilUSMTypes";
import HasilUSMCard from "@/components/HasilUSMCard";

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
      return <HasilUSMCard mahasiswa={row.original} />;
    },
  },
];
