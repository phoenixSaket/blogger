import './App.css';
import React from "react";
import Login from "./Components/Login";

function App() {
  let isLogin = false;
  return (
    <div className="App">
      {!isLogin && <Login />}
    </div>  
  );
}

export default App;
