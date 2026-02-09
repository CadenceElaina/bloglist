const config = require("../utils/config");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;
  const token = request.token;

  const decodedToken = jwt.verify(token, config.SECRET);
  if (!(token && decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  await savedBlog.populate("user", { username: 1, name: 1 });
  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const { comment } = request.body;
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).end();
  }

  blog.comments.push({ text: comment });

  const updatedBlog = await blog.save();
  await updatedBlog.populate("user", { username: 1, name: 1 });
  response.status(200).json(updatedBlog.toJSON());
});

blogsRouter.put("/:id/comments/:commentId/like", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).end();
  }

  const comment = blog.comments.id(request.params.commentId);
  if (!comment) {
    return response.status(404).end();
  }

  comment.likes += 1;
  const updatedBlog = await blog.save();
  await updatedBlog.populate("user", { username: 1, name: 1 });
  response.status(200).json(updatedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!(token && decodedToken.id)) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const id = request.params.id;
  const blog = await Blog.findById(id);

  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.deleteOne({ _id: id });
    response.sendStatus(204);
  } else {
    response.status(401).json({ error: "unauthorized operation" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate("user", { username: 1, name: 1 });

  updatedBlog ? response.json(updatedBlog) : response.status(404).end();
});

module.exports = blogsRouter;
