import React, { useEffect, useState } from "react";
import axios from "axios";

import "../css/Style.css";

const UserInput = () => {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;

  const [arrivals, setArrivals] = useState([]);
  const [tubes, setTubes] = useState([]);
  const [tubeRoutes, setTubeRoutes] = useState([]);
  const [timetable, setTimetable] = useState([]);

  let errors = [];

  const getArrivalsForStop = data => {
    axios
      .get(
        `https://api.tfl.gov.uk/Line/${data.lineID}/Arrivals/${data.naptanID}?app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then(response => setArrivals(response.data))
      .catch(
        error =>
          console.log("Error encounteres:", error) || errors.concat(error)
      );
  };

  // fetches all line information having mode = tube
  const getLineByModeTube = () => {
    axios
      .get(
        `https://api.tfl.gov.uk/Line/Mode/tube?app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then(response => setTubes(response.data))
      .catch(
        error =>
          console.log("Error encounteres:", error) || errors.concat(error)
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
          console.log("Error encounteres:", error) || errors.concat(error)
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
          console.log("Error encounteres:", error) || errors.concat(error)
      );
  };
  useEffect(() => {
    getLineByModeTube();
    getRouteByModeTube();

    return () => (errors = []);
  }, []);

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

    getArrivalsForStop({
      lineID: originationDetails.lineID,
      naptanID: originationDetails.id
    });

    console.log(
      "arrivals",
      arrivals?.filter(arrival => arrival.destinationName === destination)
    );

    getTimetableFromStationToStation({
      lineID: originationDetails.lineID,
      originationID: originationDetails.id,
      destinationID: destinationDetails.id
    });

    console.log("timerer", timetable);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group col">
          <label htmlFor="originationStation">Origination Station</label>
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
          {console.log("tubes", tubes)}
          {console.log("routes", tubeRoutes)}
        </div>

        <div className="form-group col">
          <label htmlFor="destinationStation">Destination Station</label>
          <select
            className="custom-select form-control"
            id="destinationStation"
          >
            {uniqueDestinationStationNames &&
              uniqueDestinationStationNames.map((station, index) => (
                <option key={index} value={station}>
                  {station}
                </option>
              ))}
          </select>
        </div>
      </div>

      <button type="submit" className="btn btn-warning">
        Search
      </button>
    </form>
  );
};

export default UserInput;
