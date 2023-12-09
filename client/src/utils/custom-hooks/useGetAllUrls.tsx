import axios from "axios";
import { setAllUrls } from "@/utils/store/urlSlice";
import { useAppDispatch } from "@/utils/store/appStore";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useGetAllUrls = () => {
  const dispatch = useAppDispatch();

  const getAllUrls = async () => {
    const endpoint = BASE_URL + "/all";
    try {
      const response = await axios.get(endpoint);
      dispatch(setAllUrls(response.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  return getAllUrls;
};
