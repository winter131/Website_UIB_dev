"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TagihanLOAMagisterType } from "@/types/TagihanLOATypes";
import TagihanLOAMagisterCard from "@/components/TagihanLOAMagisterCard";

export const columns: ColumnDef<TagihanLOAMagisterType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [
        row.PeriodeTagihan,
        row.GelombangTagihan,
        row.ProgramStudiTagihan,
        row.jalur_daftar,
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
        <TagihanLOAMagisterCard
          data={row.original}
          handleEdit={meta.handleEdit}
          handleDelete={meta.handleDelete}
        />
      );
    },
  },
];
