"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { ProvinsiType } from "@/types/ProvinsiTypes";

export const columns: ColumnDef<ProvinsiType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [row.nama_provinsi, row.kode_provinsi].join(" ").toLowerCase(),
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
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center h-full">
          {row.index + 1}
        </div>
      );
    },
  },
  {
    accessorKey: "nama_provinsi",
    header: () => (
      <div className="text-black dark:text-white font-bold">Nama Provinsi</div>
    ),
  },
  {
    accessorKey: "kode_provinsi",
    header: () => (
      <div className="text-black dark:text-white font-bold">Kode Provinsi</div>
    ),
  },
  {
    id: "action",
    header: () => <div className="text-black dark:text-white font-bold"></div>,
    cell: ({ row, table }) => {
      const meta = table.options.meta as any;
      return (
        <ButtonGroup>
          <Button
            variant="outline"
            size={"sm"}
            className="hover:bg-yellow-100"
            onClick={() => meta.handleEdit(row.original)}
          >
            <span className="bx bx-edit text-yellow-500"></span>
          </Button>
          <Button
            variant="outline"
            size={"sm"}
            className="hover:bg-red-100"
            onClick={() => meta.handleDelete(row.original)}
          >
            <span className="bx bx-trash text-red-500"></span>
          </Button>
        </ButtonGroup>
      );
    },
  },
];
