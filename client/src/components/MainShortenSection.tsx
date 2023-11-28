import SpinnerIcon from "@/components/icons/SpinnerIcon";
import useGenerateShortenUrl from "@/utils/custom-hooks/useGenerateShortenUrl";
import { ArrowRight, Link } from "lucide-react";
import { FormEvent, useState } from "react";
import MainCopyShortLink from "@/components/MainCopyShortLink";
import PrimaryButton from "@/components/buttons/PrimaryButton";

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
            <Link size={16} color="#C9CED6" className="absolute left-6 opacity-40" />
            <input
              type="text"
              placeholder="Enter your link"
              className="rounded-full pr-16 lg:pr-44 w-full h-16 px-4 py-6 pl-12 bg-[#181e29] border-4 border-[#353c4a] placeholder:text-[#c9ced6] caret-[#EB568E] placeholder:opacity-40"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
            <div className="hidden lg:block">
              <PrimaryButton
                type="submit"
                callback={(event: FormEvent) => handleShortenUrl(event)}
                disabled={isLoading || !url}
                className="inset-y-2 right-2"
              >
                <span>
                  {isLoading && <SpinnerIcon height={24} width={24} />}
                </span>
                <span>{props.btnText}</span>
              </PrimaryButton>
            </div>
            <PrimaryButton
              type="submit"
              callback={(event: FormEvent) => handleShortenUrl(event)}
              disabled={isLoading || !url}
              className="inset-y-2 right-2 lg:hidden w-[50px]"
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
