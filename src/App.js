import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import UserInput from "./components/UserInput";
import GoogleMap from "./components/GoogleMap";

function App(props) {
    return (
    <div>
      <div className='container'>
        <h1 className='text-center text-uppercase text-dark my-5'><b>Public Transports</b></h1>
        <UserInput {...props} />
      </div>
    </div>
  );
}

export default App;
