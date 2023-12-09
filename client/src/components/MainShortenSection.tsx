import { FormEvent, useState } from "react";

import SpinnerIcon from "@/components/icons/SpinnerIcon";
import InputErrorMessage from "@/components/InputErrorMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import useGenerateShortenUrl from "@/utils/custom-hooks/useGenerateShortenUrl";
import { validateUrl } from "@/utils/validate";
import useCopyToClipboard from "@/utils/custom-hooks/useCopyToClipboard";
import { useGetAllUrls } from "@/utils/custom-hooks/useGetAllUrls";

import { ArrowRight, Copy, FileCheck2, Link } from "lucide-react";

type InputProps = {
  btnText: string;
};

const MainShortenSection = ({ btnText }: InputProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortLink, setShortLink] = useState("");
  const [isCopyMode, setIsCopyMode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [errorMsg, setErrorMessage] = useState("");

  const getAllUrls = useGetAllUrls();
  const { copyToClipboard } = useCopyToClipboard();
  const { generate } = useGenerateShortenUrl();

  let copyTimeout: number;
  let resultTimeout: number;

  const handleShortenUrl = async (event: FormEvent) => {
    event.preventDefault();
    if (!url) return;
    if (!validateUrl(url)) {
      setErrorMessage("Invalid Link!");
      return;
    }
    setIsLoading(true);
    const respone = await generate(url);
    setIsCopyMode(true);
    if (respone) {
      clearTimeout(resultTimeout);
      setShortLink(respone.shortUrl);
      resultTimeout = setTimeout(() => {
        setShortLink("");
        setUrl("");
        setIsCopyMode(false);
      }, 7000);
    }
    setErrorMessage("");
    setIsLoading(false);
    getAllUrls();
  };

  const handleCopy = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await copyToClipboard(shortLink);
      clearTimeout(copyTimeout);
      if (response) setIsCopied(true);
      copyTimeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <form className="w-11/12 lg:w-full max-w-2xl flex items-center justify-center relative">
        <Link size={16} color="#C9CED6" className="absolute left-6" />
        <Input
          type="url"
          placeholder="Enter your link"
          className="shorten-input"
          onChange={(event) => setUrl(event.target.value)}
          onInput={() => setErrorMessage("")}
          value={isCopyMode ? shortLink : url}
        />
        <Button
          variant="default"
          type="submit"
          className="absolute right-2 rounded-full py-6 px-10 border-primary font-bold text-sm disabled:cursor-not-allowed lg:w-40"
          disabled={isCopyMode ? isCopied : isLoading || !url}
          onClick={isCopyMode ? handleCopy : handleShortenUrl}
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
        </Button>
      </form>
      <InputErrorMessage
        message={errorMsg}
        className={`w-11/12 h-10 lg:w-full max-w-2xl transition-opacity ease-in-out ${
          errorMsg ? "opacity-100" : "opacity-0"
        }`}
      />
    </section>
  );
};

export default MainShortenSection;
