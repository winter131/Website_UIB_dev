"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { PeringkatType } from "@/types/PeringkatTypes";

export const columns: ColumnDef<PeringkatType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [
        row.nama_peringkat,
        row.skor_maximum,
        row.skor_minimum,
        row.tipe_pendaftaran === "reg"
          ? "Reguler"
          : row.tipe_pendaftaran === "bsw"
            ? "Beasiswa"
            : row.tipe_pendaftaran === "wna"
              ? "Warga Negara Asing"
              : row.tipe_pendaftaran === "s2"
                ? "S2"
                : null,
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
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center h-full">
          {row.index + 1}
        </div>
      );
    },
  },
  {
    accessorKey: "nama_peringkat",
    header: () => (
      <div className="text-black dark:text-white font-bold">Peringkat</div>
    ),
  },
  {
    accessorKey: "skor_minimum",
    header: () => (
      <div className="text-black dark:text-white font-bold">Skor Minimum</div>
    ),
  },
  {
    accessorKey: "skor_maximum",
    header: () => (
      <div className="text-black dark:text-white font-bold">Skor Maksimum</div>
    ),
  },
  {
    accessorKey: "tipe_pendaftaran",
    header: () => (
      <div className="text-black dark:text-white font-bold">
        Tipe Pendaftaran
      </div>
    ),
    cell: ({ row }) => {
      const tipe = row.original.tipe_pendaftaran;
      return (
        <div className="flex items-center justify-center h-full">
          {tipe === "reg"
            ? "Reguler"
            : tipe === "bsw"
              ? "Beasiswa"
              : tipe === "wna"
                ? "WNA"
                : tipe === "s2"
                  ? "S2"
                  : null}
        </div>
      );
    },
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
