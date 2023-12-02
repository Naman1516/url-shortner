import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const useGenerateShortenUrl = () => {
  const generate = async (origUrl: string) => {
    console.log({ origUrl });
    const endpoint = BASE_URL + "/short";
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
