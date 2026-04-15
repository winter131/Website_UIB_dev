"use client";

import { ColumnDef } from "@tanstack/react-table";
import ImportDataBankCard from "@/components/ImportDataBankCard";
import { ImportDataBankType } from "@/types/ImportDataBankTypes";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";

export const columns: ColumnDef<ImportDataBankType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [row.TanggalUpload, IndonesianDateFormat(row.TanggalUpload)]
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
        <ImportDataBankCard
          data={row.original}
          handleViewDetail={meta.handleViewDetail}
        />
      );
    },
  },
];
