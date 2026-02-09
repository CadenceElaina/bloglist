import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import loginReducer from "./reducers/loginReducer";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
    users: userReducer,
    login: loginReducer,
  },
});

export default store;
