"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DetailGelombangType } from "@/types/DetailGelombangTypes";
import GelombangPendaftaranCard from "@/components/GelombangPendaftaranCard";

export const columns: ColumnDef<DetailGelombangType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [
        row.NamaGelombang,
        row.LokasiNama,
        row.lokasi_ujian,
        row.jenjang_gelombang,
        row.IsBeasiswa === "y" ? "Beasiswa" : "Reguler",
        row.IsBeasiswa === "y" ? "Beasiswa" : "Non Beasiswa",
        row.NamaPeriode,
        row.biaya_formulir,
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
        <GelombangPendaftaranCard
          data={row.original}
          handleEdit={meta.handleEdit}
          handleDelete={meta.handleDelete}
        />
      );
    },
  },
];
