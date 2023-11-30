import { AllUrls } from "@/interfaces/allUrls";
import { UrlObject } from "@/interfaces/urlObject";
import { useAppSelector } from "@/utils/store/appStore";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "./datatable/DataTable";
import CopyActionButton from "./datatable/CopyActionButton";

const MainHistoryTable = () => {
  const { allUrls: data }: AllUrls = useAppSelector((store) => store.url);

  const columns: ColumnDef<UrlObject>[] = [
    {
      header: "Short Link",
      accessorKey: "shortUrl",
      cell: (el) => (
        <span className="flex items-center justify-between">
          {el.row.original.shortUrl}
          <CopyActionButton shortUrl={el.row.original.shortUrl} />
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

  return (
    <div className="w-11/12 text-white mt-20">
      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default MainHistoryTable;
