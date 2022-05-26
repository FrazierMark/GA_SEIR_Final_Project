import React, { useState, useEffect } from "react";
import Plane from "../../components/3DMap/testPlane";
import * as locationsAPI from "../../utils/locationApi";

const Locations = () => {
  const [locations, setLocations] = useState([]);

  async function getLocations() {
    try {
      const data = await locationsAPI.getAll();
      console.log(data);
      setLocations([...data.locations]);
    } catch (err) {
      console.log(err.message, " this is the error");
    }
  }


  useEffect(() => {
    getLocations();
  }, []);

  return <Plane className="plane" />; // lng={lng} lat={lat} zoom={zoom}
};;

export default Locations;
