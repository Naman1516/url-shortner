import MainTagline from "@/components/MainTagline";
import MainSubText from "@/components/MainSubText";
import MainShortenSection from "@/components/MainShortenSection";

const Main = () => {
  const tagline = "Shorten Your Loooong Links :)";
  const subtext =
    "Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.";
  return (
    <main className="flex flex-col items-center justify-center gap-10 h-screen">
      <MainTagline tagline={tagline} />
      <MainSubText subtext={subtext} />
      <MainShortenSection btnText="Shorten Me!" />
    </main>
  );
};

export default Main;
