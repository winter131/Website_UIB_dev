"use client";

import { ColumnDef } from "@tanstack/react-table";
import RekapPerubahanProdiCard from "@/components/RekapPerubahanProdiCard";
import { RekapPerubahanProdiType } from "@/types/RekapPerubahanProdiTypes";

export const columns: ColumnDef<RekapPerubahanProdiType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [row.NomorDaftar, row.NamaCamhs].join(" ").toLowerCase(),
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
      return <RekapPerubahanProdiCard data={data} />;
    },
  },
];
