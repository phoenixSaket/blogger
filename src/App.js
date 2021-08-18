import "./App.css";
import "./Components/ScrollBar.css";
import "./Components/CreateAccount.css";
import "./Components/Login.css";
import React, { useState } from "react";
import axios from "axios";
import Homepage from "./Components/Homepage";
function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  const [userDataName, setUserDataName] = useState("");
  const [userDataUserName, setUserDataUserName] = useState("");
  const [userDataEmail, setUserDataEmail] = useState("");
  const [userDataPassword, setUserDataPassword] = useState("");

  const [id, setId] = useState(0);

  function submitLogin() {
    console.log({ user: user, pass: password });

    axios
      .post("http://localhost:8000/api/login", {
        user: { username: user, password: password },
      })
      .then((response) => {
        console.log("Login Response", response);
        setId(response.data.id);
        if (response.status === 200) setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
      });
  }

  function toggleCreateAccount() {
    setIsCreateAccount(!isCreateAccount);
    setUserDataName("");
    setUserDataUserName("");
    setUserDataEmail("");
    setUserDataPassword("");
  }

  function submitCreateAccount() {
    console.log({
      name: userDataName,
      userName: userDataUserName,
      email: userDataEmail,
      password: userDataPassword,
    });

    let email = document.getElementById("userEmail");
    let isValid = false;

    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(userDataEmail)) {
      isValid = true;
      email.classList.remove("invalid");
    } else {
      isValid = false;
      email.classList.add("invalid");
    }

    let errors = 0;

    if (isValid) {
      axios
        .post("http://localhost:8000/api/addUser/", {
          user: {
            name: userDataName,
            username: userDataUserName,
            email: userDataEmail,
            password: userDataPassword,
            isOnline: 1,
            lastLoggedOut: null,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          errors = errors + 1;
          console.log(error);
        });

      if (errors === 0) {
        axios
          .get("http://localhost/api/getMaxID")
          .then((response) => {
            console.log(id);
            setId(response.data.id);
          })
          .catch((error) => {
            errors = errors + 1;
            console.log("Error : ", error);
          });
      }
    }

    if (errors === 0) {
      setIsCreateAccount(false);
      setIsLoggedIn(true);
    }
  }

  return (
    <div className="App">
      {!isLoggedIn && !isCreateAccount && (
        <div className="login-container">
          <div className="input-container">
            <legend className="legend">Username</legend>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="input"
            ></input>
          </div>

          <div className="input-container">
            <legend className="legend">Password</legend>
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
            <button
              className="btn-primary"
              onClick={() => toggleCreateAccount()}
            >
              Create Account
            </button>
          </div>
        </div>
      )}
      {!isLoggedIn && isCreateAccount && (
        <div className="create-account-container">
          <div className="title">Create Account</div>
          <div className="input-container">
            <legend className="legend">Name</legend>
            <input
              type="text"
              value={userDataName}
              onChange={(e) => setUserDataName(e.target.value)}
              className="input"
            ></input>
          </div>
          <div className="input-container">
            <legend className="legend">Username</legend>
            <input
              type="text"
              value={userDataUserName}
              onChange={(e) => setUserDataUserName(e.target.value)}
              className="input"
            ></input>
          </div>
          <div className="input-container">
            <legend className="legend">Email</legend>
            <input
              id="userEmail"
              type="email"
              value={userDataEmail}
              onChange={(e) => setUserDataEmail(e.target.value)}
              className="input"
            ></input>
          </div>
          <div className="input-container">
            <legend className="legend">Password</legend>
            <input
              type="password"
              value={userDataPassword}
              onChange={(e) => setUserDataPassword(e.target.value)}
              className="input"
            ></input>
          </div>
          <div className="button-container">
            <button
              className="btn-primary"
              onClick={() => {
                submitCreateAccount();
              }}
            >
              Create Account
            </button>
            <button
              className="btn-primary"
              onClick={() => toggleCreateAccount()}
            >
              Back
            </button>
          </div>
        </div>
      )}
      {isLoggedIn && !isCreateAccount && <Homepage id={id} />}
    </div>
  );
}

export default App;
