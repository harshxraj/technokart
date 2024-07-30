const express = require("express");
const Blog = require("../models/blog.model");
const { createBlogPost, getAllBlogs } = require("../controllers/blog.controller");
const { Auth } = require("../middlewares/auth.middleware");
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/", Auth, createBlogPost);

module.exports = blogRouter;
