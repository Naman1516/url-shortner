import PrimaryButton from "@/buttons/PrimaryButton";
import useCopyToClipboard from "@/custom-hooks/useCopyToClipboard";
import { Copy, FileCheck2 } from "lucide-react";
import { useState } from "react";

type CopyProps = {
  shortLink: string;
};

const MainCopyShortLink = (props: CopyProps) => {
  const { shortLink } = props;
  const { copyToClipboard } = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const response = await copyToClipboard(shortLink);
      if (response) setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className="w-1/2 rounded-full h-16 flex items-center justify-between px-4 border-4 border-[#353c4a] bg-[#181e29] text-white relative">
      <div>
        <p>{shortLink}</p>
      </div>
      <div>
        <PrimaryButton
          callback={handleCopy}
          className="inset-y-1 right-1 gap-2"
          disabled={isCopied}
        >
          {isCopied ? <FileCheck2 size={16} /> : <Copy size={16} />}
          <span>{isCopied ? "Copied!" : "Copy"}</span>
        </PrimaryButton>
      </div>
    </div>
  );
};

export default MainCopyShortLink;
