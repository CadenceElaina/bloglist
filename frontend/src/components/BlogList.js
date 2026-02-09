import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "../reducers/blogReducer";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

const BlogList = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = useRef();

  const filtered = [...blogs]
    .filter(
      (blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase()) ||
        blog.author.toLowerCase().includes(filter.toLowerCase()),
    )
    .sort((a, b) => b.likes - a.likes);

  return (
    <div className="blogs">
      <div id="new-blog-btn">
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm />
        </Togglable>
      </div>
      <TextField
        label="search blogs"
        size="small"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ my: 1 }}
      />
      <TableContainer id="bloglist" component={Paper}>
        <Table>
          <TableBody>
            {filtered.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} - {blog.author}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogList;
