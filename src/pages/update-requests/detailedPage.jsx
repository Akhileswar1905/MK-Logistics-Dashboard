import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UpdateRequestDetailsPage = () => {
  const location = useLocation();
  const { driver, updateReq } = location.state;
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    const updateCheck = () => {
      const trip = driver.tripDetails.find(
        (t) => t.tripID === updateReq.trip.tripID
      );

      // console.log(trip);

      if (trip) {
        // Find the difference between the updateReq.trip and trip
        const diff = {
          tripID: updateReq.trip.tripID === trip.tripID,
          tripDate: updateReq.trip.tripDate === trip.tripDate,
          tripTime: updateReq.trip.tripTime === trip.tripTime,
        };

        console.log(diff);

        const keys = Object.keys(diff);
        for (const key of keys) {
          if (!diff[key]) {
            setUpdate(`${key}: ${trip[key]} to ${updateReq.trip[key]}`);
            break;
          }
        }
      } else {
        setUpdate("Trip not found.");
      }
    };

    updateCheck();
  }, [driver, updateReq]);

  return (
    <div className="p-8 flex flex-col gap-4">
      <h1 className="text-3xl text-grayish">Update Request Details</h1>
      <div className="p-6 border-2 rounded-lg ">
        <h1 className="text-2xl">Driver Name</h1>
        <p className="text-base text-grayish">Phone Number</p>
        <h2 className="text-2xl mt-5 text-grayish">Update: </h2>
        <p className="text-lg">{update}</p>
      </div>
    </div>
  );
};

export default UpdateRequestDetailsPage;
