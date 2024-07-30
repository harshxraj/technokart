import { Button, Dialog, DialogPanel, DialogTitle, Field, Input, Textarea, Switch } from "@headlessui/react";
import clsx from "clsx";
import { useContext, useState } from "react";
import BlogContext from "../context/BlogContext";
import toast, { Toaster } from "react-hot-toast";

const HomePage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { blogs, setBlogs } = useContext(BlogContext);
  //   console.log(blogs);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  async function handleSubmit() {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem("token");
    console.log(token);

    if (!title) {
      toast.error("Add Blog Title");
    }

    if (!content) {
      toast.error("Add Some content to blog");
    }

    try {
      const response = await fetch("http://localhost:9000/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the headers
        },
        body: JSON.stringify({
          title,
          content,
          draft: !enabled, // If enabled is true, it's published; otherwise, it's a draft
        }),
      });

      if (response.ok) {
        // Parse the JSON response to get the new blog post
        const newBlog = await response.json();
        console.log("Blog post submitted successfully:", newBlog);

        // Add the new blog post to the blogs state
        setBlogs((prevBlogs) => [...prevBlogs, newBlog]);

        // Close the dialog
        close();
        toast.success("Blog added successfully!");
      } else {
        const errorText = await response.text();
        console.error("Failed to submit blog post:", errorText);
      }
    } catch (error) {
      console.error("Failed to submit blog post:", error);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-semibold">BLOGS</h1>
      <Toaster />
      <Button
        onClick={open}
        className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Write a blog
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium text-white">
                Write a new blog here!
              </DialogTitle>
              <Field>
                <label className="text-sm/6 font-medium text-white">Blog Title</label>
                <Input
                  className={clsx(
                    "mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Field>

              <Field>
                <label className="text-sm/6 font-medium text-white">Content</label>
                <Textarea
                  className={clsx(
                    "mt-3 block w-full resize-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Field>
              <div className="flex items-center mt-4 justify-end">
                <label className="text-sm/6 font-medium text-white mr-3">
                  {enabled ? "Draft" : "Publish"}
                </label>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
                  />
                </Switch>
              </div>

              <div className="mt-4 flex justify-center">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleSubmit}
                >
                  {enabled ? "Publish now" : "Save to drafts"}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <div className="grid grid-cols-2 gap-3">
        {blogs.map((blog) => (
          <div className="text-white border border-white/20 p-4 rounded-md bg-white/5">
            <p className="text-white">
              <span className="text-xl mr-1 text-slate-300">Title:</span> {blog?.title}
            </p>
            <p className="text-white line-clamp-3">
              <span className="text-xl mr-1 text-slate-300">Content:</span>
              {blog?.content}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
