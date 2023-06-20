/* const dummy = (blogs) => {
  return 1
} */

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.map((blog) => {
    //console.log(blog.likes)
    sum += blog.likes;
    // console.log(sum)
  });
  return sum;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let max = 0;
  let maxIndex = 0;
  blogs.map((blog, i) => {
    if (blog.likes > max) {
      max = blog.likes;
      maxIndex = i;
    }
  });
  let mostLikes = blogs[maxIndex];
  return mostLikes;
};
const authorWithMostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let authors = [];

  blogs.map((blog, i) => {
    /*Prevents duplicates of author names and .some stops as soon as we determine the array already has author name */
    if (!authors.some((a) => a.author === blog.author)) {
      authors = [...authors, { author: blog.author, blogs: 0 }];
    }
  });
  //increments blog count for authors
  blogs.map((blog, i) => {
    authors.find((author, i) => {
      if (author.author === blog.author) {
        authors[i].blogs++;
      }
    });
  });
  // console.log(authors)

  //Alternative way to calculate max, but does not consider multiple authors with same number of blogs
  /*  const max = blogs.reduce((prev, current) => (prev.blogs > current.blogs) ? prev : current).author */
  /* const numOfBlogs = authors.find(author => author.author === max).blogs */
  //console.log(numOfBlogs)

  const max1 = Math.max(...authors.map((o) => o.blogs));
  //console.log(max1)
  let allMax = authors.filter((author) => author.blogs === max1);

  let names = allMax.map((author) => author.author);
  //console.log(names)
  let authorsWithMostBlogs;
  let authorWithMostBlogs;
  //Note the below changes what the tests should check for
  // i.e authors vs author as key name in isEqualTo
  if (names.length > 1) {
    authorsWithMostBlogs = {
      authors: names,
      blogs: max1,
    };
    return authorsWithMostBlogs;
  } else {
    authorWithMostBlogs = {
      author: names,
      blogs: max1,
    };
    return authorWithMostBlogs;
  }

  // console.log(author)
  // return authors
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  let most = 0;
  blogs.map((blog, i) => {
    if (blog.likes > most) {
      //console.log(blog.likes)
      most = blog.likes;
    }
  });
  let maxLikes = blogs.filter((blog) => blog.likes === most);
  let uniqueNames = [];
  maxLikes.map((blog) => {
    if (!uniqueNames.includes(blog.author)) {
      /* console.log(blog.author) */
      uniqueNames.push(blog.author);
    }
  });
  console.log(uniqueNames);
  //let names = uniqueNames.map(blog => blog.author)
  //console.log(names)

  let authorsWithMostLikes;
  let authorWithMostLikes;

  if (uniqueNames.length > 1) {
    authorsWithMostLikes = {
      authors: uniqueNames,
      likes: most,
    };
    return authorsWithMostLikes;
  } else {
    authorWithMostLikes = {
      author: uniqueNames,
      likes: most,
    };
    return authorWithMostLikes;
  }

  // return most
};
module.exports = {
  totalLikes,
  favoriteBlog,
  authorWithMostBlogs,
  mostLikes,
};
