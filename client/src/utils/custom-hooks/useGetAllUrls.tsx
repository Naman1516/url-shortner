import { API_BASE_URL } from "@/utils/constants/constants";
import axios from "axios";
import { setAllUrls } from "@/utils/store/urlSlice";
import { useAppDispatch } from "@/utils/store/appStore";

export const useGetAllUrls = () => {
  const dispatch = useAppDispatch();

  const getAllUrls = async () => {
    const endpoint = API_BASE_URL + "/all";
    try {
      const response = await axios.get(endpoint);

      dispatch(setAllUrls(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  return getAllUrls;
};
