"use client";

import { LokasiUjianType } from "@/types/LokasiUjianTypes";
import { ColumnDef } from "@tanstack/react-table";
import ModulCard from "@/components/ModulCard";
import Link from "next/link";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<LokasiUjianType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [row.lokasi_nama, row.alamat_ujian, row.kode_lokasi]
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
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center h-full">
          {row.index + 1}
        </div>
      );
    },
  },
  {
    accessorKey: "lokasi_nama",
    header: () => (
      <div className="text-black dark:text-white font-bold">Nama Lokasi</div>
    ),
  },
  {
    accessorKey: "kode_lokasi",

    header: () => (
      <div className="text-black dark:text-white font-bold">Kode Lokasi</div>
    ),
  },
  {
    accessorKey: "alamat_ujian",

    header: () => (
      <div className="text-black dark:text-white font-bold">Alamat Ujian</div>
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
