import "./Login.css";
import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function submitLogin() {
    console.log({ user: user, pass: password });

    axios
      .post("http://localhost:8000/api/login", {
        user: { username: user, password: password },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="login-container">
      <div className="input-container">
        <div className="legend">Username</div>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="input"
        ></input>
      </div>

      <div className="input-container">
        <div className="legend">Password</div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        ></input>
      </div>

      <div className="button-container">
        <button className="btn-primary" onClick={() => submitLogin()}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
