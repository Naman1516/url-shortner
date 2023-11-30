import SpinnerIcon from "@/components/icons/SpinnerIcon";
import useGenerateShortenUrl from "@/utils/custom-hooks/useGenerateShortenUrl";
import { ArrowRight, Copy, FileCheck2, Link } from "lucide-react";
import { FormEvent, useState } from "react";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useGetAllUrls } from "@/utils/custom-hooks/useGetAllUrls";
import { Input } from "@/components/ui/input";
import useCopyToClipboard from "@/utils/custom-hooks/useCopyToClipboard";

type InputProps = {
  btnText: string;
};

const MainShortenSection = ({ btnText }: InputProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortLink, setShortLink] = useState("");
  const [isCopyMode, setIsCopyMode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const getAllUrls = useGetAllUrls();
  const { copyToClipboard } = useCopyToClipboard();
  const { generate } = useGenerateShortenUrl();

  const handleShortenUrl = async (event: FormEvent) => {
    event.preventDefault();
    if (!url) return;
    setIsLoading(true);
    const respone = await generate(url);
    setIsCopyMode(true);
    if (respone) {
      setShortLink(respone.shortUrl);
      setTimeout(() => {
        setShortLink("");
        setUrl("");
        setIsCopyMode(false);
      }, 7000);
    }
    setIsLoading(false);
    getAllUrls();
  };

  const handleCopy = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await copyToClipboard(shortLink);
      if (response) setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <form className=" w-full max-w-2xl flex items-center justify-center relative">
        <Link size={16} color="#C9CED6" className="absolute left-6" />
        <Input
          type="url"
          placeholder="Enter your link"
          className="shorten-input"
          onChange={(event) => setUrl(event.target.value)}
          value={isCopyMode ? shortLink : url}
        />
        <PrimaryButton
          type="submit"
          disabled={isCopyMode ? isCopied : isLoading || !url}
          callback={isCopyMode ? handleCopy : handleShortenUrl}
        >
          <span className="hidden lg:flex justify-center items-center">
            {isCopyMode ? (
              <>
                <span>
                  {isCopied ? <FileCheck2 size={16} /> : <Copy size={16} />}
                </span>
                <span className="pl-2">{isCopied ? "Copied!" : "Copy"}</span>
              </>
            ) : (
              <>
                {isLoading && <SpinnerIcon height={24} width={24} />}
                {btnText}
              </>
            )}
          </span>
          <span className="lg:hidden">
            {isCopyMode ? (
              isCopied ? (
                <FileCheck2 size={16} />
              ) : (
                <Copy size={16} />
              )
            ) : isLoading ? (
              <SpinnerIcon height={20} width={20} />
            ) : (
              <ArrowRight size={20} />
            )}
          </span>
        </PrimaryButton>
      </form>
    </section>
  );
};

export default MainShortenSection;
