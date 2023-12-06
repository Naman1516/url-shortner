import { configureStore } from "@reduxjs/toolkit";
import urlReducer from "@/utils/store/urlSlice";
import globalReducer from "@/utils/store/globalSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

export const appStore = configureStore({
  reducer: {
    url: urlReducer,
    global: globalReducer,
  },
});

export const useAppDispatch: () => typeof appStore.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof appStore.getState>
> = useSelector;
