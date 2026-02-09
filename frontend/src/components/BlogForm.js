//import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { useField } from "../hooks/index";
import { TextField, Button } from "@mui/material";
import { initializeUsers } from "../reducers/userReducer";
import userService from "../services/users";

const BlogForm = () => {
  const dispatch = useDispatch();
  const { reset: resetTitle, ...title } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetUrl, ...url } = useField("text");
  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };

    resetTitle();
    resetAuthor();
    resetUrl();

    dispatch(createBlog(newBlog));
    /*    const users = await userService.getAll();
    console.log(users); */
  };

  return (
    <div className="blog-form">
      <h2>Create new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <TextField label="title" {...title} />
        </div>
        <div>
          <TextField label="author" {...author} />
        </div>
        <div>
          <TextField label="url" {...url} />
        </div>
        <Button
          id="create-blog-btn"
          className="create-blog"
          variant="contained"
          color="primary"
          size="small"
          type="submit"
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
