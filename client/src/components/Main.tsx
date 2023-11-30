import MainTagline from "@/components/MainTagline";
import MainSubText from "@/components/MainSubText";
import MainShortenSection from "@/components/MainShortenSection";
import { SUBTEXT, TAGLINE } from "@/utils/constants/constants";
import MainHistoryTable from "@/components/MainHistoryTable";
import { useGetAllUrls } from "@/utils/custom-hooks/useGetAllUrls";
import { useEffect } from "react";

const Main = () => {
  const getAllUrls = useGetAllUrls();
  useEffect(() => {
    getAllUrls();
  }, []);
  
  return (
    <main className="flex flex-col items-center justify-center gap-10 box-border mt-48">
      <MainTagline tagline={TAGLINE} />
      <MainSubText subtext={SUBTEXT} />
      <MainShortenSection btnText="Shorten Me!" />
      <MainHistoryTable />
    </main>
  );
};

export default Main;
