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
import { Copy } from "lucide-react";
import { useState } from "react";

const MainHistoryTable = () => {
  const { allUrls: data }: AllUrls = useAppSelector((store) => store.url);
  const [sorting, setSorting] = useState<SortingState>([]);

  // table
  const columns: ColumnDef<UrlObject>[] = [
    {
      header: "Short Link",
      accessorKey: "shortUrl",
      cell: (el) => (
        <span className="flex items-center justify-between">
          {el.row.original.shortUrl}{" "}
          <button className="bg-[#1c283fb0] p-3 rounded-full hover:bg-[#1c283f00]">
            <Copy size={16} />
          </button>
        </span>
      ),
    },
    { header: "Original Link", accessorKey: "origUrl" },
    { header: "Clicks", accessorKey: "clicks", enableSorting: true },
    {
      header: "Created",
      accessorKey: "date",
      cell: (el) => {
        return new Date(el.row.original.date).toLocaleDateString();
      },
    },
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
      <Table className="border-[#353c4a]">
        <TableHeader className="rounded-sm">
          {allUrlsTable.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-white font-semi-bold cursor-pointer bg-[#181e29]"
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
                className="border-[#353c4a]"
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
