import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalState: {
    isVisible: false,
    type: "login",
  },
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setModalState: (state, action) => {
      state.modalState = action.payload;
    },
    closeModal: (state) => {
      state.modalState.isVisible = false;
    },
  },
});

export const { setModalState, closeModal } = globalSlice.actions;

export default globalSlice.reducer;
