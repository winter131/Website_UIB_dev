"use client";

import { ColumnDef } from "@tanstack/react-table";
import TagihanLOASarjanaCard from "@/components/TagihanLOASarjanaCard";
import { TagihanLOASarjanaType } from "@/types/TagihanLOATypes";

export const columns: ColumnDef<TagihanLOASarjanaType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [
        row.PeriodeTagihan,
        row.GelombangTagihan,
        row.PeringkatDicapai,
        row.ProgramStudiTagihan,
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
        <TagihanLOASarjanaCard
          data={row.original}
          handleView={meta.handleView}
          handleEdit={meta.handleEdit}
          handleDelete={meta.handleDelete}
        />
      );
    },
  },
];
