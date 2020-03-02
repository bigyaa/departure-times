import React from "react";

const Timetable = props => {
  const schedules = props.data?.timetable?.routes?.[0]?.schedules;
  const timetableData =
    schedules &&
    schedules.map(data => {
      return {
        name: data.name,
        departureTime: data.periods.map(data2 => {
          return {
            time: data2.fromTime.hour + ":" + data2.fromTime.minute
          };
        }),
        destinationArrivalTime: data.periods.map(data2 => {
          return { time: data2.toTime.hour + ":" + data2.toTime.minute };
        })
      };
    });

  return (
    <div>
      <h2 className="text-center secondary-heading">Time Table</h2>
      <table className="table table-striped table-responsive text-center">
        <thead></thead>
        <tbody>
          {timetableData.length > 0 &&
            timetableData.map((data, index) => (
              <div key={index}>
                <tr className="row_span-wrapper">
                  <th rowSpan="2">{data.name}</th>
                  <th>Departure from Origination</th>
                  {data?.departureTime &&
                    data.departureTime.map((item, i) => (
                      <td key={i}>{item.time}</td>
                    ))}
                </tr>
                <tr>
                  <th>Arrival at Destination</th>
                  {data?.destinationArrivalTime &&
                    data.destinationArrivalTime.map((item, i) => (
                      <td key={i}>{item.time}</td>
                    ))}
                </tr>
              </div>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
