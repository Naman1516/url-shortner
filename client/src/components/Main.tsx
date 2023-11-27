import MainTagline from "@/components/MainTagline";
import MainSubText from "@/components/MainSubText";
import MainShortenSection from "@/components/MainShortenSection";
import { SUBTEXT, TAGLINE } from "@/utils/constants";

const Main = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-10 h-screen">
      <MainTagline tagline={TAGLINE} />
      <MainSubText subtext={SUBTEXT} />
      <MainShortenSection btnText="Shorten Me!" />
    </main>
  );
};

export default Main;
