import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import classes from "../css/UserBlogs.module.css";
import Loading from "../components/Loading";
const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [user,setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //get user blogs
  const getUserBlogs = async () => {
    setIsLoading(true);
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
        setUser(data?.userBlog);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs)
  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && (
        <div className={classes.myBlogs}>
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                id={blog._id}
                isUser={true}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                username={user.username}
                time={blog.createdAt}
              />
            ))
          ) : (
            <h1>You Haven't Created a Blog</h1>
          )}
        </div>
      )}
    </>
  );
};

export default UserBlogs;
