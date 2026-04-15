"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { SoalUSMType } from "@/types/SoalUSMTypes";
import SoalUSMCard from "@/components/SoalUSMCard";

export const columns: ColumnDef<SoalUSMType>[] = [
  {
    id: "search",
    accessorFn: (row) => [row.pertanyaan_soal].join(" ").toLowerCase(),
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
        <SoalUSMCard
          data={row.original}
          dataKategori={meta.dataKategori}
          handleEdit={meta.handleEdit}
          handleDelete={meta.handleDelete}
        />
      );
    },
  },
];
