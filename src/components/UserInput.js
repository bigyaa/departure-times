import React, { useEffect, useState } from "react";
import axios from "axios";

import OriginationTimetable from "./OriginationTimetable";
import GoogleMap from "./GoogleMap";

const UserInput = props => {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;

  const [arrivals, setArrivals] = useState([]);
  const [tubeRoutes, setTubeRoutes] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [clearError, setClearError] = useState(false);
  const [displayTable, setDisplayTable] = useState(true);

  let errors = [];

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
    setClearError(true);
    setDisplayTable(true);
    setShowMap(false);

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

  const showCurrentLocation = () => {
    setClearError(true);
    setShowMap(true);
    setDisplayTable(false);
  };

  useEffect(() => {
    getRouteByModeTube();

    timetable?.statusErrorMessage && setClearError(false);
  }, []);

  return (
    <div>
      {errors.length > 0 && (
        <div className="alert alert-danger" role="alert">
          {errors}
        </div>
      )}
      <div className="jumbotron bg-color-first text-dark">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col text-white">
              <label htmlFor="originationStation" className="input-label">
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

            <div className="form-group col text-white">
              <label htmlFor="destinationStation" className="input-label">
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

          <div className="text-center pt-3">
            <button
              type="submit"
              className="btn btn-light bg-color-second custom-button"
            >
              Search
            </button>
            <button
              type="button"
              className="btn btn-light bg-color-second ml-3 custom-button"
              onClick={showCurrentLocation}
            >
              Show Current Location
            </button>
          </div>
        </form>
      </div>

      {timetable?.statusErrorMessage && !clearError && (
        <div className="alert alert-danger" role="alert">
          {timetable.statusErrorMessage}
        </div>
      )}
      {arrivals.length > 0 && displayTable && (
        <OriginationTimetable {...props} arrivals={arrivals} />
      )}
      {showMap && <GoogleMap {...props} />}
      {console.log(
        "timetable",
        timetable?.timetable?.routes?.[0]?.schedules &&
        timetable?.timetable?.routes?.[0]?.schedules?.map(data => {
          return {
            name: data.name,
            departureTime: data.periods.map(data2 => {
              return { time: data2.fromTime.hour + ":" + data2.fromTime.minute };
            }),
            destinationArrivalTime: data.periods.map(data2 => {
              return { time: data2.toTime.hour + ":" + data2.toTime.minute };
            }),
          };
        })
      )}
    </div>
  );
};

export default UserInput;
