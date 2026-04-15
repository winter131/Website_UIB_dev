"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  FilterFn,
  Row,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Button } from "../../../../components/ui/button";
import UserInternalCardSkeleton from "@/components/UserInternalCardSkeleton";
import { HasilWawancaraType } from "@/types/HasilWawancaraTypes";

const globalFilterFn: FilterFn<any> = (
  row: Row<any>,
  columnId: string, // walaupun tidak dipakai, tetap harus ditulis
  filterValue: string,
) => {
  const value = row.getValue("search") as string;

  if (!value) return false;

  return value.toLowerCase().includes(filterValue.toLowerCase());
};
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  refetch?: () => void;
  searchQuery?: string;
  handleDelete?: (data: HasilWawancaraType) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  refetch,
  searchQuery,
  handleDelete,
}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalFilterFn,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableHiding: true,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
      columnVisibility: {
        search: false,
      },
    },
    meta: {
      handleDelete,
    },
    state: {
      globalFilter,
    },
  });

  React.useEffect(() => {
    if (searchQuery !== "") {
      setGlobalFilter(String(searchQuery));
    } else {
      setGlobalFilter("");
    }
  }, [searchQuery]);

  return (
    <div className="rounded-lg text-black dark:text-white shadow bg-white dark:bg-[#171717]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                {[...Array(5)].map((_, index) => (
                  <UserInternalCardSkeleton key={index} />
                ))}
              </TableCell>
            </TableRow>
          ) : (
            <>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-[400px] text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in duration-300">
                      <div className="w-20 h-20 bg-slate-50 dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-inner">
                        <i className="bx bx-search-alt text-4xl text-slate-400 dark:text-zinc-600 animate-pulse"></i>
                      </div>
                      <div className="space-y-1.5 max-w-[280px] flex flex-col items-center justify-center">
                        <h3 className="font-semibold text-lg text-black dark:text-white">
                          Data tidak ditemukan
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-zinc-400">
                          Coba sesuaikan kata kunci pencarian Anda atau segarkan
                          halaman.
                        </p>
                      </div>
                      <div className="mt-2 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex flex-row justify-center items-center gap-2 rounded-full px-5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                          onClick={() => refetch && refetch()}
                        >
                          <span className="bx bx-refresh text-xl"></span> Coba
                          Lagi
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4 gap-3 mr-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="dark:text-white dark:bg-[#212121]"
        >
          Sebelumnya
        </Button>
        <div className="font-medium text-slate-700 text-sm dark:text-white">
          Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
          {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="dark:text-white dark:bg-[#212121]"
        >
          Berikutnya
        </Button>
        <select
          className="select select-bordered bg-transparent select-sm"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50, 100, 200].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Tampilkan {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
