import React, { useEffect, useState } from "react";
import axios from "axios";

import "../css/Style.css";
import Timetable from "./Timetable";
import GoogleMap from './GoogleMap';

const UserInput = props => {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;

  const [arrivals, setArrivals] = useState([]);
  const [tubeRoutes, setTubeRoutes] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [showMap, setShowMap] = useState(false);

  let errors=[];

  const getArrivalsForStop = data => {
    axios
      .get(
        `https://api.tfl.gov.uk/Line/${data.lineID}/Arrivals/${data.naptanID}?app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then(response => setArrivals(response.data))
      .catch(
        error =>
          console.log("Error encountered:", error.message) ||
          errors.concat(error)
      );
  };

  // fetches all route information having mode = tube
  const getRouteByModeTube = () => {
    axios
      .get(
        `https://api.tfl.gov.uk/Line/Mode/tube/Route?app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then(response => setTubeRoutes(response.data))
      .catch(
        error =>
          console.log("Error encountered:", error.message) ||
          errors.concat(error)
      );
  };

  const getTimetableFromStationToStation = data => {
    axios
      .get(
        `https://api.tfl.gov.uk/Line/${data.lineID}/Timetable/${data.originationID}/to/${data.destinationID}?app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then(response => setTimetable(response.data))
      .catch(
        error =>
          console.log("Error encountered:", error.message) ||
          errors.concat(error)
      );
  };

  const originationStations =
    tubeRoutes &&
    tubeRoutes
      .map(route =>
        route.routeSections.map(data => {
          return {
            name: data?.originationName,
            id: data?.originator,
            lineID: route?.id,
            validFrom: data?.validFrom,
            validTo: data?.validTo
          };
        })
      )
      .flat();

  const uniqueOriginationStationNames = [
    ...new Set(originationStations.map(item => item.name))
  ];

  const destinationStations =
    tubeRoutes &&
    tubeRoutes
      .map(route =>
        route?.routeSections?.map(data => {
          return {
            name: data?.destinationName,
            id: data?.destination,
            lineID: route?.id,
            validFrom: data?.validFrom,
            validTo: data?.validTo
          };
        })
      )
      .flat();

  const uniqueDestinationStationNames = [
    ...new Set(destinationStations.map(item => item.name))
  ];

  const handleSubmit = event => {
    event.preventDefault();
    const origination = document.getElementById("originationStation").value;
    const destination = document.getElementById("destinationStation").value;

    const originationDetails = originationStations.find(
      station => station.name === origination
    );
    const destinationDetails = destinationStations.find(
      station => station.name === destination
    );

    destination !== "None"
      ? getTimetableFromStationToStation({
          lineID: originationDetails?.lineID,
          originationID: originationDetails?.id,
          destinationID: destinationDetails?.id
        })
      : getArrivalsForStop({
          lineID: originationDetails?.lineID,
          naptanID: originationDetails?.id
        });
  };

  const showCurrentLocation = () => setShowMap(true);

  useEffect(() => {
    getRouteByModeTube();
  }, []);

  return (
    <div>
      {errors.length>0 && <div class="alert alert-danger" role="alert">
        {errors}
      </div>}
      <div className="jumbotron bg-warning text-dark">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col">
              <label htmlFor="originationStation">
                <b>Origination Station</b>
              </label>
              <select
                className="custom-select form-control"
                id="originationStation"
              >
                {uniqueOriginationStationNames &&
                  uniqueOriginationStationNames.map((station, index) => (
                    <option key={index} value={station}>
                      {station}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-group col">
              <label htmlFor="destinationStation">
                <b>Destination Station</b>
              </label>
              <select
                className="custom-select form-control"
                id="destinationStation"
              >
                <option>None</option>
                {uniqueDestinationStationNames &&
                  uniqueDestinationStationNames.map((station, index) => (
                    <option key={index} value={station}>
                      {station}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-light"
          >
            Search
          </button>
          <button type="button" className="btn btn-primary ml-3" onClick={showCurrentLocation}>Show Current Location</button>
        </form>
      </div>

      {arrivals.length > 0 && <Timetable {...props} arrivals={arrivals} />}
      {showMap && <GoogleMap {...props} />}
      {console.log("timetable", timetable)}
    </div>
  );
};

export default UserInput;
