"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MemberDaftarType } from "@/types/MemberDaftarType";
import AktivasiAkunCard from "@/components/AktivasiAkunCard";

export const columns: ColumnDef<MemberDaftarType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [row.EmailMember, row.NamaMember].join(" ").toLowerCase(),
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
      return (
        <AktivasiAkunCard
          data={data}
          handleAkunChange={meta.handleAkunChange}
          handleResetPassword={meta.handleResetPassword}
        />
      );
    },
  },
];
