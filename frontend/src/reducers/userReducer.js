import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";
import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    replaceUser(state, action) {
      const updated = action.payload;
      return state.map((u) => (u.id !== updated.id ? u : updated));
    },
  },
});

export const { setUsers, replaceUser } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const updateUserProfile = (id, data) => {
  return async (dispatch) => {
    try {
      const updatedUser = await userService.update(id, data);
      dispatch(replaceUser(updatedUser));
      dispatch(setNotification("profile updated!", 5));
    } catch (error) {
      dispatch(setNotification(`error ${error}`, 5));
    }
  };
};

export default userSlice.reducer;
