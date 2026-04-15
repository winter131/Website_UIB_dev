"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { ProvinsiType } from "@/types/ProvinsiTypes";
import { UniversitasType } from "@/types/UniversitasTypes";

export const columns: ColumnDef<UniversitasType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [row.nama_universitas, row.id_universitas, row.KotaName]
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
    accessorKey: "id_universitas",
    header: () => (
      <div className="text-black dark:text-white font-bold">
        Kode Universitas
      </div>
    ),
  },
  {
    accessorKey: "nama_universitas",
    header: () => (
      <div className="text-black dark:text-white font-bold">
        Nama Universitas
      </div>
    ),
  },
  {
    accessorKey: "KotaName",
    header: () => (
      <div className="text-black dark:text-white font-bold">Kota</div>
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
