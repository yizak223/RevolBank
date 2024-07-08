// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for the modal state
const modalSlice = createSlice({
  name: 'modal',
  initialState: { modalAcount: false },
  reducers: {
    setModalAcount(state, action) {
      state.modalAcount = action.payload;
    }
  }
});

export const { setModalAcount } = modalSlice.actions;

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer
  }
});

export default store;
