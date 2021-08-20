import "./Homepage.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateBlog from "./CreateBlog";
import Blog from "./Blog";

function Homepage(props) {
  const id = props.id;
  const [userData, setUserData] = useState({});
  const [isCreateActive, setIsCreateActive] = useState(false);
  const [maxBlogs, setMaxBlogs] = useState(0);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getMaxBlogs();
  }, [id]);

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/getUser", { id: id })
      .then((response) => {
        console.log(response);
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/getBlogs", { id: id })
      .then((response) => {
        console.log(response);
        setBlogs(response.data.blogs);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [maxBlogs, id]);

  function getMaxBlogs() {
    axios
      .get("http://localhost:8000/api/getMaxBlogs")
      .then((response) => {
        console.log(response);
        setMaxBlogs(response.data.Message);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="home-container">
      <div className="title">Welcome {userData.name}</div>
      {isCreateActive && (
        <CreateBlog href="/create" id={id} userData={userData}></CreateBlog>
      )}
      <div className="blogs-container">
        {blogs.map((blog) => (
          <Blog blog={blog} />
        ))}
      </div>
      <div className="button-container">
        <button
          className={
            isCreateActive
              ? "btn-create fixed-right-buttom red-bg"
              : " btn-create fixed-right-buttom green-bg"
          }
          onClick={() => {
            setIsCreateActive(!isCreateActive);
          }}
        >
          {!isCreateActive ? <span>Create Blog</span> : <span>Close</span>}
        </button>
      </div>
    </div>
  );
}

export default Homepage;
