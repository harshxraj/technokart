import { createContext, useState, useEffect, ReactNode } from "react";

type Blog = {
  _id: string;
  title: string;
  content: string;
  status: string;
  author: string;
  createdAt: string;
  updatedAt: string;
};

type BlogContextType = {
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  fetchBlogs: () => void;
  addBlog: (blog: Blog) => void;
};

const BlogContext = createContext<BlogContextType>({
  blogs: [],
  setBlogs: () => {},
  fetchBlogs: () => {},
  addBlog: () => {},
});

type BlogProviderProps = {
  children: ReactNode;
};

export const BlogProvider = ({ children }: BlogProviderProps) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:9000/blog");
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.blogs);
      } else {
        console.error("Failed to fetch blogs.");
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  const addBlog = async (blog: Blog) => {
    try {
      const response = await fetch("http://localhost:9000/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(blog),
      });

      if (response.ok) {
        const newBlog = await response.json();
        setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
      } else {
        console.error("Failed to add blog.");
      }
    } catch (error) {
      console.error("Failed to add blog:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, fetchBlogs, addBlog }}>{children}</BlogContext.Provider>
  );
};

export default BlogContext;
