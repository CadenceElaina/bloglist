import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog, editBlog } from "../reducers/blogReducer";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "./Comments";
import { Button, TextField } from "@mui/material";

const Blog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  );
  const user = useSelector((state) => state.login);

  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editUrl, setEditUrl] = useState("");

  if (!blog) return null;

  const handleLike = () => {
    const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    dispatch(likeBlog(blog.id, likedBlog));
  };

  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
      navigate("/blogs");
    }
  };

  const startEditing = () => {
    setEditTitle(blog.title);
    setEditAuthor(blog.author);
    setEditUrl(blog.url);
    setEditing(true);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    dispatch(
      editBlog(blog.id, {
        title: editTitle,
        author: editAuthor,
        url: editUrl,
        likes: blog.likes,
      }),
    );
    setEditing(false);
  };

  const isOwner = user && blog.user && user.username === blog.user.username;

  return (
    <div className="blog">
      {editing ? (
        <div className="blog-details">
          <h2>Edit blog</h2>
          <form onSubmit={handleEdit}>
            <div>
              <TextField
                label="title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                size="small"
              />
            </div>
            <div>
              <TextField
                label="author"
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
                size="small"
              />
            </div>
            <div>
              <TextField
                label="url"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                size="small"
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              type="submit"
            >
              save
            </Button>{" "}
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={() => setEditing(false)}
            >
              cancel
            </Button>
          </form>
        </div>
      ) : (
        <>
          <h2 className="blog-title">
            <span className="title">{blog.title} - </span>
            <span className="author">{blog.author}</span>
          </h2>
          <div className="blog-details">
            <div>
              Url:{" "}
              <a href={`${blog.url}`} target="_blank" rel="noreferrer">
                {blog.url}
              </a>
            </div>
            Likes: <span className="blog-likes">{blog.likes}</span>{" "}
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleLike}
              className="like-button"
            >
              like
            </Button>{" "}
            {isOwner && (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={startEditing}
                >
                  edit
                </Button>{" "}
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={handleDelete}
                >
                  delete
                </Button>
              </>
            )}
            {blog.createdAt && (
              <div
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.85rem",
                  opacity: 0.7,
                }}
              >
                posted {new Date(blog.createdAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </>
      )}
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;
