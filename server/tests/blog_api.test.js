const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config");
const helper = require("./blog_posts_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.blogs);
}, 100000);

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("verify that the unique identifier property of blog posts is named id", async () => {
    const response = await api.get("/api/blogs");

    const ids = response.body.map((blog) => blog.id);

    for (const id of ids) {
      expect(id).toBeDefined();
    }
  });
});

describe("addition of a new blog", () => {
  let token = null;
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("12345", 10);
    const user = await new User({ username: "name", passwordHash }).save();

    const userForToken = { username: "name", id: user.id };
    return (token = jwt.sign(userForToken, config.SECRET));
  });

  test("verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post.", async () => {
    const newBlog = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain("React patterns");
  });

  test("verfies that if the likes property is missing from the request, it will default to the value of 0.", async () => {
    const newBlog = {
      title: "missing likes property",
      author: "yes",
      url: "https://climate.nasa.gov/",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1);
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
  });

  test("verfies that if the title property is missing from the request data, the backend responds to the request with the status code 400 Bad Request.", async () => {
    const newBlog = {
      author: "yes",
      likes: Infinity,
      url: "https://climate.nasa.gov/",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
  test("verfies that if the url property is missing from the request data, the backend responds to the request with the status code 400 Bad Request.", async () => {
    const newBlog = {
      title: "missing url :(",
      author: "yes",
      likes: 0,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
});

describe("deletion of a blog", () => {
  let token = null;
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("12345", 10);
    const user = await new User({ username: "name", passwordHash }).save();

    const userForToken = { username: "name", id: user.id };
    token = jwt.sign(userForToken, config.SECRET);

    const newBlog = {
      title: "some blog",
      author: "some author",
      url: "https://www.example.com",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    return token;
  });
  test("succeds with status code 204 if id is valid", async () => {
    //const blogsAtStart = await helper.blogsInDb()
    const blogsAtStart = await Blog.find({}).populate("user");
    const blogsToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogsToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    //const blogsAtEnd = await helper.blogsInDb()
    const blogsAtEnd = await Blog.find({}).populate("user");
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).not.toContain(blogsToDelete.title);
  });
});

describe("updating a blog post", () => {
  test("succeeds with 200 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogsToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogsToUpdate.id}`)
      .send({ likes: 10 })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd[0];

    expect(blogsAtEnd).toHaveLength(helper.blogs.length);
    expect(updatedBlog.likes).toBe(10);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
