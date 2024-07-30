const Blog = require("../models/blog.model");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "published" });
    return res.status(200).json({ blogs });
  } catch (err) {
    console.log(err);
  }
};

const createBlogPost = async (req, res) => {
  try {
    const { title, content, draft } = req.body;
    const userId = req.user;
    console.log(userId);

    const blogPost = new Blog({ title, content, status: draft ? "draft" : "published", author: userId });
    await blogPost.save();
    res.status(201).send(blogPost);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { createBlogPost, getAllBlogs };
