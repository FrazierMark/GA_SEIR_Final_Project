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

  const handleDelete = () => {};

  //const lng = favLocations[0].longitude;
  console.log(favLocations[0]);

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <>
      <Navbar />
      {favLocations.map((location) => {
        return (
          <LocationsCard
            description={location.location_description}
            key={location._id}
            // isProfile={isProfile}
            longitude={location.longitude}
            latitude={location.latitude}
            zoom={location.zoom}
            delete={handleDelete}
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
