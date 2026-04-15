"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ImportDataBankDetailType } from "@/types/ImportDataBankTypes";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";
import ImportDataBankDetailCard from "@/components/ImportDataBankDetailCard";

export const columnsDetail: ColumnDef<ImportDataBankDetailType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [
        row.TanggalUpload,
        IndonesianDateFormat(row.TanggalUpload),
        row.NamaCamhs,
        row.NomorDaftar,
        row.TotalDana,
        row.NomorVa,
        row,
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
        <ImportDataBankDetailCard
          item={row.original}
          index={row.index + 1}
          showDeleteButton
          isDeleting={meta.isDeleting}
          onDelete={() => meta.onDelete(row.original)}
        />
      );
    },
  },
];
