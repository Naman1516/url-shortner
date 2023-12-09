import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/tanstack/table";
import { UrlObject } from "@/interfaces/urlObject";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import DataTableFooterActionButtons from "./DataTableFooterActionButtons";

type DataTableProps = {
  data: Array<UrlObject>;
  columns: ColumnDef<UrlObject>[];
};

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");

  const dataTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const {
    getHeaderGroups,
    setPageIndex,
    getCanPreviousPage,
    previousPage,
    nextPage,
    getCanNextPage,
    getState,
    getPageCount,
    getRowModel,
  } = dataTable;

  return (
    <div className="w-full">
      <div className="flex flex-row-reverse items-center py-4">
        <Input
          placeholder="Filter Results"
          value={filtering}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFiltering(event.target.value)
          }
          className="text-base bg-[#181e29] text-white border border-[#353c4a] w-full md:w-64"
        />
      </div>
      <Table className="border-[#353c4a] table-auto lg:table-fixed bg-[#181e29] rounded-md">
        <TableHeader>
          {getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="hover:bg-transparent rounded-sm"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-white font-semi-bold cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div className={`flex items-center gap-2 w-32`}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        {
                          asc: <ChevronUp size={16} />,
                          desc: <ChevronDown size={16} />,
                        }[
                          (header.column.getIsSorted() ?? null) as keyof {
                            asc: string;
                            desc: string;
                          }
                        ]
                      }
                    </div>
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {getRowModel().rows.length ? (
            getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-[#353c4a] border-4 border-opacity-0 bg-opacity-20 hover:bg-transparent"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={`truncate max-w-lg`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No Results.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-col lg:flex-row items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page&nbsp;{getState().pagination.pageIndex + 1}
          &nbsp;of&nbsp;{getPageCount() === 0 ? 1 : getPageCount()}
        </div>
        <div className="flex gap-2 py-4">
          <DataTableFooterActionButtons
            setPageIndex={setPageIndex}
            previousPage={previousPage}
            nextPage={nextPage}
            getCanNextPage={getCanNextPage}
            getCanPreviousPage={getCanPreviousPage}
            getPageCount={getPageCount}
          />
        </div>
      </div>
    </div>
  );
};

export default DataTable;
