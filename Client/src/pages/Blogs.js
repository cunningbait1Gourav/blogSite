import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import classes from "../css/Blogs.module.css";
import Loading from "../components/Loading";
const Blogs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllBlogs = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <div className={classes.blogSection}>
          {blogs &&
            blogs.map((blog) => (
              <BlogCard
                id={blog?._id}
                isUser={localStorage.getItem("userId") === blog?.user?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                time={blog.createdAt}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default Blogs;
