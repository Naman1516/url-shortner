import { AllUrls } from "@/interfaces/allUrls";
import { UrlObject } from "@/interfaces/urlObject";
import { useAppSelector } from "@/utils/store/appStore";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "./datatable/DataTable";
import DataTableCopyActionButton from "./datatable/DataTableCopyActionButton";
import { FAVICON_URL } from "@/utils/constants/constants";

const MainHistoryTable = () => {
  const { allUrls: data }: AllUrls = useAppSelector((store) => store.url);

  const columns: ColumnDef<UrlObject>[] = [
    {
      header: "Short Link",
      accessorKey: "shortUrl",
      cell: (el) => (
        <span className="flex items-center gap-x-6">
          {el.row.original.shortUrl}
          <DataTableCopyActionButton shortUrl={el.row.original.shortUrl} />
        </span>
      ),
    },
    {
      header: "Original Link",
      accessorKey: "origUrl",
      cell: (el) => (
        <span className="flex items-center gap-x-6">
          <img
            src={FAVICON_URL(el.row.original.origUrl)}
            alt={el.row.original.origUrl}
            className="h-6"
          />
          {el.row.original.origUrl}
        </span>
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
