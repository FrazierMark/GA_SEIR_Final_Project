import React, { useState, useEffect } from "react";
import Plane from "../../components/3DMap/testPlane";
import * as locationsAPI from "../../utils/locationApi";
import LocationsCard from "../../components/LocationsCard/LocationsCard";
import Navbar from "../../components/Navbar/Navbar";

const Locations = ({ user, handleLogout }) => {
  const [favLocations, setLocations] = useState([]);

  const getLocations = async () => {
    try {
      const data = await locationsAPI.getAll();
      setLocations([...data.data.locations]);
    } catch (err) {
      console.log(err.message, " this is the error");
    }
  };

  const handleDelete = async (locationId) => {
    try {
      const data = await locationsAPI.deleteLocation(locationId);
      console.log(data);
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
      <Navbar user={user} handleLogout={handleLogout} />
      {favLocations.map((location) => {
        return (
          <LocationsCard
            location={location}
            key={location._id}
            description={location.location_description}
            id={location._id}
            // isProfile={isProfile}
            longitude={location.longitude}
            latitude={location.latitude}
            zoom={location.zoom}
            notes={location.notes}
            handleDelete={handleDelete}
            getLocations={getLocations}
          />
        );
      })}
      <Plane className="plane" lng={-89.05622} lat={35.18088} zoom={8} />
    </>
  );
};
export default Locations;
