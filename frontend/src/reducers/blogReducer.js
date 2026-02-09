import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      const { id } = updatedBlog;
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    },
    removeBlog(state, action) {
      const removedBlog = action.payload;
      return state.filter((blog) => blog.id !== removedBlog);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog);
      dispatch(appendBlog(newBlog));
      dispatch(setNotification(`${blog.title} by ${blog.author} added`, 5));
    } catch (error) {
      dispatch(
        setNotification(
          `error ${error.response?.data?.error || error.message}`,
          5,
        ),
      );
    }
  };
};

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    try {
      const likedBlog = await blogService.likeBlog(id, blog);
      dispatch(updateBlog(likedBlog));
      dispatch(setNotification(`${blog.title} liked!`, 5));
    } catch (error) {
      dispatch(
        setNotification(
          `error ${error.response?.data?.error || error.message}`,
          5,
        ),
      );
    }
  };
};

export const createComment = (id, blog) => {
  return async (dispatch) => {
    try {
      const comment = blog.value;
      const commentedBlog = await blogService.addComment(id, comment);
      dispatch(updateBlog(commentedBlog));
      dispatch(setNotification(`comment added!`, 5));
    } catch (error) {
      dispatch(
        setNotification(
          `error ${error.response?.data?.error || error.message}`,
          5,
        ),
      );
    }
  };
};

export const likeComment = (blogId, commentId) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.likeComment(blogId, commentId);
      dispatch(updateBlog(updatedBlog));
    } catch (error) {
      dispatch(
        setNotification(
          `error ${error.response?.data?.error || error.message}`,
          5,
        ),
      );
    }
  };
};

export const editBlog = (id, blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(id, blog);
      dispatch(updateBlog(updatedBlog));
      dispatch(setNotification(`${blog.title} updated!`, 5));
    } catch (error) {
      dispatch(
        setNotification(
          `error ${error.response?.data?.error || error.message}`,
          5,
        ),
      );
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      dispatch(removeBlog(blog.id));
      dispatch(setNotification(`${blog.title} deleted!`, 5));
    } catch (error) {
      dispatch(
        setNotification(
          `error ${error.response?.data?.error || error.message}`,
          5,
        ),
      );
    }
  };
};

export const { appendBlog, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
