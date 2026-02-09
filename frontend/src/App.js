import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { Container } from "@mui/material";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import Navbar from "./components/Navbar";
import Togglable from "./components/Togglable";

import { loggedUser } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loggedUser());
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
  }, [dispatch]);

  const user = useSelector((state) => state.login);

  return (
    <Container>
      <div>
        <h1 className="header-title">Blogs</h1>
        <Notification />
        {user === null ? (
          <div>
            <Togglable buttonLabel="login">
              <LoginForm />
            </Togglable>
            <Togglable buttonLabel="sign up">
              <SignupForm />
            </Togglable>
          </div>
        ) : (
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/blogs" element={<BlogList />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
            </Routes>
          </div>
        )}
      </div>
    </Container>
  );
};

export default App;
