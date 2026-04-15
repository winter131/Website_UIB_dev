"use client";

import { MatkulPilihanType } from "@/types/MatkulPilihanTypes";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<MatkulPilihanType>[] = [
  {
    id: "index",
    header: ({ table }) => (
      <div className="flex gap-3 items-center">
        <div className="text-black dark:text-white font-bold">No</div>
      </div>
    ),

    cell: ({ row, getValue }) => (
      <>
        <div
          style={{
            paddingLeft: `${row.depth * 2}rem`,
          }}
        >
          <div className="flex gap-3 items-center">{row.index + 1}</div>
        </div>
      </>
    ),
    size: 50,
  },
  {
    id: "MatkulNama",
    accessorKey: "MatkulNama",
    header: () => (
      <div className="text-black dark:text-white font-bold w-96">
        Mata Kuliah
      </div>
    ),
    cell: ({ row }) => {
      const nama = row.original.MatkulNama;
      return (
        <div>
          <div className="font-semibold">{nama}</div>
        </div>
      );
    },
    minSize: 50,
    size: 50,
    maxSize: 50,
  },
  {
    accessorKey: "MatkulSifat",
    header: () => (
      <div className="text-black dark:text-white font-bold">
        Sifat Mata Kuliah
      </div>
    ),
    cell: ({ row }) => {
      const sifat = row.original.MatkulSifat;
      return (
        <div className="font-semibold">
          {sifat === "wajib" ? "Wajib" : "Pilihan"}
        </div>
      );
    },
  },
  {
    accessorKey: "MatkulSks",
    header: () => (
      <div className="text-black dark:text-white font-bold">SKS</div>
    ),
  },
  {
    accessorKey: "MatkulSemester",
    header: () => (
      <div className="text-black dark:text-white font-bold">Semester</div>
    ),
  },
];
