import { Button } from "@/components/ui/button";
import { Updater } from "@tanstack/react-table";

interface FooterActionButtonsProps {
  setPageIndex: (updater: Updater<number>) => void;
  previousPage: () => void;
  nextPage: () => void;
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  getPageCount: () => number;
}

const DataTableFooterActionButtons = ({
  setPageIndex,
  previousPage,
  nextPage,
  getCanPreviousPage,
  getCanNextPage,
  getPageCount,
}: FooterActionButtonsProps) => {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent"
        onClick={() => setPageIndex(0)}
        disabled={!getCanPreviousPage()}
      >
        First Page
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent"
        onClick={() => previousPage()}
        disabled={!getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent"
        onClick={() => nextPage()}
        disabled={!getCanNextPage()}
      >
        Next
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent"
        onClick={() => setPageIndex(getPageCount() - 1)}
        disabled={!getCanNextPage()}
      >
        Last Page
      </Button>
    </>
  );
};

export default DataTableFooterActionButtons;
