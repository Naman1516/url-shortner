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
      <button
        onClick={() =>
          dataTable.getCanPreviousPage() && dataTable.previousPage()
        }
      >
        Prev Page
      </button>
      <button
        onClick={() => dataTable.getCanNextPage() && dataTable.nextPage()}
      >
        Next Page
      </button>
    </>
  );
};

export default DataTable;
