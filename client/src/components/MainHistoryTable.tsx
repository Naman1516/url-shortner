import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/tanstack/table";
import { AllUrls } from "@/interfaces/allUrls";
import { UrlObject } from "@/interfaces/urlObject";
import { useAppSelector } from "@/utils/store/appStore";
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

const MainHistoryTable = () => {
  const { allUrls: data }: AllUrls = useAppSelector((store) => store.url);
  const [sorting, setSorting] = useState<SortingState>([]);

  // table
  const columns: ColumnDef<UrlObject>[] = [
    { header: "ID", accessorKey: "_id" },
    { header: "Url ID", accessorKey: "urlId" },
    { header: "Original Url", accessorKey: "origUrl" },
    { header: "Short Url", accessorKey: "shortUrl" },
    { header: "Clicks", accessorKey: "clicks", enableSorting: true },
    { header: "Created At", accessorKey: "date" },
  ];
  const allUrlsTable = useReactTable({
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
    <div className="w-11/12 text-white mt-20">
      <Table className="bg-[#181e29] border-4 border-[#353c4a]">
        <TableHeader>
          {allUrlsTable.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-white font-bold text-center cursor-pointer"
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
          {allUrlsTable.getRowModel().rows.length ? (
            allUrlsTable.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="max-w-xs text-ellipsis overflow-clip ..."
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
          allUrlsTable.getCanPreviousPage() && allUrlsTable.previousPage()
        }
      >
        Prev Page
      </button>
      <button
        onClick={() => allUrlsTable.getCanNextPage() && allUrlsTable.nextPage()}
      >
        Next Page
      </button>
    </div>
  );
};

export default MainHistoryTable;
