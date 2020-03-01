import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import UserInput from "./components/UserInput";
import GoogleMap from "./components/GoogleMap";

function App(props) {
    return (
    <div>
      <div className='container'>
        <h1> Departure Times</h1>
        <UserInput {...props} />
        {/* <GoogleMap {...props} /> */}
      </div>
    </div>
  );
}

export default App;
