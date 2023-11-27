import SpinnerIcon from "@/assets/icons/SpinnerIcon";
import useGenerateShortenUrl from "@/custom-hooks/useGenerateShortenUrl";
import { ArrowRight, Link } from "lucide-react";
import { FormEvent, useState } from "react";
import MainCopyShortLink from "@/components/MainCopyShortLink";
import PrimaryButton from "@/buttons/PrimaryButton";

type InputProps = {
  btnText: string;
};

const MainShortenSection = (props: InputProps) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shortLink, setShortLink] = useState("");

  const { generate } = useGenerateShortenUrl();

  const handleShortenUrl = async (event: FormEvent) => {
    event.preventDefault();
    if (!url) return;
    setIsLoading(true);
    const respone = await generate(url);
    if (respone) {
      setShortLink(respone.shortUrl);
      setTimeout(clearshortLink, 7000);
    }
    setUrl("");
    setIsLoading(false);
  };

  const clearshortLink = () => {
    setShortLink("");
  };

  return (
    <section className="w-full flex flex-col justify-center items-center">
      {shortLink ? (
        <MainCopyShortLink shortLink={shortLink} />
      ) : (
        <>
          <form className="relative w-10/12 md:w-1/2 flex items-center justify-center text-white">
            <Link size={16} color="#C9CED6" className="absolute left-6" />
            <input
              type="text"
              placeholder="https://rufbuk.com/"
              className="rounded-full pr-44 w-full h-16 px-4 py-6 pl-12 bg-[#181e29] border-4 border-[#353c4a] placeholder:text-[#c9ced6] caret-[#EB568E]"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
            <PrimaryButton
              type="submit"
              callback={(event: FormEvent) => handleShortenUrl(event)}
              disabled={isLoading || !url}
              className="inset-y-2 right-2 hidden lg:block"
            >
              <span>{isLoading && <SpinnerIcon height={24} width={24} />}</span>
              <span>{props.btnText}</span>
            </PrimaryButton>
            <PrimaryButton
              type="submit"
              callback={(event: FormEvent) => handleShortenUrl(event)}
              disabled={isLoading || !url}
              className="inset-y-2 right-2 lg:hidden w-1"
            >
              <span>
                {isLoading ? (
                  <SpinnerIcon height={20} width={20} />
                ) : (
                  <ArrowRight size={20} />
                )}
              </span>
            </PrimaryButton>
          </form>
        </>
      )}
    </section>
  );
};

export default MainShortenSection;
