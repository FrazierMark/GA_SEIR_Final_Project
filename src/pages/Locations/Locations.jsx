import React, { useState, useEffect } from "react";
import Plane from "../../components/3DMap/testPlane";
import * as locationsAPI from "../../utils/locationApi";
import LocationsCard from "../../components/LocationsCard/LocationsCard";
import Navbar from "../../components/Navbar/Navbar";

const Locations = () => {
  const [favLocations, setLocations] = useState([]);

  const getLocations = async () => {
    try {
      const data = await locationsAPI.getAll();
      console.log(data.data.locations);
      setLocations([...data.data.locations]);
    } catch (err) {
      console.log(err.message, " this is the error");
    }
  };

  const handleDelete = async (locationId) => {
    try {
      console.log(locationId);
      const data = await locationsAPI.deleteLocation(locationId);
      console.log(
        data,
        "<-  this is the response from the server when we remove a like"
      );
      getLocations();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <>
      <Navbar />
      {favLocations.map((location) => {
        return (
          <LocationsCard
            key={location._id}
            description={location.location_description}
            id={location._id}
            // isProfile={isProfile}
            longitude={location.longitude}
            latitude={location.latitude}
            zoom={location.zoom}
            handleDelete={handleDelete}
          />
        );
      })}
      <Plane className="plane" />
    </>
  );
};
export default Locations;
// lng={favLocations[0].longitude}
//       lat={favLocations[0].latitude}
//       zoom={favLocations[0].zoom}
