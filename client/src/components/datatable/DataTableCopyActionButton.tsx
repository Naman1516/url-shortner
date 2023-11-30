import useCopyToClipboard from "@/utils/custom-hooks/useCopyToClipboard";
import { Copy, FileCheck2 } from "lucide-react";
import { useState } from "react";

type CopyActionButtonProps = {
  shortUrl: string;
};

const DataTableCopyActionButton = (props: CopyActionButtonProps) => {
  const { shortUrl } = props;
  const [isCopied, setIsCopied] = useState(false);
  const { copyToClipboard } = useCopyToClipboard();

  const handleCopy = async (shortUrl: string) => {
    try {
      const response = await copyToClipboard(shortUrl);
      if (response) setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <button
      className="bg-[#1c283fb0] p-3 rounded-full hover:bg-[#1c283f00]"
      onClick={() => handleCopy(shortUrl)}
    >
      <span>{isCopied ? <FileCheck2 size={16} /> : <Copy size={16} />}</span>
    </button>
  );
};

export default DataTableCopyActionButton;
