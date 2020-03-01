import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import {MAP_API} from '../constants';

function GoogleMap(props) {
  const [position, setPosition] = useState({ lat: 27, lng: 85 });
  console.log("PROPS", props);
  const setLocation = () =>
    navigator?.geolocation?.getCurrentPosition(success => {
      console.log("SUCCESSS", success);
      setPosition({
        lat: parseFloat(success?.coords?.latitude),
        lng: parseFloat(success?.coords?.longitude)
      });
    });

  const mapStyles = {
    width: "100%",
    height: "100%"
  };

  useEffect(setLocation, []);

  return (
    <div>
      {console.log("POSITION", position)}
      {position && (
        <Map
          google={props.google}
          zoom={13}
          style={mapStyles}
          initialCenter={position}
        >
          <Marker position={position} />
        </Map>
      )}
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: MAP_API
})(GoogleMap);
