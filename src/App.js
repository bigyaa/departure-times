import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./css/helper.css";
import "./css/style.css";

import UserInput from "./components/UserInput";

function App(props) {
  return (
    <div className="bg-color-third" style={{ height: window.innerHeight }}>
      <div className="container">
        <h1 className="text-center text-uppercase py-5 main-heading">
          Public Transports
        </h1>
        <UserInput {...props} />
      </div>
    </div>
  );
}

export default App;
