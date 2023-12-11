import DataTable from "@/components/datatable/DataTable";
import DataTableCopyActionButton from "@/components/datatable/DataTableCopyActionButton";
import { ColumnDef } from "@tanstack/react-table";

import { AllUrls } from "@/interfaces/allUrls";
import { UrlObject } from "@/interfaces/urlObject";

import { useAppSelector } from "@/utils/store/appStore";
import { FAVICON_URL } from "@/utils/constants/constants";

const MainHistoryTable = () => {
  const { allUrls: data }: AllUrls = useAppSelector((store) => store.url);

  const columns: ColumnDef<UrlObject>[] = [
    {
      header: "Short Link",
      accessorKey: "shortUrl",
      cell: (el) => (
        <div className="flex items-center justify-between gap-x-6">
          <a
            href={el.row.original.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {el.row.original.shortUrl}
          </a>
          <DataTableCopyActionButton shortUrl={el.row.original.shortUrl} />
        </div>
      ),
    },
    {
      header: "Original Link",
      accessorKey: "origUrl",
      cell: (el) => (
        <a
          className="flex items-center gap-x-4"
          href={el.row.original.origUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={FAVICON_URL(el.row.original.origUrl)}
            alt={el.row.original.origUrl}
            className="h-6"
          />
          <span className="truncate">{el.row.original.origUrl}</span>
        </a>
      ),
    },
    { header: "Clicks", accessorKey: "clicks" },
    {
      header: "Date",
      accessorKey: "date",
      cell: (el) => {
        return new Date(el.row.original.date).toLocaleDateString();
      },
    },
  ];

  return (
    <div className="w-11/12 text-white">
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default MainHistoryTable;
