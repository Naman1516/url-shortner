import { AllUrls } from "@/interfaces/allUrls";
import { UrlObject } from "@/interfaces/urlObject";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AllUrls = {
  allUrls: [],
};

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    setAllUrls: (state, action: PayloadAction<Array<UrlObject>>) => {
      state.allUrls = action.payload;
    },
  },
});

export const { setAllUrls } = urlSlice.actions;

export default urlSlice.reducer;
