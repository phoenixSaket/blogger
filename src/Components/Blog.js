import React from "react";
import "./Blog.css";

function Blog(props) {
  const blog = props.blog;
  return (
    <div className="d-flex">
      {blog.title && (
        <div className="blog" key={blog.id}>
          <div className="title">{blog.title}</div>
          <div className="subtitle">{blog.subtitle}</div>
          <div
            className="display-blog"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>
          <div className="like-date">
            <div className="likes">{blog.likes}&nbsp;Likes</div>
            <div className="date">{blog.date}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
