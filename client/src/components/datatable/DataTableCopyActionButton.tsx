import { useState } from "react";

import { Button } from "@/components/ui/button";

import useCopyToClipboard from "@/utils/custom-hooks/useCopyToClipboard";

import { Copy, FileCheck2 } from "lucide-react";

type CopyActionButtonProps = {
  shortUrl: string;
};

const DataTableCopyActionButton = ({ shortUrl }: CopyActionButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { copyToClipboard } = useCopyToClipboard();

  let timeout: number;

  const handleCopyClick = async (url: string) => {
    try {
      clearTimeout(timeout);
      const response = await copyToClipboard(url);
      if (response) setIsCopied(true);
      timeout = setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="p-3"
      onClick={() => handleCopyClick(shortUrl)}
    >
      <span>{isCopied ? <FileCheck2 size={16} /> : <Copy size={16} />}</span>
    </Button>
  );
};

export default DataTableCopyActionButton;
