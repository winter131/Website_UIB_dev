"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CalonMahasiswaType } from "@/types/CalonMahasiswaTypes";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ucFirst } from "@/utils/UcFirst";

export const columns: ColumnDef<CalonMahasiswaType>[] = [
  {
    id: "search",
    accessorFn: (row) =>
      [
        row.NamaCamhs,
        row.NomorDaftar,
        row.NamaProdi,
        row.JalurDaftar,
        row.WaktuKuliah,
        row.EmailCamhs,
        row.NoHpCamhs,
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
        <div className="flex items-center justify-center h-full text-slate-600 dark:text-slate-300">
          {row.index + 1}
        </div>
      );
    },
  },
  {
    accessorKey: "NamaCamhs",
    header: () => (
      <div className="text-black dark:text-white font-bold">
        Data Calon Mahasiswa
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1 py-2">
          <span className="font-semibold text-base text-black dark:text-white">
            {row.original.NamaCamhs}
          </span>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {row.original.NomorDaftar}
          </span>
          <div className="flex flex-wrap items-center gap-3 mt-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
              <i className="bx bx-envelope"></i>{" "}
              {row.original.EmailCamhs || "-"}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
              <i className="bx bx-phone"></i> {row.original.NoHpCamhs || "-"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "NamaProdi",
    header: () => (
      <div className="text-black dark:text-white font-bold">Pilihan Studi</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1.5">
          <span className="font-medium text-black dark:text-white text-sm">
            {row.original.NamaProdi || "-"}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <i className="bx bx-time-five"></i>{" "}
            {ucFirst(row.original.WaktuKuliah || "-")}
          </span>
        </div>
      );
    },
  },
  {
    id: "Aksi",
    header: () => (
      <div className="text-black dark:text-white font-bold text-center">
        Aksi
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center h-full">
          <Link
            href={`/manajemen-usm/mulai-wawancara/${row.original.NomorDaftar}/${row.original.NamaCamhs}`}
            className="btn btn-sm rounded-lg bg-black text-white hover:bg-zinc-800 hover:text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 border-none flex items-center gap-2 shadow-sm transition-all"
          >
            <i className="bx bx-user-voice text-lg"></i>
            Mulai Wawancara
          </Link>
        </div>
      );
    },
  },
];
