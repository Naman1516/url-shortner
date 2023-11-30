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
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type DataTableProps = {
  data: Array<UrlObject>;
  columns: ColumnDef<UrlObject>[];
};

const DataTable = (props: DataTableProps) => {
  const { data, columns } = props;
  const [sorting, setSorting] = useState<SortingState>([]);

  const dataTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <>
      <Table className="border-[#353c4a] table-fixed bg-[#181e29] rounded-md">
        <TableHeader className="">
          {dataTable.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-white font-semi-bold cursor-pointer"
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
                className="border-[#353c4a] border-4 border-opacity-0 bg-slate-500 bg-opacity-20"
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {dataTable.getFilteredSelectedRowModel().rows.length} of{" "}
          {dataTable.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
        </div>
      </div>
    </>
  );
};

export default DataTable;
