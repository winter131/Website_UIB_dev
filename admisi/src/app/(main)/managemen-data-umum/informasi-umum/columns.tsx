"use client";

import { ColumnDef } from "@tanstack/react-table";
import { InformasiUmumCard } from "@/components/InformasiUmumCard";
import { InformasiUmumType } from "@/types/InformasiUmumTypes";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";

export const columns: ColumnDef<InformasiUmumType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [
        row.judul_informasi,
        row.id_informasi,
        row.keterangan_info,
        IndonesianDateFormat(row.TanggalUpload),
      ]
        .join(" ")
        .toLowerCase(),
    header: () => null,
    cell: ({ row }) => null,
    enableHiding: true,
  },
  {
    id: "index",
    header: () => (
      <div className="text-black dark:text-white font-bold flex items-center justify-center h-full">
        No.
      </div>
    ),
    cell: ({ row, table }) => {
      const meta = table.options.meta as any;
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <InformasiUmumCard
            data={row.original}
            onDelete={() =>
              meta.handleDelete && meta.handleDelete(row.original)
            }
            onEdit={() => meta.handleEdit && meta.handleEdit(row.original)}
            onView={() => meta.handleView && meta.handleView(row.original)}
          />
        </div>
      );
    },
  },
];
