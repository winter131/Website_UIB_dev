"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { JenisGelombangType } from "@/types/JenisGelombangTypes";

export const columns: ColumnDef<JenisGelombangType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [
        row.nama_gelombang,
        row.is_beasiswa === "y" ? "Beasiswa" : "Non Beasiswa",
        row.can_pilih_ujian === "y"
          ? "Bisa pilih lokasi ujian"
          : "Tidak bisa pilih lokasi ujian",
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
    accessorKey: "nama_gelombang",
    header: () => (
      <div className="text-black dark:text-white font-bold">Nama Gelombang</div>
    ),
  },
  {
    accessorKey: "is_beasiswa",

    header: () => (
      <div className="text-black dark:text-white font-bold">
        Jenis Gelombang
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center justify-center">
          {row.original.is_beasiswa === "y" ? (
            <div className="bg-emerald-100 text-emerald-600 text-xs py-1 px-2 rounded-lg flex flex-row items-center w-max border border-emerald-600">
              Beasiswa
            </div>
          ) : (
            <div className="bg-rose-100 text-rose-600 text-xs py-1 px-2 rounded-lg flex flex-row items-center w-max border border-rose-600">
              <span className="bx bx-graduation"></span> Non Beasiswa
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "can_pilih_ujian",

    header: () => (
      <div className="text-black dark:text-white font-bold">
        Bisa Pilih Lokasi Ujian?
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center justify-center">
          {row.original.can_pilih_ujian === "y" ? (
            <span className="bx bx-check text-xl text-green-500"></span>
          ) : (
            <span className="bx bx-x text-xl text-red-500"></span>
          )}
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
