import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactGA from "react-ga";

import "./css/helper.css";
import "./css/style.css";
import TRAIN from "./assets/images/train.svg";

import UserInput from "./components/UserInput";

const TRACKING_CODE = process?.env?.REACT_APP_TRACKING_CODE;

const initializeReactGA = () => {
	ReactGA.initialize(TRACKING_CODE);
	ReactGA.pageview("/");
};

function App(props) {
	initializeReactGA();

	return (
		<div className="main bg-color-third">
			<div className="container">
				<div className="text-center py-2">
					<img src={TRAIN} title="Transport" alt="Train" id="logo"></img>
					<h1 className="text-uppercase main-heading">Public Transports</h1>
				</div>
				<UserInput {...props} />
			</div>
		</div>
	);
}

export default App;
