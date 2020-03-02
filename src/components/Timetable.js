import React from "react";
import moment from 'moment';

const Timetable = props => {
  const arrivals = props.arrivals;

  return (
    <table className="table m-5">
      <thead className="thead-warning">
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
              <td>{moment(data.expectedArrival).format('MMMM Do YYYY, h:mm:ss a')}</td>
              <td>{data.currentLocation}</td>
              <td>{data.vehicleId}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Timetable;
