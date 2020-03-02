import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import {MAP_API} from '../constants';

function GoogleMap(props) {
  const [position, setPosition] = useState({ lat: 27, lng: 85 });

  const setLocation = () =>
    navigator?.geolocation?.getCurrentPosition(success => {
      setPosition({
        lat: parseFloat(success?.coords?.latitude),
        lng: parseFloat(success?.coords?.longitude)
      });
    });

  useEffect(setLocation, []);

  return (
    <div>
      {position && (
        <Map
        className='map'
          google={props.google}
          zoom={8}
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
