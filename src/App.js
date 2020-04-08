import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactGA from 'react-ga';

import "./css/helper.css";
import "./css/style.css";

import UserInput from "./components/UserInput";

const TRACKING_CODE=process?.env?.REACT_APP_TRACKING_CODE

const initializeReactGA = () => {
  ReactGA.initialize(TRACKING_CODE);
  ReactGA.pageview('/');
}

function App(props) {
  initializeReactGA();
console.log("herehr", TRACKING_CODE, initializeReactGA())
  return (
    <div className="main bg-color-third">
      <div className="container">
        <h1 className="text-center text-uppercase py-4 main-heading">
          Public Transports
        </h1>
        <UserInput {...props} />
      </div>
    </div>
  );
}

export default App;
