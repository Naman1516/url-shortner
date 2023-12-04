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
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";

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

  return (
    <div className="w-full">
      <div className="flex flex-row-reverse items-center py-4">
        <Input
          placeholder="Filter Results"
          value={filtering}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFiltering(event.target.value)
          }
          className="text-base bg-[#181e29] text-white border border-[#353c4a] w-full lg:w-64"
        />
      </div>
      <Table className="border-[#353c4a] table-auto lg:table-fixed bg-[#181e29] rounded-md">
        <TableHeader>
          {dataTable.getHeaderGroups().map((headerGroup) => (
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
                    <div className="flex items-center gap-2">
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
          {dataTable.getRowModel().rows.length ? (
            dataTable.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-[#353c4a] border-4 border-opacity-0 bg-opacity-20 hover:bg-transparent"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="text-ellipsis overflow-clip ..."
                  >
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
          {dataTable.getFilteredSelectedRowModel().rows.length} of&nbsp;
          {dataTable.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex gap-2 py-4">
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent"
            onClick={() => dataTable.setPageIndex(0)}
            disabled={!dataTable.getCanPreviousPage()}
          >
            First Page
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="bg-transparent"
            onClick={() => dataTable.previousPage()}
            disabled={!dataTable.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent"
            onClick={() => dataTable.nextPage()}
            disabled={!dataTable.getCanNextPage()}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent"
            onClick={() => dataTable.setPageIndex(dataTable.getPageCount() - 1)}
            disabled={!dataTable.getCanNextPage()}
          >
            Last Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
