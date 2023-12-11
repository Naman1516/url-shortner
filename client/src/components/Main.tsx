import { useEffect } from "react";

import MainTagline from "@/components/MainTagline";
import MainSubText from "@/components/MainSubText";
import MainShortenSection from "@/components/MainShortenSection";
import MainHistoryTable from "@/components/MainHistoryTable";

import { useGetAllUrls } from "@/utils/custom-hooks/useGetAllUrls";
import { SUBTEXT, TAGLINE } from "@/utils/constants/constants";

const Main = () => {
  const getAllUrls = useGetAllUrls();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllUrls();
      } catch (error) {
        console.error("Error fetching URLs:", error);
      }
    };

    fetchData();
  }, [getAllUrls]);

  return (
    <main className="flex flex-col items-center justify-center gap-10 box-border mt-28 lg:mt-48">
      <MainTagline tagline={TAGLINE} />
      <MainSubText subtext={SUBTEXT} />
      <MainShortenSection btnText="Shorten Me!" />
      <MainHistoryTable />
    </main>
  );
};

export default Main;
