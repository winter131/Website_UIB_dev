"use client";

import { LokasiUjianType } from "@/types/LokasiUjianTypes";
import { ColumnDef } from "@tanstack/react-table";
import ModulCard from "@/components/ModulCard";
import Link from "next/link";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { PeriodeType } from "@/types/PeriodeTypes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const columns: ColumnDef<PeriodeType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [row.periode_jenis, row.tahun_periode.toString(), row.status_periode]
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
    accessorKey: "periode_jenis",
    header: () => (
      <div className="text-black dark:text-white font-bold">Semester</div>
    ),
    cell: ({ row }) => (
      <div className="text-black dark:text-white">
        {row.original.periode_jenis === "ganjil"
          ? "Ganjil"
          : row.original.periode_jenis === "genap"
            ? "Genap"
            : row.original.periode_jenis === "sisipan ganjil"
              ? "Sisipan Ganjil"
              : row.original.periode_jenis === "sisipan genap"
                ? "Sisipan Genap"
                : ""}
      </div>
    ),
  },
  {
    accessorKey: "tahun_periode",

    header: () => (
      <div className="text-black dark:text-white font-bold">Tahun Periode</div>
    ),
  },
  {
    accessorKey: "status_periode",

    header: () => (
      <div className="text-black dark:text-white font-bold">Status</div>
    ),
    cell: ({ row }) => (
      <div className="text-black dark:text-white">
        {row.original.status_periode === "aktif" ? (
          <span className="text-green-500 border border-green-500 rounded-md py-1 px-3 text-xs bg-green-100">
            Aktif
          </span>
        ) : row.original.status_periode === "tidak aktif" ? (
          <span className="text-red-500 border border-red-500 rounded-md py-1 px-3 text-xs bg-red-100">
            Tidak Aktif
          </span>
        ) : (
          ""
        )}
      </div>
    ),
  },
  {
    id: "action",
    header: () => <div className="text-black dark:text-white font-bold"></div>,
    cell: ({ row, table }) => {
      const meta = table.options.meta as any;
      return (
        <div className="flex items-center space-x-2">
          <Label htmlFor="airplane-mode" className="text-xs font-normal">
            Tidak Aktif
          </Label>
          <Switch
            id="airplane-mode"
            checked={row.original.status_periode === "aktif"}
            onCheckedChange={(e) => {
              meta.onStatusChange(
                row.original.periode_id,
                row.original.periode_jenis,
                row.original.tahun_periode,
                e ? "aktif" : "tidak aktif",
              );
            }}
          />
          <Label htmlFor="airplane-mode" className="text-xs font-normal">
            Aktif
          </Label>
        </div>
      );
    },
  },
];
