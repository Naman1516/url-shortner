import axios from "axios";
import { API_BASE_URL } from "@/utils/constants/constants";

const useGenerateShortenUrl = () => {
  const generate = async (origUrl: string) => {
    console.log({ origUrl });
    const endpoint = API_BASE_URL + "/short";
    try {
      const response = await axios.post(endpoint, {
        origUrl,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { generate };
};

export default useGenerateShortenUrl;
