/* const listHelper = require('../utils/list_helper') */
/* test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
}) */

const listHelper = require("../utils/list_helper");
const blogHelper = require("./blog_posts_helper");

describe("total likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.totalLikes(blogHelper.zeroBlogs);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(blogHelper.listWithOneBlog);
    expect(result).toBe(5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(blogHelper.blogs);
    expect(result).toBe(36);
  });
});

describe("favoriteBlog", () => {
  test("of empty list is zero", () => {
    const result = listHelper.favoriteBlog(blogHelper.zeroBlogs);
    expect(result).toEqual(null);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.favoriteBlog(blogHelper.listWithOneBlog);
    expect(result).toEqual({
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.favoriteBlog(blogHelper.blogs);
    expect(result).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });
});

describe("author(s) with most blogs", () => {
  test("of empty list is zero", () => {
    const result = listHelper.authorWithMostBlogs(blogHelper.zeroBlogs);
    expect(result).toEqual(null);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.authorWithMostBlogs(blogHelper.listWithOneBlog);
    expect(result).toEqual({
      author: ["Edsger W. Dijkstra"],
      blogs: 1,
    });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.authorWithMostBlogs(blogHelper.blogs);
    expect(result).toEqual({
      author: ["Robert C. Martin"],
      blogs: 3,
    });
  });
  test("the max number of blogs authored is the same among multiple authors", () => {
    const result = listHelper.authorWithMostBlogs(
      blogHelper.multipleAuthorsWithMaxBlogs
    );
    expect(result).toEqual({
      authors: ["Edsger W. Dijkstra", "Robert C. Martin"],
      blogs: 3,
    });
  });
});

describe("blog with most likes", () => {
  test("of empty list is zero", () => {
    const result = listHelper.mostLikes(blogHelper.zeroBlogs);
    expect(result).toEqual(null);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.mostLikes(blogHelper.listWithOneBlog);
    expect(result).toEqual({
      author: ["Edsger W. Dijkstra"],
      likes: 5,
    });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostLikes(blogHelper.blogs);
    expect(result).toEqual({
      author: ["Edsger W. Dijkstra"],
      likes: 12,
    });
  });
  test("if authors share most likes", () => {
    const result = listHelper.mostLikes(blogHelper.authorsShareMostLikes);
    expect(result).toEqual({
      authors: ["Edsger W. Dijkstra", "Robert C. Martin"],
      likes: 12,
    });
  });
  test("if an author or authors have more than one blog that has max likes and more than one author has most likes", () => {
    const result = listHelper.mostLikes(
      blogHelper.edgeCaseOfAuthorWithMultipleBlogsWithMostLikes
    );
    expect(result).toEqual({
      authors: ["Edsger W. Dijkstra", "Robert C. Martin"],
      likes: 12,
    });
  });
});
