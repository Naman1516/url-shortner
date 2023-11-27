import axios from "axios";

const useGenerateShortenUrl = () => {
  const generate = async (origUrl: string) => {
    console.log({ origUrl });
    const endpoint = "http://localhost:3000/short";
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
