import React from "react";
import moment from "moment";

const OriginationTimetable = props => {
  const arrivals = props.arrivals;

  return (
    <div>
      <h2 className="text-center secondary-heading py-3">Time Table</h2>
      <table className="table table-striped table-responsive width-auto text-center ml-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Origination Station</th>
            <th scope="col">Expected Arrival</th>
            <th scope="col">Currenct Location</th>
            <th scope="col">Vehicle ID</th>
          </tr>
        </thead>
        <tbody>
          {arrivals &&
            arrivals.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.destinationName}</td>
                <td>
                  {moment(data.expectedArrival).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </td>
                <td>{data.currentLocation}</td>
                <td>{data.vehicleId}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OriginationTimetable;
