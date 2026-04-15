"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    getRowId: (row: any) => row.matkul_id,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    state: {
      columnFilters,
    },
  });

  return (
    <div className="rounded-lg text-black dark:text-white shadow border border-black dark:border-white bg-white dark:bg-[#171717]">
      <div className="flex items-center gap-1 p-4">
        <input
          type="text"
          name="namaMatkul"
          id="namaMatkul"
          placeholder="Cari mata kuliah"
          className="input input-sm input-bordered bg-transparent text-black dark:text-white dark:bg-[#212121] border-black dark:border-white w-full"
          onChange={(e) => {
            table.setColumnFilters([
              { id: "MatkulNama", value: e.target.value },
            ]);
          }}
        />
        <select
          className="select select-bordered bg-transparent select-sm text-black dark:text-white dark:bg-[#212121] border-black dark:border-white w-32"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50, 100, 200].map((pageSize) => (
            <option
              key={pageSize}
              value={pageSize}
              className="dark:text-white dark:bg-[#212121]"
            >
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
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
            <>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-12 text-center"
                >
                  Memuat data{" "}
                  <span className="bx bx-loader bx-spin text-[#F8B600]"></span>
                </TableCell>
              </TableRow>
            </>
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
                    className="h-12 text-center"
                  >
                    Belum ada data.
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4 gap-3 mr-4 overflow-x-clip">
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="dark:text-white dark:bg-[#212121]"
        >
          Previous
        </Button>
        <div className="font-medium text-slate-700 text-sm dark:text-white">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="dark:text-white dark:bg-[#212121]"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
