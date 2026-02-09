import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    hideNotification(state, action) {
      return null;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (message, time) => {
  return async (dispatch) => {
    window.clearTimeout(window.timeout);
    dispatch(showNotification(message));
    window.timeout = setTimeout(
      () => dispatch(hideNotification()),
      time * 1000,
    );
  };
};

export default notificationSlice.reducer;
