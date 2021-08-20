import React, { useState } from "react";
import axios from "axios";
import "./CreateBlog.css";

function CreateBlog(props) {
  const id = props.id;
  //   const [userData, setUserData] = useState({});
  const userData = props.userData;
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSubTitle, setBlogSubTitle] = useState("");
  const [data, setData] = useState("");
  const [blogImages, setImages] = useState([]);
  const [toggle, setToggle] = useState("/toggle_off.png");
  const imageLocation = "http://127.0.0.1:8080/";

  function styleClicked(style) {
    let content = document.getElementById("content");

    let selection = "";
    let string = "";

    let key = "";

    switch (style) {
      case "bold":
        key = "b";
        break;
      case "italic":
        key = "i";
        break;
      case "underline":
        key = "u";
        break;
      default:
        break;
    }

    if (
      content.value.substring(
        content.selectionStart - 3,
        content.selectionStart
      ) ===
        "<" + key + ">" &&
      content.value.substring(
        content.selectionEnd,
        content.selectionEnd + 4
      ) ===
        "</" + key + ">"
    ) {
      string =
        content.value.substring(0, content.selectionStart - 3) +
        "" +
        content.value.substring(content.selectionStart, content.selectionEnd) +
        "" +
        content.value.substring(content.selectionEnd + 4, content.value.length);
      setData(string);
    } else {
      selection =
        "<" +
        key +
        ">" +
        content.value.substring(content.selectionStart, content.selectionEnd) +
        "</" +
        key +
        ">";

      string =
        content.value.substring(0, content.selectionStart) +
        selection +
        content.value.substring(content.selectionEnd, content.value.length);
      setData(string);
    }

    document.getElementById("content").value = string;
  }

  function selctionChange() {
    let content = document.getElementById("content");
    let key = ["b", "i", "u"];

    key.forEach((element) => {
      if (
        content.value.substring(
          content.selectionStart - 3,
          content.selectionStart
        ) ===
          "<" + element + ">" &&
        content.value.substring(
          content.selectionEnd,
          content.selectionEnd + 4
        ) ===
          "</" + element + ">"
      ) {
        document.getElementById(element).classList.add("active");
      } else {
        document.getElementById(element).classList.remove("active");
      }
    });
  }

  function uploadImage(e) {
    console.log("Files ", e.target.files);
    const formData = new FormData();
    // const imagefile = e;
    formData.append("image", e.target.files[0]);
    axios
      .post("http://localhost:8000/api/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        let img = blogImages;
        img.push(response.data.filename);
        setImages(img);
        console.log(response);
        let string = data;
        string =
          string +
          "<img src='" +
          imageLocation +
          response.data.filename +
          "' alt='" +
          response.data.filename +
          "' class='image'>";

        let content = document.getElementById("content");

        let text = content.value;
        text = string;

        document.getElementById("content").value = text;

        setData(text);
      })
      .catch((error) => console.log(error));
  }

  function submitData() {
    const title = blogTitle;
    const subtitle = blogSubTitle;
    const content = document.getElementById("content").value;
    const userId = id;
    const images = blogImages;
    const isPrivate = toggle === "/toggle_off.png" ? 0 : 1;
    const dateObject = new Date();
    const date =
      dateObject.getDate() +
      "/" +
      (dateObject.getMonth() + 1) +
      "/" +
      dateObject.getFullYear();
    const likes = 0;

    const data = {
      title: title,
      subtitle: subtitle,
      content: content,
      userId: userId,
      images: images,
      isPrivate: isPrivate,
      date: date,
      likes: likes,
    };

    console.log(data);

    axios
      .post("http://localhost:8000/api/addBlog", { data: data })
      .then((response) => {
        console.log(response);
        setBlogTitle("");
        setBlogSubTitle("");
        document.getElementById("content").value = "";
        setData("");
        setToggle("/toggle_off.png");
        setImages([]);

      })
      .catch((err) => console.log(err));
  }

  

  return (
    <div className="add-blog-container">
      <div className="title-add-blog">
        Start writing a blog, {userData.name}
      </div>
      <div className="content-add-blog">
        <div className="blog-entry">
          <div className="input-blog-container">
            <input
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              className="input-blog"
              placeholder="Title"
            ></input>
            <input
              type="text"
              value={blogSubTitle}
              onChange={(e) => setBlogSubTitle(e.target.value)}
              className="input-blog"
              placeholder="Subtitle"
            ></input>
          </div>
          <textarea
            id="content"
            className="content"
            placeholder="Start writing here"
            rows="15"
            onSelect={() => selctionChange()}
            onChange={(e) => {
              setData(e.target.value);
            }}
          ></textarea>
        </div>

        <div className="display">
          <div className="display-title">{blogTitle}</div>
          <div className="display-subtitle">{blogSubTitle}</div>
          <pre>
            <span dangerouslySetInnerHTML={{ __html: data }} />
          </pre>
        </div>
      </div>
      <div className="content-controls">
        <span id="b" onClick={() => styleClicked("bold")}>
          B
        </span>
        <span id="i" onClick={() => styleClicked("italic")}>
          <i>I</i>
        </span>
        <span id="u" onClick={() => styleClicked("underline")}>
          <u>U</u>
        </span>

        <div
          className={
            toggle === "/toggle_off.png"
              ? "toggle-container red"
              : "toggle-container green"
          }
        >
          Private&nbsp;&nbsp;&nbsp;
          <img
            className="togglers"
            src={process.env.PUBLIC_URL + toggle}
            alt="toggle"
            onClick={() => {
              setToggle(
                toggle === "/toggle_off.png"
                  ? "/toggle_on.png"
                  : "/toggle_off.png"
              );
            }}
          />
        </div>
        <div>
          <input
            type="file"
            id="img"
            accept="image/*"
            onChange={(e) => {
              uploadImage(e);
            }}
          />
        </div>
        <div>
          <button
            className="btn"
            onClick={() => {
              submitData();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
